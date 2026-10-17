<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicle_inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('overall_grade', 20)->default('4.5'); // 5.0, 4.5, 4.0, 3.5, R, S
            $table->decimal('chassis_score', 3, 1)->default(4.8); // out of 5.0
            $table->decimal('engine_score', 3, 1)->default(4.9);
            $table->decimal('interior_score', 3, 1)->default(4.7);
            $table->decimal('exterior_score', 3, 1)->default(4.6);
            $table->decimal('electronics_score', 3, 1)->default(4.9);
            $table->string('inspector_name', 100)->default('VALQORA Certified Inspector');
            $table->date('inspection_date');
            $table->boolean('odometer_verified')->default(true);
            $table->boolean('accident_free')->default(true);
            $table->boolean('flood_damage_free')->default(true);
            $table->text('summary_notes')->nullable();
            $table->json('detailed_checklist')->nullable(); // tires, brakes, battery, fluid levels, obd2 diagnostics
            $table->string('report_pdf_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicle_inspections');
    }
};
