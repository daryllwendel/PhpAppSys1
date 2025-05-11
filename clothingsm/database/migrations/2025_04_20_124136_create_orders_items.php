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
        Schema::create('tblorder_items', function (Blueprint $table) {
            $table->id('orderItemId');
            $table->unsignedBigInteger('orderId');
            $table->unsignedBigInteger('productId');
            $table->string('size');
            $table->integer('quantity');
            $table->timestamps();
            
            $table->foreign('orderId')->references('orderId')->on('tblorders')->onDelete('cascade');
            $table->foreign('productId')->references('productId')->on('tblproducts')->onDelete('restrict');
            $table->foreign(['productId', 'size'])->references(['product_id', 'size'])->on('tblproduct_sizes')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tblorder_items');
    }
};
