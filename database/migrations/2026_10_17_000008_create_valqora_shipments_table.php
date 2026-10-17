<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_number', 40)->unique();
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('quotation_id')->nullable()->constrained()->nullOnDelete();
            $table->string('booking_reference', 60)->nullable();
            $table->string('shipping_line', 80)->default('NYK RORO Global'); // Wallenius, NYK, MOL, "K" Line, Hoegh
            $table->string('vessel_name', 100);
            $table->string('voyage_number', 50)->nullable();
            $table->string('method', 30)->default('roro'); // roro, container_20ft, container_40ft
            $table->string('origin_port', 100)->default('Yokohama, Japan');
            $table->string('destination_port', 100);
            $table->string('destination_country', 100);
            $table->date('departure_date')->nullable();
            $table->date('estimated_arrival_date')->nullable();
            $table->date('actual_arrival_date')->nullable();
            $table->string('current_status', 40)->default('booking_confirmed')->index();
            // booking_confirmed, origin_customs_cleared, loaded_on_vessel, at_sea, arrived_destination, customs_cleared_destination, delivered
            $table->string('current_location_name', 120)->nullable();
            $table->decimal('current_lat', 10, 6)->nullable();
            $table->decimal('current_lng', 10, 6)->nullable();
            $table->string('container_number', 60)->nullable();
            $table->string('bill_of_lading_number', 60)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
