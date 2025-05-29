<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\Banners;
use App\Models\Client;
use App\Models\HowWeWork;
use App\Models\Service;
use App\Models\Workflow;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $about = About::first();
        $services = Service::all();
        $hww = HowWeWork::first();
        $steps = Workflow::orderBy('order', 'asc')->get();
        $client = Client::first();
        $banner = Banners::where('section', 'about')->first();

        return Inertia::render('client/about/index', [
            'about' => $about,
            'services' => $services,
            'hww' => $hww,
            'steps' => $steps,
            'client' => $client,
            'banner' => $banner
        ]);
    }
}
