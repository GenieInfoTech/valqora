<?php

namespace App\Modules\Vehicle\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleInspection extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'overall_grade',
        'chassis_score',
        'engine_score',
        'interior_score',
        'exterior_score',
        'electronics_score',
        'inspector_name',
        'inspection_date',
        'odometer_verified',
        'accident_free',
        'flood_damage_free',
        'summary_notes',
        'detailed_checklist',
        'report_pdf_url',
    ];

    protected function casts(): array
    {
        return [
            'inspection_date' => 'date',
            'chassis_score' => 'float',
            'engine_score' => 'float',
            'interior_score' => 'float',
            'exterior_score' => 'float',
            'electronics_score' => 'float',
            'odometer_verified' => 'boolean',
            'accident_free' => 'boolean',
            'flood_damage_free' => 'boolean',
            'detailed_checklist' => 'array',
        ];
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}
