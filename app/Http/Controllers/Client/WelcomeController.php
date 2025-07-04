<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\Banners;
use App\Models\Client;
use App\Models\Project;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $blog = About::where('is_active', true)->first();
        $projects = Project::with(['category', 'teams' => function ($query) {
            $query->whereHas('role', function ($q) {
                $q->where('name', 'client');
            })->with('role', 'nameCrew');
        }])->skip(0)->take(3)->get();
        $client = Client::where('is_active', true)->first();
        $banner = Banners::where('section', 'home')->first();

        return Inertia::render('client/home/index', [
            'about' => $blog,
            'projects' => $projects,
            'client' => $client,
            'banner' => $banner
        ]);
    }
}
