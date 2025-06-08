<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\HwwRequest;
use App\Models\HowWeWork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class HowWeWorkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = HowWeWork::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('hww', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('hww', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $hww = $query->paginate($perPage)->withQueryString();
        $hww->getCollection()->transform(function ($hww) {
            $hww->status_text = $hww->is_active ? 'Aktif' : 'Tidak Aktif';
            return $hww;
        });

        return Inertia::render('admin/hww/index', [
            'hww' => $hww
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/hww/form', [
            'isEdit' => false,
            'data' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(HwwRequest $request)
    {
        $howWeWork = new HowWeWork();

        $howWeWork->title = $request->title;
        $howWeWork->content = $request->content;
        $howWeWork->is_active = $request->is_active;

        $howWeWork->save();

        return redirect()->route('hww.index')->with('success', 'Data created');
    }

    /**
     * Display the specified resource.
     */
    public function show(HowWeWork $howWeWork)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $hww = HowWeWork::findOrFail($id);

        return Inertia::render('admin/hww/form', [
            'isEdit' => true,
            'hww' => $hww,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(HwwRequest $request, string $id)
    {
        $hww = HowWeWork::findOrFail($id);
        
        $hww->title = $request->title;
        $hww->content = $request->content;
        $hww->is_active = $request->is_active;

        $hww->save();

        return to_route('hww.index')->with('success', 'Data updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $howWeWork = HowWeWork::findOrFail($id);
        $howWeWork->delete();

        return redirect()->route('hww.index')->with('success', 'Data deleted successfully');
    }

}
