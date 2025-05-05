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
            $table->id();
            $table->unsignedBigInteger('productId');
            $table->string('sizes');
            $table->timestamps();
            
            $table->foreign('productId')->references('productId')->on('products')->onDelete('cascade');
            
            $table->unique(['productId', 'sizes']);
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
