<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);

Route::post('/register-partner', [AuthController::class, 'registerPartner']);

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/user/password', [AuthController::class, 'updatePassword']);


    Route::post('/dishes', [DishController::class, 'store']);
    Route::put('/dishes/{id}', [DishController::class, 'update']);
    Route::delete('/dishes/{id}', [DishController::class, 'destroy']);

    Route::get('/my-restaurant', [RestaurantController::class, 'myRestaurant']);
    Route::post('/restaurant/setup', [RestaurantController::class, 'updateSetup']);
    Route::post('/restaurant/update', [RestaurantController::class, 'updateRestaurant']);

    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::put('orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
});


Route::get('/snacks', [RestaurantController::class, 'index']);

Route::get('/snack/{id}', [RestaurantController::class, 'show']);

Route::get('/menu', [RestaurantController::class, 'menu']);
