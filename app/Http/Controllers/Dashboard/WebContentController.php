<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\WebContentRequest;
use App\Models\WebContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = WebContent::query();

        $query->where(function ($q) {
            $q->whereNotNull('title')
                ->orWhereNotNull('content');
        });

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

        $webContents = $query->paginate($perPage)->withQueryString();


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

        return to_route('web-contents.index')->with('success', 'Content created');
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

        return to_route('web-contents.index')->with('success', 'Content updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
