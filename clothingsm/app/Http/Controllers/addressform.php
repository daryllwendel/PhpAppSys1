<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use function Laravel\Prompts\alert;

class addressform extends Controller
{
    public function locations(Request $request){
        $field = $request->validate([
            'Purok' => 'required',
            'City' => 'required',
            'ZipCode' => 'required',
            'Baranggay' => 'required'
        ]);
    
        $user = Auth::user();

        $user->City = $field['City'];
        $user->ZipCode = $field['ZipCode'];
        $user->Baranggay = $field['Baranggay'];
        $user->Purok = $field['Purok'];

        $user->save();
        alert("Address is updated successfully");
        return redirect('/CustomerDashboard');
    }
}
