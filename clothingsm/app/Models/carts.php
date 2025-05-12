<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class carts extends Model
{
    protected $table = 'tblcarts';
    protected $primaryKey = 'cart_id';
    public const CREATED_AT = 'dateCreated';
    public const UPDATED_AT = 'dateUpdated';
    protected $fillable = [
        'dateCreated',
        'dateUpdated',
        'subTotal',
        'customerId'
    ];
}
