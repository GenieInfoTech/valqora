import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { VehicleCard } from '@/Components/VehicleCard';
import { InquiryModal } from '@/Components/InquiryModal';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Vehicle, Article, Port } from '@/types';
import {
    ArrowRight,
    ShieldCheck,
    Anchor,
    Search,
    Truck,
    CheckCircle2,
    Compass,
    Sparkles,
    Calendar,
    ExternalLink,
    Factory,
    Zap,
    Cpu,
    ArrowUpRight,
} from 'lucide-react';

interface HomeProps {
    featuredVehicles: Vehicle[];
    latestArticles: Article[];
    destinations: Port[];
    stats: { label: string; value: string; description: string }[];
}

export default function Home({
    featuredVehicles = [],
    latestArticles = [],
    destinations = [],
    stats = [],
}: HomeProps) {
    const { t } = useLanguage();
    const { formatPrice } = useCurrency();
    const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

    return (
        <AppLayout
            title="VALQORA | Premier International Trading & Automotive Export"
            description="VALQORA Global Trading — Premier automotive export, certified mechanical inspections, maritime Ro-Ro logistics, and cross-border commercial execution from Japan, Europe, and the UAE."
        >
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#111111] border-b border-[#222222]">
                {/* Background Imagery with Deep Obsidian Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=85"
                        alt="VALQORA Global Prestige Trade"
                        className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125 scale-105 animate-pulse duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/90" />
                    {/* Subtle Gold Geometric Glow */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C9A227]/10 blur-[140px] pointer-events-none rounded-full" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    {/* Sovereign Crest Pill */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1A1A]/90 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold tracking-[0.2em] uppercase mb-8 shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>Sovereign Global Commodity & Automotive Export</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
                        Precision International Trading for{' '}
                        <span className="gold-gradient-text">Discerning Global Markets</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                        Direct procurement, certified 160-point pre-export inspections, ocean Ro-Ro logistics, and cross-border commercial trade execution from Japan, Europe, and the UAE to 48+ worldwide ports.
                    </p>

                    {/* CTA Actions */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/vehicles"
                            className="w-full sm:w-auto px-8 py-4 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-sm tracking-wider uppercase rounded-xl transition-all duration-200 shadow-xl shadow-[#C9A227]/15 flex items-center justify-center gap-3 group"
                        >
                            <span>Explore Certified Inventory</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/sourcing"
                            className="w-full sm:w-auto px-8 py-4 bg-[#1C1C1E] hover:bg-[#252528] text-white border border-[#333333] hover:border-[#C9A227] font-semibold text-sm tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4 text-[#C9A227]" />
                            <span>Initiate Sourcing Directive</span>
                        </Link>
                    </div>

                    {/* Key Trust Badges */}
                    <div className="mt-14 pt-8 border-t border-[#222222]/80 flex flex-wrap items-center justify-center gap-8 text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                            160-Point Mechanical Audit
                        </span>
                        <span className="flex items-center gap-2">
                            <Anchor className="w-4 h-4 text-[#C9A227]" />
                            Tier-1 Carrier Allocations
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                            Direct FOB / CIF / CFR Incoterms
                        </span>
                    </div>
                </div>
            </section>

            {/* PERFORMANCE METRICS STRIP */}
            <section className="bg-[#0C0C0E] border-b border-[#222222] py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-[#141416] border border-[#222226]">
                                <p className="text-3xl sm:text-4xl font-extrabold font-mono text-[#C9A227] tracking-tight">
                                    {stat.value}
                                </p>
                                <h3 className="mt-2 text-sm font-semibold text-white tracking-wide">
                                    {stat.label}
                                </h3>
                                <p className="mt-1 text-xs text-gray-400">
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED VEHICLES SHOWROOM */}
            <section className="py-20 bg-[#111111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                                AUTOMOTIVE EXPORT DIVISION
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                                Flagship Vehicle Inventory
                            </h2>
                            <p className="text-sm text-gray-400 mt-2 max-w-xl">
                                Curated collection of luxury sedans, supercars, heavy-duty commercial transports, and executive SUVs certified for international export.
                            </p>
                        </div>

                        <Link
                            href="/vehicles"
                            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] hover:text-[#e0b83a] transition group"
                        >
                            <span>Browse Complete Catalog ({featuredVehicles.length}+ Vehicles)</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Vehicle Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {featuredVehicles.map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/vehicles"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1C1C1E] hover:bg-[#25252A] text-white border border-[#2E2E34] hover:border-[#C9A227] rounded-xl text-xs font-bold uppercase tracking-wider transition duration-150"
                        >
                            <span>View All Available Stock</span>
                            <ArrowRight className="w-4 h-4 text-[#C9A227]" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* BUSINESS DIVISIONS (Clear distinction between active & planned expansion) */}
            <section className="py-20 bg-[#0E0E10] border-t border-b border-[#222226]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                            COMMERCIAL CAPABILITIES
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                            VALQORA Corporate Business Scope
                        </h2>
                        <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                            Structured as a modular monolith trading house, our operations span premier automotive distribution and maritime logistics today, with planned phased expansion into industrial commodities and trade technologies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Division 1: Automotive */}
                        <div className="p-8 rounded-2xl bg-[#141416] border border-[#222226] hover:border-[#C9A227]/50 transition duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#1E1E22] border border-[#333338] flex items-center justify-center text-[#C9A227]">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                                        Active Division
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Automotive Export & Fleet</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Prestige passenger vehicles, executive VIP transports, armored limousines, and commercial Japanese trucks. Multi-auction floor bidding and certified title verification.
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-[#222226]">
                                <Link
                                    href="/vehicles"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A227] hover:text-[#dfba38] transition"
                                >
                                    <span>Access Inventory</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Division 2: Maritime Logistics */}
                        <div className="p-8 rounded-2xl bg-[#141416] border border-[#222226] hover:border-[#C9A227]/50 transition duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#1E1E22] border border-[#333338] flex items-center justify-center text-[#C9A227]">
                                        <Anchor className="w-6 h-6" />
                                    </div>
                                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                                        Active Division
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Maritime Ocean Logistics</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Guaranteed Ro-Ro vessel deck allocations, 20ft & 40ft High Cube container consolidation, export customs declaration, and real-time waypoint shipment tracking.
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-[#222226]">
                                <Link
                                    href="/tracking"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A227] hover:text-[#dfba38] transition"
                                >
                                    <span>Track Live Vessels</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Division 3: Industrial & Future Tech */}
                        <div className="p-8 rounded-2xl bg-[#141416] border border-[#222226] hover:border-[#C9A227]/30 transition duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#1E1E22] border border-[#333338] flex items-center justify-center text-gray-400">
                                        <Factory className="w-6 h-6" />
                                    </div>
                                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400">
                                        Strategic Expansion
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Industrial, Energy & Tech</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Scheduled expansion into heavy industrial machinery, clean energy storage components, and cross-border trade intelligence protocols. Currently accepting strategic partnership inquiries.
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-[#222226]">
                                <Link
                                    href="/divisions"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition"
                                >
                                    <span>Read Strategic Roadmap</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 160-POINT QUALITY AUDIT & INSPECTION STANDARDS */}
            <section className="py-20 bg-[#111111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                                ABSOLUTE ASSURANCE
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                                The VALQORA 160-Point Pre-Export Verification Protocol
                            </h2>
                            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                                Before any chassis is cleared for maritime stowage, our licensed mechanical inspectors subject the vehicle to comprehensive physical and computerized diagnostics. We maintain a zero-compromise policy on structural integrity.
                            </p>

                            <div className="mt-8 space-y-4 text-xs">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 border border-[#C9A227] flex items-center justify-center text-[#C9A227] flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <strong className="text-white">Structural Ultrasound & Laser Alignment:</strong>
                                        <p className="text-gray-400 mt-0.5">Detects sub-millimeter chassis distortions, prior impact repairs, and metal fatigue.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 border border-[#C9A227] flex items-center justify-center text-[#C9A227] flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <strong className="text-white">ECU Diagnostic Telemetry & Odometer Certification:</strong>
                                        <p className="text-gray-400 mt-0.5">Direct OBD2 interrogation validating genuine mileage, transmission fluid life, and sensor calibration.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 border border-[#C9A227] flex items-center justify-center text-[#C9A227] flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <strong className="text-white">Accredited Pre-Export Certificates:</strong>
                                        <p className="text-gray-400 mt-0.5">Issuance of JEVIC, EAA, or KEBS inspection certificates required for swift customs release.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A227] hover:underline"
                                >
                                    <span>Learn more about our inspection grading hierarchy</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Interactive Inspection Sheet Preview */}
                        <div className="p-8 bg-[#18181C] border border-[#2A2A30] rounded-2xl shadow-2xl relative">
                            <div className="flex items-center justify-between pb-4 border-b border-[#2A2A30]">
                                <div>
                                    <span className="text-[10px] font-mono uppercase text-[#C9A227]">INSPECTION SAMPLE</span>
                                    <h4 className="text-sm font-bold text-white">2025 Mercedes-Maybach S 680 (VQ-2026-901)</h4>
                                </div>
                                <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold rounded">
                                    GRADE 5.0 (PRISTINE)
                                </span>
                            </div>

                            <div className="mt-6 space-y-3 text-xs">
                                <div>
                                    <div className="flex justify-between text-gray-300 mb-1">
                                        <span>Chassis Alignment & Subframe</span>
                                        <span className="font-mono text-[#C9A227]">4.9 / 5.0</span>
                                    </div>
                                    <div className="h-1.5 bg-[#252528] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#C9A227] rounded-full" style={{ width: '98%' }} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-gray-300 mb-1">
                                        <span>V12 Powertrain & Compression</span>
                                        <span className="font-mono text-[#C9A227]">5.0 / 5.0</span>
                                    </div>
                                    <div className="h-1.5 bg-[#252528] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#C9A227] rounded-full" style={{ width: '100%' }} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-gray-300 mb-1">
                                        <span>Executive Interior & Electronics</span>
                                        <span className="font-mono text-[#C9A227]">4.8 / 5.0</span>
                                    </div>
                                    <div className="h-1.5 bg-[#252528] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#C9A227] rounded-full" style={{ width: '96%' }} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-gray-300 mb-1">
                                        <span>Exterior Body Panels & Paint Gauge</span>
                                        <span className="font-mono text-[#C9A227]">4.7 / 5.0</span>
                                    </div>
                                    <div className="h-1.5 bg-[#252528] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#C9A227] rounded-full" style={{ width: '94%' }} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-3 bg-[#121214] border border-[#25252A] rounded text-[11px] text-gray-400">
                                <p className="font-semibold text-gray-300">Inspector Verification Note:</p>
                                <p className="mt-1">
                                    "No cosmetic blemishes or structural anomalies detected. All 12 cylinders show factory uniform compression. Complete service dossier intact."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GLOBAL DESTINATION PORTS & SHIPPING MATRIX */}
            <section className="py-20 bg-[#0C0C0E] border-t border-[#222226]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                                MARITIME LOGISTICS MATRIX
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                                Global Shipping Destinations
                            </h2>
                            <p className="text-sm text-gray-400 mt-2 max-w-xl">
                                Direct scheduled sailings from Yokohama, Kobe, Bremerhaven, and Dubai to leading discharge ports.
                            </p>
                        </div>

                        <Link
                            href="/tracking"
                            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] hover:underline"
                        >
                            <span>Live Consignment Tracking</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((port) => (
                            <div
                                key={port.code}
                                className="p-6 rounded-xl bg-[#141416] border border-[#222226] hover:border-[#C9A227]/40 transition duration-200"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1F1F24] text-[#C9A227] border border-[#33333A]">
                                        PORT CODE: {port.code}
                                    </span>
                                    <span className="text-xs text-gray-400">{port.region}</span>
                                </div>

                                <h3 className="text-base font-bold text-white">{port.name}</h3>
                                <p className="text-xs text-gray-400">{port.country}</p>

                                <div className="mt-4 pt-3 border-t border-[#222226] grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase">Transit Time</p>
                                        <p className="font-semibold text-gray-200 mt-0.5">
                                            {port.transit_days_from_japan > 0 ? `~${port.transit_days_from_japan} Days` : 'Origin Port'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase">Ro-Ro Freight</p>
                                        <p className="font-semibold font-mono text-[#C9A227] mt-0.5">
                                            {port.standard_roro_freight_usd > 0 ? formatPrice(port.standard_roro_freight_usd) : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CMS / MARKET INTELLIGENCE PREVIEW */}
            <section className="py-20 bg-[#111111] border-t border-[#222226]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                                KNOWLEDGE BASE
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                                Market Intelligence & Trade Briefings
                            </h2>
                            <p className="text-sm text-gray-400 mt-2 max-w-xl">
                                In-depth analysis of evolving automotive tariffs, Japanese auction clearance rates, and maritime freight developments.
                            </p>
                        </div>

                        <Link
                            href="/insights"
                            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] hover:underline"
                        >
                            <span>Read All Trade Reports</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestArticles.map((article) => (
                            <article
                                key={article.id}
                                className="group flex flex-col justify-between bg-[#161618] border border-[#25252A] hover:border-[#C9A227]/50 rounded-xl overflow-hidden transition-all duration-300"
                            >
                                <div className="aspect-[16/9] overflow-hidden bg-black/60 relative">
                                    <img
                                        src={article.cover_image_url || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/80 text-[#C9A227] border border-[#C9A227]/40 rounded">
                                            {article.category.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{new Date(article.published_at).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>{article.read_time_minutes} min read</span>
                                        </div>

                                        <h3 className="text-base font-bold text-white group-hover:text-[#C9A227] transition-colors duration-200 line-clamp-2">
                                            <Link href={`/insights/${article.slug}`}>
                                                {article.title}
                                            </Link>
                                        </h3>

                                        <p className="mt-2 text-xs text-gray-400 line-clamp-3 leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-[#25252A] flex items-center justify-between text-xs">
                                        <span className="text-gray-400">{article.author_name}</span>
                                        <Link
                                            href={`/insights/${article.slug}`}
                                            className="text-[#C9A227] font-semibold flex items-center gap-1 group-hover:underline"
                                        >
                                            <span>Read Briefing</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* DIRECT SOURCING CALLOUT BANNER */}
            <section className="py-20 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-t border-[#222226]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="p-10 sm:p-14 rounded-3xl bg-[#16161A] border border-[#C9A227]/40 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/10 blur-3xl pointer-events-none rounded-full" />

                        <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                            BESPOKE PROCUREMENT
                        </span>

                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3">
                            Seeking an Exclusive Allocation?
                        </h2>

                        <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Our institutional trading desk acquires rare homologation supercars, armoured diplomatic transports, and bulk dealer fleets on demand across Japan, Germany, and the UAE.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/sourcing"
                                className="w-full sm:w-auto px-8 py-4 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg"
                            >
                                Launch Sourcing Request Wizard
                            </Link>

                            <button
                                onClick={() => setInquiryModalOpen(true)}
                                className="w-full sm:w-auto px-8 py-4 bg-[#202026] hover:bg-[#282830] text-white border border-[#33333E] rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                            >
                                Contact Institutional Desk
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Modal */}
            <InquiryModal
                isOpen={inquiryModalOpen}
                onClose={() => setInquiryModalOpen(false)}
                inquiryType="general"
                defaultSubject="Institutional Trade Inquiry"
            />
        </AppLayout>
    );
}
