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
            Schema::create('tblcartitems', function (Blueprint $table) {
                $table->id();
                $table->integer('quantity');
                $table->double('total')->default(0);
                $table->timestamps();
            
                $table->unsignedBigInteger('product_id');
                $table->string('size')->nullable();
                $table->string('status')->default('available');
                $table->unsignedBigInteger('cart_id')->nullable();
                $table->foreign('cart_id')->references('cart_id')->on('tblcarts')->onDelete('cascade');
            
                // Composite foreign key: (product_id, size) -> tblproduct_sizes(product_id, size)
                $table->foreign(['product_id', 'size'])
                      ->references(['product_id', 'size'])
                      ->on('tblproduct_sizes')
                      ->onDelete('cascade');
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('table_cartitems');
        }
    };
