<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tblpayment_methods', function (Blueprint $table) {
            $table->id('paymentMethodId');
            $table->string('paymentName');
            $table->decimal('charge', 8, 2); 
            $table->string('name')->nullable();
            $table->string('bankName')->nullable();
            $table->string('number')->nullable();
            $table->timestamps();
        });

        DB::table('tblpayment_methods')->insert([
            'paymentName' => 'Gcash',
            'charge' => 50.00,
            'number' => '09123456789',
            'name'=> 'Juan Dela Cruz',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('tblpayment_methods')->insert([
            'paymentName' => 'Cash',
            'charge' => 150.00,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('tblpayment_methods')->insert([
            'paymentName' => 'Bank Transfer',
            'charge' => 70.00,
            'number' => '1234567890',
            'bankName' => 'Bank of the Philippines',
            'name' => 'Juan Dela Cruz',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('tblpayment_methods');
    }
};
