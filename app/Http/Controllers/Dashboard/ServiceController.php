<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Service::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('services', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('services', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $services = $query->paginate($perPage)->withQueryString();
        $services->getCollection()->transform(function ($services) {
            $services->status_text = $services->is_active ? 'Aktif' : 'Tidak Aktif';
            return $services;
        });

        return Inertia::render('admin/services/index', [
            'services' => $services
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/services/form', [
            'isEdit' => false,
            'data' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        $services = new Service();

        if ($request->hasFile('image')) {
            $services->image = $request->file('image')->store('services', 'public');
        }

        $services->title = $request->title;
        $services->description = $request->description;
        $services->is_active = $request->is_active;

        $services->save();

        return to_route('services.index')->with('success', 'Service created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $service = Service::findOrFail($id);

        return Inertia::render('admin/services/form', [
            'isEdit' => true,
            'data' => $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceRequest $request, string $id)
    {
        $service = Service::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if($service->image) {
                $imageName = basename($service->image);
                $imagePath = 'services/' . $imageName;
                
                if(Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $service->image = $request->file('image')->store('services', 'public');
        }

        $service->title = $request->title;
        $service->description = $request->description;
        $service->is_active = $request->is_active;

        $service->save();

        return to_route('services.index')->with('success', 'Service updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::findOrFail($id);

        if ($service->image) {
            $imagePath = $service->image; 

            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $service->delete();

        return to_route('services.index')->with('success', 'services deleted successfully');
    }

}
