<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    // Define the primary key to be productId instead of id
    protected $primaryKey = 'productId';
    
    // Define which columns can be mass-assigned
    protected $fillable = [
        'productId',
        'name',
        'price',
        'type',
        'printType',
        'productImg'
    ];
}