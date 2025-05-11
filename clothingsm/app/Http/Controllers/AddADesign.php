<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AddADesign extends Controller
{
    public function AddADesign(Request $request){
        Log::info('Customer ID from request: ' . $request->input('customerId'));
        Log::info('Auth ID: ' . Auth::id());

        $field = $request->validate([
            'type' => 'required',
            'name' => 'required', 
            'printType' => 'required',
            'sizes' => 'required|array', 
            'sizes.*' => 'required|string',
            'input-file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'customerId' => 'required',
        ]);

        Log::info('Validated data: ' . json_encode($field));

        DB::beginTransaction();

        try {
            $path = $request->file('input-file')->store('profiles', 'public');

            $product = Product::create([
                'type' => $field['type'],
                'name' => $field['name'],
                'printType' => $field['printType'], 
                'productImg' => $path,
                'customerId' => $field['customerId'],
                'price' => 0,
                'dateCreated' => now() 
            ]);

            foreach($field['sizes'] as $size) {
                ProductSize::create([
                    'product_id' => $product->productId,
                    'size' => $size
                ]);
            }

            DB::commit();
            return redirect()->back()->with('success', 'Design added successfully');

        } catch(\Exception $e) {
            DB::rollBack();
            if(isset($path)) {
                Storage::disk('public')->delete($path);
            }
            Log::error('Failed to add design: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to add design: ' . $e->getMessage());
        }
    }

    public function myDesignOrder(){
        $all = DB::table('vwproduct_with_sizes')->get();
        return view('CustomerMyDesignOrder-display', compact('all'));
    }
}
