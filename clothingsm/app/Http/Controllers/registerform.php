<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class registerform extends Controller
{
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
    public function admindashboard(){
        $user = Auth::user();
        
        return response()
        ->view('dashboard')
        ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
        ->header('Pragma', 'no-cache')
        ->header('Expires', '0');
    }
   public function customerDashboard(){
    $user = Auth::user();

    return response()
        ->view('CustomerDashboard', compact('user'))
        ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
        ->header('Pragma', 'no-cache')
        ->header('Expires', '0');
}

    public function customerProfile()
    {
        $user = Auth::user();
        return view('CustomerProfile', compact('user'));
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'loginname' => 'required',
            'loginpassword' => 'required',
        ]);

        if (Auth::attempt(['username' => $credentials['loginname'], 'password' => $credentials['loginpassword']]) ||
            Auth::attempt(['email' => $credentials['loginname'], 'password' => $credentials['loginpassword']])) {

            $request->session()->regenerate();
            $user = Auth::user();
            session(['customer-name' => $user->name]);

            return redirect($user->role === 'admin' ? '/dashboard' : '/CustomerDashboard');
        }

        return back()->withErrors([
            'loginname' => 'The provided credentials do not match our records.',
        ]);
    }

    public function registerform(Request $request)
    { 
        $validated = $request->validate([
            'username' => ['required', 'min:4', 'max:15'],
            'name' => ['required'],
            'email' => ['required', 'email', Rule::unique('tblusers', 'email')],
            'mobile_number' => ['required', 'min:11', 'max:13'],
            'password' => ['required', 'min:8', 'max:200'],
        ]);

        $validated['password'] = bcrypt($validated['password']);
        $user = User::create($validated);
        Auth::login($user);

        if ($request->ajax()) {
            return response()->json([
                'ok' => true,
                'message' => 'Account Created Successfully',
                'role' => $user->role,
            ]);
        }

        return redirect('/login');
    }

    public function ajaxLogin(Request $request)
    {
        $request->validate([
            'loginname' => 'required|string',
            'loginpassword' => 'required|string',
        ]);

        // Hardcoded admin fallback
        if ($request->loginname === 'admin' && $request->loginpassword === 'password123') {
            $request->session()->regenerate();
            return response()->json(['ok' => true, 'role' => 'admin']);
        }

        if (Auth::attempt(['username' => $request->loginname, 'password' => $request->loginpassword]) ||
            Auth::attempt(['email' => $request->loginname, 'password' => $request->loginpassword])) {
            
            $request->session()->regenerate();
            $role = Auth::user()->role;

            return response()->json(['ok' => true, 'role' => $role]);
        }

        return response()->json([
            'ok' => false,
            'message' => 'Username or password is incorrect',
        ], 422);
    }
}
