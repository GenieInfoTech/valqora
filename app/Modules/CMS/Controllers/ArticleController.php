<?php

namespace App\Modules\CMS\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CMS\Models\Article;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Ensure the institutional library of articles across all categories is seeded.
     */
    public static function ensureSeeded(): void
    {
        if (Article::count() >= 9) {
            return;
        }

        $articles = [
            [
                'title' => '2026 Global Vehicle Tariff & Compliance Outlook: Navigating Middle East, South Asian & African Import Regulations',
                'slug' => '2026-global-vehicle-tariff-compliance-outlook',
                'category' => 'regulatory_updates',
                'excerpt' => 'A comprehensive review of evolving customs documentation, JEVIC pre-shipment inspections, emissions standards, and age-limit regulations across primary import hubs including UAE, Bangladesh, Kenya, and the UK.',
                'content' => "Executive Summary: As cross-border automotive trading scales to record institutional volumes in 2026, regulatory scrutiny at destination ports has intensified significantly. Importers operating across South Asia, East Africa, the GCC, and Oceania must align procurement specifications with updated customs valuation matrices, mandatory pre-shipment roadworthiness audits, and hybrid/EV tariff incentives.\n\n1. East Africa (Kenya KEBS & Tanzania TBS Standards)\nFor buyers importing into Mombasa and Dar es Salaam, compliance with Kenya Bureau of Standards (KEBS KS 1515:2000) and Tanzania Bureau of Standards (TBS) mandates stringent pre-export roadworthiness and radiation inspections conducted in Japan by accredited bodies (JEVIC, QISJ, or EAA). Kenya strictly enforces the 8-year age limit from the year of first registration and requires Right-Hand Drive (RHD) configuration.\n\n2. South Asia (Bangladesh Chittagong & Mongla Port Protocols)\nUnder the Bangladesh Import Policy Order, reconditioned Japanese passenger vehicles and microbuses up to 5 years from model year qualify for import through Chittagong and Mongla ports. Preferential supplementary duty brackets continue to favor hybrid powertrains (such as Toyota Corolla Cross Hybrid, Noah/Voxy Hybrid, and Harrier Hybrid) and lower engine displacement tiers (<1,500cc and 1,501–1,800cc), making accurate HS code and Yellow Book depreciation calculation critical before vessel loading.\n\n3. GCC & Middle East (GSO Standard 42/2015)\nIn the United Arab Emirates, Saudi Arabia, and neighboring GCC states, unified vehicle specifications under GSO Standard 42/2015 govern safety equipment, Gulf climate endurance, and bilingual VIN/warning label compliance. Importers must ensure that Certificates of Conformity (CoC) and original Japanese Export Deregistration Certificates accompany the Ocean Bill of Lading prior to vessel berthing at Jebel Ali or Dammam.\n\n4. VALQORA Pre-Export Compliance Guarantee\nAt VALQORA Global Trading, our Tokyo and Dubai trade compliance desks execute a mandatory 15-point documentary pre-audit on every chassis number—confirming destination age eligibility, radiation clearance (<0.20 μSv/hr), JEVIC odometer certification, and lien-free MLIT export deregistration prior to vessel booking.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Alexander Vance',
                'author_role' => 'Managing Director, Trade & Compliance',
                'read_time_minutes' => 6,
                'is_featured' => true,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(2),
                'view_count' => 1840,
            ],
            [
                'title' => 'Q4 2026 Cross-Border Automotive Price Index: JPY Exchange Spreads & Global Landed Cost Arbitrage',
                'slug' => 'q4-2026-cross-border-automotive-price-index',
                'category' => 'market_intelligence',
                'excerpt' => 'Quantitative analysis of Japanese Yen (JPY) currency movements against USD, EUR, GBP, and BDT, and how institutional dealerships are locking in favorable FOB acquisition spreads.',
                'content' => "Executive Summary: Currency volatility between the Japanese Yen (JPY) and major settlement currencies (USD, EUR, GBP, AED, AUD, and BDT) has created one of the most compelling procurement windows of the decade for international automotive dealers and fleet operators.\n\n1. FOB Acquisition Spread Analysis\nOver the past two quarters, domestic Japanese auction clearing prices in JPY for Grade 4.5 and Grade 5.0 late-model SUVs and hybrids have stabilized, while foreign exchange differentials allow USD- and AED-denominated buyers to capture an effective 11% to 16% discount compared to domestic European or Middle Eastern wholesale markets.\n\n2. High-Liquidity Asset Classes\nOur trading desk data across 18,500+ exported units highlights three segments delivering the fastest inventory turnover for destination dealerships:\n• Executive MPVs & VIP Shuttles: Toyota Alphard Z / Executive Lounge (AGH40/AAHH40) and Vellfire Hybrid.\n• Flagship Off-Road SUVs: Toyota Land Cruiser 300 ZX/GR-Sport, Land Cruiser Prado 250, and Lexus LX 600 VIP.\n• Fuel-Efficient Urban Hybrids: Toyota Yaris Cross Hybrid, Corolla Cross Hybrid, and Honda Vezel e:HEV.\n\n3. Multi-Currency Hedging & L/C Settlement\nBy utilizing VALQORA's multi-currency invoicing and Usance / Sight Letter of Credit (UCP 600) structures, dealership groups can lock in fixed USD or JPY FOB valuations at the time of auction hammer while aligning balance settlement with Bill of Lading issuance.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Dr. Kenji Morimoto',
                'author_role' => 'Chief Economist, Valqora Research Group',
                'read_time_minutes' => 8,
                'is_featured' => true,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(5),
                'view_count' => 2310,
            ],
            [
                'title' => 'The Surge in Hybrid and High-Torque Luxury Transports: Tokyo & Nagoya Auction Intelligence',
                'slug' => 'surge-in-hybrid-high-torque-luxury-transports',
                'category' => 'auction_trends',
                'excerpt' => 'Auction clearing rates and wholesale margin trends across USS Tokyo, ARAI, and CAA hubs show historic demand for Japanese flagship hybrid and executive people-movers.',
                'content' => "Executive Summary: Japanese automotive auction indices recorded unprecedented international bidder participation across Q3 and Q4 2026. Vehicles such as the new-generation Toyota Alphard and Vellfire Executive Lounge, alongside Lexus LX 600 and Land Cruiser 300 series, continue to command strong demand across Asian, Middle Eastern, and Commonwealth markets.\n\n1. USS Tokyo & CAA Chubu Clearing Dynamics\nWeekly consignment volumes at USS Tokyo (exceeding 16,000 units per Thursday session) reveal that Condition Grade 5.0 and Grade S (delivery-mileage) units achieve an 84.2% first-pass hammer rate when equipped with factory options such as the JBL Reference audio suite, rear entertainment screens, and modelling aero packages.\n\n2. European Prestige Left-Hand-Drive Sourcing in Japan\nEuropean and GCC collectors are increasingly utilizing Japanese auctions to acquire low-mileage, dealer-serviced Left-Hand-Drive (LHD) Porsche 911 GT3 RS, Mercedes-Maybach S 680, and Ferrari models. Japan's strict Shaken inspection culture and climate-controlled garage ownership result in chassis and undercarriage preservation rarely matched in other markets.\n\n3. Direct Proxy Bidding Advantage\nVALQORA maintains permanent direct floor seats across 120+ Japanese auction terminals, providing institutional clients with translated auction sheets, physical pre-bid inspector walkarounds, and disciplined maximum-bid execution.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Hiroshi Sato',
                'author_role' => 'Chief Vehicle Evaluator, Japan Desk',
                'read_time_minutes' => 5,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(9),
                'view_count' => 1495,
            ],
            [
                'title' => 'Ro-Ro vs. Containerized Shipping: Optimizing Ocean Freight Economics and Transit Security',
                'slug' => 'roro-vs-containerized-shipping-logistics-guide',
                'category' => 'global_logistics',
                'excerpt' => 'Selecting the optimal maritime transport mode: comparative analysis of Roll-on/Roll-off vessel economics versus 20ft and 40ft High Cube sealed container transit.',
                'content' => "Executive Summary: Selecting the correct ocean transit method directly impacts both total landed cost (CIF) and physical asset security during deep-sea transit. This engineering and logistics briefing compares Pure Car and Truck Carrier (PCTC / Ro-Ro) operations against containerized 40HC multi-vehicle stowage.\n\n1. Roll-on / Roll-off (Ro-Ro) Vessel Economics\nRo-Ro remains the industry benchmark for single-unit passenger cars, SUVs, and heavy commercial machinery (excavators, buses, and fleet trucks). Vehicles are driven directly onto enclosed, weather-protected car decks at Yokohama, Kawasaki, Nagoya, or Kobe and secured via heavy-duty wheel lashing straps to deck recessed rings. Port handling charges (THC) and unstuffing fees at destination are minimized.\n\n2. 40ft High Cube (40HC) Container Consolidation\nFor ultra-luxury vehicles (FOB > $120,000) or multi-unit dealership orders (2 to 4 vehicles per container using certified steel racking systems), 40HC containerized shipping offers sealed tamper-evident security from VALQORA's Yokohama bonded yard directly to the buyer's customs warehouse. Every container is sealed with an ISO 17712 high-security bolt seal logged in the VALQORA Document Vault.\n\n3. Marine Cargo Insurance Underwriting\nUnder CIF Incoterms® 2020, VALQORA underwrites Institute Cargo Clauses (A) All-Risk marine insurance at 110% of CIF invoice value, covering total loss, general average, and port handling contingencies.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Elena Rostova',
                'author_role' => 'Head of Maritime Operations',
                'read_time_minutes' => 7,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(14),
                'view_count' => 1120,
            ],
            [
                'title' => 'Decoding Japanese Auction Sheets & Valqora 150-Point Pre-Export Verification Standards',
                'slug' => 'decoding-japanese-auction-sheets-150-point-inspection',
                'category' => 'buyers_guides',
                'excerpt' => 'How to interpret Japanese auction condition grades (S, 6, 5, 4.5, 4, R, RA), interior/exterior letter codes, and chassis map symbols like a professional trade director.',
                'content' => "Executive Summary: Transparency is the cornerstone of institutional vehicle procurement. While Japanese auto auctions utilize a standardized grading matrix, subtle notation nuances on handwritten inspector sheets can represent thousands of dollars in valuation difference.\n\n1. Exterior & Overall Numeric Grades Explained\n• Grade S / Grade 6: Brand-new or delivery-mileage condition (<1,000 km), factory paint, zero panel blemishes.\n• Grade 5.0: Exceptional near-new condition with negligible wear; eligible for flagship retail showroom display.\n• Grade 4.5: Very high quality used vehicle with minor cosmetic marks (A1/U1) consistent with low-mileage use.\n• Grade 4.0: Clean, well-maintained vehicle with standard mileage and minor touch-ups or pin dents.\n• Grade R / RA: Repaired history vehicle where one or more structural cross-members or panels have been replaced or straightened. VALQORA only sources Grade R units upon explicit written client directive with full structural laser-alignment disclosure.\n\n2. Chassis Map Symbols (A, U, W, S, C, XX)\n• A1 / A2 / A3: Scratch (small, medium, noticeable)\n• U1 / U2 / U3: Dent or dimple\n• W1 / W2: Repair wave or repaint mark (measured via digital paint-depth gauge)\n• S1 / S2: Surface oxidation vs. structural rust (C1/C2)\n• XX: Replaced exterior panel\n\n3. The VALQORA 150-Point Physical & OBD2 Audit\nBeyond the auction house sheet, VALQORA engineers perform an independent 150-point inspection at our Yokohama facility—including OBD2 ECU freeze-frame diagnostics, hybrid battery cell health testing, undercarriage lift inspection, and Geiger radiation verification.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Hiroshi Sato',
                'author_role' => 'Chief Vehicle Evaluator, Japan Desk',
                'read_time_minutes' => 9,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(19),
                'view_count' => 1950,
            ],
            [
                'title' => 'Commercial Fleet Procurement Guide: Structuring Letters of Credit (UCP 600) & Multi-Unit Allocations',
                'slug' => 'commercial-fleet-procurement-letters-of-credit-guide',
                'category' => 'buyers_guides',
                'excerpt' => 'Step-by-step institutional handbook for corporate fleet buyers, NGOs, and government contractors procuring 10 to 200+ utility and commercial vehicles under irrevocable L/C terms.',
                'content' => "Executive Summary: Institutional procurement of commercial fleets—such as Toyota Hilux 4x4 pickups, Land Cruiser 70-Series hardtops, HiAce commuter vans, and Isuzu N-Series refrigerated trucks—requires synchronized banking, inspection, and vessel chartering execution.\n\n1. Irrevocable Letter of Credit (UCP 600) Structuring\nVALQORA Global Trading accepts confirmed, irrevocable Letters of Credit at Sight issued by Tier-1 international correspondent banks. To prevent documentary discrepancies during bank negotiation, our trade finance desk provides standardized Proforma Invoices (PI) specifying exact WCO HS codes, latest shipment dates, partial shipment allowances, and required presentation documents (Full set of 3/3 Original Clean Shipped on Board Ocean Bills of Lading, Signed Commercial Invoice, Packing List, Certificate of Origin from Japan Chamber of Commerce, and JEVIC/SGS Pre-Shipment Inspection Certificate).\n\n2. Batch Inspection & Identical Specification Matching\nFor fleet orders of 10+ units, our sourcing algorithm aggregates matching model years, engine codes, and color specifications across Tokyo, Nagoya, Osaka, and Kyushu terminals, followed by uniform pre-delivery servicing (fluid replacement, tropicalized battery installation, and fleet decal/numbering preparation).\n\n3. Dedicated Vessel Space & Priority Discharge\nFleet consignments receive priority block stowage on NYK, MOL, and Wallenius Wilhelmsen Ro-Ro vessels, ensuring simultaneous port arrival and single-entry customs clearance.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Alexander Vance',
                'author_role' => 'Managing Director, Trade & Compliance',
                'read_time_minutes' => 7,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(24),
                'view_count' => 890,
            ],
            [
                'title' => 'European Prestige & LHD Collector Export Report: Sourcing German & Italian Flagships from Japan & EU',
                'slug' => 'european-prestige-lhd-collector-export-report',
                'category' => 'market_intelligence',
                'excerpt' => 'Why discerning collectors and luxury dealerships in Dubai, Riyadh, and Europe source Left-Hand-Drive Porsche, Mercedes-Maybach, and Ferrari allocations through Tokyo and Frankfurt.',
                'content' => "Executive Summary: Japan has long been a premier sanctuary for ultra-low-mileage Left-Hand-Drive (LHD) European luxury and performance automobiles. Coupled with VALQORA's Frankfurt procurement desk, buyers gain dual-hemisphere access to rare collector and executive specifications.\n\n1. The Japanese LHD Prestige Phenomenon\nHistorically, ordering a Left-Hand-Drive Porsche 911, Mercedes-AMG G 63, or Ferrari in Tokyo has been a hallmark of status among Japanese collectors. These vehicles average fewer than 3,000 kilometers per year, are stored in dehumidified subterranean garages, and receive meticulous main-dealer servicing.\n\n2. Direct European Export & VAT Reclamation\nThrough our European desk, VALQORA also sources net-of-VAT (19% German MwSt export-reclaimable) brand-new and executive lease-return vehicles directly from authorized German franchise networks, coordinating enclosed transporter delivery to Bremerhaven or Rotterdam for immediate ocean or air-freight dispatch.\n\n3. Bespoke Paint-Depth & Provenance Dossier\nEvery prestige vehicle above $100,000 FOB includes a micron-by-micron ultrasonic paint-depth map, full dealer service book verification, spare key & tool-kit inventory, and 4K cold-start and undercarriage video prior to reservation.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Marcus Lindqvist',
                'author_role' => 'Director, European & Prestige Division',
                'read_time_minutes' => 6,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(29),
                'view_count' => 1360,
            ],
            [
                'title' => 'Biosecurity, Radiation & Pre-Export Sanitization Protocols for Australia, New Zealand & Oceania',
                'slug' => 'biosecurity-radiation-sanitization-protocols-oceania',
                'category' => 'global_logistics',
                'excerpt' => 'Meeting strict DAFF (Australia) and MPI (New Zealand) biosecurity quarantine standards, BMSB seasonal heat treatment, and JEVIC border clearance on the first pass.',
                'content' => "Executive Summary: Oceania represents one of the world's most sophisticated import markets for Japanese domestic market (JDM) hybrids, people-movers, and performance vehicles—and also enforces the strictest biosecurity quarantine protocols on earth.\n\n1. Zero-Tolerance Biosecurity Decontamination\nBefore any vehicle bound for Brisbane, Sydney, Melbourne, Fremantle, or Auckland leaves our Yokohama export facility, it undergoes complete interior, undercarriage, wheel-arch, and engine-bay high-pressure steam sanitization to eliminate soil, plant seeds, and organic matter.\n\n2. Brown Marmorated Stink Bug (BMSB) Seasonal Fumigation\nDuring the mandatory BMSB heightened biosecurity season (September through April), all cargo undergoes approved Sulfuryl Fluoride fumigation or heat treatment at accredited port chambers in Japan, preventing costly re-export orders or port quarantine delays upon arrival in Australia or New Zealand.\n\n3. MPI & DAFF First-Pass Clearance KPI\nThanks to our dedicated pre-shipment decontamination line and off-shore JEVIC/ATJ border inspection integration, VALQORA maintains a 99.6% first-pass biosecurity clearance rate across Australian and New Zealand ports.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Elena Rostova',
                'author_role' => 'Head of Maritime Operations',
                'read_time_minutes' => 6,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(35),
                'view_count' => 820,
            ],
            [
                'title' => 'Valqora Expands Cryptographic QR Document Vault & Real-Time 10-Stage Control Tower Telemetry',
                'slug' => 'valqora-expands-cryptographic-qr-document-vault-control-tower',
                'category' => 'corporate_news',
                'excerpt' => 'Institutional announcement: All Valqora Bills of Lading, Commercial Invoices, and 150-Point Inspection Certificates now feature cryptographic SHA-256 QR verification and live AIS vessel telemetry.',
                'content' => "Executive Summary: VALQORA Global Trading has completed the global rollout of its next-generation Cryptographic Document Vault and 10-Stage Maritime Control Tower across our Tokyo, Yokohama, Dubai, and Frankfurt operations.\n\n1. Eliminating Documentary Fraud in Cross-Border Trade\nEvery official document issued by VALQORA—including Proforma Invoices, Commercial Invoices, Export Deregistration Translations, 150-Point Inspection Certificates, and Ocean Bills of Lading—is now embedded with a unique cryptographic verification code and QR seal. Customs officers, correspondent banks, and buyers can verify document authenticity in real time via the VALQORA Document Vault.\n\n2. 10-Stage End-to-End Shipment Visibility\nClients logging into the Customer Ownership Portal or Authorized Dealer Portal now receive automated milestone telemetry across all 10 stages of export execution: from Auction Acquisition and Yard Arrival to 150-Point Inspection, MLIT Deregistration, Customs Stamping, Vessel Loading, Ocean Transit AIS Position, Port Berthing, and Final Release.\n\n3. Commitment to Institutional Governance\nThis digital infrastructure investment reinforces VALQORA's core operating principle: discipline rather than discounting, delivering institutional-grade transparency on every cross-border transaction.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Alexander Vance',
                'author_role' => 'Managing Director, Trade & Compliance',
                'read_time_minutes' => 4,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(40),
                'view_count' => 1640,
            ],
        ];

        foreach ($articles as $art) {
            Article::updateOrCreate(['slug' => $art['slug']], $art);
        }
    }

    public static function getCountryRegulations(): array
    {
        return [
            [
                'country' => 'Bangladesh',
                'code' => 'BD',
                'ports' => 'Chittagong (Chattogram) & Mongla',
                'steering' => 'Right-Hand Drive (RHD)',
                'age_limit' => 'Max 5 Years from Model Year',
                'inspection_body' => 'JEVIC / JAAI Pre-Shipment Certified',
                'duty_notes' => 'Yellow Book depreciation scale; preferential supplementary duty slabs for Hybrid (<1,800cc) & microbus units.',
                'transit_days' => '18–22 Days',
                'filter_country' => 'Japan',
            ],
            [
                'country' => 'United Arab Emirates',
                'code' => 'AE',
                'ports' => 'Jebel Ali (Dubai) & Khalifa Port',
                'steering' => 'Left-Hand Drive (LHD) / RHD Re-Export',
                'age_limit' => 'Max 10 Years (Direct Import) / Open for Freezone Re-Export',
                'inspection_body' => 'GSO 42/2015 CoC & RTA Technical Test',
                'duty_notes' => '5% GCC Customs Duty + 5% VAT on CIF value; zero re-export duty inside JAFZA / Ducamz freezones.',
                'transit_days' => '20–24 Days',
                'filter_country' => 'United Arab Emirates',
            ],
            [
                'country' => 'Kenya',
                'code' => 'KE',
                'ports' => 'Port of Mombasa',
                'steering' => 'Right-Hand Drive (RHD) Strictly Mandatory',
                'age_limit' => 'Max 8 Years from Year of First Registration',
                'inspection_body' => 'QISJ / JEVIC (KEBS KS 1515:2000 CoR)',
                'duty_notes' => 'CRSP valuation schedule; Import Duty (25%), Excise Duty, VAT (16%), IDF & RDL port levies.',
                'transit_days' => '21–26 Days',
                'filter_country' => 'Japan',
            ],
            [
                'country' => 'United Kingdom',
                'code' => 'GB',
                'ports' => 'Southampton, Bristol & Newcastle',
                'steering' => 'Right-Hand Drive (RHD) / Collector LHD',
                'age_limit' => 'No Age Limit (IVA Required Under 10 Years)',
                'inspection_body' => 'DVSA IVA / MOT & NOVA Customs Declaration',
                'duty_notes' => 'UK-Japan CEPA preferential tariff rates; 20% VAT (5% Vat & 0% Duty on qualifying 30+ year historic classics).',
                'transit_days' => '35–42 Days',
                'filter_country' => 'Japan',
            ],
            [
                'country' => 'Australia',
                'code' => 'AU',
                'ports' => 'Brisbane, Sydney, Melbourne & Fremantle',
                'steering' => 'Right-Hand Drive (RHD)',
                'age_limit' => 'SEVS Eligible Models or 25+ Years Classic Rule',
                'inspection_body' => 'DAFF Biosecurity + ROVER RAW Approval',
                'duty_notes' => '0% Customs Duty on Japanese-origin vehicles under JAEPA; 10% GST + LCT above luxury threshold.',
                'transit_days' => '14–18 Days',
                'filter_country' => 'Japan',
            ],
            [
                'country' => 'New Zealand',
                'code' => 'NZ',
                'ports' => 'Auckland, Lyttelton & Wellington',
                'steering' => 'Right-Hand Drive (RHD)',
                'age_limit' => 'Open (Must Meet Euro 4 / JPN 2005+ Emissions & ESC)',
                'inspection_body' => 'JEVIC / ATJ Border Biosecurity & VTNZ Entry Cert',
                'duty_notes' => '0% Import Duty + 15% GST on landed CIF cost; Clean Car Standard CO2 account compliance.',
                'transit_days' => '16–20 Days',
                'filter_country' => 'Japan',
            ],
            [
                'country' => 'Saudi Arabia',
                'code' => 'SA',
                'ports' => 'Jeddah Islamic Port & King Abdulaziz Port (Dammam)',
                'steering' => 'Left-Hand Drive (LHD) Strictly Mandatory',
                'age_limit' => 'Max 5 Years (Passenger Cars) / 30+ Years Classic',
                'inspection_body' => 'SASO SALEEM Certificate & SLS Energy Efficiency',
                'duty_notes' => '5% Customs Duty + 15% VAT on CIF valuation; mandatory SASO Energy Efficiency Card prior to shipping.',
                'transit_days' => '22–26 Days',
                'filter_country' => 'Germany',
            ],
            [
                'country' => 'South Africa',
                'code' => 'ZA',
                'ports' => 'Port of Durban (Direct & Transit Corridor)',
                'steering' => 'Right-Hand Drive (RHD)',
                'age_limit' => 'ITAC Import Permit (Collector/Special) or SADC Transit',
                'inspection_body' => 'LOA NRCS & JEVIC Pre-Shipment Verification',
                'duty_notes' => 'Durban serves as primary bonded transit hub for Botswana, Zimbabwe, Zambia, and Malawi consignments.',
                'transit_days' => '24–28 Days',
                'filter_country' => 'Japan',
            ],
        ];
    }

    public static function getCategoriesWithCounts(): array
    {
        $counts = Article::where('is_published', true)
            ->selectRaw('category, count(*) as total')
            ->groupBy('category')
            ->pluck('total', 'category');

        $defs = [
            ['id' => 'market_intelligence', 'name' => 'Market Intelligence'],
            ['id' => 'regulatory_updates', 'name' => 'Regulatory & Tariffs'],
            ['id' => 'auction_trends', 'name' => 'Auction Trends'],
            ['id' => 'global_logistics', 'name' => 'Global Logistics'],
            ['id' => 'buyers_guides', 'name' => 'Buyer & Import Guides'],
            ['id' => 'corporate_news', 'name' => 'Corporate Announcements'],
        ];

        return array_map(function ($cat) use ($counts) {
            $cat['count'] = (int) ($counts[$cat['id']] ?? 0);

            return $cat;
        }, $defs);
    }

    public function index(Request $request): Response
    {
        self::ensureSeeded();

        $query = Article::where('is_published', true);

        $category = $request->input('category');
        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        $search = trim((string) ($request->input('q', $request->input('search', ''))));
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhere('author_name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $sort = $request->input('sort', 'latest');
        match ($sort) {
            'popular' => $query->orderByDesc('view_count')->latest('published_at'),
            'read_time' => $query->orderBy('read_time_minutes', 'asc')->latest('published_at'),
            default => $query->latest('published_at'),
        };

        $articles = $query->paginate(9)->withQueryString();

        $featuredArticle = Article::where('is_published', true)
            ->where('is_featured', true)
            ->latest('published_at')
            ->first() ?: Article::where('is_published', true)->latest('published_at')->first();

        return Inertia::render('Insights/Index', [
            'articles' => $articles,
            'featuredArticle' => $featuredArticle,
            'currentCategory' => $category ?: null,
            'searchQuery' => $search,
            'currentSort' => $sort,
            'categories' => self::getCategoriesWithCounts(),
            'countryRegulations' => self::getCountryRegulations(),
            'totalArticles' => Article::where('is_published', true)->count(),
        ]);
    }

    public function show(string $slug): Response
    {
        self::ensureSeeded();

        $article = Article::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $article->increment('view_count');

        $relatedArticles = Article::where('id', '!=', $article->id)
            ->where('is_published', true)
            ->orderByRaw('CASE WHEN category = ? THEN 0 ELSE 1 END', [$article->category])
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Insights/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
            'categories' => self::getCategoriesWithCounts(),
            'countryRegulations' => self::getCountryRegulations(),
        ]);
    }
}
