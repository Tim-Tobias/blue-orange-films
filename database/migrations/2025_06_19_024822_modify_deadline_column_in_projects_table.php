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
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('aspect_ratio');
            $table->dropColumn('year');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->date('date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('date');
            $table->addColumn('year', 'string', ['nullable' => true]);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->string('date')->nullable();
        });
    }
};
