<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AddADesigns extends Model
{
    protected $table = 'tblproducts';
    protected $primaryKey = 'productId';
    protected $fillable = [
        'customerId',
        'name',
        'type',
        'price',
        'printType',
        'productImg',
        'dateCreated'
    ];

    protected $dates = ['dateCreated', 'created_at', 'updated_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'customerId', 'customerId');
    }

    public function sizes()
    {
        return $this->hasMany(\App\Models\ProductSize::class, 'product_id', 'productId');
    }
}