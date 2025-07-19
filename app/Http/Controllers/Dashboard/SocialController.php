<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SocialRequest;
use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class SocialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Social::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('socials', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');

            if (Schema::hasColumn('socials', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $socials = $query->paginate($perPage)->withQueryString();


        return Inertia::render('admin/socials/index', [
            'socials' => $socials
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $existingNames = Social::pluck('name');

        return Inertia::render('admin/socials/form', [
            'isEdit' => false,
            'data' => null,
            'existingNames' => $existingNames,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SocialRequest $request)
    {
        $social = new Social();

        $social->name = $request->name;
        $social->link = $request->link;
        $social->save();

        return redirect()->route('socials.index')->with('success', 'social created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Social $social)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $social = Social::where('id', $id)->first();

        return Inertia::render('admin/socials/form', [
            'isEdit' => true,
            'sosmed' => $social,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SocialRequest $request, string $id)
    {
        $social = Social::findOrFail($id);

        $social->name = $request->name;
        $social->link = $request->link;
        $social->save();

        return to_route('socials.index')->with('success', 'Social updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Social::findOrFail($id);
        $user->delete();

        return back()->with('success', 'Social Media berhasil dihapus.');
    }
}
