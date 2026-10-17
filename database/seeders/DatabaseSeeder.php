<?php

namespace Database\Seeders;

use App\Models\User;
use App\Modules\CMS\Models\Article;
use App\Modules\Core\Models\Port;
use App\Modules\Document\Models\TradeDocument;
use App\Modules\Inquiry\Models\Inquiry;
use App\Modules\Logistics\Models\Shipment;
use App\Modules\Logistics\Models\ShipmentMilestone;
use App\Modules\Quotation\Models\Quotation;
use App\Modules\Quotation\Models\SourcingRequest;
use App\Modules\Vehicle\Models\Vehicle;
use App\Modules\Vehicle\Models\VehicleImage;
use App\Modules\Vehicle\Models\VehicleInspection;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Users & Roles
        $admin = User::firstOrCreate(
            ['email' => 'admin@valqora.com'],
            [
                'name' => 'Alexander Vance',
                'role' => 'admin',
                'company_name' => 'VALQORA Global Trading LLC',
                'phone' => '+81 3 5555 0192',
                'country' => 'Japan',
                'tax_vat_number' => 'JP-889102488',
                'preferred_currency' => 'USD',
                'status' => 'active',
                'password' => Hash::make('Valqora2026!'),
            ]
        );

        $dealer = User::firstOrCreate(
            ['email' => 'dealer@tokyomotors.jp'],
            [
                'name' => 'Kenji Takahashi',
                'role' => 'dealer',
                'company_name' => 'Tokyo Prestige Motors Consortium',
                'phone' => '+81 45 882 1990',
                'country' => 'Japan',
                'tax_vat_number' => 'JP-332901140',
                'preferred_currency' => 'JPY',
                'status' => 'active',
                'password' => Hash::make('Valqora2026!'),
            ]
        );

        $customer = User::firstOrCreate(
            ['email' => 'buyer@alrashid-auto.ae'],
            [
                'name' => 'Tariq Al-Mansoor',
                'role' => 'customer',
                'company_name' => 'Al-Mansoor Private Collection',
                'phone' => '+971 4 390 1284',
                'country' => 'United Arab Emirates',
                'tax_vat_number' => 'AE-100293847200003',
                'preferred_currency' => 'AED',
                'status' => 'active',
                'password' => Hash::make('Valqora2026!'),
            ]
        );

        $supplier = User::firstOrCreate(
            ['email' => 'consignor@globalfleet.de'],
            [
                'name' => 'Maximilian von Richter',
                'role' => 'supplier',
                'company_name' => 'Richter Automobil Logistics GmbH',
                'phone' => '+49 89 2442 810',
                'country' => 'Germany',
                'tax_vat_number' => 'DE-289410982',
                'preferred_currency' => 'EUR',
                'status' => 'active',
                'password' => Hash::make('Valqora2026!'),
            ]
        );

        // 2. Global Trade Ports
        $portsData = [
            [
                'name' => 'Port of Jebel Ali, Dubai',
                'code' => 'AEJEA',
                'country' => 'United Arab Emirates',
                'region' => 'Middle East',
                'transit_days_from_japan' => 20,
                'standard_roro_freight_usd' => 1950.00,
                'standard_container_freight_usd' => 3800.00,
            ],
            [
                'name' => 'Port of Yokohama',
                'code' => 'JPYOK',
                'country' => 'Japan',
                'region' => 'Asia Pacific',
                'transit_days_from_japan' => 0,
                'standard_roro_freight_usd' => 0.00,
                'standard_container_freight_usd' => 0.00,
            ],
            [
                'name' => 'Port of Bremerhaven',
                'code' => 'DEBRV',
                'country' => 'Germany',
                'region' => 'Europe',
                'transit_days_from_japan' => 32,
                'standard_roro_freight_usd' => 2400.00,
                'standard_container_freight_usd' => 4200.00,
            ],
            [
                'name' => 'Port of Rotterdam',
                'code' => 'NLRTM',
                'country' => 'Netherlands',
                'region' => 'Europe',
                'transit_days_from_japan' => 34,
                'standard_roro_freight_usd' => 2350.00,
                'standard_container_freight_usd' => 4150.00,
            ],
            [
                'name' => 'Port of Mombasa (Kilindini)',
                'code' => 'KEMBA',
                'country' => 'Kenya',
                'region' => 'Africa',
                'transit_days_from_japan' => 24,
                'standard_roro_freight_usd' => 2100.00,
                'standard_container_freight_usd' => 3950.00,
            ],
            [
                'name' => 'Port of Singapore',
                'code' => 'SGSIN',
                'country' => 'Singapore',
                'region' => 'Asia Pacific',
                'transit_days_from_japan' => 10,
                'standard_roro_freight_usd' => 1250.00,
                'standard_container_freight_usd' => 2600.00,
            ],
            [
                'name' => 'Port of Auckland',
                'code' => 'NZAKL',
                'country' => 'New Zealand',
                'region' => 'Asia Pacific',
                'transit_days_from_japan' => 18,
                'standard_roro_freight_usd' => 2050.00,
                'standard_container_freight_usd' => 3700.00,
            ],
            [
                'name' => 'Port of Houston',
                'code' => 'USHOU',
                'country' => 'United States',
                'region' => 'Americas',
                'transit_days_from_japan' => 28,
                'standard_roro_freight_usd' => 2650.00,
                'standard_container_freight_usd' => 4600.00,
            ],
        ];

        foreach ($portsData as $p) {
            Port::updateOrCreate(['code' => $p['code']], $p);
        }

        // 3. Vehicles Inventory
        $vehiclesData = [
            [
                'stock_id' => 'VQ-2026-901',
                'title' => '2025 Mercedes-Maybach S 680 4MATIC Sedan',
                'slug' => '2025-mercedes-maybach-s-680-4matic',
                'make' => 'Mercedes-Benz',
                'model' => 'Maybach S 680',
                'year' => 2025,
                'body_type' => 'Sedan',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'drive_type' => 'AWD',
                'steering' => 'LHD',
                'engine_cc' => 5980,
                'doors' => 4,
                'seats' => 4,
                'mileage_km' => 120,
                'exterior_color' => 'Two-Tone Obsidian Black / Mojave Silver',
                'interior_color' => 'Exclusive Nappa Leather Deep White',
                'vin_chassis' => 'W1K2231761A098212',
                'location_country' => 'Germany',
                'location_city' => 'Stuttgart',
                'fob_price_usd' => 239500.00,
                'cif_estimate_usd' => 244200.00,
                'status' => 'available',
                'condition_grade' => 'Grade S (Brand New)',
                'is_featured' => true,
                'is_verified' => true,
                'overview' => 'The ultimate expression of automotive luxury and supreme craftsmanship. Powered by a handcrafted 6.0L V12 biturbo engine producing 621 hp, featuring First-Class rear suite with calf massage, silver-plated champagne flutes, active road noise cancellation, and Burmester High-End 4D surround sound.',
                'features' => ['Executive Rear Seating Package', 'Burmester High-End 4D Sound', 'Rear-Axle Steering 4.5 Degree', 'E-Active Body Control', 'Active Ambient Lighting', 'MBUX High-End Rear Entertainment', 'Refrigerated Compartment', 'MAGIC VISION CONTROL'],
                'specifications' => [
                    'Horsepower' => '621 hp @ 5,250 rpm',
                    'Torque' => '900 Nm @ 2,000-4,000 rpm',
                    '0-100 km/h' => '4.5 seconds',
                    'Top Speed' => '250 km/h (electronically limited)',
                    'Transmission' => '9G-TRONIC 9-Speed Automatic',
                    'Fuel Capacity' => '76 Liters',
                    'Curb Weight' => '2,350 kg',
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'stock_id' => 'VQ-2026-902',
                'title' => '2024 Porsche 911 GT3 RS (Weissach Package)',
                'slug' => '2024-porsche-911-gt3-rs-weissach',
                'make' => 'Porsche',
                'model' => '911 GT3 RS',
                'year' => 2024,
                'body_type' => 'Coupe',
                'fuel_type' => 'Petrol',
                'transmission' => 'DCT',
                'drive_type' => 'RWD',
                'steering' => 'LHD',
                'engine_cc' => 3996,
                'doors' => 2,
                'seats' => 2,
                'mileage_km' => 1450,
                'exterior_color' => 'Guards Red with Carbon Aerodynamics',
                'interior_color' => 'Black Leather & Race-Tex with Guards Red Stitching',
                'vin_chassis' => 'WP0AF2A99RS192831',
                'location_country' => 'Germany',
                'location_city' => 'Bremerhaven',
                'fob_price_usd' => 385000.00,
                'cif_estimate_usd' => 391500.00,
                'status' => 'available',
                'condition_grade' => 'Grade 5.0 (Pristine)',
                'is_featured' => true,
                'is_verified' => true,
                'overview' => 'Track-bred weapon engineered for pure motorsport dominance. Equipped with the complete factory Weissach Package including carbon fiber anti-roll bars, magnesium lightweight forged wheels, active DRS aerodynamics, and titanium roll cage.',
                'features' => ['Weissach Package', 'Magnesium Lightweight Forged Wheels', 'Porsche Ceramic Composite Brakes (PCCB)', 'Front Axle Lift System', 'LED Matrix Main Headlights with PDLS Plus', 'Chrono Package with Lap Trigger', 'Carbon Fiber Full Bucket Seats'],
                'specifications' => [
                    'Horsepower' => '518 hp @ 8,500 rpm',
                    'Torque' => '465 Nm @ 6,300 rpm',
                    '0-100 km/h' => '3.2 seconds',
                    'Top Speed' => '296 km/h',
                    'Downforce' => '860 kg @ 285 km/h',
                    'Weight' => '1,450 kg',
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'stock_id' => 'VQ-2026-903',
                'title' => '2024 Toyota Land Cruiser 300 ZX Twin Turbo',
                'slug' => '2024-toyota-land-cruiser-300-zx',
                'make' => 'Toyota',
                'model' => 'Land Cruiser 300 ZX',
                'year' => 2024,
                'body_type' => 'SUV',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'drive_type' => '4WD',
                'steering' => 'RHD',
                'engine_cc' => 3444,
                'doors' => 5,
                'seats' => 7,
                'mileage_km' => 3800,
                'exterior_color' => 'Precious White Pearl (090)',
                'interior_color' => 'Neutral Beige Semi-Aniline Leather',
                'vin_chassis' => 'FJA300-0019284',
                'location_country' => 'Japan',
                'location_city' => 'Yokohama',
                'fob_price_usd' => 88500.00,
                'cif_estimate_usd' => 92400.00,
                'status' => 'available',
                'condition_grade' => 'Grade 5.0 (Like New)',
                'is_featured' => true,
                'is_verified' => true,
                'overview' => 'The King of All Terrains. Flagship ZX trim featuring 3.5L V6 Twin Turbo (V35A-FTS), Electronic Kinetic Dynamic Suspension System (E-KDSS), Multi-Terrain Select, JBL 14-Speaker Premium Sound, dual rear seat entertainment screens, and Cool Box.',
                'features' => ['ZX Full Model Grade', 'JBL 14-Speaker Audio', 'Rear Seat Entertainment Dual 11.6"', 'Multi-Terrain Monitor 360', 'Cool Box', 'Sunroof', 'Head-Up Display', 'Hands-Free Power Backdoor'],
                'specifications' => [
                    'Horsepower' => '409 hp @ 5,200 rpm',
                    'Torque' => '650 Nm @ 2,000-3,600 rpm',
                    'Transmission' => 'Direct Shift 10-Speed Automatic',
                    'Drive System' => 'Full-time 4WD with Torsen LSD',
                    'Ground Clearance' => '235 mm',
                    'Towing Capacity' => '3,500 kg',
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'stock_id' => 'VQ-2026-904',
                'title' => '2024 Lexus LX 600 VIP 4-Seater Ultra Luxury',
                'slug' => '2024-lexus-lx-600-vip-ultra-luxury',
                'make' => 'Lexus',
                'model' => 'LX 600 VIP',
                'year' => 2024,
                'body_type' => 'SUV',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'drive_type' => 'AWD',
                'steering' => 'LHD',
                'engine_cc' => 3444,
                'doors' => 5,
                'seats' => 4,
                'mileage_km' => 2200,
                'exterior_color' => 'Sonic Titanium (1J7)',
                'interior_color' => 'Sunflare Semi-Aniline Leather with Takanoha Wood',
                'vin_chassis' => 'JTJJA7BX7P4019284',
                'location_country' => 'United Arab Emirates',
                'location_city' => 'Dubai',
                'fob_price_usd' => 148000.00,
                'cif_estimate_usd' => 152500.00,
                'status' => 'available',
                'condition_grade' => 'Grade 5.0 (Pristine)',
                'is_featured' => true,
                'is_verified' => true,
                'overview' => 'Executive level mobile boardroom with bespoke rear captain chairs providing 48 degrees of recline, deployable ottoman, Mark Levinson Reference 25-speaker 3D surround sound, and active height control suspension.',
                'features' => ['VIP 4-Seat Executive Configuration', 'Mark Levinson 25-Speaker 2400W 3D Sound', 'Rear Ottoman with Massage Function', 'Active Height Control (AHC)', 'BladeScan Adaptive High-beam', 'Wireless Charging Tray Front & Rear'],
                'specifications' => [
                    'Horsepower' => '409 hp @ 5,200 rpm',
                    'Torque' => '650 Nm @ 2,000-3,600 rpm',
                    'Transmission' => '10-Speed Sport Direct-Shift',
                    'Dimensions' => '5,100 mm x 1,990 mm x 1,885 mm',
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'stock_id' => 'VQ-2026-905',
                'title' => '2024 Toyota Alphard Executive Lounge 2.5 Hybrid',
                'slug' => '2024-toyota-alphard-executive-lounge-hybrid',
                'make' => 'Toyota',
                'model' => 'Alphard Executive Lounge',
                'year' => 2024,
                'body_type' => 'Commercial',
                'fuel_type' => 'Hybrid',
                'transmission' => 'Automatic',
                'drive_type' => 'AWD',
                'steering' => 'RHD',
                'engine_cc' => 2487,
                'doors' => 5,
                'seats' => 7,
                'mileage_km' => 850,
                'exterior_color' => 'Black (202)',
                'interior_color' => 'Premium Nappa Black with Uzuramoku Wood',
                'vin_chassis' => 'AAHH45-0004921',
                'location_country' => 'Japan',
                'location_city' => 'Nagoya',
                'fob_price_usd' => 79500.00,
                'cif_estimate_usd' => 83200.00,
                'status' => 'available',
                'condition_grade' => 'Grade 5.0 (Delivery Mileage)',
                'is_featured' => true,
                'is_verified' => true,
                'overview' => 'The premier VIP passenger carrier revered across East Asia and the Gulf. 4th generation Alphard with TNGA (GA-K) chassis, second row Ottoman Power Seats with detachable smartphone-sized remote controllers, and panoramic moonroof.',
                'features' => ['Executive Lounge Grade', 'E-Four Electric 4WD', 'Dual Panoramic Moonroofs', 'JBL Sound 15 Speakers', '14-inch Rear Seat Entertainment Screen', 'Active Noise Control'],
                'specifications' => [
                    'Powertrain' => '2.5L Dynamic Force + Hybrid E-Four',
                    'System Power' => '250 hp',
                    'Fuel Economy' => '17.5 km/L (WLTC)',
                    'Transmission' => 'e-CVT',
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'stock_id' => 'VQ-2026-906',
                'title' => '2024 Land Rover Defender 110 V8 Carpathian Edition',
                'slug' => '2024-land-rover-defender-110-v8-carpathian',
                'make' => 'Land Rover',
                'model' => 'Defender 110 V8',
                'year' => 2024,
                'body_type' => 'SUV',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'drive_type' => 'AWD',
                'steering' => 'LHD',
                'engine_cc' => 4999,
                'doors' => 5,
                'seats' => 5,
                'mileage_km' => 4200,
                'exterior_color' => 'Carpathian Grey Satin with Narvik Black Contrast',
                'interior_color' => 'Ebony Windsor Leather with Dinamica Suedecloth',
                'vin_chassis' => 'SALWR2V44P2019821',
                'location_country' => 'United Arab Emirates',
                'location_city' => 'Dubai',
                'fob_price_usd' => 128000.00,
                'cif_estimate_usd' => 132400.00,
                'status' => 'available',
                'condition_grade' => 'Grade 4.8',
                'is_featured' => false,
                'is_verified' => true,
                'overview' => 'Iconic silhouette packed with 518 hp supercharged V8 power. Features quad outboard-mounted exhaust pipes, satin protective film, illuminated metal treadplates, and Meridian Surround Sound System.',
                'features' => ['Carpathian Edition Exclusive', 'Electronic Active Differential with Torque Vectoring', 'Terrain Response 2 with Dynamic Program', '22-inch Style 5098 Gloss Black Wheels', 'Head-Up Display', 'Meridian Surround Sound 700W'],
                'specifications' => [
                    'Horsepower' => '518 hp @ 6,000 rpm',
                    'Torque' => '625 Nm @ 2,500-5,500 rpm',
                    '0-100 km/h' => '5.2 seconds',
                    'Wading Depth' => '900 mm',
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1541348263662-e0c82661210e?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'stock_id' => 'VQ-2026-907',
                'title' => '2024 BMW M8 Competition Gran Coupe',
                'slug' => '2024-bmw-m8-competition-gran-coupe',
                'make' => 'BMW',
                'model' => 'M8 Competition',
                'year' => 2024,
                'body_type' => 'Sedan',
                'fuel_type' => 'Petrol',
                'transmission' => 'Automatic',
                'drive_type' => 'AWD',
                'steering' => 'LHD',
                'engine_cc' => 4395,
                'doors' => 4,
                'seats' => 5,
                'mileage_km' => 6100,
                'exterior_color' => 'Isle of Man Green Metallic',
                'interior_color' => 'Full Merino Leather Silverstone / Black',
                'vin_chassis' => 'WBA83GV05PCP91024',
                'location_country' => 'Germany',
                'location_city' => 'Munich',
                'fob_price_usd' => 119000.00,
                'cif_estimate_usd' => 123800.00,
                'status' => 'available',
                'condition_grade' => 'Grade 4.5',
                'is_featured' => false,
                'is_verified' => true,
                'overview' => 'High-performance four-door luxury rocket equipped with 4.4L TwinPower Turbo V8 delivering 617 hp, M xDrive with selectable rear-wheel-drive drift mode, M Carbon Ceramic brakes, and Bowers & Wilkins Diamond surround sound.',
                'features' => ['M Competition Package', 'M Carbon Ceramic Brakes', 'Bowers & Wilkins Diamond Surround', 'Carbon Core Construction', 'BMW Laserlight', 'M Sport Exhaust System'],
                'specifications' => [
                    'Horsepower' => '617 hp @ 6,000 rpm',
                    'Torque' => '750 Nm @ 1,800-5,860 rpm',
                    '0-100 km/h' => '3.2 seconds',
                    'Top Speed' => '305 km/h with M Driver Package',
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
            [
                'stock_id' => 'VQ-2026-908',
                'title' => '2024 Isuzu Forward FTR Heavy Duty Cargo Truck',
                'slug' => '2024-isuzu-forward-ftr-heavy-duty-cargo',
                'make' => 'Isuzu',
                'model' => 'Forward FTR',
                'year' => 2024,
                'body_type' => 'Commercial',
                'fuel_type' => 'Diesel',
                'transmission' => 'Manual',
                'drive_type' => 'RWD',
                'steering' => 'RHD',
                'engine_cc' => 5193,
                'doors' => 2,
                'seats' => 3,
                'mileage_km' => 15200,
                'exterior_color' => 'Pure White with Heavy Aluminum Wing Bed',
                'interior_color' => 'Heavy Duty Industrial Grey',
                'vin_chassis' => 'FTR90-7001920',
                'location_country' => 'Japan',
                'location_city' => 'Yokohama',
                'fob_price_usd' => 44500.00,
                'cif_estimate_usd' => 49200.00,
                'status' => 'available',
                'condition_grade' => 'Grade 4.0 (Commercial Ready)',
                'is_featured' => false,
                'is_verified' => true,
                'overview' => 'Japanese domestic commercial workhorse ready for international export. Equipped with Isuzu 4HK1-TCH high-torque common-rail turbo diesel, aluminum wing side-opening body for swift forklift loading, exhaust brake, and air suspension cab.',
                'features' => ['Full Aluminum Wing Body', 'Automatic Tail Lift 1000kg', 'Pre-Crash Safety System', 'Lane Departure Warning', 'Air Suspension Driver Seat', 'Digital Tachograph Prepared'],
                'specifications' => [
                    'Payload Capacity' => '4,000 kg',
                    'Gross Vehicle Weight' => '7,990 kg',
                    'Engine' => '4HK1-TCH 5.2L Turbo Diesel',
                    'Transmission' => '6-Speed Manual',
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80',
                ],
            ],
        ];

        foreach ($vehiclesData as $vData) {
            $images = $vData['images'];
            unset($vData['images']);

            $vehicle = Vehicle::updateOrCreate(['stock_id' => $vData['stock_id']], $vData);

            // Seed images
            foreach ($images as $idx => $imgUrl) {
                VehicleImage::updateOrCreate(
                    ['vehicle_id' => $vehicle->id, 'url' => $imgUrl],
                    [
                        'is_primary' => $idx === 0,
                        'sort_order' => $idx,
                        'category' => $idx === 0 ? 'exterior' : ($idx === 1 ? 'interior' : 'detail'),
                        'caption' => $vehicle->title.' - Perspective '.($idx + 1),
                    ]
                );
            }

            // Seed inspection report
            VehicleInspection::updateOrCreate(
                ['vehicle_id' => $vehicle->id],
                [
                    'overall_grade' => str_contains($vehicle->condition_grade, 'Grade S') ? '5.0' : (str_contains($vehicle->condition_grade, '5.0') ? '5.0' : '4.5'),
                    'chassis_score' => 4.9,
                    'engine_score' => 5.0,
                    'interior_score' => 4.8,
                    'exterior_score' => 4.7,
                    'electronics_score' => 4.9,
                    'inspector_name' => 'Hiroshi Sato (Licensed Inspector #JEVIC-491)',
                    'inspection_date' => Carbon::now()->subDays(rand(3, 20))->toDateString(),
                    'odometer_verified' => true,
                    'accident_free' => true,
                    'flood_damage_free' => true,
                    'summary_notes' => 'Rigorous 160-point mechanical and physical inspection completed. No structural compromises or panel replacements detected. Computer diagnostics confirm zero fault codes across ECU and ABS.',
                    'detailed_checklist' => [
                        'Chassis Structural Alignment' => 'Factory Tolerances Met',
                        'Tire Tread Depth' => '95% Remaining (Michelin Pilot Sport)',
                        'Brake Rotor & Pad Life' => '92% Remaining',
                        'Engine Compression' => 'Uniform Across All Cylinders',
                        'Transmission Fluid State' => 'Clean / Factory Specification',
                        'Air Conditioning & Climate' => 'Operating At Nominal 4.2°C Output',
                    ],
                    'report_pdf_url' => '/documents/inspection-sample.pdf',
                ]
            );
        }

        // 4. Sourcing Request Sample
        $firstVehicle = Vehicle::first();
        $sourcingReq = SourcingRequest::updateOrCreate(
            ['reference_no' => 'VQ-SRC-2026-104'],
            [
                'user_id' => $customer->id,
                'contact_name' => 'Tariq Al-Mansoor',
                'contact_email' => 'buyer@alrashid-auto.ae',
                'contact_phone' => '+971 4 390 1284',
                'company_name' => 'Al-Mansoor Private Collection',
                'category' => 'luxury',
                'target_make' => 'Mercedes-Benz',
                'target_model' => 'Maybach S 680',
                'year_min' => 2024,
                'year_max' => 2025,
                'steering' => 'lhd',
                'transmission' => 'automatic',
                'fuel_type' => 'petrol',
                'max_budget_usd' => 250000.00,
                'destination_country' => 'United Arab Emirates',
                'destination_port' => 'Port of Jebel Ali, Dubai',
                'timeline' => 'immediate',
                'additional_specifications' => 'Must have Executive rear lounge package, champagne flutes, low delivery mileage only, zero repaints.',
                'status' => 'quoted',
            ]
        );

        // 5. Quotation Sample
        $quote = Quotation::updateOrCreate(
            ['quotation_no' => 'VQ-QT-2026-8841'],
            [
                'user_id' => $customer->id,
                'sourcing_request_id' => $sourcingReq->id,
                'vehicle_id' => $firstVehicle->id,
                'customer_name' => 'Tariq Al-Mansoor',
                'customer_email' => 'buyer@alrashid-auto.ae',
                'customer_phone' => '+971 4 390 1284',
                'customer_company' => 'Al-Mansoor Private Collection',
                'incoterm' => 'CIF',
                'vehicle_price_usd' => 239500.00,
                'freight_cost_usd' => 1950.00,
                'marine_insurance_usd' => 1150.00,
                'documentation_inspection_usd' => 650.00,
                'total_amount_usd' => 243250.00,
                'destination_country' => 'United Arab Emirates',
                'destination_port' => 'Port of Jebel Ali, Dubai',
                'valid_until' => Carbon::now()->addDays(14)->toDateString(),
                'status' => 'sent',
                'notes' => 'Quotation includes comprehensive marine cargo insurance, export customs clearance certificate, and delivery to Port Jebel Ali container terminal.',
            ]
        );

        // 6. Active Shipment Tracking Sample
        $shipment = Shipment::updateOrCreate(
            ['tracking_number' => 'VQ-SHP-88392-DXB'],
            [
                'vehicle_id' => $firstVehicle->id,
                'user_id' => $customer->id,
                'quotation_id' => $quote->id,
                'booking_reference' => 'NYK-BKG-99201',
                'shipping_line' => 'NYK RORO Global Line',
                'vessel_name' => 'M/V Prominent Ace',
                'voyage_number' => 'VOY-084W',
                'method' => 'roro',
                'origin_port' => 'Yokohama, Japan',
                'destination_port' => 'Jebel Ali, Dubai',
                'destination_country' => 'United Arab Emirates',
                'departure_date' => Carbon::now()->subDays(6)->toDateString(),
                'estimated_arrival_date' => Carbon::now()->addDays(14)->toDateString(),
                'current_status' => 'at_sea',
                'current_location_name' => 'Indian Ocean / East of Malacca Strait',
                'current_lat' => 5.9281,
                'current_lng' => 80.5381,
                'bill_of_lading_number' => 'NYKBL2026883921',
            ]
        );

        $milestones = [
            [
                'milestone_key' => 'booking_confirmed',
                'title' => 'Vessel Space Confirmed & Booking Issued',
                'location_description' => 'VALQORA Maritime Desk, Yokohama',
                'occurred_at' => Carbon::now()->subDays(12),
                'is_completed' => true,
                'sort_order' => 1,
                'notes' => 'Booking reference allocated on M/V Prominent Ace.',
            ],
            [
                'milestone_key' => 'customs_cleared_origin',
                'title' => 'Japan Export Customs Inspection Passed',
                'location_description' => 'Port of Yokohama Customs Area',
                'occurred_at' => Carbon::now()->subDays(8),
                'is_completed' => true,
                'sort_order' => 2,
                'notes' => 'Export declaration certificate stamped by Japan Customs.',
            ],
            [
                'milestone_key' => 'loaded_on_vessel',
                'title' => 'Vehicle Stowed on Vessel (RORO Lower Deck)',
                'location_description' => 'Yokohama Daikoku Ro-Ro Terminal',
                'occurred_at' => Carbon::now()->subDays(6),
                'is_completed' => true,
                'sort_order' => 3,
                'notes' => 'Lashing and safety chocks inspected and verified.',
            ],
            [
                'milestone_key' => 'at_sea',
                'title' => 'Vessel En Route across Indian Ocean',
                'location_description' => 'Current position: Indian Ocean / Speed 17.8 knots',
                'occurred_at' => Carbon::now()->subDays(1),
                'is_completed' => true,
                'sort_order' => 4,
                'notes' => 'Weather conditions favorable; on schedule for Dubai arrival.',
            ],
            [
                'milestone_key' => 'arrived_destination',
                'title' => 'Scheduled Berthing at Jebel Ali Terminal',
                'location_description' => 'Port of Jebel Ali, Terminal 1',
                'occurred_at' => Carbon::now()->addDays(14),
                'is_completed' => false,
                'sort_order' => 5,
                'notes' => 'Stevedore discharge plan notified to consignee.',
            ],
            [
                'milestone_key' => 'customs_cleared_destination',
                'title' => 'UAE Customs Clearance & VCC Release',
                'location_description' => 'Dubai Customs Jebel Ali Bureau',
                'occurred_at' => null,
                'is_completed' => false,
                'sort_order' => 6,
                'notes' => 'Vehicle Clearance Certificate will be uploaded to document vault.',
            ],
        ];

        foreach ($milestones as $m) {
            ShipmentMilestone::updateOrCreate(
                ['shipment_id' => $shipment->id, 'milestone_key' => $m['milestone_key']],
                $m
            );
        }

        // 7. Trade Documents Vault Sample
        $docs = [
            [
                'document_no' => 'VQ-BL-2026-883921',
                'user_id' => $customer->id,
                'vehicle_id' => $firstVehicle->id,
                'shipment_id' => $shipment->id,
                'title' => 'Original Ocean Bill of Lading (B/L)',
                'document_type' => 'bill_of_lading',
                'file_path' => '/documents/bill-of-lading-sample.pdf',
                'file_extension' => 'pdf',
                'file_size_bytes' => 245000,
                'is_verified' => true,
                'issue_date' => Carbon::now()->subDays(6)->toDateString(),
            ],
            [
                'document_no' => 'VQ-INV-2026-44018',
                'user_id' => $customer->id,
                'vehicle_id' => $firstVehicle->id,
                'shipment_id' => $shipment->id,
                'title' => 'Certified Commercial Invoice & Packing List',
                'document_type' => 'commercial_invoice',
                'file_path' => '/documents/commercial-invoice-sample.pdf',
                'file_extension' => 'pdf',
                'file_size_bytes' => 180000,
                'is_verified' => true,
                'issue_date' => Carbon::now()->subDays(7)->toDateString(),
            ],
            [
                'document_no' => 'VQ-EXP-2026-9921',
                'user_id' => $customer->id,
                'vehicle_id' => $firstVehicle->id,
                'shipment_id' => $shipment->id,
                'title' => 'Official Export Certificate (English Translation)',
                'document_type' => 'export_certificate',
                'file_path' => '/documents/export-certificate-sample.pdf',
                'file_extension' => 'pdf',
                'file_size_bytes' => 310000,
                'is_verified' => true,
                'issue_date' => Carbon::now()->subDays(8)->toDateString(),
            ],
        ];

        foreach ($docs as $d) {
            TradeDocument::updateOrCreate(['document_no' => $d['document_no']], $d);
        }

        // 8. Inquiries CRM Pipeline
        $inquiriesData = [
            [
                'ticket_number' => 'VQ-INQ-2026-701',
                'user_id' => $dealer->id,
                'vehicle_id' => null,
                'inquiry_type' => 'dealership_application',
                'name' => 'Kenji Takahashi',
                'email' => 'dealer@tokyomotors.jp',
                'phone' => '+81 45 882 1990',
                'company_name' => 'Tokyo Prestige Motors Consortium',
                'country' => 'Japan',
                'subject' => 'B2B Wholesale Allocation Contract for GCC Region',
                'message' => 'Requesting monthly allocation terms for 10-15 luxury European & Japanese SUVs dispatched to Dubai and Riyadh.',
                'destination_port' => 'Jebel Ali, Dubai',
                'status' => 'reviewing',
                'priority' => 'high',
                'assigned_specialist' => 'Alexander Vance',
                'admin_notes' => 'Client verified credit rating; scheduled video briefing for wholesale margin schedule.',
            ],
            [
                'ticket_number' => 'VQ-INQ-2026-702',
                'user_id' => $customer->id,
                'vehicle_id' => $firstVehicle->id,
                'inquiry_type' => 'vehicle_inquiry',
                'name' => 'Tariq Al-Mansoor',
                'email' => 'buyer@alrashid-auto.ae',
                'phone' => '+971 4 390 1284',
                'company_name' => 'Al-Mansoor Private Collection',
                'country' => 'United Arab Emirates',
                'subject' => 'Inspection Details on 2025 Maybach S 680',
                'message' => 'Inquiring regarding customs duties handling and expedited Ro-Ro vessel schedule.',
                'destination_port' => 'Jebel Ali, Dubai',
                'status' => 'quoted',
                'priority' => 'high',
                'assigned_specialist' => 'Hiroshi Sato',
                'admin_notes' => 'Quotation VQ-QT-2026-8841 generated and dispatched.',
            ],
        ];

        foreach ($inquiriesData as $inq) {
            Inquiry::updateOrCreate(['ticket_number' => $inq['ticket_number']], $inq);
        }

        // 9. CMS Articles & Market Intelligence
        $articles = [
            [
                'title' => '2026 Global Vehicle Tariff & Compliance Outlook: Navigating Middle East & African Import Regulations',
                'slug' => '2026-global-vehicle-tariff-compliance-outlook',
                'category' => 'regulatory_updates',
                'excerpt' => 'A comprehensive review of evolving customs documentation, JEVIC pre-shipment inspections, emissions standards, and age-limit regulations across primary import hubs.',
                'content' => "As cross-border automotive trading scales to new volumes, regulatory scrutiny at destination ports has intensified significantly. For buyers in East Africa, compliance with Kenya Bureau of Standards (KEBS) and Tanzania Bureau of Standards (TBS) mandates stringent pre-export roadworthiness inspections conducted by accredited bodies such as JEVIC, QISJ, or EAA.\n\nIn the GCC, unified vehicle specifications under GSO standard 42/2015 govern safety features, climate endurance, and bilingual label compliance. Importers must ensure that Certificates of Conformity (CoC) and original manufacturer documentation accompany the bill of lading prior to berthing at ports such as Jebel Ali or Dammam.\n\nAt VALQORA, our trade compliance desk conducts pre-audit checks on all chassis numbers, confirming eligibility and verifying lien-free titles before customs lodging.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Alexander Vance',
                'author_role' => 'Managing Director, Trade & Compliance',
                'read_time_minutes' => 6,
                'is_featured' => true,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(4),
                'view_count' => 1240,
            ],
            [
                'title' => 'The Surge in Hybrid and High-Torque Luxury Transports: Tokyo & Nagoya Auction Intelligence',
                'slug' => 'surge-in-hybrid-high-torque-luxury-transports',
                'category' => 'auction_trends',
                'excerpt' => 'Auction clearing rates and wholesale margin trends across USS Tokyo, ARAI, and CAA hubs show historic demand for Japanese flagship hybrid and executive people-movers.',
                'content' => "Japanese automotive auction indices recorded unprecedented international bidder participation in Q3 2026. Vehicles such as the new-generation Toyota Alphard and Vellfire Executive Lounge, alongside Lexus LX and Land Cruiser 300 series, continue to command strong premiums above factory retail prices due to sustained supply-chain constraints in domestic markets.\n\nFurthermore, European buyers are capitalizing on currency dynamics, acquiring pristine left-hand-drive sports cars and classic homologation models through Tokyo specialized auction houses.\n\nVALQORA maintains permanent bidding memberships across all 137 major Japanese auction houses, granting our clients immediate access to private grade sheets and live inspection video feeds.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Hiroshi Sato',
                'author_role' => 'Chief Vehicle Evaluator, Japan Desk',
                'read_time_minutes' => 5,
                'is_featured' => true,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(10),
                'view_count' => 980,
            ],
            [
                'title' => 'Ro-Ro vs. Containerized Shipping: Optimizing Freight Costs and Transit Security',
                'slug' => 'roro-vs-containerized-shipping-logistics-guide',
                'category' => 'global_logistics',
                'excerpt' => 'Selecting the optimal maritime transport mode: comparative analysis of roll-on/roll-off vessel economics versus 20ft and 40ft High Cube sealed container transit.',
                'content' => "Selecting the correct ocean transit method directly impacts both total landed cost and asset protection during oceanic transport. Roll-on/Roll-off (Ro-Ro) remains the most economical solution for standard passenger vehicles and rolling commercial trucks, allowing fast terminal loading and discharge.\n\nHowever, for ultra-luxury hypercars, armored transports, or high-value consignments, dedicated 20ft or 40ft High Cube containers provide unmatched security, weather isolation, and customized wood-chock lashing. In addition, containerized transport permits the consolidation of spare parts, secondary wheel sets, and accompanying documentation in a single customs entry.",
                'cover_image_url' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80',
                'author_name' => 'Elena Rostova',
                'author_role' => 'Head of Maritime Operations',
                'read_time_minutes' => 7,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(16),
                'view_count' => 745,
            ],
        ];

        foreach ($articles as $art) {
            Article::updateOrCreate(['slug' => $art['slug']], $art);
        }
    }
}
