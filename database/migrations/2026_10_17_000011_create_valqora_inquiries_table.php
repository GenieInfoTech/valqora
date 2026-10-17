<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_number', 40)->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->string('inquiry_type', 40)->default('general');
            // general, vehicle_inquiry, consignment, dealership_application, investor, corporate
            $table->string('name');
            $table->string('email');
            $table->string('phone', 50)->nullable();
            $table->string('company_name')->nullable();
            $table->string('country', 100)->nullable();
            $table->string('subject');
            $table->text('message');
            $table->string('destination_port', 100)->nullable();
            $table->string('status', 30)->default('new')->index(); // new, reviewing, contacted, quoted, closed
            $table->string('priority', 20)->default('medium'); // low, medium, high, urgent
            $table->string('assigned_specialist', 100)->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
