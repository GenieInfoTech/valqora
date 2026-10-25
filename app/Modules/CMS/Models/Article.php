<?php

namespace App\Modules\CMS\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'excerpt',
        'content',
        'cover_image_url',
        'author_name',
        'author_role',
        'read_time_minutes',
        'is_featured',
        'is_published',
        'published_at',
        'view_count',
    ];

    protected $appends = [
        'summary',
        'read_time',
        'image',
    ];

    protected function casts(): array
    {
        return [
            'read_time_minutes' => 'integer',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'view_count' => 'integer',
        ];
    }

    public function getSummaryAttribute(): string
    {
        return (string) ($this->attributes['excerpt'] ?? '');
    }

    public function getReadTimeAttribute(): string
    {
        $mins = (int) ($this->attributes['read_time_minutes'] ?? 5);

        return "{$mins} min read";
    }

    public function getImageAttribute(): ?string
    {
        return $this->attributes['cover_image_url'] ?? null;
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
