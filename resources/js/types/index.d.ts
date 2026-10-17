export type UserRole = 'admin' | 'dealer' | 'customer' | 'supplier';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    company_name?: string | null;
    phone?: string | null;
    country?: string | null;
    preferred_currency?: string;
}

export interface Port {
    id: number;
    name: string;
    code: string;
    country: string;
    region: string;
    transit_days_from_japan: number;
    standard_roro_freight_usd: number;
    standard_container_freight_usd: number;
}

export interface VehicleImage {
    id: number;
    vehicle_id: number;
    url: string;
    caption?: string | null;
    category: string;
    is_primary: boolean;
    sort_order: number;
}

export interface VehicleInspection {
    id: number;
    vehicle_id: number;
    overall_grade: string;
    chassis_score: number;
    engine_score: number;
    interior_score: number;
    exterior_score: number;
    electronics_score: number;
    inspector_name: string;
    inspection_date: string;
    odometer_verified: boolean;
    accident_free: boolean;
    flood_damage_free: boolean;
    summary_notes?: string | null;
    detailed_checklist?: Record<string, string> | null;
    report_pdf_url?: string | null;
}

export interface Vehicle {
    id: number;
    stock_id: string;
    title: string;
    slug: string;
    make: string;
    model: string;
    year: number;
    body_type: string;
    fuel_type: string;
    transmission: string;
    drive_type: string;
    steering: string;
    engine_cc?: number | null;
    doors: number;
    seats: number;
    mileage_km: number;
    exterior_color: string;
    interior_color: string;
    vin_chassis?: string | null;
    location_country: string;
    location_city: string;
    fob_price_usd: number;
    cif_estimate_usd?: number | null;
    status: 'available' | 'reserved' | 'in_transit' | 'sold';
    condition_grade: string;
    is_featured: boolean;
    is_verified: boolean;
    overview?: string | null;
    features?: string[] | null;
    specifications?: Record<string, string> | null;
    primary_image?: VehicleImage | null;
    images?: VehicleImage[];
    inspection?: VehicleInspection | null;
}

export interface SourcingRequest {
    id: number;
    reference_no: string;
    user_id?: number | null;
    contact_name: string;
    contact_email: string;
    contact_phone?: string | null;
    company_name?: string | null;
    category: string;
    target_make: string;
    target_model: string;
    year_min?: number | null;
    year_max?: number | null;
    steering: string;
    transmission: string;
    fuel_type: string;
    max_budget_usd?: number | null;
    destination_country: string;
    destination_port: string;
    timeline: string;
    additional_specifications?: string | null;
    status: string;
    created_at: string;
}

export interface Quotation {
    id: number;
    quotation_no: string;
    user_id?: number | null;
    sourcing_request_id?: number | null;
    vehicle_id?: number | null;
    customer_name: string;
    customer_email: string;
    customer_phone?: string | null;
    customer_company?: string | null;
    incoterm: 'FOB' | 'CIF' | 'CFR';
    vehicle_price_usd: number;
    freight_cost_usd: number;
    marine_insurance_usd: number;
    documentation_inspection_usd: number;
    total_amount_usd: number;
    destination_country: string;
    destination_port: string;
    valid_until: string;
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
    notes?: string | null;
    created_at: string;
    vehicle?: Vehicle | null;
    user?: User | null;
}

export interface ShipmentMilestone {
    id: number;
    shipment_id: number;
    milestone_key: string;
    title: string;
    location_description: string;
    occurred_at?: string | null;
    is_completed: boolean;
    sort_order: number;
    notes?: string | null;
}

export interface Shipment {
    id: number;
    tracking_number: string;
    vehicle_id?: number | null;
    user_id?: number | null;
    quotation_id?: number | null;
    booking_reference?: string | null;
    shipping_line: string;
    vessel_name: string;
    voyage_number?: string | null;
    method: string;
    origin_port: string;
    destination_port: string;
    destination_country: string;
    departure_date?: string | null;
    estimated_arrival_date?: string | null;
    actual_arrival_date?: string | null;
    current_status: string;
    current_location_name?: string | null;
    current_lat?: number | null;
    current_lng?: number | null;
    container_number?: string | null;
    bill_of_lading_number?: string | null;
    vehicle?: Vehicle | null;
    milestones?: ShipmentMilestone[];
    documents?: TradeDocument[];
    quotation?: Quotation | null;
}

export interface TradeDocument {
    id: number;
    document_no: string;
    user_id?: number | null;
    vehicle_id?: number | null;
    shipment_id?: number | null;
    title: string;
    document_type: string;
    file_path: string;
    file_extension: string;
    file_size_bytes: number;
    is_verified: boolean;
    issue_date?: string | null;
    expiry_date?: string | null;
    created_at: string;
    vehicle?: Vehicle | null;
    shipment?: Shipment | null;
}

export interface Inquiry {
    id: number;
    ticket_number: string;
    user_id?: number | null;
    vehicle_id?: number | null;
    inquiry_type: string;
    name: string;
    email: string;
    phone?: string | null;
    company_name?: string | null;
    country?: string | null;
    subject: string;
    message: string;
    destination_port?: string | null;
    status: string;
    priority: string;
    assigned_specialist?: string | null;
    admin_notes?: string | null;
    created_at: string;
    vehicle?: Vehicle | null;
    user?: User | null;
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    cover_image_url?: string | null;
    author_name: string;
    author_role: string;
    read_time_minutes: number;
    is_featured: boolean;
    is_published: boolean;
    published_at: string;
    view_count: number;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
}

export interface Currency {
    code: string;
    symbol: string;
    name: string;
    rate: number;
}

export interface PageProps {
    auth: {
        user: User | null;
    };
    currencies: Currency[];
    ports: Port[];
    flash: {
        success?: string | null;
        error?: string | null;
        info?: string | null;
    };
    appName: string;
    [key: string]: unknown;
}
