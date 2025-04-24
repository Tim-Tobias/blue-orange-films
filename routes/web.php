<?php

use App\Http\Controllers\Client\AboutController;
use App\Http\Controllers\Client\WelcomeController;
use App\Http\Controllers\Client\WorkController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, "index"])->name('home');
Route::get('/about', [AboutController::class, "index"])->name('about');
Route::get('/works', [WorkController::class, "index"])->name('works');
Route::get('/works/{id}', [WorkController::class, "show"])->name('works.detail');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/dashboard.php';
