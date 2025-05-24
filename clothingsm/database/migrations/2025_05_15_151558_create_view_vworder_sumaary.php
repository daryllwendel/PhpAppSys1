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
            CREATE VIEW vwordersummary AS
            SELECT 
                o.orderId,
                o.customerId,
                u.name,
                o.paymentMethodId,
                pm.paymentName AS paymentMethod,
                o.dateOrdered,
                o.deliveryStatus,
                oi.orderItemId,
                oi.productId,
                p.name as ProductName,
                oi.size,
                oi.quantity,
                p.price AS unitPrice,
                p.productImg,
                u.email,
                u.mobile_number as contactNo,
                u.username,
                u.Province,
                u.Purok,
                u.City,
                u.Baranggay,
                u.ZipCode, 
                pm.charge,
                (oi.quantity * p.price) AS totalItemPrice
            FROM tblorders o
            LEFT JOIN tblorder_items oi ON o.orderId = oi.orderId
            LEFT JOIN tblusers u ON o.customerId = u.customerId
            LEFT JOIN tblpayment_methods pm ON o.paymentMethodId = pm.paymentMethodId
            LEFT JOIN tblproducts p ON oi.productId = p.productId
            JOIN tblproduct_sizes ps ON oi.productId = ps.product_id AND oi.size = ps.size;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS vwordersummary");
    }
};
