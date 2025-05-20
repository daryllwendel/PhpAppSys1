<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class AdminOrders extends Controller
{ 
    public function viewOrders(Request $request) {
        $ordersData = DB::table('vwordersummary')
        ->select(
            'ProductName',
            'paymentMethod',
            'orderId',
            'City',
            'Province',
            'Baranggay',
            'Purok',
            'ZipCode',
            'charge',
            'quantity',
            'orderId',
            'email',
            'username',
            'name',
            'contactNo',
            DB::raw('MAX(dateOrdered) as orderDate'),
            DB::raw('SUM(quantity * unitPrice) as totalItemPrice'),
            DB::raw('SUM(quantity) as totalQuantity'),
            DB::raw('MAX(deliveryStatus) as deliveryStatus'),
            DB::raw('SUM(charge + (quantity * unitPrice)) as totalCharge') 
        )
            ->where('deliveryStatus', 'pending')
            ->groupBy('orderId')
            ->get();
       
        return view('orders', compact('ordersData'));
    }
    public function acceptOrder(Request $request) {
        $field = $request->validate([
            'orderId' => 'required'
        ]);
        $orders = DB::table('vwordersummary')
        
        ->where('deliveryStatus', 'Pending')
        ->where('orderId', $field['orderId'])
        ->groupBy(
            'ProductName',
            'paymentMethod',
            'orderId',
            'City',
            'Province',
            'Barangay',
            'Purok',
            'ZipCode',
            'charge'
        )
        ->get();
        return view('orders', compact('orders'));
    }
    
}
