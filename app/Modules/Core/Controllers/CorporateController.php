<?php

namespace App\Modules\Core\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CMS\Models\Article;
use App\Modules\Core\Models\Port;
use App\Modules\Vehicle\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class CorporateController extends Controller
{
    public function home(): Response
    {
        $featuredVehicles = Vehicle::with(['primaryImage', 'inspection'])
            ->where('status', 'available')
            ->where('is_featured', true)
            ->latest()
            ->take(6)
            ->get();

        $latestArticles = Article::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get();

        $destinations = Port::where('is_active', true)->take(6)->get();

        $stats = [
            ['label' => 'Countries Reached', 'value' => '48+', 'description' => 'Across Middle East, Africa, Europe, and Asia'],
            ['label' => 'Pre-Export Inspected', 'value' => '100%', 'description' => 'Certified 160-point mechanical & chassis audit'],
            ['label' => 'Annual Trade Volume', 'value' => '$120M+', 'description' => 'Direct institutional & high-net-worth transactions'],
            ['label' => 'Partner Ocean Carriers', 'value' => '12', 'description' => 'Tier-1 Ro-Ro & High Cube container allocations'],
        ];

        return Inertia::render('Home', [
            'featuredVehicles' => $featuredVehicles,
            'latestArticles' => $latestArticles,
            'destinations' => $destinations,
            'stats' => $stats,
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Corporate/About', [
            'governance' => [
                'legalEntity' => 'VALQORA Global Trading LLC / VALQORA Marine Operations Ltd.',
                'registeredOffices' => ['Tokyo, Japan', 'Dubai, UAE', 'Frankfurt, Germany'],
                'complianceStandards' => ['JEVIC Quality Accredited', 'EAA Certified', 'GSO Standard 42/2015 Compliant'],
            ],
        ]);
    }

    public function divisions(): Response
    {
        return Inertia::render('Corporate/Divisions');
    }

    public function contact(): Response
    {
        return Inertia::render('Corporate/Contact');
    }

    public function services(): Response
    {
        return Inertia::render('Corporate/Services');
    }
}
