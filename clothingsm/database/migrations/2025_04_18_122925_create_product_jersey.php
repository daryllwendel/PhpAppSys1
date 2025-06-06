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
        Schema::create('tblproducts', function (Blueprint $table) {
            $table->id('productId');
            $table->unsignedBigInteger('customerId')->nullable(); 
            $table->string('name');
            $table->string('type')->nullable();
            $table->double('price');
            $table->string('printType')->nullable();
            $table->string('productImg')->nullable();
            $table->string('status')->default('hidden');
            $table->string('viewStatus')->default('pending');
            $table->timestamp('dateCreated')->useCurrent();
            $table->timestamps();
            
            $table->foreign('customerId')->references('customerId')->on('tblusers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tblproducts');
    }
};
