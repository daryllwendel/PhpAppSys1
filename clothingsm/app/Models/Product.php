<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Define the primary key (important since it's not the default 'id')
    protected $primaryKey = 'productId';
    
    // Define fillable fields
    protected $fillable = [
        'name',
        'price',
        'type',
        'printType',
        'productImg',
    ];

    // Relationship with ProductSize
    public function sizes()
    {
        return $this->hasMany(ProductSize::class, 'product_id', 'productId');
    }
}