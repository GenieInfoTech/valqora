<?php

namespace App\Modules\Quotation\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SourcingRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_no',
        'user_id',
        'contact_name',
        'contact_email',
        'contact_phone',
        'company_name',
        'category',
        'target_make',
        'target_model',
        'year_min',
        'year_max',
        'steering',
        'transmission',
        'fuel_type',
        'max_budget_usd',
        'destination_country',
        'destination_port',
        'timeline',
        'additional_specifications',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'year_min' => 'integer',
            'year_max' => 'integer',
            'max_budget_usd' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class);
    }
}
