<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\WebContentRequest;
use App\Models\ProjectCategory;
use App\Models\WebContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $categories = ProjectCategory::select('section')->get();

        return Inertia::render('admin/project-category/form', [
            'isEdit' => false,
            'data' => null,
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WebContentRequest $request)
    {   
        $projectCategory = new ProjectCategory();

        if ($request->hasFile('image')) {
            $projectCategory->image = $request->file('image')->store('projectCategory', 'public');
        }

        $projectCategory->title = $request->title;
        $projectCategory->content = $request->content;
        $projectCategory->section = $request->section;
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
        $categories = WebContent::select('section')->get();
        $webContent = WebContent::findOrFail($id);

        return Inertia::render('admin/project-category/form', [
            'isEdit' => true,
            'data' => $webContent,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WebContentRequest $request, string $id)
    {
        $webContent = WebContent::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if($webContent->image) {
                $imageName = basename($webContent->image);
                $imagePath = 'projectCategory/' . $imageName;
                
                if(Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $webContent->image = $request->file('image')->store('projectCategory', 'public');
        }

        $webContent->title = $request->title;
        $webContent->content = $request->content;
        $webContent->save();

        return redirect()->route('project-category.index')->with('success', 'Content created');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function datatable(Request $request)
    {
        $page = $request->post('page');
        $projectCategory = ProjectCategory::get();

        $out = ['page' => $page, 'data' => $projectCategory];
        return response()->json($out);
    }
}
