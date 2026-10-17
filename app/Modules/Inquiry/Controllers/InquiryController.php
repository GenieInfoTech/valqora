<?php

namespace App\Modules\Inquiry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Inquiry\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InquiryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'inquiry_type' => 'required|string|in:general,vehicle_inquiry,consignment,dealership_application,investor,corporate',
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:50',
            'company_name' => 'nullable|string|max:120',
            'country' => 'nullable|string|max:100',
            'destination_port' => 'nullable|string|max:100',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:3000',
        ]);

        $ticket = 'VQ-INQ-'.date('Y').'-'.strtoupper(Str::random(5));

        Inquiry::create([
            ...$validated,
            'ticket_number' => $ticket,
            'user_id' => $request->user()?->id,
            'status' => 'new',
            'priority' => ($validated['inquiry_type'] === 'dealership_application' || $validated['inquiry_type'] === 'vehicle_inquiry') ? 'high' : 'medium',
            'assigned_specialist' => 'Alexander Vance (Senior Trade Director)',
        ]);

        return back()->with('success', "Your inquiry has been received under ticket {$ticket}. A VALQORA trade specialist will respond promptly.");
    }
}
