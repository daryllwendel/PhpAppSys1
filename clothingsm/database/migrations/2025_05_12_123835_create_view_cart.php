<?php
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("
            CREATE VIEW vwcartdetails AS
            SELECT 
                ci.id AS cart_item_id,
                ci.cart_id,
                ci.product_id,
                ci.size,
                ci.quantity,
                ci.total,
                p.name,
                p.type,
                p.price,
                p.productImg,
                c.customerId,
                c.subTotal,
                c.dateCreated AS cartDateCreated,
                ci.status
            FROM tblcartitems ci
            LEFT JOIN tblcarts c ON ci.cart_id = c.cart_id
            LEFT JOIN tblproducts p ON ci.product_id = p.productId
            LEFT JOIN tblproduct_sizes ps ON ci.product_id = ps.product_id AND ci.size = ps.size
        ");
    }

    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS vwcartdetails");
    }
};
