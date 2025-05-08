<?php
;

use App\Http\Controllers\Dashboard\ProjectCategoryController;
use App\Http\Controllers\Dashboard\ProjectsController;
use App\Http\Controllers\Dashboard\WebContentController;
use App\Http\Controllers\Dashboard\WorkflowController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function ($route) {
  $route->get('/', function () {
      return Inertia::render('admin/dashboard');
  })->name('dashboard');

  $route->patch('workflows/background', [WorkflowController::class, 'setBackground']);

  $route->resource('web-contents', WebContentController::class)->except(['show', 'delete']);
  $route->resource('workflows', WorkflowController::class)->except(['show']);

  // Projects
  $route->resource('projects', ProjectsController::class)->except(['show']);
  $route->resource('project-categories', ProjectCategoryController::class);
});