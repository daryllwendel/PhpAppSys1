<?php

use App\Models\User;
use App\Http\Controllers\AddADesign;
use App\Http\Controllers\addressform;
use App\Http\Controllers\AdminOrders;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\registerform;
use function Laravel\Prompts\password;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\ForgotPassword;
use App\Http\Controllers\CustomerDisplay;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\passwordcontroller;
use App\Http\Controllers\AddtoCartController;
use App\Http\Controllers\CustomerOrderDisplay;
use App\Http\Controllers\AdminDisplayController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CustomerDisplayController;
use App\Http\Controllers\Search;

Route::get('/send-otp-ui', function () {
    return view('CustomerForgot-password');
});

Route::get('/CustomerForgot-password', function () {
    return view('CustomerForgot-password');
});
Route::get('/search-products', [Search::class, 'search']);
Route::get('/search-products', [Search::class,'searchorder']);



Route::post('/reset-password', [ForgotPassword::class, 'forgotpassword']);
Route::get('/', [CustomerDisplayController::class, 'LandingPageDisplay']);
Route::get('/login', function () {
    return view('login');
})->name('login');

Route::get('/loading',function (){
    return view('loading');
})->name('loading');
 
Route::get('/dashboarddisplay',[AdminDisplayController::class, 'dashboardDisplay'])->name('dashboarddisplay');
Route::get('/api/dashboard-chart-data', [AdminDisplayController::class, 'getChartData']);

Route::get('/orders', [AdminOrders::class, 'viewOrders'])->name('orders');
Route::post('/orders', [AdminOrders::class, 'acceptOrder'])->name('orders');
Route::put('/acceptorder',[AdminOrders::class, 'acceptorders'])->name('orders');
Route::put('/completeorder',[AdminOrders::class,'completeorders'])->name('orders');
Route::get('/product', [AdminDashboardController::class, 'productid'])->name('product');
Route::put('/products', [AdminDashboardController::class, 'editProduct']);
Route::put('/approve', [AdminDashboardController::class, 'approve']);
Route::delete('/deletedesign',[AdminDashboardController::class, 'deleteproduct']);

Route::get('/report', [ReportController::class, 'salesReport'])->name('sales.report');
Route::get('/api/sales-report', [ReportController::class, 'getSalesReport']);
// Route::get('/report', function(){
//     return view('report');
// });

Route::get('/CustomerAddADesign-display', function() {
    return view('CustomerAddADesign-display');
})->name('CustomerAddADesign-display');

Route::get('/CustomerHome',[CustomerDisplayController::class, 'CustomerDisplay'])->name('CustomerHome');
Route::delete('/deletecart',[AddtoCartController::class, 'deletecart']);

Route::get('/CustomerHotOrder-display', function(){
    return view('CustomerHotOrder-display');
});
Route::get('/CustomerMyDesignOrder-display',[CustomerDisplayController::class, 'mydesign'])->name('CustomerMyDesignOrder-display');
Route::get('/CustomerHotOrder-display',[CustomerDisplayController::class, 'hotdesign'])->name('CustomerHotOrder-display');
Route::get('/CustomerNewOrder-display',[CustomerDisplayController::class, 'newdesign'])->name('CustomerNewOrder-display');
Route::get('/CustomerNewDesigns', function(){
    return view('CustomerNewDesigns');
});
Route::get('/CustomerAddtoCart', [AddtoCartController::class, 'displaycart'])->middleware('auth')->name('CustomerAddtoCart');
Route::post('/checkout', [AddtoCartController::class, 'checkout'])->middleware('auth')->name('CustomerAddtoCart');

Route::get('/CustomerOrder-display', [CustomerOrderDisplay::class, 'customerPendingOrders'])->middleware('auth')->name('CustomerOrder-display');
Route::get('/CustomerProductClicked-display', function(){
    return view('CustomerProductClicked-display');
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
    Route::get('/dashboard',[registerform::class, 'admindashboard']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/CustomerProfile', [registerform::class, 'customerProfile']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/AdminProfile', [registerform::class, 'adminProfile']);
});

Route::post('/logout', [registerform::class, 'logout']);


Route::post('/register', [registerform::class, 'registerform']);
Route::post('/login', [registerform::class, 'login'])->name('login');
Route::post('/location', [addressform::class,'locations']);
Route::post('/upload-profile', [addressform::class, 'profilepicture'])->name('user.upload');
Route::post('/changepass', [passwordcontroller::class, 'changepass'])->name('changepass');
Route::post('/adddesign', [AdminDashboardController::class, 'adddesign']);
Route::post('/addtocart',[AddtoCartController::class, 'addtocart']);

Route::middleware(['auth'])->group(function () {
Route::post('/addadesign', [AddADesign::class, 'AddADesign']);
});

Route::post('/ajax/login', [registerform::class, 'ajaxLogin'])->name('ajax.login');

// Route::get('/AdminProfile', function () {
//     return view('AdminProfile');
// });