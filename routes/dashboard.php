<?php

use App\Http\Controllers\Dashboard\WebContentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function ($route) {
  $route->get('/', function () {
      return Inertia::render('admin/dashboard');
  })->name('dashboard');

  $route->resource('web-contents', WebContentController::class);
});