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

            $highlightPath = null;
            if ($data['highlight_type'] === 'image' && $request->hasFile('highlight')) {
                $highlightPath = $request->file('highlight')->store('highlights', 'public');
            } elseif ($data['highlight_type'] === 'video') {
                $highlightPath = $data['highlight'];
            }

            $project = Project::create([
                'title' => $data['title'],
                'year' => $data['year'],
                'duration' => $data['duration'],
                'aspect_ratio' => $data['aspect_ratio'],
                'id_project_category' => $data['category'],
                'description' => $data['description'],
                'highlight_link' => $highlightPath,
                'agency' => 'Blue Orange Films',
                'client' => $data['client'],
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
        dd($request->all());

        DB::beginTransaction();

        try {
            $project->update([
                'title' => $request->title,
                'year' => $request->year,
                'duration' => $request->duration,
                'aspect_ratio' => $request->aspect_ratio,
                'category_id' => $request->category,
                'description' => $request->description,
                'client' => $request->client,
                'agency' => $request->agency,
                'highlight_type' => $request->highlight_type,
            ]);

            if ($request->highlight_type === 'image') {
                if($request->hasFile('highlight')) {
                    if ($project->highlight_link && Storage::exists('public/' . $project->highlight_link)) {
                        Storage::delete('public/' . $project->highlight_link);
                    }
    
                    $highlightPath = $request->file('highlight')->store('projects', 'public');
                    $project->highlight = $highlightPath;
                }

                $project->highlight_link = $request->highlight;
            } elseif ($request->highlight_type === 'video') {
                $project->highlight = $request->highlight;
            }
            $project->save();

            $project->teams()->delete();

            $teamInserts = [];

            foreach ($request->teams as $team) {
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
                    'project_id' => $project->id,
                    'crew_role_id' => $roleId,
                    'team_name_id' => $nameId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            ProjectTeam::insert($teamInserts);

            $project->files()->delete();

            $fileInserts = [];

            foreach ($request->files as $file) {
            $existing = ProjectFile::find($file['id'] ?? 0);

            if (
                $file['category'] === 'image' &&
                isset($file['project_link']) &&
                $file['project_link']
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
                    'project_id' => $project->id,
                    'title' => $file['title'],
                    'category' => $file['category'],
                    'description' => $file['description'],
                    'project_link' => $filePath,
                ]
            );
        }

            ProjectFile::insert($fileInserts);

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
        //
    }
}
