<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CustomerDisplayController extends Controller
{
    public function CustomerDisplay(){
        $product = DB::table('product_with_sizes')
            ->select('productId', 'name', 'productImg', 'status')
            ->where('status', 'display')
            ->get();
        $productCount = DB::table('products')->count();
        return view('CustomerHome', compact('product', 'productCount'));
    }
}
