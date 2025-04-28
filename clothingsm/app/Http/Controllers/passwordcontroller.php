<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use function Laravel\Prompts\alert;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class passwordcontroller extends Controller
{
        public function changepass(Request $request)
    {
        $field = $request->validate([
            'newpass' => 'required',
            'renewpass' => 'required',
            'currpass' => 'required'
        ]);

        $user = Auth::user();


        $user->password = Hash::make($field['newpass']);
        $user->save();

        return redirect('/CustomerDashboard');
    }


}
