<?php

namespace App\Http\Controllers;

use App\Mail\OtpMail;
use App\Mail\TestGmail;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;

class OtpController extends Controller
{
    // Send OTP to email
 public function sendOtp(Request $request)
{
    $request->validate([
        'email' => 'required|email',
    ]);

    $user = \App\Models\User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'Email not found in our records.'], 404);
    }

    $otp = rand(100000, 999999);
    Cache::put('otp_for_' . $request->email, $otp, 300);

    try {
        Mail::to($request->email)->send(new \App\Mail\TestGmail($otp));
    } catch (\Exception $e) {
        Log::error('Mail sending failed: ' . $e->getMessage());
        return response()->json(['message' => 'Failed to send OTP email.'], 500);
    }

    return response()->json(['message' => 'OTP sent to ' . $request->email]);
}



    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $email = $request->email;
        $otp = $request->otp;

        $cachedOtp = Cache::get('otp_for_' . $email);

        if ($cachedOtp && $otp == $cachedOtp) {
            Cache::forget('otp_for_' . $email);

            return response()->json(['message' => 'OTP verified successfully']);
        }

        return response()->json(['message' => 'Invalid or expired OTP'], 422);
    }
}
