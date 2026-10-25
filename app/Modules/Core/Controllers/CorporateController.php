<?php

namespace App\Modules\Core\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CMS\Controllers\ArticleController;
use App\Modules\CMS\Models\Article;
use App\Modules\Core\Models\Port;
use App\Modules\Vehicle\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class CorporateController extends Controller
{
    public function home(): Response
    {
        ArticleController::ensureSeeded();

        $featuredVehicles = Vehicle::with(['primaryImage', 'inspection'])
            ->where('status', 'available')
            ->where('is_featured', true)
            ->latest()
            ->take(6)
            ->get();

        $latestArrivals = Vehicle::with(['primaryImage', 'inspection'])
            ->where('status', 'available')
            ->latest()
            ->take(6)
            ->get();

        $latestArticles = Article::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function (Article $article) {
                $arr = $article->toArray();
                $arr['published_at'] = $article->published_at
                    ? $article->published_at->format('M d, Y')
                    : 'Oct 2026';

                return $arr;
            });

        $destinations = Port::where('is_active', true)->take(6)->get();
        $makes = Vehicle::distinct()->pluck('make')->filter()->sort()->values();

        $stats = [
            'years_experience' => '15+ Years',
            'countries_served' => '42+ Countries',
            'vehicles_exported' => '18,500+',
            'documentation_accuracy' => '99.9%',
            'on_time_shipment' => '98.4%',
            'customer_satisfaction' => '4.9 / 5.0',
        ];

        $divisions = [
            [
                'name' => 'Valqora Global Trading',
                'status' => 'Core Flagship Division',
                'description' => 'Master international procurement, cross-border supply chain structuring, and sovereign trade execution under Incoterms® 2020.',
                'focus' => ['Cross-Border Trade', 'L/C Structuring', 'Customs Compliance'],
            ],
            [
                'name' => 'Valqora Auto',
                'status' => 'Active Core Division',
                'description' => 'Direct institutional access to 120+ Japanese auction houses (USS, TAA, CAA) and European prestige LHD/RHD dealer networks.',
                'focus' => ['JDM & Euro Sourcing', '150-Pt Inspection', 'Dealer Wholesale'],
            ],
            [
                'name' => 'Valqora Logistics',
                'status' => 'Active Core Division',
                'description' => 'Global Ro-Ro and 40HC containerized ocean freight forwarding, bonded terminal operations, and 10-stage live shipment tracking.',
                'focus' => ['Ro-Ro & 40HC Freight', 'Bonded Warehousing', 'Marine Insurance'],
            ],
            [
                'name' => 'Valqora Industrial',
                'status' => 'Active Division',
                'description' => 'Heavy construction machinery, commercial fleet trucks, agricultural equipment, and OEM spare parts export.',
                'focus' => ['Heavy Machinery', 'Commercial Fleets', 'OEM Parts Consolidation'],
            ],
            [
                'name' => 'Valqora Energy',
                'status' => 'Strategic Growth Division',
                'description' => 'Next-generation EV charging infrastructure, commercial battery storage systems, and clean-mobility transition hardware.',
                'focus' => ['EV Infrastructure', 'Grid Storage', 'Clean Mobility'],
            ],
            [
                'name' => 'Valqora Capital & Tech',
                'status' => 'Active Division',
                'description' => 'Structured trade finance, dealer credit lines, AI procurement search, and cryptographic QR document verification.',
                'focus' => ['Trade Finance', 'QR Document Vault', 'Control Tower ERP'],
            ],
        ];

        $exportProcess = [
            ['step' => '01', 'title' => 'Sourcing & Bidding', 'desc' => 'Direct proxy bidding across USS/TAA/CAA Japan & European dealer inventory.'],
            ['step' => '02', 'title' => 'Yard Arrival', 'desc' => 'Secure inland transport to Valqora Yokohama or Kobe bonded export terminal.'],
            ['step' => '03', 'title' => '150-Pt Inspection', 'desc' => 'Mechanical, structural, OBD2, paint-depth, and radiation verification.'],
            ['step' => '04', 'title' => 'Biosecurity & Prep', 'desc' => 'High-pressure steam decontamination, JEVIC/QISJ audit, and fluid servicing.'],
            ['step' => '05', 'title' => 'MLIT Deregistration', 'desc' => 'Official Japanese Export Certificate issuance and certified English translation.'],
            ['step' => '06', 'title' => 'Customs Clearance', 'desc' => 'Japan Customs export declaration stamping and cryptographic QR vault archiving.'],
            ['step' => '07', 'title' => 'Vessel Allocation', 'desc' => 'Priority space allocation on NYK, MOL, or Wallenius Ro-Ro / 40HC container.'],
            ['step' => '08', 'title' => 'Loading & Lashing', 'desc' => 'ISO-certified wheel lashing or steel container racking with bolt seal logging.'],
            ['step' => '09', 'title' => 'Ocean Transit & B/L', 'desc' => 'Original Bill of Lading dispatch via DHL/FedEx and real-time AIS vessel tracking.'],
            ['step' => '10', 'title' => 'Port Discharge', 'desc' => 'Destination port arrival notification and customs release support.'],
        ];

        $testimonials = [
            [
                'id' => 1,
                'client_name' => 'Tariq Al-Mansoor',
                'company' => 'Al-Mansoor Prestige Motors',
                'country' => 'United Arab Emirates',
                'role' => 'Managing Director',
                'quote' => 'Valqora transformed our Tokyo and European prestige procurement. Every auction sheet translation, paint-depth report, and Jebel Ali Ro-Ro allocation has been executed with clockwork precision.',
                'vehicles_purchased' => '48 Luxury & Performance Units Imported',
            ],
            [
                'id' => 2,
                'client_name' => 'Farhan Rahman',
                'company' => 'Metropolitan Auto Imports Ltd.',
                'country' => 'Bangladesh',
                'role' => 'Director of Procurement',
                'quote' => 'Their understanding of Chittagong and Mongla port L/C documentation, JEVIC pre-shipment verification, and Grade 4.5+ hybrid sourcing has eliminated every customs delay we used to face.',
                'vehicles_purchased' => '65+ JDM Hybrid & SUV Units Imported',
            ],
            [
                'id' => 3,
                'client_name' => 'David Mwangi',
                'company' => 'Rift Valley Fleet Solutions',
                'country' => 'Kenya',
                'role' => 'Head of Fleet Operations',
                'quote' => 'From QISJ KEBS roadworthiness certification in Yokohama to Mombasa port discharge, Valqora’s 10-stage tracking portal gives our corporate clients total visibility on every shipment.',
                'vehicles_purchased' => '32 Commercial & 4x4 Units Imported',
            ],
        ];

        return Inertia::render('Home', [
            'featuredVehicles' => $featuredVehicles,
            'latestArrivals' => $latestArrivals,
            'latestArticles' => $latestArticles,
            'latestInsights' => $latestArticles,
            'destinations' => $destinations,
            'makes' => $makes,
            'stats' => $stats,
            'divisions' => $divisions,
            'exportProcess' => $exportProcess,
            'testimonials' => $testimonials,
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
