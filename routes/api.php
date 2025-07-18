<?php

use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/socials', function (Request $request) {
    $instagram = Social::where('name', 'instagram')->first();
    $youtube = Social::where('name', 'youtube')->first();
    $linkedin = Social::where('name', 'linkedin')->first();
    $email = Social::where('name', 'email')->first();

    return response()->json([
        'instagram' => $instagram,
        'youtube' => $youtube,
        'linkedin' => $linkedin,
        'email' => $email,
    ]);
});

Route::get('/roles', function (Request $request) {
    $search = $request->query('search');
    
    return \App\Models\CrewRole::query()
        ->when($search, fn($q) => $q->where('name', 'like', "%$search%"))
        ->select('id', 'name')
        ->get();
});

Route::get('/team-names', function (Request $request) {
    $search = $request->query('search');
    
    return \App\Models\TeamName::query()
        ->when($search, fn($q) => $q->where('name', 'like', "%$search%"))
        ->select('id', 'name')
        ->get();
});
