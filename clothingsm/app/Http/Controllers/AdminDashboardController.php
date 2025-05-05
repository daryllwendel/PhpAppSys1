<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AdminDashboardController extends Controller
{
   public function productid(){
    $count = DB::table('products')->count();
    return view('product',compact('count'));
   }

   public function adddesign(Request $request){
        $field= $request->validate([
            'name' => 'required',
            'price' => 'required',
        ]);
        product::create($field);
        dd($request->all()); // This will show submitted data
        return redirect('/dashboard');
   }

}
