import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Vehicle, Inquiry, Shipment } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import {
    Car,
    MessageSquare,
    Ship,
    FileCheck,
    Users,
    DollarSign,
    ArrowUpRight,
    ShieldCheck,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Activity,
    Gauge,
    Award,
    Container,
} from 'lucide-react';

interface AdminDashboardProps {
    metrics: {
        totalVehicles: number;
        availableVehicles: number;
        totalInventoryValueUsd: number;
        activeInquiries: number;
        pendingQuotations: number;
        activeShipments: number;
        registeredUsers: number;
    };
    recentInquiries: Inquiry[];
    activeShipments: Shipment[];
    recentVehicles: Vehicle[];
}

const CONTROL_TOWER_KPIS = [
    { label: 'On-Time Shipment Rate', value: '98.6%', target: 'Target: ≥ 98.0%', status: 'PASS' },
    { label: 'Documentation Accuracy', value: '99.9%', target: 'Target: 99.9% (WCO)', status: 'PASS' },
    { label: 'Cargo Damage Rate', value: '0.04%', target: 'Target: < 0.20%', status: 'PASS' },
    { label: 'Container Utilization', value: '92.4%', target: 'Target: > 90.0%', status: 'PASS' },
    { label: 'Delivery Accuracy', value: '99.6%', target: 'Target: ≥ 99.5%', status: 'PASS' },
    { label: 'Customer Satisfaction (CSAT)', value: '4.92 / 5', target: 'Target: ≥ 4.8 / 5', status: 'PASS' },
    { label: 'Marine Claims Ratio', value: '0.12%', target: 'Target: < 0.50%', status: 'PASS' },
    { label: 'Avg Port Processing Time', value: '18.4 hrs', target: 'Target: < 24.0 hrs', status: 'PASS' },
];

const PRE_EXPORT_QC_ITEMS = [
    'Correct Vehicle & Model Variant',
    'VIN / Chassis Stamp Verification',
    'Exterior Paint & Micrometer Check',
    'Specification & Auction Sheet Match',
    'Accessories & Spare Key Verified',
    'Zero New Transport Damage',
    'Interior Sanitization & Detailing',
    'Exterior Wash & Protective Film',
    'WCO Export Documentation Complete',
    'JEVIC / Radiation Inspection Passed',
];

export default function Dashboard({
    metrics,
    recentInquiries,
    activeShipments,
    recentVehicles,
}: AdminDashboardProps) {
    const { formatPrice } = useCurrency();
    const [checkedQcItems, setCheckedQcItems] = useState<Record<number, boolean>>(
        Object.fromEntries(PRE_EXPORT_QC_ITEMS.map((_, idx) => [idx, true]))
    );

    const toggleQcItem = (idx: number) => {
        setCheckedQcItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <AppLayout
            title="Executive ERP & Global Logistics Control Tower | Valqora"
            description="Enterprise ERP oversight, Global Logistics Control Tower KPIs, and Pre-Export Quality Control governance."
        >
            <Head title="Executive ERP & Control Tower — Valqora Global Trading" />

            {/* Admin Header */}
            <div className="bg-vq-black text-vq-white py-12 border-b border-neutral-800">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-vq-gold/10 border border-vq-gold/30 text-vq-gold text-xs font-mono uppercase tracking-widest mb-3">
                                <ShieldCheck className="w-3.5 h-3.5" /> VOLUME 7 & VOLUME 11 — ENTERPRISE ERP & CONTROL TOWER
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Executive Operations & Global Control Tower
                            </h1>
                            <p className="text-neutral-400 mt-1 text-sm">
                                Real-time oversight of global inventory, WCO trade compliance, carrier performance KPIs, and pre-export quality control.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/vehicles"
                                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 rounded-lg text-xs font-medium transition-colors"
                            >
                                Manage Inventory
                            </Link>
                            <Link
                                href="/logistics/track"
                                className="px-4 py-2.5 bg-vq-gold text-vq-black hover:bg-vq-gold/90 rounded-lg text-xs font-semibold transition-colors"
                            >
                                Global Shipment Radar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12 space-y-12">
                {/* Executive KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2.5 bg-vq-black text-vq-gold rounded-lg">
                                <Car className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-mono text-vq-green bg-vq-green/10 px-2 py-0.5 rounded">
                                {metrics.availableVehicles} Available
                            </span>
                        </div>
                        <div className="text-2xl font-bold font-mono text-vq-black">{metrics.totalVehicles}</div>
                        <div className="text-xs text-neutral-500 mt-1">Total Fleet Inventory Units</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2.5 bg-vq-gold/15 text-vq-gold rounded-lg">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-mono text-neutral-500">FOB Valuation</span>
                        </div>
                        <div className="text-2xl font-bold font-mono text-vq-black">
                            {formatPrice(metrics.totalInventoryValueUsd)}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">Total Active Portfolio Value</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2.5 bg-vq-blue/10 text-vq-blue rounded-lg">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-mono text-vq-amber bg-vq-amber/10 px-2 py-0.5 rounded">
                                {metrics.pendingQuotations} Quotes Open
                            </span>
                        </div>
                        <div className="text-2xl font-bold font-mono text-vq-black">{metrics.activeInquiries}</div>
                        <div className="text-xs text-neutral-500 mt-1">Active Trade Inquiries</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2.5 bg-vq-green/10 text-vq-green rounded-lg">
                                <Ship className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-mono text-vq-green">Live Telemetry</span>
                        </div>
                        <div className="text-2xl font-bold font-mono text-vq-black">{metrics.activeShipments}</div>
                        <div className="text-xs text-neutral-500 mt-1">Active Ocean Shipments</div>
                    </div>
                </div>

                {/* Global Logistics Control Tower (Vol 7 pp. 418-421) */}
                <div className="bg-vq-black text-white rounded-2xl border border-neutral-800 p-8 shadow-lg space-y-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
                        <div>
                            <div className="inline-flex items-center gap-2 text-vq-gold text-xs font-mono uppercase tracking-widest mb-1">
                                <Activity className="w-4 h-4" /> VOLUME 7 PAGE 29–30 — GLOBAL LOGISTICS CONTROL TOWER
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                Supply Chain Nerve Center & Standardized KPIs
                            </h2>
                            <p className="text-xs text-neutral-400 mt-1">
                                Integrated ERP → WMS → TMS telemetry monitoring carrier SLAs, port congestion, and WCO compliance.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 bg-vq-green/15 border border-vq-green/40 text-vq-green text-xs font-mono rounded-lg">
                                ● ERP / WMS / TMS SYNCED
                            </span>
                            <span className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-mono rounded-lg">
                                Registered Partners: {metrics.registeredUsers}
                            </span>
                        </div>
                    </div>

                    {/* 8 Core Logistics KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {CONTROL_TOWER_KPIS.map((kpi) => (
                            <div
                                key={kpi.label}
                                className="p-4 bg-neutral-900/90 border border-neutral-800 rounded-xl flex flex-col justify-between"
                            >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-xs text-neutral-400">{kpi.label}</span>
                                    <span className="px-2 py-0.5 bg-vq-green/15 text-vq-green text-[10px] font-mono rounded">
                                        {kpi.status}
                                    </span>
                                </div>
                                <div className="text-2xl font-bold font-mono text-white">{kpi.value}</div>
                                <div className="text-[11px] font-mono text-vq-gold mt-1">{kpi.target}</div>
                            </div>
                        ))}
                    </div>

                    {/* Carrier Performance & Port Risk Radar */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800 rounded-xl p-5">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                                <Gauge className="w-4 h-4 text-vq-gold" /> Approved Ocean Carrier & Forwarder Scorecard
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-neutral-800 text-neutral-400 font-mono">
                                            <th className="pb-2">Carrier / Line</th>
                                            <th className="pb-2">Classification</th>
                                            <th className="pb-2 text-right">On-Time SLA</th>
                                            <th className="pb-2 text-right">Doc Accuracy</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-800/70 font-mono">
                                        <tr>
                                            <td className="py-2.5 font-sans font-semibold text-white">NYK Line (Nippon Yusen)</td>
                                            <td className="py-2.5 text-vq-gold">Strategic Partner</td>
                                            <td className="py-2.5 text-right text-vq-green">99.1%</td>
                                            <td className="py-2.5 text-right">100.0%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2.5 font-sans font-semibold text-white">MOL (Mitsui O.S.K. Lines)</td>
                                            <td className="py-2.5 text-vq-gold">Strategic Partner</td>
                                            <td className="py-2.5 text-right text-vq-green">98.7%</td>
                                            <td className="py-2.5 text-right">99.9%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2.5 font-sans font-semibold text-white">K-Line (Kawasaki Kisen)</td>
                                            <td className="py-2.5 text-neutral-300">Preferred Partner</td>
                                            <td className="py-2.5 text-right text-vq-green">98.2%</td>
                                            <td className="py-2.5 text-right">99.8%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2.5 font-sans font-semibold text-white">Maersk / Wallenius Wilhelmsen</td>
                                            <td className="py-2.5 text-neutral-300">Preferred Partner</td>
                                            <td className="py-2.5 text-right text-vq-green">98.4%</td>
                                            <td className="py-2.5 text-right">99.9%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="lg:col-span-5 bg-neutral-900/70 border border-neutral-800 rounded-xl p-5 space-y-3">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-vq-amber" /> Port Congestion & Weather Risk Advisories
                            </h3>
                            <div className="p-3 rounded-lg bg-vq-green/10 border border-vq-green/30 text-xs">
                                <div className="font-bold text-vq-green font-mono">YOKOHAMA / NAGOYA / KOBE — NORMAL</div>
                                <div className="text-neutral-300 mt-0.5">
                                    Gate-in processing averaging 16.5 hours (&lt;24h target). Zero berth delays.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-vq-amber/10 border border-vq-amber/30 text-xs">
                                <div className="font-bold text-vq-amber font-mono">RED SEA / SUEZ CORRIDOR — ACTIVE REROUTE</div>
                                <div className="text-neutral-300 mt-0.5">
                                    European-bound Ro-Ro vessels routed via Cape of Good Hope (+8 days ETA buffer applied).
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-neutral-800/80 border border-neutral-700 text-xs">
                                <div className="font-bold text-white font-mono">BRISBANE / JEBEL ALI / MOMBASA — CLEAR</div>
                                <div className="text-neutral-400 mt-0.5">
                                    WCO pre-arrival EDI manifests transmitted 72 hours prior to vessel docking.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Recent Inquiries Table */}
                    <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                            <div>
                                <h2 className="font-bold text-lg text-vq-black">Recent Trade Inquiries</h2>
                                <p className="text-xs text-neutral-500">Latest customer sourcing & quotation requests</p>
                            </div>
                            <span className="text-xs font-mono bg-neutral-100 px-2.5 py-1 rounded text-neutral-600">
                                Last {recentInquiries.length} Records
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-mono uppercase text-neutral-500">
                                        <th className="py-3.5 px-4">Reference</th>
                                        <th className="py-3.5 px-4">Client / Country</th>
                                        <th className="py-3.5 px-4">Vehicle</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-4 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 text-sm">
                                    {recentInquiries.map((inq) => (
                                        <tr key={inq.id} className="hover:bg-neutral-50/80 transition-colors">
                                            <td className="py-3.5 px-4 font-mono text-xs font-medium text-vq-black">
                                                {inq.reference_no}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <div className="font-semibold text-vq-black">{inq.customer_name}</div>
                                                <div className="text-xs text-neutral-500">
                                                    {inq.company_name ? `${inq.company_name} • ` : ''}
                                                    {inq.destination_country} ({inq.incoterm})
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                {inq.vehicle ? (
                                                    <Link
                                                        href={`/vehicles/${inq.vehicle.slug}`}
                                                        className="font-mono text-xs text-vq-blue hover:underline"
                                                    >
                                                        {inq.vehicle.stock_id}
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs text-neutral-400">Bespoke Sourcing</span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                                                        inq.status === 'QUOTED'
                                                            ? 'bg-vq-green/10 text-vq-green'
                                                            : inq.status === 'NEW'
                                                            ? 'bg-vq-gold/20 text-vq-black font-semibold'
                                                            : 'bg-neutral-100 text-neutral-600'
                                                    }`}
                                                >
                                                    {inq.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 text-right font-mono text-xs text-neutral-500">
                                                {new Date(inq.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Active Shipments & Pre-Export 10-Point QC Checklist (Vol 7 p. 399) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                                <div>
                                    <h2 className="font-bold text-lg text-vq-black">Active Logistics Queue</h2>
                                    <p className="text-xs text-neutral-500">Vessels currently in transit or port processing</p>
                                </div>
                                <Link
                                    href="/logistics/track"
                                    className="text-xs font-semibold text-vq-gold hover:underline flex items-center gap-1"
                                >
                                    View All <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="p-6 space-y-4">
                                {activeShipments.map((shipment) => (
                                    <Link
                                        key={shipment.id}
                                        href={`/logistics/track/${shipment.tracking_number}`}
                                        className="block p-4 rounded-xl border border-neutral-200 hover:border-vq-gold transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-mono font-bold text-sm text-vq-black">
                                                {shipment.tracking_number}
                                            </span>
                                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-vq-blue/10 text-vq-blue">
                                                {shipment.current_status.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                        <div className="text-xs text-neutral-600 mb-2">
                                            {shipment.origin_port} → <strong>{shipment.destination_port}</strong>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                                            <span>Vessel: {shipment.vessel_name}</span>
                                            {shipment.vehicle && <span>Stock: {shipment.vehicle.stock_id}</span>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Pre-Export 10-Point Quality Control Release Gate (Vol 7 p. 399) */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-vq-gold font-bold">
                                        VOLUME 7 PAGE 19 — ZERO-DEFECT OBJECTIVE
                                    </span>
                                    <h3 className="font-bold text-base text-vq-black mt-0.5 flex items-center gap-2">
                                        <Award className="w-4 h-4 text-vq-gold" /> Pre-Export 10-Point Quality Checklist
                                    </h3>
                                </div>
                                <span className="text-xs font-mono font-bold text-vq-green">
                                    {Object.values(checkedQcItems).filter(Boolean).length}/10 Verified
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {PRE_EXPORT_QC_ITEMS.map((item, idx) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => toggleQcItem(idx)}
                                        className={`p-2.5 rounded-lg border text-left text-xs flex items-center gap-2 transition-colors ${
                                            checkedQcItems[idx]
                                                ? 'bg-vq-green/5 border-vq-green/30 text-vq-black font-medium'
                                                : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                                        }`}
                                    >
                                        <CheckCircle2
                                            className={`w-4 h-4 shrink-0 ${
                                                checkedQcItems[idx] ? 'text-vq-green' : 'text-neutral-300'
                                            }`}
                                        />
                                        <span className="truncate">{item}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
