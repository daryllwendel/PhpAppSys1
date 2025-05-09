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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id('orderItemId');
            $table->unsignedBigInteger('orderId');
            $table->unsignedBigInteger('productId');
            $table->string('size');
            $table->integer('quantity');
            $table->timestamps();
            
            $table->foreign('orderId')->references('orderId')->on('orders')->onDelete('cascade');
            $table->foreign('productId')->references('productId')->on('products')->onDelete('restrict');
            $table->foreign(['productId', 'size'])->references(['product_id', 'size'])->on('product_sizes')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
};
