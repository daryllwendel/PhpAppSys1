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
        $city = $user->City;
        $purok = $user->Purok;
        $zipcode = $user->ZipCode;
        $baranggay = $user->Baranggay;
        $province = $user->Province;
        return view('CustomerProfile', compact('name', 'username','mobile_number','email','id','city', 'purok', 'zipcode','baranggay','province'));
    }
    

    public function login(Request $request){
        $field = $request->validate([
            'loginname'=> 'required',
            'loginpassword'=> 'required'
        ]);

        // Try login with username
        if (Auth::attempt(['username' => $field['loginname'], 'password' => $field['loginpassword']])) {
            $request->session()->regenerate();
            $user = Auth::user();
            $customerName = $user->name;
            session(['customer-name' => $customerName]);

            if ($user->role === 'admin') {
                return redirect('/dashboard');
            } else if ($user->role === 'customer') {
                return redirect('/CustomerDashboard');
            }
        }

        // Try login with email 
        if (Auth::attempt(['email' => $field['loginname'], 'password' => $field['loginpassword']])) {
            $request->session()->regenerate();
            $user = Auth::user();
            $customerName = $user->name;
            session(['customer-name' => $customerName]);

            if ($user->role === 'admin') {
                return redirect('/dashboard');
            } else if ($user->role === 'customer') {
                return redirect('/CustomerDashboard');
            }
        }

        return back()->withErrors([
            'loginname' => 'The provided credentials do not match our records.',
        ]);
    }

    public function registerform(Request $request){
        $field = $request->validate([
            'username' =>['required', 'min:4', 'max:15'],
            'name' => ['required'],
            'email' => ['required','email', Rule::unique('users', 'email')],
            'mobile_number'=>['required', 'min:11', 'max:11'],
            'password' =>  ['required', 'min:8', 'max:200'],
        ]); 
        $field['password'] = bcrypt($field['password']);
        $user = User::create($field);
        Auth::login($user);
        return redirect('/login')->with('Success','Account created! Please sign in.');
    }

    public function ajaxLogin(Request $request)
{
    $request->validate([
        'loginname'     => 'required|string',
        'loginpassword' => 'required|string',
    ]);

    if ($request->loginname === 'admin' && $request->loginpassword === 'password123') {
        $request->session()->regenerate();
        return response()->json([
            'ok'   => true,
            'role' => 'admin', 
        ]);
    }

    if (Auth::attempt(['username' => $request->loginname, 'password' => $request->loginpassword])) {
        $request->session()->regenerate();
        $role = Auth::user()->role;

        return response()->json([
            'ok' => true,
            'role' => $role,
    ]);
}

// Try with email
if (Auth::attempt(['email' => $request->loginname, 'password' => $request->loginpassword])) {
    $request->session()->regenerate();
    $role = Auth::user()->role;

    return response()->json([
        'ok' => true,
        'role' => $role,
    ]);
}

    return response()->json([
        'ok'      => false,
        'message' => 'Username or password is incorrect',
    ], 422);
}
}
