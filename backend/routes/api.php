<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/menu-items', function () {
    return DB::table('users')->get();
});

Route::resource('orders', \App\Http\Controllers\OrdersController::class);
