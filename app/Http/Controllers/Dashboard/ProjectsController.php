<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProjectsRequest;
use App\Models\CrewRole;
use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
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

    public function create(Request $request)
    {
        $categories = ProjectCategory::all();
        return Inertia::render('admin/projects/form', [
            'categories' => $categories,
        ]);
    }

    public function store(ProjectsRequest $request)
    {
        dd($request->all());
    }



    public function edit(string $id)
    {
        
    }


    public function show(string $id)
    {
        
    }

    public function update(ProjectsRequest $request, string $id)
    {
        
    }

    public function destroy(string $id)
    {
        //
    }
}
