<?php

namespace App\Modules\Quotation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Core\Models\Port;
use App\Modules\Quotation\Models\Quotation;
use App\Modules\Vehicle\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class QuotationController extends Controller
{
    public function calculate(Request $request): JsonResponse
    {
        $vehicleId = $request->input('vehicle_id');
        $portCode = $request->input('port_code');
        $method = $request->input('method', 'roro');

        $vehicle = Vehicle::findOrFail($vehicleId);
        $port = Port::where('code', $portCode)->firstOrFail();

        $vehiclePrice = (float) $vehicle->fob_price_usd;
        $freightCost = $method === 'container'
            ? (float) $port->standard_container_freight_usd
            : (float) $port->standard_roro_freight_usd;

        // Realistic marine insurance: 0.5% of value + base fee $150
        $marineInsurance = round(($vehiclePrice * 0.005) + 150.00, 2);
        $exportDocsFee = 450.00; // Japanese export certificate, customs brokerage, lien release

        $totalCif = $vehiclePrice + $freightCost + $marineInsurance + $exportDocsFee;

        return response()->json([
            'vehicle_price_usd' => $vehiclePrice,
            'freight_cost_usd' => $freightCost,
            'marine_insurance_usd' => $marineInsurance,
            'documentation_inspection_usd' => $exportDocsFee,
            'total_amount_usd' => $totalCif,
            'transit_days' => $port->transit_days_from_japan,
            'destination_port' => $port->name,
            'destination_country' => $port->country,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'port_code' => 'required|exists:ports,code',
            'incoterm' => 'required|string|in:FOB,CIF,CFR',
            'customer_name' => 'required|string|max:100',
            'customer_email' => 'required|email|max:150',
            'customer_phone' => 'nullable|string|max:50',
            'customer_company' => 'nullable|string|max:120',
            'method' => 'nullable|string|in:roro,container',
            'notes' => 'nullable|string|max:1000',
        ]);

        $vehicle = Vehicle::findOrFail($validated['vehicle_id']);
        $port = Port::where('code', $validated['port_code'])->firstOrFail();

        $vehiclePrice = (float) $vehicle->fob_price_usd;
        $freightCost = ($validated['method'] ?? 'roro') === 'container'
            ? (float) $port->standard_container_freight_usd
            : (float) $port->standard_roro_freight_usd;

        $insurance = ($validated['incoterm'] === 'CIF') ? round(($vehiclePrice * 0.005) + 150.00, 2) : 0.00;
        $docsFee = 450.00;

        $total = ($validated['incoterm'] === 'FOB')
            ? ($vehiclePrice + $docsFee)
            : ($vehiclePrice + $freightCost + $insurance + $docsFee);

        $quotationNo = 'VQ-QT-'.date('Y').'-'.strtoupper(Str::random(6));

        $quote = Quotation::create([
            'quotation_no' => $quotationNo,
            'user_id' => $request->user()?->id,
            'vehicle_id' => $vehicle->id,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'] ?? null,
            'customer_company' => $validated['customer_company'] ?? null,
            'incoterm' => $validated['incoterm'],
            'vehicle_price_usd' => $vehiclePrice,
            'freight_cost_usd' => $freightCost,
            'marine_insurance_usd' => $insurance,
            'documentation_inspection_usd' => $docsFee,
            'total_amount_usd' => $total,
            'destination_country' => $port->country,
            'destination_port' => $port->name,
            'valid_until' => Carbon::now()->addDays(14)->toDateString(),
            'status' => 'sent',
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->route('quotations.show', ['quotationNo' => $quote->quotation_no])
            ->with('success', 'Formal commercial quotation generated successfully.');
    }

    public function show(string $quotationNo): Response
    {
        $quotation = Quotation::with(['vehicle.primaryImage', 'user'])
            ->where('quotation_no', $quotationNo)
            ->firstOrFail();

        return Inertia::render('Quotations/Show', [
            'quotation' => $quotation,
        ]);
    }
}
