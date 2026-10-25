<?php

namespace App\Modules\Core\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Port extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'country',
        'region',
        'transit_days_from_japan',
        'standard_roro_freight_usd',
        'standard_container_freight_usd',
        'is_active',
    ];

    protected $appends = [
        'transit_days',
        'roro_rate_usd',
        'container_rate_usd',
        'inspection_fee_usd',
        'insurance_rate_percent',
    ];

    protected function casts(): array
    {
        return [
            'transit_days_from_japan' => 'integer',
            'standard_roro_freight_usd' => 'decimal:2',
            'standard_container_freight_usd' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function getTransitDaysAttribute(): int
    {
        return (int) ($this->attributes['transit_days_from_japan'] ?? 21);
    }

    public function getRoroRateUsdAttribute(): float
    {
        return (float) ($this->attributes['standard_roro_freight_usd'] ?? 1350);
    }

    public function getContainerRateUsdAttribute(): float
    {
        return (float) ($this->attributes['standard_container_freight_usd'] ?? 2450);
    }

    public function getInspectionFeeUsdAttribute(): float
    {
        return 350.0;
    }

    public function getInsuranceRatePercentAttribute(): float
    {
        return 1.2;
    }
}
