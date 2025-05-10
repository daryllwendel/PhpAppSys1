<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id('customerId');
            $table->string('username');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('password');
            $table->string('Province')->nullable();
            $table->string('Purok')->nullable();
            $table->string('City')->nullable();
            $table->string('ZipCode')->nullable();
            $table->string('Baranggay')->nullable();
            $table->string('profile')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->string('role')->default('customer');
        });
        DB::table('users')->insert([
            'username' => 'admin',
            'name' => 'Admin User',
            'email' => 'admin@clothing',
            'password' => Hash::make('smclothing@tagum'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
