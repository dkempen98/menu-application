<?php

use App\Http\Controllers\OrdersController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

//Route::get('/menu-items', function () {
//    return DB::table('users')->get();
//});

Route::put("/complete-orders", OrdersController::class . "@completeOrders");
Route::resource('orders', OrdersController::class);
