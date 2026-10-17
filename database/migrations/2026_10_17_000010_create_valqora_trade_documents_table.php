<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trade_documents', function (Blueprint $table) {
            $table->id();
            $table->string('document_no', 40)->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('shipment_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('document_type', 50);
            // bill_of_lading, commercial_invoice, export_certificate, inspection_report, insurance_certificate, customs_declaration
            $table->string('file_path');
            $table->string('file_extension', 10)->default('pdf');
            $table->integer('file_size_bytes')->default(102400);
            $table->boolean('is_verified')->default(true);
            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trade_documents');
    }
};
