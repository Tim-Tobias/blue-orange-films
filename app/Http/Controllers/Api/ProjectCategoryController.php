<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProjectCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function datatable()
    {
        $limit = request('limit', 10);
        $offset = request('offset', 0);
        
        $categories = ProjectCategory::skip($offset)
            ->take($limit)
            ->get();
            
        return response()->json([
            'data' => $categories,
            'limit' => (int)$limit,
            'offset' => (int)$offset,
            'total' => ProjectCategory::count()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category = ProjectCategory::create($validated);
        return response()->json($category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = ProjectCategory::findOrFail($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = ProjectCategory::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $category->update($validated);
        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = ProjectCategory::findOrFail($id);
        $category->delete();
        
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
