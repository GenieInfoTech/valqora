import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Globe,
    Car,
    Ship,
    Factory,
    Zap,
    Landmark,
    Cpu,
    CheckCircle2,
    ArrowRight,
    Building2,
    ShieldCheck,
} from 'lucide-react';

export default function Divisions() {
    const [selectedDivision, setSelectedDivision] = useState<string>('VGT-01');

    const divisions = [
        {
            id: 'VGT-01',
            name: 'Valqora Global Trading',
            tagline: 'Master International Sourcing & Cross-Border Procurement',
            status: 'Active Core Division',
            icon: Globe,
            description:
                'The flagship trading arm of the Valqora corporate group, connecting verified manufacturers and suppliers in Japan, Europe, and Asia with institutional buyers across 30+ countries.',
            capabilities: [
                'Multi-sector international procurement & supply chain structuring',
                'Cross-border contract negotiation under Incoterms® 2020 (FOB, CFR, CIF)',
                'Customs tariff classification (WCO HS Codes) & origin certification',
                'Government tender & institutional fleet contract fulfillment',
            ],
            metrics: { markets: '30+ Countries', compliance: '99.9% Accuracy', sla: '< 4h Desk Response' },
        },
        {
            id: 'VGT-02',
            name: 'Valqora Auto',
            tagline: 'JDM & European Vehicle Sourcing, Inspection & Export',
            status: 'Active Core Division',
            icon: Car,
            description:
                'Specialized automotive procurement division with direct terminal access to 140,000+ weekly Japanese auction lots (USS, TAA, CAA, HAA) and European executive lease-return fleets.',
            capabilities: [
                '160-Point pre-export engineering, OBD diagnostic & paint-depth audit',
                '360° studio photography, 4K walkaround video & auction sheet translation',
                'JEVIC, JAAI, QISJ & biosecurity pre-shipment radiation/roadworthiness certificates',
                'Dealer wholesale allocations & multi-unit container optimization',
            ],
            metrics: { inspection: '160 Checkpoints', auctions: '120+ JDM Houses', defectRate: '< 0.04% Claims' },
        },
        {
            id: 'VGT-03',
            name: 'Valqora Logistics',
            tagline: 'Global Freight Forwarding, Port Operations & Control Tower',
            status: 'Active Core Division',
            icon: Ship,
            description:
                'End-to-end maritime and multimodal logistics division operating out of Yokohama, Kobe, Nagoya, Dubai, and Rotterdam with real-time 10-stage shipment visibility.',
            capabilities: [
                'Priority Ro-Ro vessel allocation & 20ft/40ft HC container engineering',
                'Certified wheel chocking, soft-contact ratchet lashing & ISO bolt sealing',
                'Marine cargo insurance (All-Risks Clause A) & customs brokerage',
                'Global Logistics Control Tower monitoring port congestion & ETA variances',
            ],
            metrics: { onTime: '98.6% On-Time', utilization: '92.4% Container Fill', portTurn: '< 24h Processing' },
        },
        {
            id: 'VGT-04',
            name: 'Valqora Industrial',
            tagline: 'Heavy Machinery, Construction & Agricultural Equipment',
            status: 'Strategic Division',
            icon: Factory,
            description:
                'Sourcing and exporting Japanese and German industrial equipment, excavators, cranes, warehouse forklifts, and precision manufacturing machinery for infrastructure projects.',
            capabilities: [
                'Komatsu, Caterpillar, Hitachi, and Kobelco heavy machinery sourcing',
                'Flat-rack & open-top out-of-gauge (OOG) container shipping',
                'Hydraulic pressure testing, engine compression & hour-meter verification',
                'Industrial spare parts cartons with triple-wall ISPM-15 export crating',
            ],
            metrics: { categories: '18+ Asset Classes', crating: 'ISPM-15 Certified', inspection: 'Heavy-Duty Audit' },
        },
        {
            id: 'VGT-05',
            name: 'Valqora Energy',
            tagline: 'Renewable Energy Systems, EV Infrastructure & Grid Storage',
            status: 'Expansion Division',
            icon: Zap,
            description:
                'Supporting global decarbonization through the procurement of commercial EV charging stations, lithium-iron-phosphate (LFP) battery storage, and solar microgrid components.',
            capabilities: [
                'Commercial fast-charging hardware for electric bus & truck fleets',
                'Industrial solar inverters, battery energy storage systems (BESS) & transformers',
                'Hazardous-goods (Class 9 UN3480/UN3481) certified maritime transport',
                'Second-life EV battery diagnostics and circular-economy recycling compliance',
            ],
            metrics: { focus: 'Zero-Emission Tech', hazmat: 'IMDG Class 9', warranty: ' OEM Backed' },
        },
        {
            id: 'VGT-06',
            name: 'Valqora Capital',
            tagline: 'Trade Finance, Multi-Currency Treasury & Strategic Investment',
            status: 'Institutional Division',
            icon: Landmark,
            description:
                'Structuring documentary letters of credit (LC), dealer floorplan credit lines, and multi-currency settlement solutions across 7 primary ISO currencies.',
            capabilities: [
                'Irrevocable Letter of Credit (UCP 600) & documentary collection handling',
                'Multi-currency settlement in USD, JPY, EUR, GBP, AUD, AED, and BDT',
                'Approved wholesale dealer credit lines and fleet contract financing',
                'Strategic co-investment in regional distribution hubs and port facilities',
            ],
            metrics: { currencies: '7 ISO Currencies', banking: 'Tier-1 Global Banks', compliance: '100% AML/KYC' },
        },
        {
            id: 'VGT-07',
            name: 'Valqora Technology',
            tagline: 'Digital Trade Portals, AI Search & Supply Chain Telemetry',
            status: 'Digital Core Division',
            icon: Cpu,
            description:
                'Engineering the digital infrastructure that powers Valqora’s Customer, Dealer, and Supplier Portals, cryptographic document verification, and AI-assisted procurement.',
            capabilities: [
                'Natural-language intelligent vehicle search & automated landed-cost engine',
                'SHA-256 cryptographic document vault with instant QR seal verification',
                'Real-time vessel AIS telemetry & automated WhatsApp/SMS milestone alerts',
                'Enterprise ERP, WMS, and TMS integration with 99.98% platform uptime',
            ],
            metrics: { uptime: '99.98% SLA', security: 'TLS 1.3 + MFA', speed: '< 2.0s Page Load' },
        },
    ];

    const industriesServed = [
        'International Automotive Dealerships',
        'Commercial Fleet & Rental Operators',
        'Government & Diplomatic Procurement',
        'Construction & Infrastructure Contractors',
        'Mining & Resource Logistics',
        'Agricultural & Cold-Chain Distributors',
        'Corporate Executive Transport',
        'Financial & Leasing Institutions',
    ];

    const active = divisions.find((d) => d.id === selectedDivision) || divisions[0];
    const ActiveIcon = active.icon;

    return (
        <AppLayout>
            <Head title="Business Divisions & Brand Architecture" />

            {/* Header */}
            <section className="pt-28 pb-16 bg-[#111111] border-b border-[#2D2D2D] vq-grid-bg">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-3">
                        Volume 1 Page 18–20 • Master Brand Architecture
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        One Master Brand. Seven Specialized Divisions.
                    </h1>
                    <p className="text-lg text-[#9CA3AF] max-w-3xl leading-relaxed">
                        Valqora is structured as a scalable multinational corporate group. Each division inherits the same visual identity, governance discipline, and quality standards while maintaining deep operational specialization.
                    </p>
                </div>
            </section>

            {/* Interactive Division Explorer */}
            <section className="py-16 bg-[#111111] border-b border-[#2D2D2D]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: 7 Divisions List */}
                        <div className="lg:col-span-4 space-y-2.5">
                            {divisions.map((div) => {
                                const Icon = div.icon;
                                const isSelected = div.id === selectedDivision;
                                return (
                                    <button
                                        key={div.id}
                                        type="button"
                                        onClick={() => setSelectedDivision(div.id)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                                            isSelected
                                                ? 'bg-[#C9A227] border-[#C9A227] text-[#111111]'
                                                : 'bg-[#1A1A1A] border-[#2D2D2D] text-white hover:border-[#C9A227]/50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <Icon className={`w-5 h-5 ${isSelected ? 'text-[#111111]' : 'text-[#C9A227]'}`} />
                                            <div>
                                                <div className={`text-[10px] font-mono ${isSelected ? 'text-[#111111]/80' : 'text-[#9CA3AF]'}`}>
                                                    {div.id} • {div.status}
                                                </div>
                                                <div className="font-bold text-sm">{div.name}</div>
                                            </div>
                                        </div>
                                        <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-[#111111]' : 'text-[#6B7280]'}`} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Column: Active Division Detail */}
                        <div className="lg:col-span-8 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8 md:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-[#C9A227]/15 border border-[#C9A227]/40 flex items-center justify-center">
                                            <ActiveIcon className="w-6 h-6 text-[#C9A227]" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-mono text-[#C9A227] block">{active.id}</span>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white">{active.name}</h2>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-[#2E8B57]/15 border border-[#2E8B57]/40 text-xs font-mono text-[#2E8B57]">
                                        {active.status}
                                    </span>
                                </div>

                                <p className="text-sm font-mono text-[#C9A227] mb-4">{active.tagline}</p>
                                <p className="text-[#D1D5DB] leading-relaxed mb-8">{active.description}</p>

                                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-4">
                                    Core Operational Capabilities
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
                                    {active.capabilities.map((cap, i) => (
                                        <div
                                            key={i}
                                            className="bg-[#111111] border border-[#2D2D2D] rounded-xl p-4 flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                                            <span className="text-xs text-[#E5E7EB] leading-relaxed">{cap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#2D2D2D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex flex-wrap gap-6">
                                    {Object.entries(active.metrics).map(([k, v]) => (
                                        <div key={k}>
                                            <span className="text-[10px] font-mono uppercase text-[#6B7280] block">{k}</span>
                                            <span className="text-sm font-mono font-bold text-white">{v}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href={`/contact?department=Global+Trading&subject=${encodeURIComponent(active.name + ' Inquiry')}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A227] text-[#111111] font-bold text-xs font-mono uppercase rounded-lg hover:bg-[#d4af37] transition-colors"
                                >
                                    Inquire With {active.name}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries Served Section */}
            <section className="py-16 bg-[#161616]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="mb-10">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-2">
                            Institutional Sectors • Industries Served
                        </span>
                        <h2 className="text-3xl font-bold text-white">Built to Scale Across Global Industries</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {industriesServed.map((ind) => (
                            <div
                                key={ind}
                                className="bg-[#111111] border border-[#2D2D2D] rounded-xl p-5 flex items-center gap-3"
                            >
                                <ShieldCheck className="w-5 h-5 text-[#C9A227] shrink-0" />
                                <span className="text-sm font-semibold text-white">{ind}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
