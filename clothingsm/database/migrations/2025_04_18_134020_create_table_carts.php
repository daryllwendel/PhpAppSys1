<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tblcarts', function (Blueprint $table) {
            $table->id('cart_id');
            $table->timestamp('dateCreated')->useCurrent();
            $table->timestamp('dateUpdated')->useCurrent()->useCurrentOnUpdate();
            $table->double('subTotal');
            $table->unsignedBigInteger('customerId')->nullable();
            $table->foreign('customerId')->references('customerId')->on('tblusers')->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblcarts');
    }
};
