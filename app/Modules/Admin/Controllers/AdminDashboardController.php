<?php

namespace App\Modules\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Modules\Inquiry\Models\Inquiry;
use App\Modules\Logistics\Models\Shipment;
use App\Modules\Quotation\Models\Quotation;
use App\Modules\Vehicle\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $metrics = [
            'totalVehicles' => Vehicle::count(),
            'availableVehicles' => Vehicle::where('status', 'available')->count(),
            'totalInventoryValueUsd' => (float) Vehicle::where('status', 'available')->sum('fob_price_usd'),
            'activeInquiries' => Inquiry::whereIn('status', ['new', 'reviewing', 'contacted'])->count(),
            'pendingQuotations' => Quotation::where('status', 'sent')->count(),
            'activeShipments' => Shipment::where('current_status', '!=', 'delivered')->count(),
            'registeredUsers' => User::count(),
        ];

        $recentInquiries = Inquiry::with('vehicle')
            ->latest()
            ->take(6)
            ->get();

        $activeShipments = Shipment::with(['vehicle', 'milestones'])
            ->latest()
            ->take(5)
            ->get();

        $recentVehicles = Vehicle::with('primaryImage')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => $metrics,
            'recentInquiries' => $recentInquiries,
            'activeShipments' => $activeShipments,
            'recentVehicles' => $recentVehicles,
        ]);
    }

    public function vehicles(): Response
    {
        $vehicles = Vehicle::with(['primaryImage', 'inspection'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Vehicles', [
            'vehicles' => $vehicles,
        ]);
    }

    public function toggleVehicleStatus(Request $request, Vehicle $vehicle): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:available,reserved,in_transit,sold',
        ]);

        $vehicle->update(['status' => $validated['status']]);

        return back()->with('success', "Vehicle {$vehicle->stock_id} status updated to {$validated['status']}.");
    }

    public function inquiries(): Response
    {
        $inquiries = Inquiry::with(['user', 'vehicle'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Inquiries', [
            'inquiries' => $inquiries,
        ]);
    }

    public function updateInquiryStatus(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:new,reviewing,contacted,quoted,closed',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $inquiry->update($validated);

        return back()->with('success', "Inquiry {$inquiry->ticket_number} updated.");
    }

    public function quotations(): Response
    {
        $quotations = Quotation::with(['user', 'vehicle'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Quotations', [
            'quotations' => $quotations,
        ]);
    }

    public function shipments(): Response
    {
        $shipments = Shipment::with(['user', 'vehicle', 'milestones'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Shipments', [
            'shipments' => $shipments,
        ]);
    }
}
