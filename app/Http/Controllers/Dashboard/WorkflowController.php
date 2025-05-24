<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\WorkflowRequest;
use App\Models\Workflow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class WorkflowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Workflow::query();

        $perPage = $request->query('perPage', 10);

        $search = $request->query('search');

        $searchableColumns = explode(',', $request->query('searchable', ''));

        if ($search && !empty($searchableColumns)) {
            $query->where(function ($q) use ($search, $searchableColumns) {
                foreach ($searchableColumns as $column) {
                    if (Schema::hasColumn('workflows', $column)) {
                        $q->orWhere($column, 'like', "%{$search}%");
                    }
                }
            });
        }

        if ($sort = $request->query('sort')) {
            $column = $sort;
            $order = $request->query('order', 'asc');
    
            if (Schema::hasColumn('workflows', $column)) {
                $query->orderBy($column, $order);
            }
        }

        $workflows = $query->paginate($perPage)->withQueryString();

        return Inertia::render('admin/workflows/index', [
            'workflows' => $workflows,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/workflows/form', [
            'isEdit' => false,
            'data' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WorkflowRequest $request, Workflow $workflow)
    {
        $maxOrder = $workflow->max('order');
        $nextOrder = $maxOrder !== null ? $maxOrder + 1 : 1;

        $workflow->title =  $request->title;
        $workflow->desc = $request->desc;
        $workflow->order = $nextOrder;
        $workflow->save();

        return to_route('workflows.index')->with('success', 'Workflow created!');
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
        $workflow = Workflow::query();

        $maxOrder = $workflow->max('order');
        $webContent = $workflow->findOrFail($id);


        return Inertia::render('admin/workflows/form', [
            'isEdit' => true,
            'data' => $webContent,
            'orders' => $maxOrder
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WorkflowRequest $request, string $id)
    {
        $workflow = Workflow::findOrFail($id);

        $newOrder = (int) $request->order;

        if ($workflow->order != $request->order) {
            $oldOrder = $workflow->order;
            $newOrder = $request->order;
        
            if ($newOrder < $oldOrder) {
                Workflow::where('order', [$newOrder, $oldOrder - 1])
                    ->increment('order');
            } elseif ($newOrder > $oldOrder) {
                Workflow::where('order', [$oldOrder + 1, $newOrder])
                    ->decrement('order');
            }
        
            $workflow->order = $newOrder;
        }
        
        $workflow->title = $request->title;
        $workflow->desc = $request->desc;
        $workflow->save();

        return to_route('workflows.index')->with('success', 'Workflow and order updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $workflow = Workflow::findOrFail($id);
        $deletedOrder = $workflow->order;

        $workflow->delete();

        Workflow::where('order', '>', $deletedOrder)
        ->decrement('order');

        return to_route('workflows.index')->with('success', 'Workflow deleted!');
    }
}
