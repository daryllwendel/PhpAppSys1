<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    protected $table = 'tblproduct_sizes';
    protected $primaryKey = ['product_id', 'size'];
    public $incrementing = false;
    
    protected $fillable = [
        'product_id',
        'size'
    ];

    protected $dates = ['created_at', 'updated_at'];
}
