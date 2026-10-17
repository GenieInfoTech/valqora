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

    protected function casts(): array
    {
        return [
            'transit_days_from_japan' => 'integer',
            'standard_roro_freight_usd' => 'decimal:2',
            'standard_container_freight_usd' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }
}
