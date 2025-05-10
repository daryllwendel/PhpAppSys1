<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
                'editName' => 'nullable|string',
                'editPrice' => 'nullable|numeric',
                'edittype1' => 'nullable|string', 
                'printType1' => 'nullable|string',
                'sizes' => 'nullable|array',
                'sizes.*' => 'nullable|string|in:XS,S,M,L,XL,XXL',
                'status' => 'nullable|string|in:display,hidden'
            ]);
            
            $product = Product::where('productId', $field['productId'])->first();
            
            if (!$product) {
                return redirect('/dashboard')->with('error', 'Product not found.');
            }
            
            DB::beginTransaction();
            
            try {
                // Only update fields that were actually changed
                if ($request->hasFile('editProductImage')) {
                    if ($product->productImg) {
                        Storage::disk('public')->delete($product->productImg);
                    }
                    $path = $request->file('editProductImage')->store('profiles', 'public');
                    $product->productImg = $path;
                }
                
                if ($field['editName']) {
                    $product->name = $field['editName'];
                }
                if ($field['editPrice']) {
                    $product->price = $field['editPrice'];
                }
                if ($field['edittype1']) {
                    $product->type = $field['edittype1'];
                }
                if ($field['printType1']) {
                    $product->printType = $field['printType1'];
                }
                if ($field['status']) {
                    $product->status = $field['status'];
                }
                $product->save();

                // Always update sizes if provided
                if (!empty($field['sizes'])) {
                    // Delete existing sizes
                    ProductSize::where('product_id', $product->productId)->delete();

                    // Add new sizes
                    foreach($field['sizes'] as $size) {
                        ProductSize::create([
                            'product_id' => $product->productId,
                            'size' => $size
                        ]);
                    }
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
            $products = DB::table('product_with_sizes')
                ->select('productId', 'name', 'type', 'price', 'printType', 'productImg', 'status')
                ->distinct()
                ->get();
            $size = DB::table('product_with_sizes')->select('size')->get();
            $count = DB::table('products')->max('productId') ?? 0;
            DB::statement("ALTER TABLE products AUTO_INCREMENT = " . ($count + 1));
            return view('product', compact('products', 'count'));
        } catch(\Exception $e) {
            dd($e->getMessage()); 
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
                'sizes.*' => 'required|string',
            ]);

            $path = $request->file('productImg')->store('profiles', 'public');
            $field['productImg'] = $path;

            DB::beginTransaction();

            try {
                // Log the actual status value being received
                Log::info('Status value from request: ' . $request->status);

                // Ensure status is explicitly set from request
                $status = $request->status;
                if (!$status) {
                    $status = 'display'; // Fallback default if somehow empty
                }

                $product = Product::create([
                    'name' => $field['name'],
                    'price' => $field['price'], 
                    'type' => $field['type'],
                    'printType' => $field['printType'],
                    'productImg' => $field['productImg'],
                    'status' => 'display' 
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
                return redirect('/dashboard')->with('success', 'Product and sizes added successfully with status: ' . $status);

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
