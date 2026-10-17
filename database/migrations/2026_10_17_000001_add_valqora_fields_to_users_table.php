<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 30)->default('customer')->index()->after('email'); // admin, dealer, customer, supplier
            $table->string('company_name')->nullable()->after('name');
            $table->string('phone', 50)->nullable()->after('company_name');
            $table->string('country', 100)->nullable()->after('phone');
            $table->string('tax_vat_number', 100)->nullable()->after('country');
            $table->string('preferred_currency', 10)->default('USD')->after('tax_vat_number');
            $table->string('status', 30)->default('active')->index()->after('preferred_currency');
            $table->string('avatar_url')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'company_name',
                'phone',
                'country',
                'tax_vat_number',
                'preferred_currency',
                'status',
                'avatar_url',
            ]);
        });
    }
};
