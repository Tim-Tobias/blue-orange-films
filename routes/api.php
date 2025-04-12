<?php

use App\Http\Controllers\Api\ProjectCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('project-category')->group(function () {
    // Route::apiResource('/', ProjectCategoryController::class);
    Route::post('datatable', [ProjectCategoryController::class, 'datatable'])->name('project-category.datatable');
});
