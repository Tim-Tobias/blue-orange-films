<?php

use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/socials', function (Request $request) {
    $instagram = Social::where('name', 'instagram')->first();
    $youtube = Social::where('name', 'youtube')->first();
    $linkedin = Social::where('name', 'linkedin')->first();

    return response()->json([
        'instagram' => $instagram,
        'youtube' => $youtube,
        'linkedin' => $linkedin
    ]);
});
