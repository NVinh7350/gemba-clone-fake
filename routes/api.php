<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
use App\Http\Controllers\Api\GembaController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\TaskController;
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('gemba', [
    GembaController::class,
    'index'
]);
Route::post('gemba', [
    GembaController::class,
    'store'
]);
Route::get('member', [
    MemberController::class,
    'index'
]);
Route::get('task', [
    TaskController::class,
    'index'
]);
Route::post('task', [
    TaskController::class,
    'store'
]);
Route::get('gemba-tasks-list/{id}', [
    GembaController::class,
    'getTasksListByGembaId'
]);
Route::put('tasks/{taskId}/update-is-completed', [
    TaskController::class,
    'updateIsCompleted'
]);
Route::put('tasks/{taskId}/update-task', [
    TaskController::class,
    'updateTask'
]);