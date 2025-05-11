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
        Schema::create('tblorders', function (Blueprint $table) {
            $table->id('orderId');
            $table->unsignedBigInteger('customerId');
            $table->unsignedBigInteger('paymentMethodId');
            $table->timestamp('dateOrdered')->useCurrent();
            $table->enum('deliveryStatus', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->timestamps();
            
            $table->foreign('customerId')->references('customerId')->on('tblusers')->onDelete('cascade');
            $table->foreign('paymentMethodId')->references('paymentMethodId')->on('tblpayment_methods')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tblorders');
    }
};
