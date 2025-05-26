<?php

namespace App\Http\Controllers;

use id;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
 
    public function mydesign(Request $request){
        $customerId = Auth::id(); 
        $mydesign = DB::table('vwproduct_with_sizes')
        ->where('customerId', $customerId)
        ->groupBy('productId')
        ->get();
        return view('CustomerMyDesignOrder-display', compact('mydesign'));
    }
  public function hotdesign()
{
    $customerId = Auth::id();

    $subquery = DB::table('vwProductsWithOrders')
        ->select('productId', DB::raw('COUNT(orderItemId) as occurrences'))
        ->where('status', 'display')
        ->whereNotNull('orderItemId') 
        ->groupBy('productId');

    $mydesign2 = DB::table('vwProductsWithOrders as v')
        ->leftJoinSub($subquery, 'counts', function ($join) {
            $join->on('v.productId', '=', 'counts.productId');
        })
        ->where('v.status', 'display')
        ->select(
            'v.productId',
            'v.name',
            'v.type',
            'v.price',
            'v.printType',
            'v.productImg',
            'v.status',
            DB::raw('MAX(counts.occurrences) as occurrences') 
        )
        ->groupBy('v.productId', 'v.name', 'v.type', 'v.price', 'v.printType', 'v.productImg', 'v.status')
        ->orderByDesc('occurrences')
        ->get();

    return view('CustomerHotOrder-display', compact('mydesign2'));
}


}
