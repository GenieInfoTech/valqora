<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category', 50)->default('market_intelligence');
            // market_intelligence, regulatory_updates, global_logistics, corporate_news, technology
            $table->text('excerpt');
            $table->longText('content');
            $table->string('cover_image_url')->nullable();
            $table->string('author_name')->default('VALQORA Research Group');
            $table->string('author_role')->default('Global Trade Strategist');
            $table->integer('read_time_minutes')->default(5);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->integer('view_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
