<?php

namespace App\Modules\Quotation\Models;

use App\Models\User;
use App\Modules\Logistics\Models\Shipment;
use App\Modules\Vehicle\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Quotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'quotation_no',
        'user_id',
        'sourcing_request_id',
        'vehicle_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_company',
        'incoterm',
        'vehicle_price_usd',
        'freight_cost_usd',
        'marine_insurance_usd',
        'documentation_inspection_usd',
        'total_amount_usd',
        'destination_country',
        'destination_port',
        'valid_until',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'vehicle_price_usd' => 'decimal:2',
            'freight_cost_usd' => 'decimal:2',
            'marine_insurance_usd' => 'decimal:2',
            'documentation_inspection_usd' => 'decimal:2',
            'total_amount_usd' => 'decimal:2',
            'valid_until' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function sourcingRequest(): BelongsTo
    {
        return $this->belongsTo(SourcingRequest::class);
    }

    public function shipment(): HasOne
    {
        return $this->hasOne(Shipment::class);
    }
}
