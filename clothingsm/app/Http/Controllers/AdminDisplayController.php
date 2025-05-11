<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminDisplayController extends Controller
{
    public function dashboardDisplay() {
        $product = DB::table('tblproducts')
            ->select('productId', 'name', 'productImg')
            ->get();
        $productCount = DB::table('tblproducts')->count();
        $orders = DB::table('tblorders')->count();

       
        return view('dashboarddisplay', compact('product', 'productCount', 'orders'));
    }
}
