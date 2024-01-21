<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GembaController;
use App\Http\Controllers\ProductsController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', function() {
    return response()->json(['vinh ', 'hao', 'hai', 'tan','tran', 'thuy', 'vu', 'khoa',]);
});

Route::get('/family', function() {
    return redirect('some/url');
});

Route::get('/gemba',[
    GembaController::class,
    'index'
]);

Route::get('/products', [
    ProductsController::class,
    'index'
]);
Route::get('/products/{id}',[
    ProductsController::class,
    'getDetail'
])->where('id', '[0-9]+');

