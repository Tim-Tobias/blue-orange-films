<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProjectCategoryRequest;
use App\Http\Requests\Dashboard\WebContentRequest;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class ProjectCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ProjectCategory::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('project_categories', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('project_categories', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $projectCategories = $query->paginate($perPage)->withQueryString();;

        return Inertia::render('admin/project-categories/index', [
            'projectCategories' => $projectCategories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render('admin/project-categories/form', [
            'isEdit' => false,
            'data' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectCategoryRequest $request)
    {
        $projectCategory = new ProjectCategory();

        $projectCategory->name = $request->name;
        $projectCategory->save();

        return redirect()->route('project-categories.index')->with('success', 'Category created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $projectCategory = ProjectCategory::get();
        return response()->json($projectCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $projectCategory = ProjectCategory::findOrFail($id);

        return Inertia::render('admin/project-categories/form', [
            'isEdit' => true,
            'projectCategory' => $projectCategory
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectCategoryRequest $request, string $id)
    {
        $projectCategory = ProjectCategory::findOrFail($id);

        $projectCategory->name = $request->name;
        $projectCategory->save();

        return redirect()->route('project-categories.index')->with('success', 'Content updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

}
