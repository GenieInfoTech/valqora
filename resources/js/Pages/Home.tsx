import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import VehicleCard from '@/Components/VehicleCard';
import {
    ShieldCheck,
    Globe,
    FileCheck,
    Ship,
    Search,
    ArrowRight,
    CheckCircle2,
    Building2,
    Compass,
    Award,
    ChevronRight,
    QrCode,
    Anchor,
    MapPin,
    Sparkles,
    Lock,
    BarChart3,
    Layers,
    Quote
} from 'lucide-react';

interface Vehicle {
    id: number;
    stock_number: string;
    make: string;
    model: string;
    year: number;
    price_usd: number;
    price_jpy?: number;
    mileage_km: number;
    fuel_type: string;
    transmission: string;
    drive_type: string;
    auction_grade: string;
    origin_country: string;
    location_port: string;
    status: string;
    primary_image: string;
    is_featured: boolean;
    vin_chassis?: string;
}

interface Testimonial {
    id: number;
    client_name: string;
    company: string;
    country: string;
    role: string;
    quote: string;
    vehicles_purchased?: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
    summary: string;
    published_at: string;
    read_time: string;
    image?: string;
}

interface Props {
    featuredVehicles: Vehicle[];
    latestArrivals: Vehicle[];
    stats: {
        years_experience: string;
        countries_served: string;
        vehicles_exported: string;
        documentation_accuracy: string;
        on_time_shipment: string;
        customer_satisfaction: string;
    };
    divisions: Array<{
        name: string;
        status: string;
        description: string;
        focus: string[];
    }>;
    exportProcess: Array<{
        step: string;
        title: string;
        desc: string;
    }>;
    testimonials: Testimonial[];
    latestInsights: Article[];
    makes: string[];
}

export default function Home({
    featuredVehicles = [],
    latestArrivals = [],
    stats,
    divisions = [],
    exportProcess = [],
    testimonials = [],
    latestInsights = [],
    makes = [],
}: Props) {
    const [aiQuery, setAiQuery] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [maxMileage, setMaxMileage] = useState('');
    const [activeTab, setActiveTab] = useState<'featured' | 'arrivals'>('featured');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/inventory', {
            search: aiQuery || undefined,
            make: selectedMake || undefined,
            origin: selectedOrigin || undefined,
            max_mileage: maxMileage || undefined,
        });
    };

    const aiPrompts = [
        'Find a white 2024 Toyota Corolla Cross Hybrid under 20,000 km',
        ' Porsche 911 GT3 Touring Grade 5.0 from Tokyo',
        'Toyota Land Cruiser 300 ZX under 15,000 km',
        'Commercial fleet: Toyota HiAce Super GL Diesel',
    ];

    const displayedVehicles = activeTab === 'featured' ? featuredVehicles : latestArrivals;

    return (
        <AppLayout>
            <Head title="Valqora Global Trading — Global Vehicle Sourcing. Trusted Worldwide." />

            {/* SECTION 1: HERO BANNER (Always Executive Dark Cinema) */}
            <section className="relative bg-[#111111] text-white overflow-hidden border-b border-[#2D2D2D] theme-preserve-dark">
                {/* Subtle VQ Geometric Grid Pattern (5% Opacity per Volume 2 Page 21) */}
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(45deg, #C9A227 1px, transparent 1px), linear-gradient(-45deg, #C9A227 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                    }}
                />

                {/* Cinematic Port & Vessel Backdrop */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=85"
                        alt="Valqora Global Port Operations & Container Terminal"
                        className="w-full h-full object-cover opacity-25 object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/60" />
                </div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-24 lg:pt-28 lg:pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left 7 Columns: Core Corporate Positioning */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#2D2D2D]/90 border border-[#C9A227]/40">
                                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227]">
                                    VALQORA GLOBAL TRADING • CORPORATE HEADQUARTERS
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.08] text-white">
                                Global Vehicle Sourcing.{' '}
                                <span className="text-[#C9A227] block mt-1">Trusted Worldwide.</span>
                            </h1>

                            <p className="text-lg sm:text-xl text-[#E8E9EB]/90 leading-relaxed max-w-[65ch] font-normal">
                                Connecting international buyers with premium Japanese and European vehicles through transparent sourcing, inspection, and export solutions.
                            </p>

                            {/* 5-Second Clarity Pillars (Volume 2 Page 32 & Volume 5 Page 11) */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#2D2D2D]">
                                <div className="pt-3">
                                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A227]">01. WHO IS VALQORA</div>
                                    <p className="text-xs text-[#E8E9EB]/80 mt-1">
                                        A diversified international trading group headquartered in Japan with global export & procurement operations.
                                    </p>
                                </div>
                                <div className="pt-3">
                                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A227]">02. WHAT WE DO</div>
                                    <p className="text-xs text-[#E8E9EB]/80 mt-1">
                                        Institutional JDM & European vehicle sourcing, 150-point inspection, customs documentation, and Ro-Ro/container logistics.
                                    </p>
                                </div>
                                <div className="pt-3">
                                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A227]">03. WHY TRUST VALQORA</div>
                                    <p className="text-xs text-[#E8E9EB]/80 mt-1">
                                        99.9% documentation accuracy, QR-authenticated certificates, and real-time 10-stage shipment visibility.
                                    </p>
                                </div>
                            </div>

                            {/* Primary & Secondary CTAs (Volume 5 Page 11) */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <Link
                                    href="/inventory"
                                    className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-[8px] bg-[#C9A227] text-[#111111] font-semibold text-base hover:bg-[#d8b132] transition-all duration-150 shadow-sm"
                                >
                                    <span>Explore Inventory</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/sourcing"
                                    className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-[8px] bg-white text-[#111111] border border-[#111111] font-semibold text-base hover:bg-[#F3F4F6] transition-all duration-150"
                                >
                                    <span>Request Vehicle Sourcing</span>
                                </Link>
                                <Link
                                    href="/tracking"
                                    className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#E8E9EB] hover:text-[#C9A227] hover:underline transition-all"
                                >
                                    <Compass className="w-4 h-4 text-[#C9A227]" />
                                    <span>Track Live Shipment</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right 5 Columns: Intelligent AI Natural-Language Search & Industrial Filter Box (Volume 5 Page 30) */}
                        <div className="lg:col-span-5">
                            <div className="bg-[#1A1A1A]/95 backdrop-blur-md border border-[#2D2D2D] rounded-[16px] p-6 sm:p-8 shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#C9A227] block">
                                            INTELLIGENT PROCUREMENT ENGINE
                                        </span>
                                        <h2 className="text-xl font-bold text-white mt-1">
                                            Industrial Catalogue & AI Search
                                        </h2>
                                    </div>
                                    <div className="w-10 h-10 rounded-[8px] bg-[#C9A227]/15 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227]">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                </div>

                                <form onSubmit={handleSearch} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-[#E8E9EB] mb-1.5">
                                            Natural-Language Search, Stock No., or VIN/Chassis
                                        </label>
                                        <div className="relative">
                                            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                            <input
                                                type="text"
                                                value={aiQuery}
                                                onChange={(e) => setAiQuery(e.target.value)}
                                                placeholder='e.g. "Find a white 2024 Toyota Corolla Cross Hybrid under 20,000 km"'
                                                className="w-full pl-10 pr-4 py-3 rounded-[8px] bg-[#111111] border border-[#374151] text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                                            />
                                        </div>
                                    </div>

                                    {/* Quick AI Prompt Chips */}
                                    <div>
                                        <span className="text-[11px] text-[#9CA3AF] block mb-2">
                                            Try natural-language queries:
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {aiPrompts.map((prompt, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setAiQuery(prompt)}
                                                    className="text-left text-[11px] px-2.5 py-1 rounded bg-[#2D2D2D] text-[#E8E9EB] hover:bg-[#C9A227]/20 hover:text-[#C9A227] border border-transparent hover:border-[#C9A227]/40 transition-colors"
                                                >
                                                    "{prompt.trim()}"
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                        <div>
                                            <label className="block text-xs font-medium text-[#E8E9EB] mb-1">
                                                Manufacturer
                                            </label>
                                            <select
                                                value={selectedMake}
                                                onChange={(e) => setSelectedMake(e.target.value)}
                                                className="w-full px-3 py-2.5 rounded-[8px] bg-[#111111] border border-[#374151] text-white text-sm focus:outline-none focus:border-[#C9A227]"
                                            >
                                                <option value="">All Makers</option>
                                                {makes.map((make) => (
                                                    <option key={make} value={make}>
                                                        {make}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-[#E8E9EB] mb-1">
                                                Origin Market
                                            </label>
                                            <select
                                                value={selectedOrigin}
                                                onChange={(e) => setSelectedOrigin(e.target.value)}
                                                className="w-full px-3 py-2.5 rounded-[8px] bg-[#111111] border border-[#374151] text-white text-sm focus:outline-none focus:border-[#C9A227]"
                                            >
                                                <option value="">All Origins</option>
                                                <option value="Japan (JDM)">Japan (JDM)</option>
                                                <option value="European Spec (Japan Source)">Euro Spec (Japan)</option>
                                                <option value="Germany / EU Direct">Germany / EU</option>
                                                <option value="UK Right-Hand Drive">UK RHD</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-[#E8E9EB] mb-1">
                                                Max Mileage
                                            </label>
                                            <select
                                                value={maxMileage}
                                                onChange={(e) => setMaxMileage(e.target.value)}
                                                className="w-full px-3 py-2.5 rounded-[8px] bg-[#111111] border border-[#374151] text-white text-sm focus:outline-none focus:border-[#C9A227]"
                                            >
                                                <option value="">Any Mileage</option>
                                                <option value="10000">Under 10,000 km</option>
                                                <option value="20000">Under 20,000 km</option>
                                                <option value="50000">Under 50,000 km</option>
                                                <option value="100000">Under 100,000 km</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 px-6 rounded-[8px] bg-[#C9A227] text-[#111111] font-semibold text-sm hover:bg-[#d8b132] transition-all flex items-center justify-center gap-2 mt-2"
                                    >
                                        <Search className="w-4 h-4" />
                                        <span>Search Verified Global Inventory</span>
                                    </button>
                                </form>

                                <div className="mt-5 pt-4 border-t border-[#2D2D2D] flex items-center justify-between text-xs text-[#9CA3AF]">
                                    <span className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B57]" />
                                        150-Point Pre-Export Inspection
                                    </span>
                                    <span className="font-mono text-[#C9A227]">USS • TAA • CAA • HAA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: EXECUTIVE KPI & TRUST INDICATORS BAR (Volume 5 Page 11 & Volume 7 Page 29) */}
            <section className="bg-[#161616] border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                        <div className="pt-4 sm:pt-0 sm:px-4 first:pl-0">
                            <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">
                                {stats?.years_experience || '15+ Years'}
                            </div>
                            <div className="text-xs font-medium text-neutral-400 mt-1">
                                Institutional Trade Expertise
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-0 sm:px-4">
                            <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">
                                {stats?.countries_served || '42+ Countries'}
                            </div>
                            <div className="text-xs font-medium text-neutral-400 mt-1">
                                Active Global Markets
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-0 sm:px-4">
                            <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">
                                {stats?.vehicles_exported || '18,500+'}
                            </div>
                            <div className="text-xs font-medium text-neutral-400 mt-1">
                                Vehicles & Units Exported
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-0 sm:px-4">
                            <div className="text-2xl lg:text-3xl font-bold text-[#2E8B57] tabular-nums">
                                {stats?.documentation_accuracy || '99.9%'}
                            </div>
                            <div className="text-xs font-medium text-neutral-400 mt-1">
                                Documentation Accuracy KPI
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-0 sm:px-4">
                            <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">
                                {stats?.on_time_shipment || '98.4%'}
                            </div>
                            <div className="text-xs font-medium text-neutral-400 mt-1">
                                On-Time Vessel Dispatch (≥98%)
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-0 sm:px-4">
                            <div className="text-2xl lg:text-3xl font-bold text-[#C9A227] tabular-nums">
                                {stats?.customer_satisfaction || '4.9 / 5.0'}
                            </div>
                            <div className="text-xs font-medium text-neutral-400 mt-1">
                                Verified Client CSAT Score
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: FEATURED INVENTORY & LATEST ARRIVALS (Volume 2 Page 32 & Volume 5 Page 11) */}
            <section className="py-20 bg-[#111111] border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                                VALQORA AUTO • VERIFIED EXPORT STOCK
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                                Featured Global Inventory
                            </h2>
                            <p className="text-base text-neutral-400 mt-2 max-w-[65ch]">
                                Every vehicle undergoes a mandatory 150-point pre-export mechanical, structural, and radiation inspection with full auction sheet and VIN verification.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="inline-flex rounded-[8px] bg-[#1A1A1D] p-1 border border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('featured')}
                                    className={`px-4 py-2 rounded-[6px] text-sm font-semibold transition-all ${
                                        activeTab === 'featured'
                                            ? 'bg-[#C9A227] text-[#111111] shadow-sm'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    Featured Allocations
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('arrivals')}
                                    className={`px-4 py-2 rounded-[6px] text-sm font-semibold transition-all ${
                                        activeTab === 'arrivals'
                                            ? 'bg-[#C9A227] text-[#111111] shadow-sm'
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    Latest Port Arrivals
                                </button>
                            </div>

                            <Link
                                href="/inventory"
                                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#161618] border border-white/15 text-sm font-semibold text-white hover:border-[#C9A227] transition-all"
                            >
                                <span>Full Catalogue</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedVehicles.map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>

                    <div className="mt-10 text-center sm:hidden">
                        <Link
                            href="/inventory"
                            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-[8px] bg-[#C9A227] text-[#111111] font-semibold text-sm"
                        >
                            <span>View All Export Inventory</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECTION 4: WHY VALQORA — FOUR STRATEGIC PILLARS (Volume 5 Page 11) */}
            <section className="py-20 bg-[#161616] border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-3xl mb-14">
                        <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                            COMPETITIVE ADVANTAGE • VOLUME 1 PAGE 11
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                            Discipline Rather Than Discounting.
                        </h2>
                        <p className="text-base text-neutral-400 mt-3 leading-relaxed">
                            Unlike transactional brokerages focused solely on short-term price competition, Valqora Global Trading operates with Swiss precision, Japanese minimalism, German engineering discipline, and British corporate governance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-[#111111] rounded-[16px] p-8 border border-white/10 shadow-sm hover:border-[#C9A227] transition-all">
                            <div className="w-12 h-12 rounded-[8px] bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] flex items-center justify-center mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="text-xs font-mono text-[#C9A227] uppercase tracking-widest mb-1">
                                PILLAR 01
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                Transparent Inspection
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Every vehicle undergoes a 150-point mechanical, structural, and diagnostic evaluation with 360° high-resolution imagery, 4K walkaround video, and original Japanese auction sheet verification.
                            </p>
                        </div>

                        <div className="bg-[#111111] rounded-[16px] p-8 border border-white/10 shadow-sm hover:border-[#C9A227] transition-all">
                            <div className="w-12 h-12 rounded-[8px] bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <div className="text-xs font-mono text-[#C9A227] uppercase tracking-widest mb-1">
                                PILLAR 02
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                Worldwide Export Network
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Direct access to USS, TAA, CAA, and European manufacturer networks with customs-compliant export execution across 42+ primary and secondary destination markets.
                            </p>
                        </div>

                        <div className="bg-[#111111] rounded-[16px] p-8 border border-white/10 shadow-sm hover:border-[#C9A227] transition-all">
                            <div className="w-12 h-12 rounded-[8px] bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] flex items-center justify-center mb-6">
                                <FileCheck className="w-6 h-6" />
                            </div>
                            <div className="text-xs font-mono text-[#C9A227] uppercase tracking-widest mb-1">
                                PILLAR 03
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                Verified Quality & QR Seal
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Zero-defect pre-export objective backed by serialized tamper-evident container seals, QR-authenticated Commercial Invoices, Bills of Lading, and Export Certificates.
                            </p>
                        </div>

                        <div className="bg-[#111111] rounded-[16px] p-8 border border-white/10 shadow-sm hover:border-[#C9A227] transition-all">
                            <div className="w-12 h-12 rounded-[8px] bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] flex items-center justify-center mb-6">
                                <Ship className="w-6 h-6" />
                            </div>
                            <div className="text-xs font-mono text-[#C9A227] uppercase tracking-widest mb-1">
                                PILLAR 04
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                End-to-End Logistics
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Centralized Global Logistics Control Tower managing inland transport, bonded warehousing, Ro-Ro and 40HC container lashing, marine insurance, and port clearance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: BRAND ARCHITECTURE & MULTINATIONAL DIVISIONS (Volume 1 Page 18 & Volume 2 Page 32) */}
            <section className="py-20 bg-[#111111] text-white border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                                CORPORATE ARCHITECTURE • VOLUME 1 PAGE 18
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                                More Than an Automotive Exporter.
                            </h2>
                            <p className="text-base text-neutral-400 mt-3 max-w-[68ch]">
                                Valqora is structured as a scalable multinational trading and investment group. Each specialized division inherits the same visual and operational discipline.
                            </p>
                        </div>
                        <Link
                            href="/divisions"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] bg-[#1A1A1D] text-white text-sm font-semibold hover:bg-[#C9A227] hover:text-[#111111] transition-all self-start lg:self-auto border border-white/10"
                        >
                            <span>Explore Corporate Architecture</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {divisions.map((div, index) => (
                            <div
                                key={div.name}
                                className="rounded-[16px] p-7 bg-[#1A1A1A] border border-white/10 hover:border-[#C9A227]/60 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="text-xs font-mono text-[#C9A227]">
                                            0{index + 1} / DIVISION
                                        </span>
                                        <span
                                            className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${
                                                div.status.includes('Core') || div.status.includes('Active')
                                                    ? 'bg-[#2E8B57]/20 text-[#2E8B57] border border-[#2E8B57]/40'
                                                    : 'bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/30'
                                            }`}
                                        >
                                            {div.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{div.name}</h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                                        {div.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                                    {div.focus.map((item) => (
                                        <span
                                            key={item}
                                            className="text-xs px-2.5 py-1 rounded bg-[#111111] text-neutral-300 border border-white/10"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6: 10-STAGE GLOBAL EXPORT & LOGISTICS PROCESS (Volume 7 Page 20–22) */}
            <section className="py-20 bg-[#161616] border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                                STANDARD OPERATING PROCEDURE • VOLUME 7
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                                10-Stage Global Export & Logistics Protocol
                            </h2>
                            <p className="text-base text-neutral-400 mt-2 max-w-[65ch]">
                                Every shipment follows a documented, auditable workflow from Japanese auction or factory floor to destination port customs clearance.
                            </p>
                        </div>
                        <Link
                            href="/export-process"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#C9A227] transition-colors"
                        >
                            <span>View Full Container Loading & Documentation Standards</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {exportProcess.map((stage) => (
                            <div
                                key={stage.step}
                                className="p-6 rounded-[12px] bg-[#111111] border border-white/10 hover:border-[#C9A227] transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#1A1A1D] text-[#C9A227] border border-[#C9A227]/30">
                                        STAGE {stage.step}
                                    </span>
                                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                                </div>
                                <h3 className="text-base font-bold text-white mb-1.5">
                                    {stage.title}
                                </h3>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    {stage.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7: GLOBAL TARGET MARKETS & UNIFIED DIGITAL PORTALS (Volume 1 Page 12 & Volume 5 Page 16–20) */}
            <section className="py-20 bg-[#111111] border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left 6 Columns: Global Target Markets */}
                        <div className="lg:col-span-6 bg-[#161618] rounded-[16px] p-8 sm:p-10 border border-white/10 shadow-sm">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>GLOBAL TARGET MARKETS • VOLUME 1 PAGE 12</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                42+ Active Maritime Corridors
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                                Operating out of Yokohama, Nagoya, Kobe, and Osaka with scheduled Ro-Ro and 40HC container dispatches across Oceania, Europe, the Middle East, South Asia, and East Africa.
                            </p>

                            <div className="space-y-5">
                                <div>
                                    <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-2">
                                        Primary Markets (Weekly Vessel Allocations)
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            'Australia',
                                            'New Zealand',
                                            'United Kingdom',
                                            'Ireland',
                                            'United Arab Emirates',
                                            'Saudi Arabia',
                                            'South Africa',
                                            'Bangladesh',
                                            'Kenya',
                                            'Tanzania',
                                        ].map((m) => (
                                            <span
                                                key={m}
                                                className="text-xs font-medium px-3 py-1.5 rounded-[6px] bg-[#111111] text-white border border-white/10"
                                            >
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                                        Secondary & Strategic Markets
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            'Malaysia',
                                            'Singapore',
                                            'Thailand',
                                            'Sri Lanka',
                                            'Pakistan',
                                            'Canada',
                                            'Chile',
                                            'Mauritius',
                                            'Caribbean',
                                        ].map((m) => (
                                            <span
                                                key={m}
                                                className="text-xs px-3 py-1.5 rounded-[6px] bg-[#222226] text-neutral-300 border border-white/10"
                                            >
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                <Link
                                    href="/global-markets"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#C9A227]"
                                >
                                    <span>Explore Country Import Regulations & Duty Calculator</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Right 6 Columns: Unified Self-Service Trade Portals */}
                        <div className="lg:col-span-6 bg-[#161618] text-white rounded-[16px] p-8 sm:p-10 border border-white/10 shadow-sm">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                                <Lock className="w-4 h-4" />
                                <span>UNIFIED DIGITAL ECOSYSTEM • VOLUME 5 PAGE 16–20</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                Self-Service Enterprise Trade Portals
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                                Beyond our public catalogue, Valqora provides role-based encrypted portals for retail buyers, wholesale dealerships, supply partners, and our Global Logistics Control Tower.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link
                                    href="/portal?role=customer"
                                    className="p-4 rounded-[10px] bg-[#111111] border border-white/10 hover:border-[#C9A227] transition-all group"
                                >
                                    <div className="text-xs font-mono text-[#C9A227] mb-1">01. CUSTOMER PORTAL</div>
                                    <div className="text-base font-bold text-white group-hover:text-[#C9A227] transition-colors">
                                        Ownership & Document Vault
                                    </div>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        10-stage vessel tracking, B/L & Commercial Invoice downloads, and multi-currency settlement.
                                    </p>
                                </Link>

                                <Link
                                    href="/portal?role=dealer"
                                    className="p-4 rounded-[10px] bg-[#111111] border border-white/10 hover:border-[#C9A227] transition-all group"
                                >
                                    <div className="text-xs font-mono text-[#C9A227] mb-1">02. DEALER PORTAL</div>
                                    <div className="text-base font-bold text-white group-hover:text-[#C9A227] transition-colors">
                                        Wholesale & Fleet Matrix
                                    </div>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        Live auction pipeline, 40HC container load optimizer, credit lines, and bulk RFQ pricing.
                                    </p>
                                </Link>

                                <Link
                                    href="/portal?role=supplier"
                                    className="p-4 rounded-[10px] bg-[#111111] border border-white/10 hover:border-[#C9A227] transition-all group"
                                >
                                    <div className="text-xs font-mono text-[#C9A227] mb-1">03. SUPPLIER PORTAL</div>
                                    <div className="text-base font-bold text-white group-hover:text-[#C9A227] transition-colors">
                                        Auction & Yard Integration
                                    </div>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        Stock submission, 150-point inspection sheet uploads, and port dispatch scheduling.
                                    </p>
                                </Link>

                                <Link
                                    href="/portal?role=control-tower"
                                    className="p-4 rounded-[10px] bg-[#111111] border border-white/10 hover:border-[#C9A227] transition-all group"
                                >
                                    <div className="text-xs font-mono text-[#C9A227] mb-1">04. CONTROL TOWER</div>
                                    <div className="text-base font-bold text-white group-hover:text-[#C9A227] transition-colors">
                                        Global Logistics Nerve Center
                                    </div>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        Real-time vessel ETA variance monitoring, customs clearance KPIs, and QR seal verification.
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8: VERIFIED CLIENT TESTIMONIALS & LATEST INSIGHTS (Volume 2 Page 32 & Volume 8 Page 23) */}
            <section className="py-20 bg-[#161616] border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    {/* Testimonials */}
                    <div className="mb-20">
                        <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                            INSTITUTIONAL CREDIBILITY • VERIFIED PARTNERS
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-10">
                            Trusted by International Dealers & Fleet Buyers
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-8 rounded-[16px] bg-[#111111] border border-white/10 flex flex-col justify-between"
                                >
                                    <div>
                                        <Quote className="w-8 h-8 text-[#C9A227] mb-4 opacity-80" />
                                        <p className="text-sm text-white leading-relaxed italic mb-6">
                                            "{item.quote}"
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-white/10">
                                        <div className="font-bold text-white text-sm">{item.client_name}</div>
                                        <div className="text-xs text-neutral-400">
                                            {item.role}, {item.company} • <span className="font-semibold text-white">{item.country}</span>
                                        </div>
                                        {item.vehicles_purchased && (
                                            <div className="text-[11px] font-mono text-[#2E8B57] mt-1.5">
                                                ✓ {item.vehicles_purchased}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Latest Market Insights & Thought Leadership */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                            <div>
                                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                                    THOUGHT LEADERSHIP • VOLUME 8 PAGE 23
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-tight">
                                    Latest Trade Intelligence & Market Reports
                                </h2>
                            </div>
                            <Link
                                href="/news"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#C9A227]"
                            >
                                <span>View All Publications & Guides</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {latestInsights.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/news/${post.slug}`}
                                    className="group rounded-[16px] overflow-hidden border border-white/10 bg-[#111111] hover:border-[#C9A227] transition-all flex flex-col"
                                >
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                                                <span className="text-[#C9A227] font-semibold uppercase">
                                                    {post.category}
                                                </span>
                                                <span>{post.published_at}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-[#C9A227] transition-colors mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                                                {post.summary}
                                            </p>
                                        </div>
                                        <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white">
                                            <span>Read Research Briefing ({post.read_time})</span>
                                            <ChevronRight className="w-4 h-4 text-[#C9A227]" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 9: FINAL CONTACT CTA (Volume 5 Page 11: "Let's Build Your Next Shipment") */}
            <section className="py-20 bg-[#111111] text-white border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="rounded-[16px] bg-gradient-to-r from-[#1A1A1A] via-[#222222] to-[#1A1A1A] border border-[#C9A227]/40 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-sm">
                        <div className="max-w-2xl">
                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                                GLOBAL PROCUREMENT DESK • 8-HOUR SLA GUARANTEE
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                                Let's Build Your Next Shipment.
                            </h2>
                            <p className="text-base text-[#E8E9EB]/85 mt-3 leading-relaxed">
                                Whether you are a dealership sourcing monthly container allocations, a corporate fleet buyer, or an individual importer seeking a verified Japanese or European vehicle, our trade specialists are ready to assist.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 shrink-0">
                            <Link
                                href="/sourcing"
                                className="px-7 py-4 rounded-[8px] bg-[#C9A227] text-[#111111] font-semibold text-sm hover:bg-[#d8b132] transition-all inline-flex items-center gap-2 shadow-sm"
                            >
                                <span>Submit Custom Sourcing Request</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-7 py-4 rounded-[8px] bg-white text-[#111111] border border-[#D1D5DB] font-semibold text-sm hover:bg-[#F3F4F6] transition-all shadow-sm"
                            >
                                Contact Trade Desk
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
