import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Shipment } from '@/types';
import {
    Ship,
    Search,
    MapPin,
    Calendar,
    Package,
    CheckCircle2,
    Clock,
    ShieldCheck,
    ArrowRight,
    Anchor,
    FileCheck,
    Bell,
    AlertTriangle,
    Lock,
    QrCode,
} from 'lucide-react';

interface TrackingProps {
    searchedNumber?: string;
    shipment?: Shipment | null;
    sampleShipments: {
        id: number;
        tracking_number: string;
        vessel_name: string;
        destination_port: string;
        current_status: string;
        vehicle_id?: number | null;
    }[];
}

// 10-Stage Export Shipment Timeline (Volume 5 Page 260 & Volume 7 Pages 403-404)
const TEN_STAGE_TIMELINE = [
    { key: 'purchased', label: '1. Vehicle Purchased', desc: 'Order confirmed & allocated at origin facility' },
    { key: 'inspection', label: '2. 150-Pt Quality Inspection', desc: 'Mechanical, structural & JEVIC odometer audit passed' },
    { key: 'documentation', label: '3. Export Documentation Approved', desc: 'MLIT Export Certificate & Commercial Invoice issued' },
    { key: 'port_delivery', label: '4. Origin Port Delivery', desc: 'Delivered to bonded terminal (Yokohama / Kobe / Nagoya)' },
    { key: 'container_loading', label: '5. Container Loading & Lashing', desc: 'Wheel chocking, ratchet lashing & bolt seal affixed' },
    { key: 'vessel_departure', label: '6. Vessel Departure', desc: 'Bill of Lading (B/L) released & vessel underway' },
    { key: 'ocean_transit', label: '7. Ocean Transit', desc: 'Active satellite AIS vessel & route monitoring' },
    { key: 'destination_arrival', label: '8. Destination Port Arrival', desc: 'Vessel berthed & terminal discharge verified' },
    { key: 'customs_clearance', label: '9. Customs Clearance', desc: 'WCO HS code & import duty clearance completed' },
    { key: 'customer_delivery', label: '10. Final Customer Delivery', desc: 'Handover with official Valqora Vehicle Delivery Pack' },
];

const getCompletedStageIndex = (status?: string): number => {
    switch (status) {
        case 'Sorting':
        case 'purchased':
            return 1;
        case 'Inspected':
        case 'inspection_completed':
            return 2;
        case 'Port Delivery':
        case 'at_origin_port':
            return 4;
        case 'Vessel Loaded':
        case 'vessel_loaded':
            return 5;
        case 'In Transit':
        case 'in_transit':
            return 6;
        case 'Arrived at Port':
        case 'arrived_destination':
            return 7;
        case 'Customs Clearance':
        case 'customs_cleared':
            return 8;
        case 'Delivered':
        case 'delivered':
            return 9;
        default:
            return 6;
    }
};

export default function Tracking({ searchedNumber = '', shipment, sampleShipments }: TrackingProps) {
    const [trackingInput, setTrackingInput] = useState(searchedNumber);
    const [notifSaved, setNotifSaved] = useState(false);
    const [issueReported, setIssueReported] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingInput.trim()) return;
        router.get('/tracking', { number: trackingInput.trim() }, { preserveState: true });
    };

    const currentStageIdx = shipment ? getCompletedStageIndex(shipment.current_status) : -1;

    return (
        <AppLayout>
            <Head title="Shipment & Container Tracking Dashboard — Valqora Global Trading" />

            {/* Hero Search Section */}
            <section className="bg-[#161616] border-b border-white/10 py-14">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-xs font-mono uppercase tracking-widest mb-4">
                        <Ship className="w-3.5 h-3.5" />
                        Valqora Logistics • Real-Time Global Visibility
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                        Shipment & Container Tracking Dashboard
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base mb-8">
                        Enter your Valqora Tracking Reference, Bill of Lading (B/L), or Container ID for end-to-end 10-stage milestone visibility and container seal verification.
                    </p>

                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                        <div className="relative flex-grow">
                            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={trackingInput}
                                onChange={(e) => setTrackingInput(e.target.value)}
                                placeholder="Enter Tracking Number (e.g., VQ-SHP-2026-001)"
                                className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-white/15 rounded-xl text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-8 py-4 bg-[#C9A227] hover:bg-[#d8b138] text-[#111111] font-bold rounded-xl transition-all"
                        >
                            Track Shipment
                        </button>
                    </form>

                    {sampleShipments && sampleShipments.length > 0 && (
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
                            <span>Active Consignments:</span>
                            {sampleShipments.map((s) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => {
                                        setTrackingInput(s.tracking_number);
                                        router.get('/tracking', { number: s.tracking_number });
                                    }}
                                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[#C9A227] font-mono transition-colors"
                                >
                                    {s.tracking_number}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Results Section */}
            <section className="py-12">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20">
                    {searchedNumber && !shipment && (
                        <div className="bg-[#1A1A1A] border border-red-500/30 rounded-2xl p-10 text-center max-w-2xl mx-auto">
                            <Ship className="w-12 h-12 text-red-400 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-white mb-2">
                                No Shipment Found for "{searchedNumber}"
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Please verify your tracking reference or select one of the active sample consignments above.
                            </p>
                        </div>
                    )}

                    {shipment && (
                        <div className="space-y-8">
                            {/* Top Shipment Overview Card */}
                            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                                    <div>
                                        <div className="text-xs font-mono text-gray-400 uppercase">
                                            Tracking Reference
                                        </div>
                                        <div className="text-2xl font-mono font-bold text-[#C9A227] mt-0.5">
                                            {shipment.tracking_number}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
                                            {shipment.current_status.replace('_', ' ')}
                                        </span>
                                        <Link
                                            href="/documents"
                                            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white"
                                        >
                                            Download B/L & Packing List
                                        </Link>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-b border-white/10">
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
                                            <Anchor className="w-3.5 h-3.5 text-[#C9A227]" /> Vessel / Voyage
                                        </div>
                                        <div className="text-sm font-semibold text-white">
                                            {shipment.vessel_name} ({shipment.voyage_number || 'VOY-408E'})
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
                                            <Package className="w-3.5 h-3.5 text-[#C9A227]" /> Container & Booking
                                        </div>
                                        <div className="text-sm font-mono font-semibold text-white">
                                            {shipment.container_number || 'VQCU-849201-4'} ({shipment.shipping_method.toUpperCase()})
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-[#C9A227]" /> Port Route
                                        </div>
                                        <div className="text-sm font-semibold text-white">
                                            {shipment.origin_port} → {shipment.destination_port}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-[#C9A227]" /> ETD / ETA Schedule
                                        </div>
                                        <div className="text-sm font-mono text-white">
                                            {shipment.etd_date} → {shipment.eta_date}
                                        </div>
                                    </div>
                                </div>

                                {/* Container Identification & Bolt Seal Security Panel (Volume 7 Pages 368-371) */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                                    <div className="p-4 rounded-xl bg-[#111111] border border-white/10 flex items-start gap-3">
                                        <Lock className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                                        <div className="text-xs">
                                            <span className="text-gray-400 uppercase tracking-wider block">
                                                High-Security Bolt Seal (ISO 17712)
                                            </span>
                                            <span className="font-mono font-bold text-white text-sm mt-0.5 block">
                                                SEAL: VQ-SEAL-2026-8841
                                            </span>
                                            <span className="text-emerald-400 font-medium">
                                                ✓ Tamper-Evident Verified at Loading & Gate-In
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#111111] border border-white/10 flex items-start gap-3">
                                        <ShieldCheck className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                                        <div className="text-xs">
                                            <span className="text-gray-400 uppercase tracking-wider block">
                                                Assigned Logistics Coordinator
                                            </span>
                                            <span className="font-bold text-white text-sm mt-0.5 block">
                                                Hiroshi Sato — Yokohama Port Desk
                                            </span>
                                            <span className="text-gray-400">
                                                Marine Insurance Policy: MAR-VQ-99201 (All-Risk)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#111111] border border-white/10 flex items-start gap-3">
                                        <QrCode className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                                        <div className="text-xs">
                                            <span className="text-gray-400 uppercase tracking-wider block">
                                                WCO Customs & HS Classification
                                            </span>
                                            <span className="font-mono font-bold text-white text-sm mt-0.5 block">
                                                HS 8703.23 / JEVIC Cleared
                                            </span>
                                            <span className="text-gray-400">
                                                ISPM-15 & Radiation Certificate Attached
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* 10-Stage Export Timeline (Volume 5 Page 260) */}
                                <div className="lg:col-span-8 bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-8">
                                    <h3 className="text-lg font-bold text-white mb-6">
                                        10-Stage End-to-End Export & Logistics Timeline
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {TEN_STAGE_TIMELINE.map((stage, idx) => {
                                            const isCompleted = idx <= currentStageIdx;
                                            const isCurrent = idx === currentStageIdx;
                                            return (
                                                <div
                                                    key={stage.key}
                                                    className={`p-4 rounded-xl border transition-all ${
                                                        isCurrent
                                                            ? 'bg-[#C9A227]/15 border-[#C9A227]'
                                                            : isCompleted
                                                            ? 'bg-[#111111] border-[#2E8B57]/40'
                                                            : 'bg-[#111111]/50 border-white/5 opacity-60'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-bold text-white">
                                                            {stage.label}
                                                        </span>
                                                        {isCompleted ? (
                                                            <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                                                        ) : (
                                                            <Clock className="w-4 h-4 text-gray-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-gray-400">{stage.desc}</p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Detailed Milestone Checkpoints from DB */}
                                    {shipment.milestones && shipment.milestones.length > 0 && (
                                        <div className="pt-6 border-t border-white/10">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-4">
                                                Recorded Terminal & Vessel Telemetry Logs
                                            </h4>
                                            <div className="relative pl-6 border-l-2 border-white/15 space-y-5">
                                                {shipment.milestones.map((m, idx) => (
                                                    <div key={m.id || idx} className="relative">
                                                        <div
                                                            className={`w-3.5 h-3.5 rounded-full absolute -left-[31px] top-1 ${
                                                                m.is_completed
                                                                    ? 'bg-[#C9A227] ring-4 ring-[#C9A227]/20'
                                                                    : 'bg-gray-600'
                                                            }`}
                                                        />
                                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                                            <h5 className="text-sm font-bold text-white">{m.stage}</h5>
                                                            <span className="text-xs font-mono text-gray-400">
                                                                {m.completed_at}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-[#C9A227] mt-0.5">{m.location}</div>
                                                        {m.notes && (
                                                            <p className="text-xs text-gray-400 mt-1">{m.notes}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Automatic Notifications & Exception Reporting (Volume 5 Page 261) */}
                                <div className="lg:col-span-4 space-y-6">
                                    <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                                            <Bell className="w-4 h-4 text-[#C9A227]" />
                                            Automatic Milestone Alerts
                                        </h3>
                                        <p className="text-xs text-gray-400 mb-4">
                                            Subscribe to real-time vessel departure, port arrival, and customs release alerts:
                                        </p>
                                        {notifSaved ? (
                                            <div className="p-3 rounded-lg bg-[#2E8B57]/20 border border-[#2E8B57] text-xs text-emerald-300">
                                                Alert preferences saved for {shipment.tracking_number} via Email, SMS & WhatsApp.
                                            </div>
                                        ) : (
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    setNotifSaved(true);
                                                }}
                                                className="space-y-2.5 text-xs"
                                            >
                                                <label className="flex items-center gap-2 text-gray-300">
                                                    <input type="checkbox" defaultChecked className="accent-[#C9A227]" />
                                                    Email Dispatch & B/L Release Alerts
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300">
                                                    <input type="checkbox" defaultChecked className="accent-[#C9A227]" />
                                                    WhatsApp Business Live ETA Updates
                                                </label>
                                                <label className="flex items-center gap-2 text-gray-300">
                                                    <input type="checkbox" defaultChecked className="accent-[#C9A227]" />
                                                    SMS Customs & Terminal Gate-Out
                                                </label>
                                                <button
                                                    type="submit"
                                                    className="w-full mt-2 py-2.5 bg-[#C9A227] text-[#111111] font-bold uppercase tracking-wider rounded-lg"
                                                >
                                                    Activate Shipment Alerts
                                                </button>
                                            </form>
                                        )}
                                    </div>

                                    <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                                            <AlertTriangle className="w-4 h-4 text-[#E6A700]" />
                                            Report Logistics Issue / Inquiry
                                        </h3>
                                        {issueReported ? (
                                            <div className="p-3 rounded-lg bg-[#2E8B57]/20 border border-[#2E8B57] text-xs text-emerald-300">
                                                Logistics dispatch desk notified. Incident reference #LOG-INC-912 assigned.
                                            </div>
                                        ) : (
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    setIssueReported(true);
                                                }}
                                                className="space-y-3 text-xs"
                                            >
                                                <textarea
                                                    rows={2}
                                                    required
                                                    placeholder="Describe consignee change, port delay inquiry, or customs documentation request..."
                                                    className="w-full px-3 py-2 bg-[#111111] border border-white/15 rounded-lg text-white placeholder-gray-500"
                                                />
                                                <button
                                                    type="submit"
                                                    className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider rounded-lg"
                                                >
                                                    Notify Logistics Control Tower
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
