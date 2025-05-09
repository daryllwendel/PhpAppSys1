<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminDashboardController extends Controller
{    

    public function deleteproduct(Request $request){
        try {
            $field = $request->validate([
                'productId' => 'required',
            ]);
            
            $product = Product::where('productId', $field['productId'])->first();
            if(!$product) {
                return redirect()->back()->with('error', 'Product not found');
            }

            if($product->productImg) {
                Storage::disk('public')->delete($product->productImg);
            }

            $product->delete();
            return redirect()->back()->with('success', 'Product deleted successfully');
        } catch(\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }

    public function editProduct(Request $request) {
        try {
            $field = $request->validate([
                'productId' => 'required',
                'editProductImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'editName' => 'required|string',
                'editPrice' => 'required|numeric',
                'edittype1' => 'required|string',
                'printType1'=> 'required|string',
                'sizes' => 'required|array',
                'sizes.*' => 'required|string'
            ]);
            
            $product = Product::where('productId', $field['productId'])->first();
            
            if (!$product) {
                return redirect('/dashboard')->with('error', 'Product not found.');
            }
            
            DB::beginTransaction();
            
            try {
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

                // Delete existing sizes
                ProductSize::where('product_id', $product->productId)->delete();

                // Add new sizes
                foreach($field['sizes'] as $size) {
                    ProductSize::create([
                        'product_id' => $product->productId,
                        'size' => $size
                    ]);
                }
                
                DB::commit();
                return redirect('/dashboard')->with('success', 'Product updated successfully.');
            } catch(\Exception $e) {
                DB::rollback();
                if(isset($path)) {
                    Storage::disk('public')->delete($path);
                }
                throw $e;
            }
        } catch(\Exception $e) {
            return redirect('/dashboard')->with('error', 'Failed to update product: ' . $e->getMessage());
        }
    } 
    
    public function productid() {
        try {
            $products = Product::with('sizes')->get();
            $count = Product::max('productId') ?? 0;
            DB::statement("ALTER TABLE products AUTO_INCREMENT = " . ($count + 1));
            return view('product', compact('products', 'count'));
        } catch(\Exception $e) {
            return redirect()->back()->with('error', 'Failed to fetch products: ' . $e->getMessage());
        }
    }
    
    public function adddesign(Request $request) {
        try {
            $field = $request->validate([
                'name' => 'required',
                'price' => 'required|numeric|min:0',
                'type' => 'required|string',
                'printType' => 'required|string',
                'productImg' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'sizes' => 'required|array',
                'sizes.*' => 'required|string'
            ]);

            $path = $request->file('productImg')->store('profiles', 'public');
            $field['productImg'] = $path;

            DB::beginTransaction();

            try {
                $product = Product::create([
                    'name' => $field['name'],
                    'price' => $field['price'], 
                    'type' => $field['type'],
                    'printType' => $field['printType'],
                    'productImg' => $field['productImg']
                ]);

                if (!$product) {
                    throw new \Exception('Failed to create product');
                }

                foreach($field['sizes'] as $size) {
                    $productSize = ProductSize::create([
                        'product_id' => $product->productId,
                        'size' => $size
                    ]);

                    if (!$productSize) {
                        throw new \Exception('Failed to create product size');
                    }
                }

                DB::commit();
                return redirect('/dashboard')->with('success', 'Product and sizes added successfully');

            } catch (\Exception $e) {
                DB::rollback();
                if (isset($path)) {
                    Storage::disk('public')->delete($path);
                }
                throw $e;
            }

        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', 'Failed to add product: ' . $e->getMessage());
        }
    }

}
