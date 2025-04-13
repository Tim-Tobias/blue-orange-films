<?php

use App\Http\Controllers\Dashboard\CrewRolesController;
use App\Http\Controllers\Dashboard\ProjectCategoryController;
use App\Http\Controllers\Dashboard\ProjectsController;
use App\Http\Controllers\Dashboard\TeamNamesController;
use App\Http\Controllers\Dashboard\WebContentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function ($route) {
  $route->get('/', function () {
      return Inertia::render('admin/dashboard');
  })->name('dashboard');

  $route->resource('web-contents', WebContentController::class);
  $route->resource('project-category', ProjectCategoryController::class);
  $route->resource('crew-roles', CrewRolesController::class);



  $route->resource('projects', ProjectsController::class);
  $route->resource('team-names', TeamNamesController::class);
 

});