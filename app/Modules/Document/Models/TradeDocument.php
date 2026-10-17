<?php

namespace App\Modules\Document\Models;

use App\Models\User;
use App\Modules\Logistics\Models\Shipment;
use App\Modules\Vehicle\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TradeDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_no',
        'user_id',
        'vehicle_id',
        'shipment_id',
        'title',
        'document_type',
        'file_path',
        'file_extension',
        'file_size_bytes',
        'is_verified',
        'issue_date',
        'expiry_date',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'file_size_bytes' => 'integer',
            'issue_date' => 'date',
            'expiry_date' => 'date',
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

    public function shipment(): BelongsTo
    {
        return $this->belongsTo(Shipment::class);
    }
}
