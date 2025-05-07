<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminDashboardController extends Controller
{    

    public function deleteproduct(Request $request){
        $field = $request->validate([
            'productId' => 'required',
        ]);
        $product = Product::where('productId', $field['productId'])->first();
        $product->delete();
        return redirect()->back();
    }
   public function editProduct(Request $request) {
    // Validate the form data
    $field = $request->validate([
        'productId' => 'required',
        'editProductImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'editName' => 'required|string',
        'editPrice' => 'required|numeric',
        'edittype1' => 'required|string',
        'printType1'=> 'required|string',
    ]);
    
    $product = Product::where('productId', $field['productId'])->first();
    
    if (!$product) {
        return redirect('/dashboard')->with('error', 'Product not found.');
    }
    
    if ($request->hasFile('editProductImage')) {
        if ($product->productImg) {
            Storage::disk('public')->delete($product->productImg);
        }
        
        $path = $request->file('editProductImage')->store('profiles', 'public');
        $product->productImg = $path;
    }
    
    $product->name = $field['editName'];
    $product->price = $field['editPrice'];
    $product->type = $field['edittype1'];
    $product->printType = $field['printType1'];
    $product->save();
    
    return redirect('/dashboard')->with('success', 'Product updated successfully.');
}
    
    public function productid() {
        $products = DB::table('products')->get();
        $count = DB::table('products')->count();
        return view('product', compact('products', 'count'));
    }
    

    public function adddesign(Request $request) {
        $field = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'type' => 'required',
            'printType' => 'required',
            'productImg' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $path = $request->file('productImg')->store('profiles', 'public');
        $field['productImg'] = $path;
        Product::create($field);
        return redirect('/dashboard');
    }
}
