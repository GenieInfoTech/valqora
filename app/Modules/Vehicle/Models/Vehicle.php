<?php

namespace App\Modules\Vehicle\Models;

use App\Modules\Document\Models\TradeDocument;
use App\Modules\Inquiry\Models\Inquiry;
use App\Modules\Logistics\Models\Shipment;
use App\Modules\Quotation\Models\Quotation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'stock_id',
        'title',
        'slug',
        'make',
        'model',
        'year',
        'body_type',
        'fuel_type',
        'transmission',
        'drive_type',
        'steering',
        'engine_cc',
        'doors',
        'seats',
        'mileage_km',
        'exterior_color',
        'interior_color',
        'vin_chassis',
        'location_country',
        'location_city',
        'fob_price_usd',
        'cif_estimate_usd',
        'status',
        'condition_grade',
        'is_featured',
        'is_verified',
        'overview',
        'features',
        'specifications',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'engine_cc' => 'integer',
            'doors' => 'integer',
            'seats' => 'integer',
            'mileage_km' => 'integer',
            'fob_price_usd' => 'decimal:2',
            'cif_estimate_usd' => 'decimal:2',
            'is_featured' => 'boolean',
            'is_verified' => 'boolean',
            'features' => 'array',
            'specifications' => 'array',
        ];
    }

    public function images(): HasMany
    {
        return $this->hasMany(VehicleImage::class)->orderBy('sort_order');
    }

    public function primaryImage(): HasOne
    {
        return $this->hasOne(VehicleImage::class)->where('is_primary', true);
    }

    public function inspection(): HasOne
    {
        return $this->hasOne(VehicleInspection::class);
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class);
    }

    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class);
    }

    public function tradeDocuments(): HasMany
    {
        return $this->hasMany(TradeDocument::class);
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('status', 'available');
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }
}
