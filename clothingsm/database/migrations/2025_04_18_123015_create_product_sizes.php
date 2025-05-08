<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_sizes', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id');
            $table->string('size'); // S, M, L, XL, XXL, etc.
            $table->timestamps();
            
            // Add foreign key constraint
            $table->foreign('product_id')
                  ->references('productId')
                  ->on('products')
                  ->onDelete('cascade');
                  
            // Make product_id and size the composite primary key
            $table->primary(['product_id', 'size']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('product_sizes');
    }
};
