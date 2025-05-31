<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
   public function up(): void
    {
        DB::statement("
            CREATE VIEW vwProductsWithOrders AS
            SELECT 
                p.productId,
                p.customerId,
                p.name,
                p.type,
                p.price,
                p.printType,
                p.productImg,
                p.dateCreated,
                p.created_at AS productCreatedAt,
                p.updated_at AS productUpdatedAt,
                p.status,
                ps.size AS productSize,
                oi.orderItemId,
                oi.orderId,
                oi.size AS orderItemSize,
                oi.quantity,
                oi.cart_id,
                oi.created_at AS orderItemCreatedAt,
                oi.updated_at AS orderItemUpdatedAt,
                oi.productId as prodId
            FROM tblproducts p
            JOIN tblproduct_sizes ps ON p.productId = ps.product_id
            LEFT JOIN tblorder_items oi ON oi.productId = p.productId AND oi.size = ps.size
        ");
    }


    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS vwProductsWithOrders");
    }
};
