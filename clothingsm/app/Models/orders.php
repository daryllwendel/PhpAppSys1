<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class orders extends Model
{
    protected $primaryKey = 'orderId';
    protected $fillable = [
        'customerId',
        'paymentMethodId',
        'dateOrdered',
        'deliveryStatus'
    ];

    protected $dates = ['dateOrdered', 'created_at', 'updated_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'customerId', 'customerId');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(payment_method::class, 'paymentMethodId', 'paymentMethodId');
    }
}

