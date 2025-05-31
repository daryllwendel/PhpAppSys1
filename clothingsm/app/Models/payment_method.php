<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class payment_method extends Model
{
    protected $table = 'tblpayment_methods';
    protected $primaryKey = 'paymentMethodId';
    protected $fillable = [
        'paymentName'
    ];

    protected $dates = ['created_at', 'updated_at'];
}

