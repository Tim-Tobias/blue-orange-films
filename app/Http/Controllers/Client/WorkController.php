<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Banners;
use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function index(Request $request)
    {
        $selectedCategory = $request->query('category');
        $categories = ProjectCategory::all();
        
        $projects = Project::with('category')
        ->when($selectedCategory && $selectedCategory !== 'all', function ($query) use ($selectedCategory) {
            $query->whereHas('category', function ($q) use ($selectedCategory) {
                $q->where('name', $selectedCategory);
            });
        })
        ->get();

        return Inertia::render('client/works/index', [
            'categories' => $categories,
            'projects' => $projects,
            'banner' => Banners::where('section', 'works')->first()
        ]);
    }

    public function show(string $id)
    {
        $project = Project::with(['category', 'files', 'teams.role', 'teams.nameCrew'])->where('id', $id)->first();

        return Inertia::render('client/detail_work/index', [
            'project' => $project
        ]);
    }
}
