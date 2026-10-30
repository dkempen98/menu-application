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
        Schema::table('meals', function (Blueprint $table) {
            $table->boolean('active')->default(false)->after("description");
            $table->boolean('group_on_orders')->default(true)->after("active");
            $table->json('liquor_type')->nullable()->after("group_on_orders");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('meals', function (Blueprint $table) {
            $table->dropColumn('active');
            $table->dropColumn('group_on_orders');
            $table->dropColumn('liquor_type');
        });
    }
};
