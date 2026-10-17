<?php

namespace Tests\Feature;

use App\Models\User;
use App\Modules\Core\Models\Port;
use App\Modules\Logistics\Models\Shipment;
use App\Modules\Vehicle\Models\Vehicle;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CorporatePlatformTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_home_page_returns_successful_response(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_corporate_pages_render_successfully(): void
    {
        $this->get('/about')->assertStatus(200);
        $this->get('/divisions')->assertStatus(200);
        $this->get('/services')->assertStatus(200);
        $this->get('/contact')->assertStatus(200);
        $this->get('/insights')->assertStatus(200);
    }

    public function test_vehicle_catalog_and_filtering(): void
    {
        $response = $this->get('/vehicles');
        $response->assertStatus(200);

        // Filter by make
        $filteredResponse = $this->get('/vehicles?make=Toyota');
        $filteredResponse->assertStatus(200);
    }

    public function test_vehicle_details_page(): void
    {
        $vehicle = Vehicle::first();
        $this->assertNotNull($vehicle);

        $response = $this->get('/vehicles/'.$vehicle->slug);
        $response->assertStatus(200);
    }

    public function test_sourcing_wizard_submission(): void
    {
        $port = Port::first();
        $this->assertNotNull($port);

        $payload = [
            'contact_name' => 'Diplomatic Trade Attache',
            'contact_email' => 'attache@consulate.ae',
            'contact_phone' => '+971 4 555 1234',
            'company_name' => 'Consular Fleet Desk',
            'category' => 'armored',
            'target_make' => 'Mercedes-Benz',
            'target_model' => 'S 680 Guard VR10',
            'year_min' => 2024,
            'year_max' => 2026,
            'steering' => 'lhd',
            'transmission' => 'automatic',
            'fuel_type' => 'petrol',
            'max_budget_usd' => 500000,
            'destination_country' => 'United Arab Emirates',
            'destination_port' => $port->name,
            'timeline' => 'immediate',
            'additional_specifications' => 'Certified VR10 ballistic package with emergency oxygen system.',
        ];

        $response = $this->post('/sourcing', $payload);
        $response->assertRedirect();

        $this->assertDatabaseHas('sourcing_requests', [
            'contact_email' => 'attache@consulate.ae',
            'target_make' => 'Mercedes-Benz',
        ]);
    }

    public function test_cif_calculator_endpoint(): void
    {
        $vehicle = Vehicle::first();
        $port = Port::first();

        $response = $this->postJson('/quotations/calculate', [
            'vehicle_id' => $vehicle->id,
            'port_code' => $port->code,
            'method' => 'roro',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'vehicle_price_usd',
                'freight_cost_usd',
                'marine_insurance_usd',
                'documentation_inspection_usd',
                'total_amount_usd',
                'transit_days',
                'destination_port',
                'destination_country',
            ]);
    }

    public function test_ocean_consignment_tracking(): void
    {
        $shipment = Shipment::first();
        $this->assertNotNull($shipment);

        $response = $this->get('/tracking?number='.$shipment->tracking_number);
        $response->assertStatus(200);

        $detailResponse = $this->get('/tracking/'.$shipment->tracking_number);
        $detailResponse->assertStatus(200);
    }

    public function test_inquiry_submission(): void
    {
        $response = $this->post('/inquiries', [
            'inquiry_type' => 'dealership_application',
            'name' => 'Fahad Al-Qasimi',
            'email' => 'fahad@gulfmotorimports.com',
            'company_name' => 'Gulf Motor Imports LLC',
            'country' => 'Saudi Arabia',
            'subject' => 'Fleet Import Allocation Agreement',
            'message' => 'Requesting dealership terms for monthly 10-unit allocations to Jeddah.',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('inquiries', [
            'email' => 'fahad@gulfmotorimports.com',
        ]);
    }

    public function test_admin_authorization_protection(): void
    {
        // Guest cannot access admin
        $this->get('/admin')->assertRedirect('/login');

        // Customer role gets 403 Forbidden
        $customer = User::where('role', 'customer')->first();
        $this->actingAs($customer)->get('/admin')->assertStatus(403);

        // Admin role gets 200 OK
        $admin = User::where('role', 'admin')->first();
        $this->actingAs($admin)->get('/admin')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/vehicles')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/inquiries')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/quotations')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/shipments')->assertStatus(200);
    }

    public function test_client_portal_access(): void
    {
        $customer = User::where('role', 'customer')->first();
        $this->actingAs($customer)->get('/portal')->assertStatus(200);
        $this->actingAs($customer)->get('/portal/quotations')->assertStatus(200);
        $this->actingAs($customer)->get('/portal/shipments')->assertStatus(200);
        $this->actingAs($customer)->get('/portal/documents')->assertStatus(200);
    }
}
