<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminDisplayController extends Controller
{
    public function dashboardDisplay() {
        $product = DB::table('products')
            ->select('productId', 'name', 'productImg')
            ->get();
        $productCount = DB::table('products')->count();
        $orders = DB::table('orders')->count();

       
        return view('dashboarddisplay', compact('product', 'productCount', 'orders'));
    }
}
