<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ContactContentRequest;
use App\Models\ContactContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class ContactContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ContactContent::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('contactContent', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('contactContent', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $contactContent = $query->paginate($perPage)->withQueryString();
        $contactContent->getCollection()->transform(function ($contactContent) {
            $contactContent->status_text = $contactContent->is_active ? 'Aktif' : 'Tidak Aktif';
            return $contactContent;
        });

        return Inertia::render('admin/contact-contents/index', [
            'contactContent' => $contactContent
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/contact-contents/form', [
            'isEdit' => false,
            'data' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactContentRequest $request)
    {
        $contactContent = new ContactContent();

        $contactContent->title = $request->title;
        $contactContent->content = $request->content;
        $contactContent->is_active = $request->is_active;

        $contactContent->save();

        return redirect()->route('contacts.index')->with('success', 'Data created');
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactContent $contactContent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(String $id)
    {
        $contactContent = ContactContent::findOrFail($id);

        return Inertia::render('admin/contact-contents/form', [
            'isEdit' => true,
            'contactContent' => $contactContent,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactContentRequest $request, String $id)
    {
        $contactContent = ContactContent::findOrFail($id);
        
        $contactContent->title = $request->title;
        $contactContent->content = $request->content;
        $contactContent->is_active = $request->is_active;

        $contactContent->save();

        return to_route('contacts.index')->with('success', 'Data updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $contactContent = ContactContent::findOrFail($id);
        $contactContent->delete();

        return redirect()->route('contacts.index')->with('success', 'Data deleted successfully');
    }
}
