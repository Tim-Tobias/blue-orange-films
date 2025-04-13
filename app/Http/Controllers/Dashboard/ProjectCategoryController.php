<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProjectCategoryRequest;
use App\Http\Requests\Dashboard\WebContentRequest;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projectCategory = ProjectCategory::get();

        return Inertia::render('admin/project-category/index', [
            'projectCategory' => $projectCategory
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render('admin/project-category/form', [
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

        return redirect()->route('project-category.index')->with('success', 'Content created');
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

        return Inertia::render('admin/project-category/form', [
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

        return redirect()->route('project-category.index')->with('success', 'Content updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

}
