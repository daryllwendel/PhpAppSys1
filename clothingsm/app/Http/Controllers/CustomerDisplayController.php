<?php

namespace App\Http\Controllers;

use id;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CustomerDisplayController extends Controller

{
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
   public function CustomerDisplay() {
    // Most ordered products with status 'display' and delivered
    $hotDesigns = DB::table('vwordersummary')
    ->select(
        'productId',
        'name',
        'productImg',
        'status',
        'totalItemPrice',
        DB::raw('COUNT(DISTINCT orderId) as totalOrders')
    )
    ->where('status', 'display')
    ->where('deliveryStatus', 'delivered')
    ->groupBy('productId', 'name', 'productImg', 'status')
    ->orderByDesc('totalOrders')
    ->limit(10)
    ->get();
    $noorders =DB::table('vwproduct_with_sizes')
        ->where('status', 'display')
        ->groupBy('productId') 
        ->get();


    $newdesign = DB::table('vwproduct_with_sizes')
        ->where('status', 'display')
        ->orderBy('dateCreated', 'desc')
        ->groupBy('productId') 
        ->get();


    $productCount = DB::table('tblproducts')->count();

    return view('CustomerHome', compact('hotDesigns', 'newdesign', 'productCount','noorders'));
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

        $selectAll = DB::table('vwproduct_with_sizes')
        ->where('status', 'display')
        ->orderBy('dateCreated', 'desc')
        ->groupBy('productId') 
        ->get();

    return view('CustomerHotOrder-display', compact('mydesign2', 'selectAll'));
}

public function newdesign(){
    $newdesign = DB::table('vwproduct_with_sizes')
        ->where('status', 'display')
        ->orderBy('dateCreated', 'desc')
        ->groupBy('productId') 
        ->get();

    return view('CustomerNewOrder-display', compact('newdesign'));
}



}
