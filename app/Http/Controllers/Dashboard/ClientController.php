<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Client::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('clients', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('clients', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $clients = $query->paginate($perPage)->withQueryString();
        
        $clients->getCollection()->transform(function ($client) {
            $client->status_text = $client->is_active ? 'Aktif' : 'Tidak Aktif';
            return $client;
        });

        return Inertia::render('admin/clients/index', [
            'clients' => $clients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/clients/form', [
            'isEdit' => false,
            'data' => null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ClientRequest $request)
    {
        $clients = new Client();

        if ($request->hasFile('image')) {
            $clients->image = $request->file('image')->store('clients', 'public');
        }

        $clients->name = $request->name;
        $clients->is_active = $request->is_active;
        $clients->save();

        return to_route('clients.index')->with('success', 'Client created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $client = Client::findOrFail($id);

        return Inertia::render('admin/clients/form', [
            'isEdit' => true,
            'data' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ClientRequest $request, string $id)
    {
        $client = Client::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if($client->image) {
                $imageName = basename($client->image);
                $imagePath = 'clients/' . $imageName;
                
                if(Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $client->image = $request->file('image')->store('clients', 'public');
        }

        $client->name = $request->name;
        $client->is_active = $request->is_active;

        $client->save();

        return to_route('clients.index')->with('success', 'Client updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = Client::findOrFail($id);

        if ($client->image) {
            $imagePath = $client->image; 

            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $client->delete();

        return to_route('clients.index')->with('success', 'clients deleted successfully');
    }
}
