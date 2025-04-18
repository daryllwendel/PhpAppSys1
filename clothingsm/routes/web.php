<?php

use Illuminate\Support\Facades\Route;
Route::get('/', function(){
    return view('LandingPage');
});
Route::get('/login', function () {
    return view('login');  
});
Route::get('/dashboard', function () {
    return view('dashboard');
});
Route::get('/dashboarddisplay', function () {
    return view('dashboarddisplay');
});
Route::get('/orders', function(){
    return view('orders');
});
Route::get('/product', function(){
    return view('product');
});
Route::get('/report', function(){
    return view('report');
});
Route::get('/CustomerAddADesign-display',function(){
    return view('CustomerAddADesign-display');
});
Route::get('/CustomerHome', function(){
    return view('CustomerHome');
});
Route::get('/CustomerHotOrder-display', function(){
    return view('CustomerHotOrder-display');
});
Route::get('/CustomerMyDesignOrder-display', function(){
    return view('CustomerMyDesignOrder-display');
});
Route::get('/CustomerNewDesigns', function(){
    return view('CustomerNewDesigns');
});
Route::get('/CustomerNewOrder-display', function(){
    return view('CustomerNewOrder-display');
});
Route::get('/CustomerOrder-display', function(){
    return view('CustomerOrder-display');
});
Route::get('/CustomerOrder', function(){
    return view('CustomerOrder');
});
Route::get('/CustomerProductClicked-display', function(){
    return view('CustomerProductClicked-display');
});
Route::get('/CustomerProfile', function(){
    return view('CustomerProfile');
});
Route::get('/empty', function(){
    return view('empty');
});
Route::get('/imageSlider', function(){
    return view('imageSlider');
});
Route::get('/LandingPage', function(){
    return view('LandingPage');
});
Route::get('/login', function(){
    return view('login');
});
Route::get('/registerlogin', function(){
    return view('registerlogin');
});