<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProjectsRequest;
use App\Models\ProjectCategory;
use App\Models\ProjectFiles;
use App\Models\Projects;
use App\Models\ProjectTeams;
use App\Models\TeamNames;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function index()
    {
        $projects = Projects::get();
        return Inertia::render('admin/projects/index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        $categories = ProjectCategory::select('*')->get();

        return Inertia::render('admin/projects/form', [
            'isEdit' => false,
            'projects' => null,
            'categories' => $categories,
        ]);
    }

    public function store(ProjectsRequest $request)
    {


        try {
            DB::beginTransaction();

            $projects = new Projects();
            $projects->highlight_link = $request->highlight_link;
            $projects->title = $request->title;
            $projects->year = $request->year;
            $projects->duration = $request->duration;
            $projects->aspect_ratio = $request->aspect_ratio;
            $projects->description = $request->description;
            $projects->client = $request->client;
            $projects->agency = $request->agency;
            $projects->id_project_category = $request->id_project_category;
            $projects->save();

            // Get the ID of the newly created project
            $idProjects = $projects->id;

            $created_at = date('Y-m-d H:i:s');

            $teamMembers = $request->teamMembers;
            $teamNamesData = [];
            foreach ($teamMembers as $member) {
                $teamNamesData[] = [
                    'id_project' => $idProjects,
                    'nameTeam' => $member['nameTeams'],
                    'nameRoles' => $member['nameRoles'],
                    'created_at' => $created_at,
                ];
            }

            ProjectTeams::insert($teamNamesData);

            $projectEntries = $request->projectEntries;
            $projectFiles = [];
            foreach ($projectEntries as $member) {
                $projectFiles[] = [
                    'project_id' => $idProjects,
                    'title' => $member['title'],
                    'project_link' => $member['project_link'],
                    'category' => $member['category'],
                    'description' => $member['description'],
                    'created_at' => $created_at,
                ];
            }

            ProjectFiles::insert($projectFiles);

            DB::commit();
            return redirect()->route('projects.index')->with('success', 'Content created Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
            return redirect()->route('projects.index')->with('error', 'Failed To Create Project');
        }
    }



    public function edit(string $id)
    {
        $projects = Projects::findOrFail($id);

        $categories = ProjectCategory::select('*')->get();


        return Inertia::render('admin/projects/form', [
            'isEdit' => true,
            'data' => $projects,
            'categories' => $categories,
        ]);
    }


    public function show(string $id)
    {
        $projects = Projects::findOrFail($id);

        $projectsId = $projects->id;
        $projects->projectTeams = ProjectTeams::where('id_project', $projectsId)->get();
        $projects->projectFiles = ProjectFiles::where('project_id', $projectsId)->get();

     
        $categories = ProjectCategory::select('*')->get();


        return Inertia::render('admin/projects/detail', [
            'isEdit' => true,
            'projects' => $projects,
            'categories' => $categories,
        ]);
    }

    public function update(ProjectsRequest $request, string $id)
    {
        $webContent = Projects::findOrFail($id);


        $webContent->title = $request->title;
        $webContent->content = $request->content;
        $webContent->save();

        return redirect()->route('projects.index')->with('success', 'Content created');
    }

    public function destroy(string $id)
    {
        //
    }
}
