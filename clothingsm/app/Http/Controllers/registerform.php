<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;


class registerform extends Controller
{

    public function customerDashboard(){
        $user = Auth::user();
        return view('CustomerDashboard', compact('user'));
    }

    public function customerProfile(){
        $user = Auth::user();
        $name = $user->name;
        $username = $user->username;
        $mobile_number = $user->mobile_number;
        $email = $user->email;
        $id = $user->id;
        return view('CustomerProfile', compact('name', 'username','mobile_number','email','id'));
    }
    

    public function login(Request $request){
        $field = $request->validate([
            'loginname'=> 'required',
            'loginpassword'=> 'required'
        ]);

        if(Auth::attempt(['username' => $field['loginname'], 'password' => $field['loginpassword']])) {
            $request->session()->regenerate();
            $user = Auth::user();
            $customerName = $user->name;
            session(['customer-name' => $customerName]);
            return redirect('/CustomerDashboard');
        }
        if ($field['loginname'] === 'Admin' && $field['loginpassword'] === 'password123') {
            $request->session()->regenerate();
            return redirect('/dashboard');
        }
        return redirect('/login');
    }

    public function registerform(Request $request){
        $field = $request->validate([
            'username' =>['required', 'min:4', 'max:15'],
            'name' => ['required'],
            'email' => ['required','email', Rule::unique('users', 'email')],
            'mobile_number'=>['required', 'min:11', 'max:11'],
            'password' =>  ['required', 'min:8', 'max:200']
        ]);
        $field['password'] = bcrypt($field['password']);
        $user = User::create($field);
        Auth::login($user);
        return redirect('/login');
    }
}
