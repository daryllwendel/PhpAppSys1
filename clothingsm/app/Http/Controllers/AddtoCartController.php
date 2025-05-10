<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrdersItem;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Container\Attributes\Log;

class AddtoCartController extends Controller
{
    public function addtocart(){
        // Get the currently logged in customer's ID
        $customerId = Auth::user()->customerId;

        // First check if there's a pending order for this customer
        $pendingOrder = Order::where('customerId', $customerId)
            ->where('deliveryStatus', 'pending')
            ->first();

        if (!$pendingOrder) {
            // If no pending order exists, return empty cart view
            return view('CustomerAddtoCart', ['order_items' => collect()]);
        }

        $order_items = OrdersItem::join('products', 'order_items.productId', '=', 'products.productId')
            ->join('orders', 'order_items.orderId', '=', 'orders.orderId')
            ->join('product_sizes', function($join) {
                $join->on('products.productId', '=', 'product_sizes.product_id')
                     ->on('order_items.size', '=', 'product_sizes.size');
            })
            ->where('orders.customerId', $customerId)
            ->where('orders.deliveryStatus', 'pending')
            ->select('order_items.*', 'products.*', 'product_sizes.size')
            ->get();

        // Debug output
        \Log::info('Customer ID: ' . $customerId);
        \Log::info('Order Items Count: ' . $order_items->count());
        \Log::info('Order Items: ', $order_items->toArray());

        return view('CustomerAddtoCart', ['order_items' => $order_items]);
    }
}
