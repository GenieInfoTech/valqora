<?php

namespace App\Modules\Logistics\Models;

use App\Models\User;
use App\Modules\Document\Models\TradeDocument;
use App\Modules\Quotation\Models\Quotation;
use App\Modules\Vehicle\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracking_number',
        'vehicle_id',
        'user_id',
        'quotation_id',
        'booking_reference',
        'shipping_line',
        'vessel_name',
        'voyage_number',
        'method',
        'origin_port',
        'destination_port',
        'destination_country',
        'departure_date',
        'estimated_arrival_date',
        'actual_arrival_date',
        'current_status',
        'current_location_name',
        'current_lat',
        'current_lng',
        'container_number',
        'bill_of_lading_number',
    ];

    protected function casts(): array
    {
        return [
            'departure_date' => 'date',
            'estimated_arrival_date' => 'date',
            'actual_arrival_date' => 'date',
            'current_lat' => 'float',
            'current_lng' => 'float',
        ];
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class);
    }

    public function milestones(): HasMany
    {
        return $this->hasMany(ShipmentMilestone::class)->orderBy('sort_order');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(TradeDocument::class);
    }
}
