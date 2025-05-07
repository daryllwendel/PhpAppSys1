<?php


use App\Http\Controllers\addressform;
use App\Http\Controllers\AdminDashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\registerform;

use function Laravel\Prompts\password;
use App\Http\Controllers\passwordcontroller;

Route::get('/', function(){
    return view('LandingPage');
});
Route::get('/login', function () {
    return view('login');  
})->name('login');
Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');
Route::get('/dashboarddisplay', function () {
    return view('dashboarddisplay');
});
Route::get('/orders', function(){
    return view('orders');
});
Route::get('/product', [AdminDashboardController::class, 'productid'])->name('product');
Route::put('/product', [AdminDashboardController::class, 'editProduct']);
Route::delete('/deletedesign',[AdminDashboardController::class, 'deleteproduct']);

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
Route::middleware(['auth'])->group(function () {
    Route::get('/CustomerDashboard', [registerform::class, 'customerDashboard']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/CustomerProfile', [registerform::class, 'customerProfile']);
});

Route::post('/register', [registerform::class, 'registerform']);
Route::post('/login', [registerform::class, 'login'])->name('login');
Route::post('/location', [addressform::class,'locations']);
Route::post('/upload-profile', [addressform::class, 'profilepicture'])->name('user.upload');
Route::post('/changepass', [passwordcontroller::class, 'changepass'])->name('changepass');
Route::post('/adddesign', [AdminDashboardController::class, 'adddesign']);
// Route::post('/editdesign', [AdminDashboardController::class, 'editdesign'])->name('editdesign');
Route::post('/ajax/login', [registerform::class, 'ajaxLogin'])->name('ajax.login');
