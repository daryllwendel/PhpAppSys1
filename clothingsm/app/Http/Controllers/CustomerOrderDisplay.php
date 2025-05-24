<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CustomerOrderDisplay extends Controller
{
    public function customerPendingOrders() {
        $customerId = Auth::id();
    
        $pendingOrders = DB::table('vwordersummary')
            ->select(
                'ProductName',
                'paymentMethod',
                'orderId',
                'productImg',
                DB::raw('MAX(dateOrdered) as orderDate'),
                DB::raw('SUM(quantity * unitPrice) as totalItemPrice'),
                DB::raw('SUM(quantity) as totalQuantity'),
                DB::raw('MAX(deliveryStatus) as deliveryStatus')
            )
            ->where('deliveryStatus', 'pending')
            ->where('customerId', $customerId)
            ->groupBy('orderId')
            ->orderBy('orderId', 'desc')
            ->get();

            $shippedOrders = DB::table('vwordersummary')
            ->select(
                'ProductName',
                'paymentMethod',
                'orderId',
                'productImg',
                DB::raw('MAX(dateOrdered) as orderDate'),
                DB::raw('SUM(quantity * unitPrice) as totalItemPrice'),
                DB::raw('SUM(quantity) as totalQuantity'),
                DB::raw('MAX(deliveryStatus) as deliveryStatus')
            )
            ->where('deliveryStatus', 'shipped')
            ->where('customerId', $customerId)
            ->groupBy('orderId')
            ->orderBy('orderId', 'desc')
            ->get();

            $completedOrders = DB::table('vwordersummary')
            ->select(
                'ProductName',
                'paymentMethod',
                'orderId',
                'productImg',
                DB::raw('MAX(dateOrdered) as orderDate'),
                DB::raw('SUM(quantity * unitPrice) as totalItemPrice'),
                DB::raw('SUM(quantity) as totalQuantity'),
                DB::raw('MAX(deliveryStatus) as deliveryStatus')
            )
            ->where('deliveryStatus', 'delivered')
            ->where('customerId', $customerId)
            ->groupBy('orderId')
            ->orderBy('orderId', 'desc')
            ->get();
        return view('CustomerOrder-display', compact('pendingOrders','completedOrders','shippedOrders'));
    }
    
}
