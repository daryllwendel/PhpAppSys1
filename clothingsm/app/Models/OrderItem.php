<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{   
    protected $table = 'tblorder_items';
    protected $primaryKey = 'orderItemId';
    protected $fillable = [
        'orderId',
        'productId',
        'size',
        'quantity'
    ];

    protected $dates = ['created_at', 'updated_at'];

    public function order()
    {
        return $this->belongsTo(orders::class, 'orderId', 'orderId');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'productId', 'productId');
    }

    public function productSize()
    {
        return $this->belongsTo(ProductSize::class, ['productId', 'size'], ['product_id', 'size']);
    }
}

