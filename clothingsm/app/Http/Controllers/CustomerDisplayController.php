<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CustomerDisplayController extends Controller
{
    public function CustomerDisplay(){
        $product = DB::table('vwproduct_with_sizes')
            ->select('productId', 'name', 'productImg', 'status')
            ->where('status', 'display')
            ->get();
        $all = DB::table('vwproduct_with_sizes')
        ->select('productId', 'name', 'productImg', 'status', 'price', 'type', 'printType')
        ->where('status', 'display')
        ->get();
        $productCount = DB::table('tblproducts')->count();
        return view('CustomerHome', compact('product', 'productCount', 'all'));
    }

    public function LandingPageDisplay(){
        $product = DB::table('vwproduct_with_sizes')
            ->select('productId', 'name', 'productImg', 'status')
            ->where('status', 'display')
            ->get();
        $all = DB::table('vwproduct_with_sizes')
            ->select('productId', 'name', 'productImg', 'status', 'price', 'type', 'printType')
            ->where('status', 'display')
            ->get();
        $productCount = DB::table('tblproducts')->count();
        return view('LandingPage', compact('product', 'productCount', 'all'));
    }


}
