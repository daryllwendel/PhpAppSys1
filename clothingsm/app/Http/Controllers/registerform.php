<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class registerform extends Controller
{
    public function registerform(Request $request){
        $field = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' =>  ['required', 'min:8', 'max:200']
        ]);
        $field['password'] = bcrypt($field['password']);
        User::create($field);
        return 'hahhah';
    }
}
