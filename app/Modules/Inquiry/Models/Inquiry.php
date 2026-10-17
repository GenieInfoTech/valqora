<?php

namespace App\Modules\Inquiry\Models;

use App\Models\User;
use App\Modules\Vehicle\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_number',
        'user_id',
        'vehicle_id',
        'inquiry_type',
        'name',
        'email',
        'phone',
        'company_name',
        'country',
        'subject',
        'message',
        'destination_port',
        'status',
        'priority',
        'assigned_specialist',
        'admin_notes',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}
