<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\BannersRequest;
use App\Models\Banners;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Banners::query();

        $query->where(function ($q) {
            $q->whereNotNull('title');
        });

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('banners', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('banners', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $banners = $query->paginate($perPage)->withQueryString();


        return Inertia::render('admin/banners/index', [
            'banners' => $banners
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Banners::select('section')->get();

        return Inertia::render('admin/banners/form', [
            'isEdit' => false,
            'data' => null,
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BannersRequest $request)
    {   
        $banners = new Banners();

        if ($request->hasFile('image')) {
            $banners->image = $request->file('image')->store('banners', 'public');
        }

        $banners->title = $request->title;
        $banners->section = $request->section;
        $banners->save();

        return to_route('banners.index')->with('success', 'Content created');
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
        $categories = Banners::select('section')->get();
        $banner = Banners::findOrFail($id);

        return Inertia::render('admin/banners/form', [
            'isEdit' => true,
            'data' => $banner,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BannersRequest $request, string $id)
    {
        $banner = Banners::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if($banner->image) {
                $imageName = basename($banner->image);
                $imagePath = 'banners/' . $imageName;
                
                if(Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $banner->image = $request->file('image')->store('banners', 'public');
        }

        $banner->title = $request->title;
        $banner->save();

        return to_route('banners.index')->with('success', 'Banner updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
