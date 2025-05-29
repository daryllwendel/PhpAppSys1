<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ForgotPassword extends Controller
{
    public function forgotpassword(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:8',
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (!$user) {
        return response()->json(['message' => 'User not found.'], 404);
    }

    $user->password = bcrypt($validated['password']);
    $user->save();

    return response()->json(['message' => 'Password updated successfully.'], 200);
}
}
