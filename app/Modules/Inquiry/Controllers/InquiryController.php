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
            'inquiry_type' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:50',
            'company_name' => 'nullable|string|max:120',
            'country' => 'nullable|string|max:100',
            'destination_port' => 'nullable|string|max:100',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:5000',
            // Optional Lead Qualification & Live Consultation Fields (PDF Vol 5 pp. 251-252)
            'industry' => 'nullable|string|max:100',
            'fleet_size' => 'nullable|string|max:100',
            'purchase_intention' => 'nullable|string|max:100',
            'vehicle_type' => 'nullable|string|max:100',
            'purchase_timeline' => 'nullable|string|max:100',
            'preferred_contact_method' => 'nullable|string|max:100',
            'consultation_date' => 'nullable|string|max:100',
        ]);

        $ticket = 'VQ-INQ-'.date('Y').'-'.strtoupper(Str::random(5));

        // Append structured lead qualification metadata to message if provided
        $qualificationNotes = [];
        foreach ([
            'industry' => 'Industry',
            'fleet_size' => 'Fleet Size',
            'purchase_intention' => 'Purchase Intention',
            'vehicle_type' => 'Vehicle Type',
            'purchase_timeline' => 'Purchase Timeline',
            'preferred_contact_method' => 'Preferred Channel',
            'consultation_date' => 'Video Consultation Date',
        ] as $field => $label) {
            if (! empty($validated[$field])) {
                $qualificationNotes[] = "{$label}: {$validated[$field]}";
            }
        }

        $finalMessage = $validated['message'];
        if (! empty($qualificationNotes)) {
            $finalMessage .= "\n\n--- Lead Qualification Profile ---\n".implode(' | ', $qualificationNotes);
        }

        // Smart Department Specialist Routing (PDF Vol 5 p. 251)
        $specialistMap = [
            'Sales' => 'Alexander Vance (Senior Automotive Sales Director)',
            'Global Trading' => 'Kenji Takahashi (Head of Global Procurement)',
            'Export Support' => 'Capt. Henrik Lindqvist (Maritime & Customs Director)',
            'Dealer Relations' => 'Tariq Al-Mansoor (Institutional & Dealer Relations)',
            'Supplier Relations' => 'Yuki Sato (Japan Auction & Supplier Network Lead)',
            'Corporate Office' => 'Eleanor Sterling (VP of Corporate Governance)',
            'Media' => 'Clara Von Berg (Global Communications & PR Lead)',
            'Careers' => 'Hannah Meyer (Global Talent & EVP Partner)',
        ];

        $type = $validated['inquiry_type'];
        $specialist = $specialistMap[$type] ?? 'Alexander Vance (Senior Trade Director)';
        $highPriorityTypes = ['dealership_application', 'vehicle_inquiry', 'Sales', 'Dealer Relations', 'Global Trading'];

        Inquiry::create([
            'vehicle_id' => $validated['vehicle_id'] ?? null,
            'inquiry_type' => $type,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'company_name' => $validated['company_name'] ?? null,
            'country' => $validated['country'] ?? null,
            'destination_port' => $validated['destination_port'] ?? null,
            'subject' => $validated['subject'],
            'message' => $finalMessage,
            'ticket_number' => $ticket,
            'user_id' => $request->user()?->id,
            'status' => 'new',
            'priority' => in_array($type, $highPriorityTypes, true) ? 'high' : 'medium',
            'assigned_specialist' => $specialist,
        ]);

        return back()->with('success', "Your inquiry has been routed to {$specialist} under ticket {$ticket}. Guaranteed SLA response within 8 business hours.");
    }
}
