<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\carts;
use App\Models\cartitems;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class AddtoCartController extends Controller
{
    public function displaycart() {
        $customerId = Auth::id(); 
    
        $order_items = DB::table('vwcartdetails')
            ->where('customerId', $customerId)
            ->get();
    
        return view('CustomerAddtoCart', compact('order_items'));
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
    public function editcart(Request $request){

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

}
