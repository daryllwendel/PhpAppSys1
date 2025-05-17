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
        Schema::create('tblpayment_methods', function (Blueprint $table) {
            $table->id('paymentMethodId');
            $table->string('paymentName');
            $table->double('charge');
            $table->timestamps();
        }); 
        DB::table('tblpayment_methods')->insert([
            'paymentName' => 'Gcash',
            'charge' => 50,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('tblpayment_methods')->insert([
            'paymentName' => 'Cash',
            'charge' => 150,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('tblpayment_methods')->insert([
            'paymentName' => 'Bank Transfer',
            'charge' => 70,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
    
    public function down()
    {
        Schema::dropIfExists('tblpayment_methods');
    }
};
