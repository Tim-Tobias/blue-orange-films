<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ContactCarousellRequest;
use App\Models\ContactCarousell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpParser\Node\Expr\Cast\String_;

class ContactCarousellController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ContactCarousell::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('contact-carousells', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('contact-carousells', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $carousell = $query->paginate($perPage)->withQueryString();
        $carousell->getCollection()->transform(function ($carousell) {
            $carousell->status_text = $carousell->is_active ? 'Aktif' : 'Tidak Aktif';
            return $carousell;
        });

        return Inertia::render('admin/contact-carousell/index', [
            'carousell' => $carousell
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/contact-carousell/form', [
            'isEdit' => false,
            'data' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactCarousellRequest $request)
    {
        $carousell = new ContactCarousell();

        if ($request->hasFile('image')) {
            $carousell->image = $request->file('image')->store('contact-carousells', 'public');
        }

        $carousell->title = $request->title;
        $carousell->is_active = $request->is_active;
        $carousell->save();

        return to_route('contact-carousell.index')->with('success', 'Contact Carousell created');
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactCarousell $contactCarousell)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(String $id)
    {
        $carousell = ContactCarousell::findOrFail($id);

        return Inertia::render('admin/contact-carousell/form', [
            'isEdit' => true,
            'data' => $carousell,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactCarousellRequest $request, String $id)
    {
        $carousell = ContactCarousell::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if($carousell->image) {
                $imageName = basename($carousell->image);
                $imagePath = 'contact-carousells/' . $imageName;
                
                if(Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $carousell->image = $request->file('image')->store('contact-carousells', 'public');
        }

        $carousell->title = $request->title;
        $carousell->is_active = $request->is_active;
        $carousell->save();

        return to_route('contact-carousell.index')->with('success', 'Contact Carousell updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $conCar = ContactCarousell::findOrFail($id);

        if ($conCar->image) {
            $imagePath = $conCar->image; 

            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $conCar->delete();

        return to_route('contact-carousell.index')->with('success', 'contact carousell deleted successfully');
    }
}
