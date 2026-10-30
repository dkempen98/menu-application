<?php

use App\Http\Controllers\DrinkController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

//Route::get('/menu-items', function () {
//    return DB::table('users')->get();
//});

Route::put("/complete-orders", OrderController::class . "@completeOrders");
Route::resource('orders', OrderController::class);

Route::get('/drinks', [DrinkController::class, 'index']);
Route::get('/drinks/liquor/{liquorName}', [DrinkController::class, 'liquorDrinks']);
Route::get('/drinks/{drinkName}/details', [DrinkController::class, 'getDrinkDetails']);