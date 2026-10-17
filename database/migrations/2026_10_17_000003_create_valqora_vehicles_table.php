<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('stock_id', 40)->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('make', 60)->index();
            $table->string('model', 80)->index();
            $table->integer('year')->index();
            $table->string('body_type', 40)->index(); // Sedan, SUV, Coupe, Commercial, Hypercar, Armored
            $table->string('fuel_type', 30)->index(); // Petrol, Diesel, Hybrid, Electric
            $table->string('transmission', 30)->index(); // Automatic, Manual, DCT
            $table->string('drive_type', 20)->default('AWD'); // AWD, 4WD, RWD, FWD
            $table->string('steering', 10)->default('RHD')->index(); // RHD, LHD
            $table->integer('engine_cc')->nullable();
            $table->integer('doors')->default(4);
            $table->integer('seats')->default(5);
            $table->integer('mileage_km')->default(0)->index();
            $table->string('exterior_color', 50);
            $table->string('interior_color', 50);
            $table->string('vin_chassis', 60)->nullable();
            $table->string('location_country', 80)->default('Japan')->index();
            $table->string('location_city', 80)->default('Yokohama');
            $table->decimal('fob_price_usd', 12, 2)->index();
            $table->decimal('cif_estimate_usd', 12, 2)->nullable();
            $table->string('status', 30)->default('available')->index(); // available, reserved, in_transit, sold
            $table->string('condition_grade', 30)->default('Grade 4.5');
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_verified')->default(true);
            $table->text('overview')->nullable();
            $table->json('features')->nullable();
            $table->json('specifications')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
