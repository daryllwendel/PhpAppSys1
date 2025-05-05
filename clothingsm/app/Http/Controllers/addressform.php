<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use function Laravel\Prompts\alert;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class addressform extends Controller
{
    public function locations(Request $request){
        $field = $request->validate([
            'Province' => 'required',
            'Purok' => 'required',
            'City' => 'required',
            'ZipCode' => 'required',
            'Baranggay' => 'required'
        ]); 
        $user = Auth::user();

        $user->Province = $field['Province'];
        $user->City = $field['City'];
        $user->ZipCode = $field['ZipCode'];
        $user->Baranggay = $field['Baranggay'];
        $user->Purok = $field['Purok'];

        $user->save();
        return redirect('/CustomerDashboard');
    }

    public function profilepicture(Request $request){
        $request->validate([
            'profilepic' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $path = $request->file('profilepic')->store('profiles', 'public');

        $user = Auth::user();

        if ($user->profileh) {
            Storage::disk('public')->delete($user->profile);
        }
        $user->profile = $path;
        $user->save();
        return back()->with('success', 'Image uploaded!');
    }

    public function changepass(Request $request){
       $field = $request->validate([
            'newpass' => 'required',
            'renewpass' => 'required',
            'currpass' => 'required'
        ]);
        $user = Auth::user();

        $user->password = $field['newpass'];

        $user->save();
        return redirect('/CustomerDashboard');
    }
}
