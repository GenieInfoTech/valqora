<?php

namespace App\Modules\Identity\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Document\Models\TradeDocument;
use App\Modules\Logistics\Models\Shipment;
use App\Modules\Quotation\Models\Quotation;
use App\Modules\Quotation\Models\SourcingRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortalController extends Controller
{
    public function dashboard(Request $request): Response
    {
        $user = $request->user();

        $quotations = Quotation::with('vehicle.primaryImage')
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $sourcingRequests = SourcingRequest::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $shipments = Shipment::with(['vehicle.primaryImage', 'milestones'])
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $documents = TradeDocument::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $metrics = [
            'totalQuotes' => Quotation::where('user_id', $user->id)->count(),
            'activeShipments' => Shipment::where('user_id', $user->id)->where('current_status', '!=', 'delivered')->count(),
            'sourcingRequests' => SourcingRequest::where('user_id', $user->id)->count(),
            'verifiedDocuments' => TradeDocument::where('user_id', $user->id)->count(),
        ];

        return Inertia::render('Portal/Dashboard', [
            'metrics' => $metrics,
            'quotations' => $quotations,
            'sourcingRequests' => $sourcingRequests,
            'shipments' => $shipments,
            'documents' => $documents,
        ]);
    }

    public function quotations(Request $request): Response
    {
        $user = $request->user();

        $quotations = Quotation::with('vehicle.primaryImage')
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Portal/Quotations', [
            'quotations' => $quotations,
        ]);
    }

    public function shipments(Request $request): Response
    {
        $user = $request->user();

        $shipments = Shipment::with(['vehicle.primaryImage', 'milestones'])
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Portal/Shipments', [
            'shipments' => $shipments,
        ]);
    }
}
