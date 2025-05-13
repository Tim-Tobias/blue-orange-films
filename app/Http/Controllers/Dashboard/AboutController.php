<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\AboutRequest;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = About::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('abouts', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('abouts', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $abouts = $query->paginate($perPage)->withQueryString();


        return Inertia::render('admin/abouts/index', [
            'abouts' => $abouts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/abouts/form', [
            'isEdit' => false,
            'data' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AboutRequest $request)
    {
        $abouts = new About();

        if ($request->hasFile('image')) {
            $abouts->image = $request->file('image')->store('abouts', 'public');
        }

        $abouts->content = $request->content;
        $abouts->save();

        return to_route('abouts.index')->with('success', 'About created');
    }

    /**
     * Display the specified resource.
     */
    public function show(About $about)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $about = About::findOrFail($id);

        return Inertia::render('admin/abouts/form', [
            'isEdit' => true,
            'data' => $about,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AboutRequest $request, string $id)
    {
        $about = About::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if($about->image) {
                $imageName = basename($about->image);
                $imagePath = 'abouts/' . $imageName;
                
                if(Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $about->image = $request->file('image')->store('abouts', 'public');
        }

        $about->content = $request->content;
        $about->save();

        return to_route('abouts.index')->with('success', 'About updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(About $about)
    {
        //
    }
}
