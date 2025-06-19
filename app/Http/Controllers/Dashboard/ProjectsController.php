<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProjectRequest;
use App\Models\CrewRole;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\ProjectFile;
use App\Models\ProjectTeam;
use App\Models\TeamName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        $perPage = $request->query('perPage', 10);
        $search = $request->query('search');
        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('projects', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');

            if (Schema::hasColumn('projects', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $projects = $query->with('category')->paginate($perPage)->withQueryString();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        $categories = ProjectCategory::all();
        
        return Inertia::render('admin/projects/form', [
            'categories' => $categories,
        ]);
    }

    public function store(ProjectRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();

            $highlightImagePath = null;
            if($request->hasFile('highlight_image')) {
                $highlightImagePath = $request->file('highlight_image')->store('highlight_image', 'public');
            }

            $project = Project::create([
                'title' => $data['title'],
                'date' => $data['date'],
                'duration' => $data['duration'],
                'id_project_category' => $data['category'],
                'description' => $data['description'],
                'highlight_link' => $data['highlight'],
                'agency' => 'Blue Orange Films',
                'client' => $data['client'],
                'highlight_image' => $highlightImagePath
            ]);

            $teamsToInsert = collect($data['teams'])->map(function ($team) use ($project) {
                $nameId = (int)$team['id_name'] !== 0
                    ? $team['id_name']
                    : TeamName::firstOrCreate(['name' => strtolower($team['name'])])->id;

                $roleId = (int)$team['id_role'] !== 0
                    ? $team['id_role']
                    : CrewRole::firstOrCreate(['name' => strtolower($team['role'])])->id;

                return [
                    'id_project' => $project->id,
                    'id_name_crew' => $nameId,
                    'id_crew_roles' => $roleId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });

            ProjectTeam::insert($teamsToInsert->toArray());

            $filesToInsert = collect($data['files'])->map(function ($file) use ($project) {
                $link = $file['category'] === 'image' && $file['project_link'] ? $file['project_link']->store('project_files', 'public')
                    : $file['project_link'];

                return [
                    'project_id' => $project->id,
                    'title' => $file['title'],
                    'category' => $file['category'],
                    'project_link' => $link,
                    'description' => $file['description'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });

            ProjectFile::insert($filesToInsert->toArray());

            DB::commit();

            return redirect()->route('projects.index')->with('success', 'Project created successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();

            report($e);
            return back()->withErrors('Failed to save project. Please try again.')->withInput();
        }
    }

    public function edit(string $id)
    {
        $categories = ProjectCategory::all();

        $project = Project::with(['category', 'teams.role', 'teams.nameCrew', 'files'])->findOrFail($id);
        
        return Inertia::render('admin/projects/form', [
            'categories' => $categories,
            'isEdit' => true,
            'project' => $project,
        ]);
    }

    public function show(string $id)
    {
        
    }

    public function update(ProjectRequest $request, Project $project)
    {
        DB::beginTransaction();

        
        try {
            $data = $request->validated();
            
            $project->update([
                'title' => $data['title'],
                'date' => $data['date'],
                'duration' => $data['duration'],
                'id_project_category' => $data['category'],
                'description' => $data['description'],
                'client' => $data['client'],
                'highlight_link' => $data['highlight'],
                'agency' => 'Blue Orange Films',
            ]);

            if($request->hasFile('highlight_image')) {
                if ($project->highlight_image && Storage::exists('public/' . $project->highlight_image)) {
                    Storage::delete('public/' . $project->highlight_image);
                }

                $highlightPath = $request->file('highlight_image')->store('projects', 'public');
                $project->highlight_image = $highlightPath;
            }

            $project->save();

            
            if(isset($data['teams'])) {
                $project->teams()->delete();
    
                $teamInserts = [];

                foreach ($data['teams'] as $team) {
                    $roleId = $team['id_role'];
                    $nameId = $team['id_name'];
    
                    if ($roleId == 0) {
                        $role = CrewRole::firstOrCreate(['name' => $team['role']]);
                        $roleId = $role->id;
                    }
    
                    if ($nameId == 0) {
                        $name = TeamName::firstOrCreate(['name' => $team['name']]);
                        $nameId = $name->id;
                    }
    
                    $teamInserts[] = [
                        'id_project' => $project->id,
                        'id_crew_roles' => $roleId,
                        'id_name_crew' => $nameId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                ProjectTeam::insert($teamInserts);
            }

            $project->files()->delete();
            if(isset($data['files'])) {
                foreach ($data['files'] as $file) {
                    $existing = ProjectFile::find($file['id'] ?? 0);
        
                    if (
                        $file['category'] === 'image' &&
                        isset($file['project_link']) &&
                        $file['project_link'] instanceof \Illuminate\Http\UploadedFile
                    ) {
                        if ($existing && Storage::exists('public/' . $existing->project_link)) {
                            Storage::delete('public/' . $existing->project_link);
                        }
        
                        $filePath = $file['project_link']->store('project-files', 'public');
                    } else {
                        $filePath = $file['project_link']; 
                    }
        
                    ProjectFile::updateOrCreate(
                        ['id' => $file['id'] ?? null],
                        [
                            'project_id' => $project['id'],
                            'title' => $file['title'],
                            'category' => $file['category'],
                            'description' => $file['description'],
                            'project_link' => $filePath,
                        ]
                    );
                }
            }

            DB::commit();

            return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            report($th);
            return back()->withErrors(['message' => 'Failed to update project.'])->withInput();
        }
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $project = Project::with(['teams', 'files'])->findOrFail($id);

            // Hapus highlight jika image
            if (
                $project->highlight_type === 'image' &&
                $project->highlight_link &&
                Storage::exists('public/' . $project->highlight_link)
            ) {
                Storage::delete('public/' . $project->highlight_link);
            }

            // Hapus file image (jika dari storage)
            foreach ($project->files as $file) {
                if ($file->category === 'image' && $file->project_link) {
                    if (Storage::exists('public/' . $file->project_link)) {
                        Storage::delete('public/' . $file->project_link);
                    }
                }
            }

            // Hapus relasi
            $project->teams()->delete();
            $project->files()->delete();

            // Hapus project
            $project->delete();

            DB::commit();

            return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();
            report($e);

            return back()->withErrors(['message' => 'Failed to delete project.'])->withInput();
        }
    }
}
