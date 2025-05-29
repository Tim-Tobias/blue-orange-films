<?php
;

use App\Http\Controllers\Dashboard\AboutController;
use App\Http\Controllers\Dashboard\ContactController;
use App\Http\Controllers\Dashboard\ContactContentController;
use App\Http\Controllers\Dashboard\ContactCarousellController;
use App\Http\Controllers\Dashboard\ProjectCategoryController;
use App\Http\Controllers\Dashboard\ProjectsController;
use App\Http\Controllers\Dashboard\BannersController;
use App\Http\Controllers\Dashboard\ClientController;
use App\Http\Controllers\Dashboard\HowWeWorkController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\Dashboard\SocialController;
use App\Http\Controllers\Dashboard\WorkflowController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function ($route) {
  $route->get('/', function () {
      return Inertia::render('admin/dashboard');
  })->name('dashboard');

  $route->patch('workflows/background', [WorkflowController::class, 'setBackground']);

  $route->resource('banners', BannersController::class)->except(['show', 'delete']);
  
  //about
  $route->resource('abouts', AboutController::class)->except(['show']);
  $route->resource('services', ServiceController::class)->except(['show']);
  $route->resource('hww', HowWeWorkController::class)->except(['show']);
  $route->resource('clients', ClientController::class)->except(['show']);
  $route->resource('workflows', WorkflowController::class)->except(['show']);
  
  //contacts
  $route->resource('contacts', ContactController::class)->except(['show']);
  $route->resource('contact-carousell', ContactCarousellController::class)->except(['show']);
  $route->resource('contact-content', ContactContentController::class)->except(['show']);
  $route->resource('socials', SocialController::class)->except(['show']);

  // Projects
  $route->resource('projects', ProjectsController::class)->except(['show']);
  $route->resource('project-categories', ProjectCategoryController::class);
});