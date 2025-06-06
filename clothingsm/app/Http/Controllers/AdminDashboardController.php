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
            $product->sizes()->delete();
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
            'sizes.*' => 'nullable|string',
            'status' => 'nullable|string|in:display,hidden'
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

            if (array_key_exists('editName', $field)) {
                $product->name = $field['editName'];
            }
            if (array_key_exists('editPrice', $field)) {
                $product->price = $field['editPrice'];
            }
            if (array_key_exists('edittype1', $field)) {
                $product->type = $field['edittype1'];
            }
            if (array_key_exists('printType1', $field)) {
                $product->printType = $field['printType1'];
            }
            if (array_key_exists('status', $field)) {
                $product->status = $field['status'];
            }

            $product->save();

            if (!empty($field['sizes'])) {
                $sizesInOrders = DB::table('tblorder_items')
                    ->where('productId', $product->productId)
                    ->pluck('size')
                    ->toArray();

                foreach ($product->sizes() as $sizeModel) {
                    if (!in_array($sizeModel->size, $sizesInOrders)) {
                        $sizeModel->delete();
                    }
                }

                foreach ($field['sizes'] as $size) {
                    if (!$product->sizes()->where('size', $size)->exists()) {
                        ProductSize::create([
                            'product_id' => $product->productId,
                            'size' => $size,
                        ]);
                    }
                }
            }
            
            DB::commit();

            return redirect('/dashboard')->with('success', 'Product updated successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }
            throw $e;
        }
    } catch (\Exception $e) {
        return redirect('/dashboard')->with('error', 'Failed to update product: ' . $e->getMessage());
    }
}


    public function productid() {
        try {
            $products = DB::table('vwproduct_with_sizes')
                ->select('productId', 'name', 'type', 'price', 'printType', 'productImg', 'status','viewStatus')
                ->distinct()
                ->get();
            $size = DB::table('vwproduct_with_sizes')->select('size')->get();
            $count = DB::table('tblproducts')->max('productId') ?? 0;
            DB::statement("ALTER TABLE tblproducts AUTO_INCREMENT = " . ($count + 1));
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
                    'status' => 'display',
                    'viewStatus' => 'approved'
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

    
 public function approve(Request $request)
{
    $field = $request->validate([
        'productId' => 'required'
    ]);

    DB::table('tblproducts')
        ->where('productId', $field['productId'])
        ->update(['viewStatus' => 'approved']);

    return redirect('/dashboard');
}

}
