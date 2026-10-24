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
        $query = Vehicle::with(['primaryImage', 'inspection']);

        // Availability Status Filter (Default to available unless 'all' or specific status requested)
        $statusFilter = $request->input('status', 'available');
        if ($statusFilter && $statusFilter !== 'all') {
            $query->where('status', $statusFilter);
        }

        // Intelligent Natural-Language & Keyword Search (PDF Vol 5 p. 283)
        // Example: "Find a white 2024 Toyota Corolla Cross Hybrid under 20,000 km"
        if ($search = trim((string) $request->input('q', ''))) {
            $lower = strtolower($search);

            // Extract natural-language "under X km" or "< X km"
            if (preg_match('/(?:under|below|<)\s*([\d,]+)\s*km/i', $search, $kmMatch)) {
                $maxKm = (int) str_replace(',', '', $kmMatch[1]);
                if ($maxKm > 0) {
                    $query->where('mileage_km', '<=', $maxKm);
                }
            }

            // Extract natural-language "under $X" or "under USD X"
            if (preg_match('/(?:under|below|<)\s*(?:\$|usd\s*)([\d,]+)/i', $search, $priceMatch)) {
                $maxUsd = (float) str_replace(',', '', $priceMatch[1]);
                if ($maxUsd > 0) {
                    $query->where('fob_price_usd', '<=', $maxUsd);
                }
            }

            // Extract 4-digit year if present
            if (preg_match('/\b(20[1-2]\d)\b/', $search, $yearMatch)) {
                $query->where('year', (int) $yearMatch[1]);
            }

            // Strip parsed natural-language phrases and stop words to match remaining tokens
            $cleaned = preg_replace('/(?:under|below|<)\s*[\d,]+\s*km/i', '', $lower);
            $cleaned = preg_replace('/(?:under|below|<)\s*(?:\$|usd\s*)[\d,]+/i', '', (string) $cleaned);
            $cleaned = preg_replace('/\b(20[1-2]\d)\b/', '', (string) $cleaned);

            $stopWords = ['find', 'a', 'an', 'the', 'with', 'in', 'from', 'for', 'me', 'show', 'vehicles', 'cars'];
            $tokens = array_filter(explode(' ', (string) $cleaned), function ($tok) use ($stopWords) {
                $tok = trim($tok, ".,?!\"'");

                return strlen($tok) >= 2 && ! in_array($tok, $stopWords, true);
            });

            if (! empty($tokens)) {
                foreach ($tokens as $token) {
                    $query->where(function ($q) use ($token) {
                        $q->where('title', 'like', "%{$token}%")
                            ->orWhere('stock_id', 'like', "%{$token}%")
                            ->orWhere('make', 'like', "%{$token}%")
                            ->orWhere('model', 'like', "%{$token}%")
                            ->orWhere('exterior_color', 'like', "%{$token}%")
                            ->orWhere('fuel_type', 'like', "%{$token}%")
                            ->orWhere('body_type', 'like', "%{$token}%")
                            ->orWhere('drive_type', 'like', "%{$token}%")
                            ->orWhere('location_country', 'like', "%{$token}%")
                            ->orWhere('vin_chassis', 'like', "%{$token}%");
                    });
                }
            }
        }

        // Standard Catalog Filters (PDF Vol 5 pp. 244-245)
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
        if ($driveType = $request->input('drive_type')) {
            $query->where('drive_type', $driveType);
        }
        if ($conditionGrade = $request->input('condition_grade')) {
            $query->where('condition_grade', $conditionGrade);
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

        // Sorting (PDF Vol 5 p. 245: Newest, Lowest Price, Highest Price, Lowest Mileage, Newest Model, Featured)
        $sort = $request->input('sort', 'newest');
        match ($sort) {
            'price_asc' => $query->orderBy('fob_price_usd', 'asc'),
            'price_desc' => $query->orderBy('fob_price_usd', 'desc'),
            'year_desc' => $query->orderBy('year', 'desc'),
            'mileage_asc' => $query->orderBy('mileage_km', 'asc'),
            'featured' => $query->orderBy('is_featured', 'desc')->latest(),
            default => $query->latest(),
        };

        $vehicles = $query->paginate(12)->withQueryString();

        // Dynamic Filter Metadata
        $filterOptions = [
            'makes' => Vehicle::distinct()->pluck('make')->filter()->sort()->values(),
            'bodyTypes' => Vehicle::distinct()->pluck('body_type')->filter()->sort()->values(),
            'fuelTypes' => Vehicle::distinct()->pluck('fuel_type')->filter()->sort()->values(),
            'transmissions' => Vehicle::distinct()->pluck('transmission')->filter()->sort()->values(),
            'driveTypes' => Vehicle::distinct()->pluck('drive_type')->filter()->sort()->values(),
            'conditionGrades' => Vehicle::distinct()->pluck('condition_grade')->filter()->sort()->values(),
            'countries' => Vehicle::distinct()->pluck('location_country')->filter()->sort()->values(),
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
