<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProjectCategoryRequest;
use App\Http\Requests\Dashboard\WebContentRequest;
use App\Models\ProjectCategory;
use App\Models\WebContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function index()
    {
        $projectCategory = ProjectCategory::get();

        return Inertia::render('admin/web-contents/index', [
            'projectCategory' => $projectCategory
        ]);
    }

    public function create()
    {
        $projectCategory = ProjectCategory::select('section')->get();

        return Inertia::render('admin/web-contents/form', [
            'isEdit' => false,
            'data' => null,
            'projectCategory' => $projectCategory
        ]);
    }

    public function store(ProjectCategoryRequest $request)
    {   
        $webContent = new ProjectCategory();

    
        $webContent->name = $request->name;
        $webContent->save();

        return redirect()->route('web-contents.index')->with('success', 'Content created');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        $categories = WebContent::select('section')->get();
        $webContent = WebContent::findOrFail($id);

        return Inertia::render('admin/web-contents/form', [
            'isEdit' => true,
            'data' => $webContent,
            'categories' => $categories
        ]);
    }

    public function update(WebContentRequest $request, string $id)
    {
        $webContent = WebContent::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if($webContent->image) {
                $imageName = basename($webContent->image);
                $imagePath = 'web_contents/' . $imageName;
                
                if(Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $webContent->image = $request->file('image')->store('web_contents', 'public');
        }

        $webContent->title = $request->title;
        $webContent->content = $request->content;
        $webContent->save();

        return redirect()->route('web-contents.index')->with('success', 'Content created');
    }

    public function destroy(string $id)
    {
        //
    }
}
