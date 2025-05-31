<?php

namespace App\Http\Controllers;

use App\Models\orders;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class Search extends Controller
{
 public function search(Request $request)
{
    $query = $request->input('query');

    $products = Product::where('name', 'like', "%{$query}%")
        ->orWhere('productId', 'like', "%{$query}%")
        ->orWhere('printType', 'like', "%{$query}%")
        ->orWhere('status', 'like', "%{$query}%")
        ->orWhere('viewStatus', 'like', "%{$query}%")
        ->orWhere('type', 'like', "%{$query}%")
        ->get();

    

    return response()->json(['products' => $products]);
}

public function searchorder(Request $request)
{
    $query = $request->input('query');

    $orders = DB::table('vwordersummary')
        ->where(function ($q) use ($query) {
            $q->where('orderId', 'like', "%{$query}%")
              ->orWhere('paymentMethod', 'like', "%{$query}%")
               ->orWhere('name', 'like', "%{$query}%")
              ->orWhere('dateOrdered', 'like', "%{$query}%")
              ->orWhere('deliveryStatus', 'like', "%{$query}%");
        })
        ->get();

    return response()->json(['orders' => $orders]);
}


public function searchReports(Request $request)
{
    $query = $request->input('query');

    $data = DB::table('vwordersummary')
        ->where('name', 'like', "%{$query}%")
        ->orWhere('paymentMethod', 'like', "%{$query}%")
        ->orWhere('orderId', 'like', "%{$query}%")
        ->orWhere('dateOrdered', 'like', "%{$query}%")
        ->get();

    return response()->json(['groupedData' => $data]);
}




}
