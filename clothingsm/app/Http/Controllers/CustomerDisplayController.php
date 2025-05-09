<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CustomerDisplayController extends Controller
{
    public function CustomerDisplay(){
        $product = DB::table('products')
        ->select('productId', 'name', 'productImg')
        ->get();
        $productCount = DB::table('products')->count();
        return view('CustomerHome', compact('product', 'productCount'));
    }
}
