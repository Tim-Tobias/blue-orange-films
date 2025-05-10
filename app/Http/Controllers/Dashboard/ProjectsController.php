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
                    if (Schema::hasColumn('web_contents', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('web_contents', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $projects = $query->paginate($perPage)->withQueryString();

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
        ]);

        $teamsToInsert = collect($data['teams'])->map(function ($team) use ($project) {
            $nameId = $team['id_name'] !== 0
                ? $team['id_name']
                : TeamName::firstOrCreate(['name' => $team['name']])->id;

            $roleId = $team['id_role'] !== 0
                ? $team['id_role']
                : CrewRole::firstOrCreate(['name' => $team['role']])->id;

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
        
    }

    public function show(string $id)
    {
        
    }

    public function update(Request $request, string $id)
    {
        
    }

    public function destroy(string $id)
    {
        //
    }
}
