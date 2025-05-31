<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\carts;
use App\Models\orders;
use App\Models\cartitems;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class AddtoCartController extends Controller
{
    public function displaycart(Request $request) {
        
        $customerId = Auth::id(); 
        $paymentname = DB::table('tblpayment_methods')->get();
        $order_items = DB::table('vwcartdetails')
            ->where('customerId', $customerId)
            ->where('status', 'available')
            ->get();
    
        return view('CustomerAddtoCart', compact('order_items', 'paymentname'));
    }

    public function addtocart(Request $request){
        $field = $request->validate([
            'customerId' => 'required',
            'productId' => 'required',
            'price' => 'required',
        ]);
        DB::beginTransaction();

        try{
            $cart = carts::create([
                'customerId' => $field['customerId'],
                'subTotal'=> 0
            ]);
            cartitems::create([
                'cart_id' => $cart->cart_id,
                'product_id' => $field['productId'],
                'quantity' => 0,
                'price' => $field['price'],
            ]);
            
            DB::commit();
        }catch(\Exception $e) {
            DB::rollBack();
            dd('field');
            dd($e);
            Log::error('Failed to add cart: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to add cart: ' . $e->getMessage());
        }
        
        return redirect()->back()->with('success', 'Product added to cart successfully');
    }
public function deletecart(Request $request)
{
    try {
        $fields = $request->validate([
            'productId' => 'required',
        ]);

        $deleted = cartitems::where('product_id', $fields['productId'])->delete();

        if ($deleted === 0) {
            return redirect()->back()->with('error', 'Product not found in cart');
        }

        return redirect()->back()->with('success', 'Product removed from cart successfully');
    } catch (\Exception $e) {
        Log::error('Cart delete error: ' . $e->getMessage());
        return redirect()->back()->with('error', 'Failed to remove product: ' . $e->getMessage());
    }
}

public function checkout(Request $request)
{
    $fields = $request->validate([
        'payment_method' => 'required',
        'order_items' => 'required|json',
        'grand_total' => 'required|numeric|min:0',
    ]);

    $orderItems = json_decode($fields['order_items'], true);

    if (!is_array($orderItems) || empty($orderItems)) {
        return redirect()->back()->with('error', 'Invalid order items.');
    }

    foreach ($orderItems as $item) {
        if (
            !isset($item['product_id'], $item['size'], $item['quantity'], $item['price']) ||
            !is_numeric($item['quantity']) || $item['quantity'] <= 0 ||
            !is_numeric($item['price']) || $item['price'] < 0
        ) {
            return redirect()->back()->with('error', 'Invalid order item details.');
        }
    }

    DB::beginTransaction();

    try {
        $order = orders::create([
            'customerId' => Auth::id(),
            'paymentMethodId' => $fields['payment_method'],
            'delivery_status' => 'pending',
        ]);

        foreach ($orderItems as $item) {
            OrderItem::create([
                'orderId' => $order->orderId,
                'productId' => $item['product_id'],
                'size' => $item['size'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
            cartitems::where('product_id', $item['product_id'])->update(['status' => 'sold']);
        }  

        DB::commit();
        return redirect('/CustomerDashboard')->with('success', 'Order placed!');
    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Failed to place order: ' . $e->getMessage());
        dd($e);
        return redirect()->back()->with('error', 'Failed to place order. Please try again.');
    }
}

public function cancelorder(){
    try {
        $customerId = Auth::id();
        $order = orders::where('customerId', $customerId)
            ->where('deliveryStatus', 'pending')
            ->first();

        if (!$order) {
            return redirect()->back()->with('error', 'No pending order found.');
        }

        // Update the order status to 'cancelled'
        $order->update(['deliveryStatus' => 'cancelled']);


        return redirect()->back()->with('success', 'Order cancelled successfully.');
    } catch (Exception $e) {
        Log::error('Failed to cancel order: ' . $e->getMessage());
        return redirect()->back()->with('error', 'Failed to cancel order: ' . $e->getMessage());
    }
}

}
