<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sourcing_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference_no', 40)->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('contact_phone', 50)->nullable();
            $table->string('company_name')->nullable();
            $table->string('category', 50)->default('passenger_car'); // passenger_car, commercial, luxury, armored, machinery
            $table->string('target_make', 60);
            $table->string('target_model', 80);
            $table->integer('year_min')->nullable();
            $table->integer('year_max')->nullable();
            $table->string('steering', 20)->default('any'); // rhd, lhd, any
            $table->string('transmission', 30)->default('any');
            $table->string('fuel_type', 30)->default('any');
            $table->decimal('max_budget_usd', 12, 2)->nullable();
            $table->string('destination_country', 100);
            $table->string('destination_port', 100);
            $table->string('timeline', 40)->default('immediate'); // immediate, 30_days, 60_days, flexible
            $table->text('additional_specifications')->nullable();
            $table->string('status', 40)->default('submitted')->index(); // submitted, reviewing, sourcing, quoted, contracted, closed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sourcing_requests');
    }
};
