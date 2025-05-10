<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            CREATE VIEW product_with_sizes AS
            SELECT 
                p.productId,
                p.customerId,
                p.name,
                p.type,
                p.price,
                p.printType,
                p.productImg,
                p.dateCreated,
                ps.size,
                p.created_at,
                p.updated_at,
                p.status
            FROM products p
            JOIN product_sizes ps ON p.productId = ps.product_id
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS product_with_sizes");
    }
};
