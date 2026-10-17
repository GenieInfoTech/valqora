<?php

namespace App\Modules\Vehicle\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Core\Models\Port;
use App\Modules\Vehicle\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleCatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Vehicle::with(['primaryImage', 'inspection'])
            ->where('status', 'available');

        // Text Search
        if ($search = $request->input('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('stock_id', 'like', "%{$search}%")
                    ->orWhere('make', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%")
                    ->orWhere('vin_chassis', 'like', "%{$search}%");
            });
        }

        // Filters
        if ($make = $request->input('make')) {
            $query->where('make', $make);
        }
        if ($bodyType = $request->input('body_type')) {
            $query->where('body_type', $bodyType);
        }
        if ($fuelType = $request->input('fuel_type')) {
            $query->where('fuel_type', $fuelType);
        }
        if ($transmission = $request->input('transmission')) {
            $query->where('transmission', $transmission);
        }
        if ($steering = $request->input('steering')) {
            $query->where('steering', $steering);
        }
        if ($country = $request->input('country')) {
            $query->where('location_country', $country);
        }

        if ($yearMin = $request->input('year_min')) {
            $query->where('year', '>=', (int) $yearMin);
        }
        if ($yearMax = $request->input('year_max')) {
            $query->where('year', '<=', (int) $yearMax);
        }

        if ($priceMin = $request->input('price_min')) {
            $query->where('fob_price_usd', '>=', (float) $priceMin);
        }
        if ($priceMax = $request->input('price_max')) {
            $query->where('fob_price_usd', '<=', (float) $priceMax);
        }

        if ($mileageMax = $request->input('mileage_max')) {
            $query->where('mileage_km', '<=', (int) $mileageMax);
        }

        // Sorting
        $sort = $request->input('sort', 'newest');
        match ($sort) {
            'price_asc' => $query->orderBy('fob_price_usd', 'asc'),
            'price_desc' => $query->orderBy('fob_price_usd', 'desc'),
            'year_desc' => $query->orderBy('year', 'desc'),
            'mileage_asc' => $query->orderBy('mileage_km', 'asc'),
            default => $query->latest(),
        };

        $vehicles = $query->paginate(12)->withQueryString();

        // Dynamic Filter Metadata
        $filterOptions = [
            'makes' => Vehicle::where('status', 'available')->distinct()->pluck('make')->sort()->values(),
            'bodyTypes' => Vehicle::where('status', 'available')->distinct()->pluck('body_type')->sort()->values(),
            'fuelTypes' => Vehicle::where('status', 'available')->distinct()->pluck('fuel_type')->sort()->values(),
            'transmissions' => Vehicle::where('status', 'available')->distinct()->pluck('transmission')->sort()->values(),
            'countries' => Vehicle::where('status', 'available')->distinct()->pluck('location_country')->sort()->values(),
        ];

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'filters' => $request->all(),
            'filterOptions' => $filterOptions,
        ]);
    }

    public function show(string $slug): Response
    {
        $vehicle = Vehicle::with(['images', 'inspection'])
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedVehicles = Vehicle::with('primaryImage')
            ->where('id', '!=', $vehicle->id)
            ->where(function ($q) use ($vehicle) {
                $q->where('make', $vehicle->make)
                    ->orWhere('body_type', $vehicle->body_type);
            })
            ->where('status', 'available')
            ->take(3)
            ->get();

        $ports = Port::where('is_active', true)->get();

        return Inertia::render('Vehicles/Show', [
            'vehicle' => $vehicle,
            'relatedVehicles' => $relatedVehicles,
            'ports' => $ports,
        ]);
    }
}
