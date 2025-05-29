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
        $orders = DB::table('tblorders')
        ->where('deliveryStatus', 'delivered')
        ->count();

        $reports = DB::table('vwordersummary')
        ->select(
            'ProductName',
            'paymentMethod',
            'orderId',
            'charge',
            'quantity',
            'orderId',
            DB::raw('SUM(charge + (quantity * unitPrice)) as totalCharge') 
        )
            ->where('deliveryStatus', 'delivered')
            ->get();


        $chartReports = DB::table('vwordersummary')
            ->select(
                'ProductName',
                DB::raw('SUM(quantity) as totalQuantity'),
                DB::raw('SUM(charge + (quantity * unitPrice)) as totalSales')
            )
            ->where('deliveryStatus', 'delivered')
            ->groupBy('ProductName')
            ->get();

        return view('dashboarddisplay', compact(
            'product',
            'productCount',
            'orders',
            'reports',         
            'chartReports'     
        ));
    }

    public function getChartData()
{
    $chartReports = DB::table('vwordersummary')
        ->select('ProductName', DB::raw('SUM(quantity) as totalQuantity'), DB::raw('SUM(totalItemPrice) as totalSales'))
        ->where('deliveryStatus', 'delivered')
        ->groupBy('ProductName')
        ->get();

    return response()->json([
        'labels' => $chartReports->pluck('ProductName'),
        'quantities' => $chartReports->pluck('totalQuantity'),
        'sales' => $chartReports->pluck('totalSales'),
    ]);
}
}
