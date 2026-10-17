<?php

namespace App\Models;

use App\Modules\Document\Models\TradeDocument;
use App\Modules\Inquiry\Models\Inquiry;
use App\Modules\Logistics\Models\Shipment;
use App\Modules\Quotation\Models\Quotation;
use App\Modules\Quotation\Models\SourcingRequest;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'company_name',
        'phone',
        'country',
        'tax_vat_number',
        'preferred_currency',
        'status',
        'avatar_url',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isDealer(): bool
    {
        return $this->role === 'dealer';
    }

    public function isCustomer(): bool
    {
        return $this->role === 'customer';
    }

    public function isSupplier(): bool
    {
        return $this->role === 'supplier';
    }

    public function sourcingRequests(): HasMany
    {
        return $this->hasMany(SourcingRequest::class);
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
}
