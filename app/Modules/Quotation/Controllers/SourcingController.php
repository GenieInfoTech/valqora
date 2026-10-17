<?php

namespace App\Modules\Quotation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Core\Models\Port;
use App\Modules\Quotation\Models\SourcingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SourcingController extends Controller
{
    public function create(): Response
    {
        $ports = Port::where('is_active', true)->get();

        return Inertia::render('Sourcing/Create', [
            'ports' => $ports,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'contact_name' => 'required|string|max:100',
            'contact_email' => 'required|email|max:150',
            'contact_phone' => 'nullable|string|max:50',
            'company_name' => 'nullable|string|max:120',
            'category' => 'required|string|max:50',
            'target_make' => 'required|string|max:60',
            'target_model' => 'required|string|max:80',
            'year_min' => 'nullable|integer|min:1990|max:2027',
            'year_max' => 'nullable|integer|min:1990|max:2027',
            'steering' => 'required|string|in:rhd,lhd,any',
            'transmission' => 'required|string|max:30',
            'fuel_type' => 'required|string|max:30',
            'max_budget_usd' => 'nullable|numeric|min:1000',
            'destination_country' => 'required|string|max:100',
            'destination_port' => 'required|string|max:100',
            'timeline' => 'required|string|max:40',
            'additional_specifications' => 'nullable|string|max:2000',
        ]);

        $referenceNo = 'VQ-SRC-'.date('Y').'-'.strtoupper(Str::random(6));

        $sourcing = SourcingRequest::create([
            ...$validated,
            'reference_no' => $referenceNo,
            'user_id' => $request->user()?->id,
            'status' => 'submitted',
        ]);

        return redirect()->route('sourcing.success', ['reference' => $referenceNo])
            ->with('success', 'Your global sourcing directive has been lodged with our trade desk.');
    }

    public function success(string $reference): Response
    {
        $sourcing = SourcingRequest::where('reference_no', $reference)->firstOrFail();

        return Inertia::render('Sourcing/Success', [
            'sourcing' => $sourcing,
        ]);
    }
}
