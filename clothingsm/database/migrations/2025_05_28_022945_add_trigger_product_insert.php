<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddTriggerProductInsert extends Migration
{
    public function up()
    {
        // Create the product_logs table if it doesn't exist
        DB::statement("
            CREATE TABLE IF NOT EXISTS tblActivityLogs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT,
                user_id INT,
                order_id INT,
                action VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // INSERT trigger
     DB::unprepared("
    CREATE TRIGGER trg_after_insert_product
    AFTER INSERT ON tblproducts
    FOR EACH ROW
    BEGIN
        DECLARE v_user_name VARCHAR(255) DEFAULT 'Admin';

        SELECT name INTO v_user_name FROM tblusers WHERE customerId = NEW.customerId LIMIT 1;

        IF v_user_name IS NULL THEN
            SET v_user_name = 'Admin';
        END IF;

        INSERT INTO tblActivityLogs (product_id, user_id, action, created_at)
        VALUES (
            NEW.productId,
            NEW.customerId,
            CONCAT(v_user_name, ' add product'),
            NOW()
        );
    END
");



        // UPDATE trigger
        DB::unprepared("
            CREATE TRIGGER trg_after_update_product
            AFTER UPDATE ON tblproducts
            FOR EACH ROW
            BEGIN
                INSERT INTO tblActivityLogs (product_id, action)
                VALUES (NEW.productId, 'Admin update product');
            END
        ");

        // DELETE trigger
     DB::unprepared('
    CREATE TRIGGER trg_after_delete_product
    BEFORE DELETE ON tblproducts
    FOR EACH ROW
    BEGIN
        INSERT INTO tblActivityLogs (product_id, action, created_at)
        VALUES (OLD.productId, "Admin delete product", NOW());
    END
');


        //ADD USER TRIGGER
       DB::unprepared("
    CREATE TRIGGER trg_after_add_users
    AFTER INSERT ON tblusers
    FOR EACH ROW
    BEGIN
        INSERT INTO tblActivityLogs (user_id, action, created_at)
        VALUES (
            NEW.customerId,
            CONCAT(NEW.name, ' create account'),
            NOW()
        );
    END
");


        //UPDATE USER TRIGGER
        DB::unprepared("
            CREATE TRIGGER trg_after_update_users
            AFTER UPDATE ON tblusers
            FOR EACH ROW
            BEGIN
                INSERT INTO tblActivityLogs (user_id, action)
                VALUES (OLD.customerId, CONCAT(NEW.name, ' update account'));
            END
        ");

        //ADD ORDER TRIGGER
         DB::unprepared("
            CREATE TRIGGER trg_after_add_order
            AFTER INSERT ON tblorders
            FOR EACH ROW
            BEGIN
            DECLARE v_user_name VARCHAR(255) DEFAULT 'Admin';

            SELECT name INTO v_user_name FROM tblusers WHERE customerId = NEW.customerId LIMIT 1;

            IF v_user_name IS NULL THEN
                SET v_user_name = 'Admin';
            END IF;

                INSERT INTO tblActivityLogs (order_id, action)
                VALUES (NEW.orderId, CONCAT(v_user_name, ' add order'));
            END
        ");

        DB::unprepared('
        CREATE TRIGGER trg_after_accept_order
        AFTER UPDATE ON tblorders
        FOR EACH ROW
        BEGIN
            IF NEW.deliveryStatus = "shipped" AND OLD.deliveryStatus != "shipped" THEN
                INSERT INTO tblActivityLogs (order_id, action, created_at)
                VALUES (NEW.orderId, "Admin accept orders", NOW());
            END IF;
        END
    ');
        DB::unprepared('
            CREATE TRIGGER trg_after_complete_order
            AFTER UPDATE ON tblorders
            FOR EACH ROW
            BEGIN
                IF NEW.deliveryStatus = "delivered" AND OLD.deliveryStatus != "delivered" THEN
                    INSERT INTO tblActivityLogs (order_id, action, created_at)
                    VALUES (NEW.orderId, "Orders complete", NOW());
                END IF;
            END
        ');



    }

    public function down()
    {
        // Drop triggers
        DB::unprepared("DROP TRIGGER IF EXISTS trg_after_insert_product");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_after_update_product");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_after_delete_product");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_after_add_users");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_after_update_users");

        // Drop the logs table (optional)
        DB::statement("DROP TABLE IF EXISTS tblActivityLogs");
    }
}
