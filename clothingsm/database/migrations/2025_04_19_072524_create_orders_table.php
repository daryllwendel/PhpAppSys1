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
        Schema::create('orders', function (Blueprint $table) {
            $table->id('orderId');
            $table->unsignedBigInteger('customerId');
            $table->unsignedBigInteger('paymentMethodId');
            $table->timestamp('dateOrdered')->useCurrent();
            $table->enum('deliveryStatus', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->timestamps();
            
            $table->foreign('customerId')->references('customerId')->on('users')->onDelete('cascade');
            $table->foreign('paymentMethodId')->references('paymentMethodId')->on('payment_methods')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
