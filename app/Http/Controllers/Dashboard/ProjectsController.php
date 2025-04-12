<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\WebContentRequest;
use App\Models\WebContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $webContents = WebContent::get();

        return Inertia::render('admin/web-contents/index', [
            'web_contents' => $webContents
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = WebContent::select('section')->get();

        return Inertia::render('admin/web-contents/form', [
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
        $webContent = new WebContent();

        if ($request->hasFile('image')) {
            $webContent->image = $request->file('image')->store('web_contents', 'public');
        }

        $webContent->title = $request->title;
        $webContent->content = $request->content;
        $webContent->section = $request->section;
        $webContent->save();

        return redirect()->route('web-contents.index')->with('success', 'Content created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
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

    /**
     * Update the specified resource in storage.
     */
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
