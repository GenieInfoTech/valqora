<?php

namespace App\Modules\Logistics\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Logistics\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrackingController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('number');
        $activeShipment = null;

        if ($search) {
            $activeShipment = Shipment::with(['milestones', 'vehicle.primaryImage', 'documents'])
                ->where('tracking_number', $search)
                ->orWhere('booking_reference', $search)
                ->orWhere('bill_of_lading_number', $search)
                ->first();
        }

        $sampleShipments = Shipment::with('vehicle.primaryImage')
            ->latest()
            ->take(4)
            ->get(['id', 'tracking_number', 'vessel_name', 'destination_port', 'current_status', 'vehicle_id']);

        return Inertia::render('Logistics/Tracking', [
            'searchedNumber' => $search,
            'shipment' => $activeShipment,
            'sampleShipments' => $sampleShipments,
        ]);
    }

    public function show(string $trackingNumber): Response
    {
        $shipment = Shipment::with(['milestones', 'vehicle.images', 'documents', 'quotation'])
            ->where('tracking_number', $trackingNumber)
            ->firstOrFail();

        return Inertia::render('Logistics/Detail', [
            'shipment' => $shipment,
        ]);
    }
}
