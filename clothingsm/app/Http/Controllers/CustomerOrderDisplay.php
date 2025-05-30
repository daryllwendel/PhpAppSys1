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
                'charge',
                'type',
                'productId',
                'quantity',
                'productImg',
                'size',
                'paymentName',
                'bankName',
                'accountNumber',
                DB::raw('SUM(quantity * unitPrice) as totalItemPrice'),
                DB::raw('SUM(quantity) as totalQuantity'),
                DB::raw('MAX(deliveryStatus) as deliveryStatus'),
                DB::raw('SUM(quantity * unitPrice) + charge as grandTotal')
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
                'charge',
                'type',
                'productId',
                'quantity',
                'productImg',
                'size',
                'paymentName',
                'bankName',
                'accountNumber',
                DB::raw('MAX(dateOrdered) as orderDate'),
                DB::raw('SUM(quantity * unitPrice) as totalItemPrice'),
                DB::raw('SUM(quantity) as totalQuantity'),
                DB::raw('MAX(deliveryStatus) as deliveryStatus'),
                DB::raw('SUM(quantity * unitPrice) + charge as grandTotal')
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
                'productImg','charge',
                'type',
                'productId',
                'quantity',
                'productImg',
                'size',
                'paymentName',
                'bankName',
                'accountNumber',
                DB::raw('SUM(quantity * unitPrice) as totalItemPrice'),
                DB::raw('SUM(quantity) as totalQuantity'),
                DB::raw('MAX(deliveryStatus) as deliveryStatus'),
                DB::raw('SUM(quantity * unitPrice) + charge as grandTotal')
            )
            ->where('deliveryStatus', 'delivered')
            ->where('customerId', $customerId)
            ->groupBy('orderId')
            ->orderBy('orderId', 'desc')
            ->get();
            $cancelOrders = DB::table('vwordersummary')
            ->select(
                'ProductName',
                'paymentMethod',
                'orderId',
                'productImg','charge',
                'type',
                'productId',
                'quantity',
                'productImg',
                'size',
                'paymentName',
                'bankName',
                'accountNumber',
                DB::raw('SUM(quantity * unitPrice) as totalItemPrice'),
                DB::raw('SUM(quantity) as totalQuantity'),
                DB::raw('MAX(deliveryStatus) as deliveryStatus'),
                DB::raw('SUM(quantity * unitPrice) + charge as grandTotal')
            )
            ->where('deliveryStatus', 'cancelled')
            ->where('customerId', $customerId)
            ->groupBy('orderId')
            ->orderBy('orderId', 'desc')
            ->get();
        return view('CustomerOrder-display', compact('pendingOrders','completedOrders','shippedOrders','cancelOrders'));
    }
    
}
