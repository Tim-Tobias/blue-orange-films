<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/roles', function (Request $request) {
    $search = $request->query('search');
    
    return \App\Models\CrewRole::query()
        ->when($search, fn($q) => $q->where('name', 'like', "%$search%"))
        ->select('id', 'name')
        ->limit(10)
        ->get();
});

Route::get('/team-names', function (Request $request) {
    $search = $request->query('search');
    
    return \App\Models\TeamNames::query()
        ->when($search, fn($q) => $q->where('name', 'like', "%$search%"))
        ->select('id', 'name')
        ->limit(10)
        ->get();
});
