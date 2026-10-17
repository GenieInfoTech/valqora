<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('quotation_no', 40)->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('sourcing_request_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            $table->string('customer_company')->nullable();
            $table->string('incoterm', 20)->default('CIF'); // FOB, CIF, CFR
            $table->decimal('vehicle_price_usd', 12, 2);
            $table->decimal('freight_cost_usd', 12, 2)->default(0.00);
            $table->decimal('marine_insurance_usd', 12, 2)->default(0.00);
            $table->decimal('documentation_inspection_usd', 12, 2)->default(0.00);
            $table->decimal('total_amount_usd', 12, 2);
            $table->string('destination_country', 100);
            $table->string('destination_port', 100);
            $table->date('valid_until');
            $table->string('status', 30)->default('sent')->index(); // draft, sent, accepted, rejected, expired
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
