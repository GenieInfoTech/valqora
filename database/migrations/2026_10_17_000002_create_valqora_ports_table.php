<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ports', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('code', 20)->unique();
            $table->string('country', 100);
            $table->string('region', 100); // Middle East, Europe, Africa, Asia Pacific, Americas
            $table->integer('transit_days_from_japan')->default(25);
            $table->decimal('standard_roro_freight_usd', 10, 2)->default(1800.00);
            $table->decimal('standard_container_freight_usd', 10, 2)->default(3500.00);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ports');
    }
};
