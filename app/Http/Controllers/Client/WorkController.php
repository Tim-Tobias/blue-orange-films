<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function index()
    {
        return Inertia::render('client/works/index');
    }

    public function show()
    {
        return Inertia::render('client/detail_work/index');
    }
}
