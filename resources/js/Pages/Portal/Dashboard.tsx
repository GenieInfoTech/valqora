import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PortalLayout } from '@/Layouts/PortalLayout';
import { Quotation, SourcingRequest, Shipment, TradeDocument } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import {
    FileText,
    Ship,
    Compass,
    ShieldCheck,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Download,
    PlusCircle,
    CreditCard,
    Headphones,
    Video,
    Building2,
    Package,
    TrendingUp,
    UploadCloud,
    Award,
    AlertCircle,
    Calculator,
} from 'lucide-react';

interface PortalDashboardProps {
    metrics: {
        totalQuotes: number;
        activeShipments: number;
        sourcingRequests: number;
        verifiedDocuments: number;
    };
    quotations: Quotation[];
    sourcingRequests: SourcingRequest[];
    shipments: Shipment[];
    documents: TradeDocument[];
}

type PortalRole = 'customer' | 'dealer' | 'supplier';

export default function Dashboard({
    metrics,
    quotations,
    sourcingRequests,
    shipments,
    documents,
}: PortalDashboardProps) {
    const { formatPrice, formatIsoPrice } = useCurrency();
    const [activePortal, setActivePortal] = useState<PortalRole>('customer');
    const [containerUnits, setContainerUnits] = useState<number>(3);
    const [containerType, setContainerType] = useState<'20ft' | '40hc'>('40hc');
    const [ticketSubmitted, setTicketSubmitted] = useState(false);
    const [supplierSubmitted, setSupplierSubmitted] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const view = params.get('view');
            if (view === 'dealer' || view === 'supplier' || view === 'customer') {
                setActivePortal(view);
            }
        }
    }, []);

    return (
        <PortalLayout>
            <Head title="Unified Trade Portal (Customer • Dealer • Supplier) — Valqora Global Trading" />

            {/* Multi-Portal Role Switcher (Volume 5 Pages 254–259) */}
            <div className="mb-8 bg-[#161616] border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#C9A227] block">
                        Valqora Digital Ecosystem • Volume 5 Trade Portals
                    </span>
                    <h1 className="text-2xl font-bold text-white mt-0.5">
                        {activePortal === 'customer' && 'Customer Ownership & Shipment Portal'}
                        {activePortal === 'dealer' && 'International Dealer & Fleet Wholesale Portal'}
                        {activePortal === 'supplier' && 'Global Supplier & Auction Partner Portal'}
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2 bg-[#111111] p-1.5 rounded-xl border border-white/10">
                    <button
                        type="button"
                        onClick={() => setActivePortal('customer')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            activePortal === 'customer'
                                ? 'bg-[#C9A227] text-[#111111]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Customer Portal
                    </button>
                    <button
                        type="button"
                        onClick={() => setActivePortal('dealer')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            activePortal === 'dealer'
                                ? 'bg-[#C9A227] text-[#111111]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Dealer Portal
                    </button>
                    <button
                        type="button"
                        onClick={() => setActivePortal('supplier')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            activePortal === 'supplier'
                                ? 'bg-[#C9A227] text-[#111111]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Supplier Portal
                    </button>
                </div>
            </div>

            {/* Assigned Account Manager Banner (Volume 5 Page 254) */}
            <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A227]/15 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] font-bold">
                        KT
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A227]">
                                Assigned Senior Account Representative
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#2E8B57]/20 text-emerald-400 text-[10px] font-mono">
                                Online • Tokyo Desk (UTC+9)
                            </span>
                        </div>
                        <p className="text-sm font-bold text-white mt-0.5">
                            Kenji Takahashi — Director of International Export Operations
                        </p>
                        <p className="text-xs text-gray-400">
                            Direct Line: +81-3-5555-0199 • SLA Response Guarantee: &lt; 2 Business Hours
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <Link
                        href="/contact?department=Export+Support"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
                    >
                        <Video className="w-3.5 h-3.5 text-[#C9A227]" /> Schedule Video Call
                    </Link>
                    <Link
                        href="/vehicles"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C9A227] text-[#111111] text-xs font-bold uppercase tracking-wider hover:bg-[#d8b138] transition-colors"
                    >
                        <PlusCircle className="w-3.5 h-3.5" /> New Order
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                    {
                        label: 'Active Quotations',
                        value: metrics.totalQuotes,
                        sub: 'CIF / FOB Proforma Ready',
                        icon: FileText,
                        color: 'text-[#C9A227]',
                    },
                    {
                        label: 'Active Shipments',
                        value: metrics.activeShipments,
                        sub: 'Live Vessel & Ro-Ro Tracking',
                        icon: Ship,
                        color: 'text-emerald-400',
                    },
                    {
                        label: 'Sourcing Pipeline',
                        value: metrics.sourcingRequests,
                        sub: 'JDM & European Auction Desk',
                        icon: Compass,
                        color: 'text-blue-400',
                    },
                    {
                        label: 'Verified Documents',
                        value: metrics.verifiedDocuments,
                        sub: 'QR Authenticated Vault',
                        icon: ShieldCheck,
                        color: 'text-[#C9A227]',
                    },
                ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    {stat.label}
                                </span>
                                <Icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div className="text-3xl font-mono font-bold text-white">{stat.value}</div>
                            <div className="text-[11px] text-gray-400 mt-1">{stat.sub}</div>
                        </div>
                    );
                })}
            </div>

            {/* ROLE VIEW 1: CUSTOMER PORTAL (Volume 5 Pages 254-255) */}
            {activePortal === 'customer' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Active Shipments & 7-Stage Vehicle Tracking */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Ship className="w-5 h-5 text-[#C9A227]" />
                                        Active Shipments & 10-Stage Export Milestones
                                    </h2>
                                    <Link
                                        href="/tracking"
                                        className="text-xs text-[#C9A227] hover:underline flex items-center gap-1"
                                    >
                                        Full Tracking Hub <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {shipments.map((shipment) => (
                                        <div
                                            key={shipment.id}
                                            className="p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-[#C9A227]/40 transition-all"
                                        >
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="font-mono text-sm font-bold text-[#C9A227]">
                                                        {shipment.tracking_number}
                                                    </span>
                                                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono uppercase">
                                                        {shipment.current_status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={`/tracking/${shipment.tracking_number}`}
                                                    className="text-xs text-gray-300 hover:text-[#C9A227] font-medium"
                                                >
                                                    Inspect Timeline →
                                                </Link>
                                            </div>
                                            <div className="text-xs text-gray-400 flex flex-wrap gap-x-6 gap-y-1">
                                                <span>
                                                    Vessel: <strong className="text-white">{shipment.vessel_name}</strong>
                                                </span>
                                                <span>
                                                    Route: <strong className="text-white">{shipment.origin_port} → {shipment.destination_port}</strong>
                                                </span>
                                                <span>
                                                    ETA: <strong className="font-mono text-white">{shipment.eta_date}</strong>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quotations Table */}
                            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-[#C9A227]" />
                                        CIF / FOB Proforma Quotations
                                    </h2>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-gray-400">
                                                <th className="pb-3">Quote #</th>
                                                <th className="pb-3">Vehicle</th>
                                                <th className="pb-3">Destination</th>
                                                <th className="pb-3 text-right">Total Landed</th>
                                                <th className="pb-3 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-sm">
                                            {quotations.map((q) => (
                                                <tr key={q.id} className="hover:bg-white/[0.02]">
                                                    <td className="py-3.5 font-mono text-xs text-[#C9A227]">
                                                        {q.quote_number}
                                                    </td>
                                                    <td className="py-3.5 text-white font-medium">
                                                        {q.vehicle?.title || 'Export Vehicle'}
                                                    </td>
                                                    <td className="py-3.5 text-xs text-gray-400">
                                                        {q.port?.name} ({q.incoterm})
                                                    </td>
                                                    <td className="py-3.5 text-right font-mono font-bold text-white">
                                                        {formatPrice(q.total_usd)}
                                                    </td>
                                                    <td className="py-3.5 text-right">
                                                        <span className="px-2.5 py-0.5 rounded bg-[#C9A227]/15 text-[#C9A227] text-xs font-mono uppercase">
                                                            {q.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Financial Center, Document Vault & Support Tickets */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Financial Center (Volume 5 Page 255) */}
                            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-[#C9A227]" />
                                        Financial Center & Settlement
                                    </h2>
                                    <span className="text-[11px] font-mono text-emerald-400">SWIFT / L/C Active</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                                            Cleared Deposits
                                        </span>
                                        <span className="text-lg font-mono font-bold text-emerald-400 mt-1 block">
                                            {formatIsoPrice(64500)}
                                        </span>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                                            Pending Balance (B/L Release)
                                        </span>
                                        <span className="text-lg font-mono font-bold text-[#C9A227] mt-1 block">
                                            {formatIsoPrice(21800)}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="p-3 rounded-lg bg-[#111111] border border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="font-mono text-white font-semibold block">INV-2026-0891</span>
                                            <span className="text-gray-400">18 July 2026 • T/T Deposit Confirmed</span>
                                        </div>
                                        <Link href="/documents" className="text-[#C9A227] font-semibold hover:underline">
                                            Receipt PDF
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Document Vault */}
                            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-[#C9A227]" />
                                        Document Vault
                                    </h2>
                                    <Link href="/documents" className="text-xs text-[#C9A227] hover:underline">
                                        Verify QR →
                                    </Link>
                                </div>

                                <div className="space-y-3">
                                    {documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="p-3.5 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-between gap-3"
                                        >
                                            <div>
                                                <div className="text-xs font-mono text-[#C9A227]">{doc.document_number}</div>
                                                <div className="text-sm font-medium text-white">{doc.title}</div>
                                                <div className="text-[11px] text-gray-500">
                                                    Issued: {doc.issue_date} • {doc.status.toUpperCase()}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/documents?verify=${doc.verification_code}`}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                                                title="Verify & Download"
                                            >
                                                <Download className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Customer Support Ticket & Inspection Request (Volume 5 Page 255) */}
                            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                                    <Headphones className="w-5 h-5 text-[#C9A227]" />
                                    Priority Support & Inspection Desk
                                </h2>
                                {ticketSubmitted ? (
                                    <div className="p-4 rounded-xl bg-[#2E8B57]/20 border border-[#2E8B57] text-xs text-emerald-300">
                                        Support ticket #VGT-SUP-804 logged. Your account manager Kenji Takahashi will respond within 2 hours.
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            setTicketSubmitted(true);
                                        }}
                                        className="space-y-3"
                                    >
                                        <select className="w-full px-3 py-2 bg-[#111111] border border-white/15 rounded-lg text-xs text-white">
                                            <option>Request Additional Pre-Export Inspection</option>
                                            <option>Schedule Live Video Vehicle Walkaround</option>
                                            <option>Bill of Lading / Consignee Amendment</option>
                                            <option>Invoice & Wire Transfer Confirmation</option>
                                        </select>
                                        <textarea
                                            rows={2}
                                            required
                                            placeholder="Enter Stock No., Shipment ID, or specific instructions..."
                                            className="w-full px-3 py-2 bg-[#111111] border border-white/15 rounded-lg text-xs text-white placeholder-gray-500"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-2.5 bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#d8b138]"
                                        >
                                            Submit Priority Ticket
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ROLE VIEW 2: DEALER PORTAL (Volume 5 Pages 256-257) */}
            {activePortal === 'dealer' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Wholesale Inventory & Bulk Purchasing */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                            <Building2 className="w-5 h-5 text-[#C9A227]" />
                                            Wholesale Dealer Allocation & Auction Pipeline
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            Tier-1 wholesale pricing for authorized dealerships, rental fleets, and regional distributors.
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#C9A227] text-xs font-mono font-bold">
                                        Credit Line: USD 250,000 Approved
                                    </span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10 text-gray-400 font-mono uppercase">
                                                <th className="py-3">Lot / Stock</th>
                                                <th className="py-3">Unit</th>
                                                <th className="py-3">Grade</th>
                                                <th className="py-3 text-right">Retail FOB</th>
                                                <th className="py-3 text-right">Dealer Wholesale</th>
                                                <th className="py-3 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {[
                                                { stock: 'VGT-JP-901', unit: '2023 Toyota Land Cruiser 300 ZX', grade: '5.0 / A', retail: 74500, wholesale: 69800 },
                                                { stock: 'VGT-JP-904', unit: '2024 Toyota Hilux GR Sport 4WD', grade: 'S / New', retail: 42800, wholesale: 39400 },
                                                { stock: 'VGT-JP-911', unit: '2022 Lexus LX600 Executive', grade: '4.5 / A', retail: 88000, wholesale: 82900 },
                                                { stock: 'VGT-EU-402', unit: '2023 Mercedes-Benz G400d AMG Line', grade: '4.5 / A', retail: 118000, wholesale: 111500 },
                                            ].map((item) => (
                                                <tr key={item.stock} className="hover:bg-white/[0.02]">
                                                    <td className="py-3.5 font-mono text-[#C9A227]">{item.stock}</td>
                                                    <td className="py-3.5 font-semibold text-white">{item.unit}</td>
                                                    <td className="py-3.5 font-mono text-emerald-400">{item.grade}</td>
                                                    <td className="py-3.5 text-right font-mono text-gray-500 line-through">
                                                        {formatIsoPrice(item.retail)}
                                                    </td>
                                                    <td className="py-3.5 text-right font-mono font-bold text-white">
                                                        {formatIsoPrice(item.wholesale)}
                                                    </td>
                                                    <td className="py-3.5 text-right">
                                                        <Link
                                                            href="/contact?department=Dealer+Relations"
                                                            className="px-2.5 py-1 rounded bg-[#C9A227] text-[#111111] font-bold uppercase tracking-wider"
                                                        >
                                                            Reserve Lot
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Market Reports & Auction Analytics (Volume 5 Page 257) */}
                            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5 text-[#C9A227]" />
                                    Q3 2026 JDM & European Auction Market Intelligence
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                    <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                                        <span className="text-gray-400 block">USS Tokyo Hybrid SUV Index</span>
                                        <span className="text-lg font-mono font-bold text-emerald-400 mt-1 block">
                                            -3.2% MoM (Buyer Favorable)
                                        </span>
                                        <p className="text-gray-500 mt-1">Strong supply of 2022–2024 Corolla Cross & RAV4 Hybrid.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                                        <span className="text-gray-400 block">JPY / USD Exchange Advantage</span>
                                        <span className="text-lg font-mono font-bold text-[#C9A227] mt-1 block">
                                            154.50 JPY / USD
                                        </span>
                                        <p className="text-gray-500 mt-1">Optimal window for bulk container forward contracts.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                                        <span className="text-gray-400 block">Ro-Ro Space Availability</span>
                                        <span className="text-lg font-mono font-bold text-white mt-1 block">
                                            94% Allocated (Yokohama)
                                        </span>
                                        <p className="text-gray-500 mt-1">Priority dealer slots reserved on NYK & MOL sailings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Container Optimization Calculator (Volume 5 Page 256) */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-[#1A1A1A] border border-[#C9A227]/30 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                    <Calculator className="w-5 h-5 text-[#C9A227]" />
                                    Bulk Container Optimization Planner
                                </h2>
                                <p className="text-xs text-gray-400 mb-5">
                                    Optimize multi-vehicle lashing and CBM utilization across 20ft and 40ft High-Cube containers.
                                </p>

                                <div className="space-y-4 text-xs">
                                    <div>
                                        <label className="block text-gray-300 uppercase tracking-wider mb-1.5">
                                            Container Specification (Vol 2 Page 73)
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setContainerType('20ft')}
                                                className={`py-2.5 rounded-lg font-mono font-bold border ${
                                                    containerType === '20ft'
                                                        ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                                        : 'bg-[#111111] text-gray-400 border-white/10'
                                                }`}
                                            >
                                                20-Foot Standard (1–2 Units)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setContainerType('40hc')}
                                                className={`py-2.5 rounded-lg font-mono font-bold border ${
                                                    containerType === '40hc'
                                                        ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                                        : 'bg-[#111111] text-gray-400 border-white/10'
                                                }`}
                                            >
                                                40-Foot High Cube (3–4 Units)
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 uppercase tracking-wider mb-1.5">
                                            Number of Vehicles in Consignment: <strong className="text-[#C9A227] font-mono">{containerUnits} Units</strong>
                                        </label>
                                        <input
                                            type="range"
                                            min={1}
                                            max={4}
                                            value={containerUnits}
                                            onChange={(e) => setContainerUnits(Number(e.target.value))}
                                            className="w-full accent-[#C9A227]"
                                        />
                                    </div>

                                    <div className="p-4 rounded-xl bg-[#111111] border border-white/10 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Estimated Container Rate</span>
                                            <span className="font-mono font-bold text-white">
                                                {containerType === '40hc' ? 'USD 3,600' : 'USD 2,100'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Freight Cost Per Vehicle</span>
                                            <span className="font-mono font-bold text-emerald-400">
                                                USD {Math.round((containerType === '40hc' ? 3600 : 2100) / containerUnits).toLocaleString()} / unit
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Volume Utilization</span>
                                            <span className="font-mono text-[#C9A227]">
                                                {Math.min(98, containerUnits * 24)}% CBM Efficiency
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href="/contact?department=Dealer+Relations"
                                        className="block w-full text-center py-3 rounded-lg bg-[#C9A227] text-[#111111] font-bold uppercase tracking-wider hover:bg-[#d8b138]"
                                    >
                                        Book Multi-Vehicle Container Slot
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ROLE VIEW 3: SUPPLIER PORTAL (Volume 5 Pages 258-259) */}
            {activePortal === 'supplier' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Vehicle Submission & Inspection Upload */}
                    <div className="lg:col-span-7 bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                            <UploadCloud className="w-5 h-5 text-[#C9A227]" />
                            Submit Supplier Stock & Inspection Dossier
                        </h2>
                        <p className="text-xs text-gray-400 mb-6">
                            Authorized auction agents, Japanese dealers, and European fleet partners can upload inspected units directly to the Valqora procurement desk.
                        </p>

                        {supplierSubmitted ? (
                            <div className="p-6 rounded-xl bg-[#2E8B57]/20 border border-[#2E8B57] text-sm text-emerald-300">
                                Vehicle lot submission logged (#SUP-LOT-2026-419). Our Yokohama Quality Control team will verify the VIN and auction sheet within 4 business hours.
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setSupplierSubmitted(true);
                                }}
                                className="space-y-4 text-xs"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Make & Model (e.g. Toyota Alphard)"
                                        className="px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-white"
                                    />
                                    <input
                                        type="text"
                                        required
                                        placeholder="VIN / Chassis Code *"
                                        className="px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-white font-mono"
                                    />
                                    <input
                                        type="number"
                                        required
                                        placeholder="FOB Reserve Price (USD) *"
                                        className="px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-white font-mono"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <input
                                        type="number"
                                        required
                                        placeholder="Mileage (km) *"
                                        className="px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-white font-mono"
                                    />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Auction Grade (e.g. 4.5 A)"
                                        className="px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-white font-mono"
                                    />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Yard Location (e.g. Yokohama)"
                                        className="px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-white"
                                    />
                                </div>
                                <textarea
                                    rows={3}
                                    placeholder="Inspection notes, auction house lot number, and collection readiness date..."
                                    className="w-full px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-white"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-[#C9A227] text-[#111111] font-bold uppercase tracking-wider rounded-lg hover:bg-[#d8b138]"
                                >
                                    Submit Vehicle to Valqora Procurement Desk
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Supplier Performance Scorecard (Volume 5 Page 259) */}
                    <div className="lg:col-span-5 bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Award className="w-5 h-5 text-[#C9A227]" />
                                Supplier Performance Scorecard
                            </h2>
                            <span className="px-2.5 py-1 rounded bg-[#2E8B57]/20 text-emerald-400 text-xs font-mono font-bold">
                                Tier-1 Preferred Partner
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                                <span className="text-gray-400 block">Inspection Accuracy</span>
                                <span className="text-xl font-mono font-bold text-emerald-400 mt-1 block">99.6%</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                                <span className="text-gray-400 block">On-Time Port Delivery</span>
                                <span className="text-xl font-mono font-bold text-white mt-1 block">98.9%</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                                <span className="text-gray-400 block">Avg Response Time</span>
                                <span className="text-xl font-mono font-bold text-[#C9A227] mt-1 block">1.4 hrs</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                                <span className="text-gray-400 block">Supplier Rating</span>
                                <span className="text-xl font-mono font-bold text-white mt-1 block">4.95 / 5.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
}
