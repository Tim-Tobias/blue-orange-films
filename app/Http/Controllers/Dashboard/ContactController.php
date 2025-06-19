<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ContactRequest;
use App\Models\Contact;
use App\Models\ContactContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;


class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(Request $request)
    // {
    //     $query = Contact::query();

    //     $perPage = $request->query('perPage', 10);

    //     $search = $request->query('search');

    //     $searchableColumns = explode(',', $request->query('searchable', ''));

    //     if ($search && !empty($searchableColumns)) {
    //         $query->where(function ($q) use ($search, $searchableColumns) {
    //             foreach ($searchableColumns as $column) {
    //                 if (Schema::hasColumn('contacts', $column)) {
    //                     $q->orWhere($column, 'like', "%{$search}%");
    //                 }
    //             }
    //         });
    //     }

    //     if ($sort = $request->query('sort')) {
    //         $column = $sort;
    //         $order = $request->query('order', 'asc');
    
    //         if (Schema::hasColumn('contacts', $column)) {
    //             $query->orderBy($column, $order);
    //         }
    //     }

    //     $contacts = $query->paginate($perPage)->withQueryString();
    //     $contacts->getCollection()->transform(function ($contacts) {
    //         $contacts->status_text = $contacts->is_active ? 'Aktif' : 'Tidak Aktif';
    //         return $contacts;
    //     });

    //     $query = ContactContent::query();

    //     $perPage = $request->query('perPage', 10);

    //     $search = $request->query('search');

    //     $searchableColumns = explode(',', $request->query('searchable', ''));

    //     if ($search && !empty($searchableColumns)) {
    //         $query->where(function ($q) use ($search, $searchableColumns) {
    //             foreach ($searchableColumns as $column) {
    //                 if (Schema::hasColumn('contactContent', $column)) {
    //                     $q->orWhere($column, 'like', "%{$search}%");
    //                 }
    //             }
    //         });
    //     }

    //     if ($sort = $request->query('sort')) {
    //         $column = $sort;
    //         $order = $request->query('order', 'asc');
    
    //         if (Schema::hasColumn('contactContent', $column)) {
    //             $query->orderBy($column, $order);
    //         }
    //     }

    //     $contactContent = $query->paginate($perPage)->withQueryString();
    //     $contactContent->getCollection()->transform(function ($contactContent) {
    //         $contactContent->status_text = $contactContent->is_active ? 'Aktif' : 'Tidak Aktif';
    //         return $contactContent;
    //     });

    //     return Inertia::render('admin/contacts/index', [
    //         'contacts' => $contacts,
    //         'contactContent' => $contactContent
    //     ]);
    // }

    public function index(Request $request)
    {
        $contacts = $this->filterAndPaginate(
            new Contact(),
            'contacts',
            $request
        );

        $contactContent = $this->filterAndPaginate(
            new ContactContent(),
            'contact_contents',
            $request
        );

        return Inertia::render('admin/contacts/index', [
            'contacts' => $contacts,
            'contactContent' => $contactContent,
        ]);
    }

    private function filterAndPaginate($model, string $tableName, Request $request)
    {
        $query = $model->newQuery();

        $perPage = $request->query('perPage', 10);
        $search = $request->query('search');
        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns, $tableName) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn($tableName, $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $order = $request->query('order', 'asc');
            if (Schema::hasColumn($tableName, $sort)) {
                $query->orderBy($sort, $order);
            }
        }

        $result = $query->paginate($perPage)->withQueryString();

        $result->getCollection()->transform(function ($item) {
            $item->status_text = $item->is_active ? 'Aktif' : 'Tidak Aktif';
            return $item;
        });

        return $result;
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/contacts/form', [
            'isEdit' => false,
            'data' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactRequest $request)
    {
        $contact = new Contact();

        $contact->phone = $request->phone;
        $contact->email = $request->email;
        $contact->address = $request->address;

        $contact->is_active = $request->is_active;

        if ($request->is_active == 1) {
            Contact::where('is_active', 1)->update(['is_active' => 0]);
        }

        $contact->save();

        return redirect()->route('contacts.index')->with('success', 'Contact created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $contact = Contact::findOrFail($id);

        return Inertia::render('admin/contacts/form', [
            'isEdit' => true,
            'contact' => $contact,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactRequest $request, string $id)
    {
        $contact = Contact::findOrFail($id);
        
        $contact->phone = $request->phone;
        $contact->email = $request->email;
        $contact->address = $request->address;

        $contact->is_active = $request->is_active;

        if ($request->is_active == 1) {
            Contact::where('is_active', 1)
                ->where('id', '!=', $contact->id)
                ->update(['is_active' => 0]);
        }
        
        $contact->save();

        return to_route('contacts.index')->with('success', 'Contact updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return to_route('contacts.index')->with('success', 'contacts deleted successfully');
    }
}
