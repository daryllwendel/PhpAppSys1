<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cartitems extends Model
{
    protected $table = 'tblcartitems';
    protected $primaryKey = 'id';

    protected $fillable = [
        'quantity',
        'total',
        'product_id',
        'size',
        'cart_id',
    ];
}
