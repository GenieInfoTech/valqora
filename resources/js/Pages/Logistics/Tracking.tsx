import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Shipment } from '@/types';
import {
    Search,
    Truck,
    Anchor,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Clock,
    FileText,
    ShieldCheck,
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

export default function Tracking({ searchedNumber = '', shipment = null, sampleShipments = [] }: TrackingProps) {
    const [number, setNumber] = useState(searchedNumber);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!number.trim()) return;
        router.get('/tracking', { number: number.trim() });
    };

    const handleQuickTrack = (code: string) => {
        setNumber(code);
        router.get('/tracking', { number: code });
    };

    return (
        <AppLayout
            title="Ocean Cargo & Vessel Tracking"
            description="Track real-time ocean vessel milestones, export customs status, and estimated berthing times for VALQORA automotive consignments."
        >
            <div className="bg-[#111111] py-14 border-b border-[#222226]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                        MARITIME TELEMETRY & VOYAGE TRACKING
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                        Ocean Consignment Tracker
                    </h1>
                    <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
                        Enter your VALQORA tracking number, carrier booking reference, or Bill of Lading (B/L) to inspect real-time vessel waypoints and customs clearance progression.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A227]" />
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="Enter Tracking No. e.g. VQ-SHP-88392-DXB"
                                className="w-full pl-11 pr-4 py-3.5 bg-[#161618] border border-[#2E2E34] text-white rounded-xl text-sm focus:border-[#C9A227] outline-none font-mono"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-8 py-3.5 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Anchor className="w-4 h-4" />
                            <span>Track Vessel</span>
                        </button>
                    </form>

                    {/* Quick Demo Tracking Pill */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                        <span className="text-gray-500">Active Voyage Sample:</span>
                        <button
                            type="button"
                            onClick={() => handleQuickTrack('VQ-SHP-88392-DXB')}
                            className="px-2.5 py-1 bg-[#1C1C20] hover:bg-[#25252A] border border-[#33333A] rounded font-mono text-[#C9A227] transition"
                        >
                            VQ-SHP-88392-DXB (M/V Prominent Ace to Dubai)
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search Result Shipment Box */}
                {shipment ? (
                    <div className="bg-[#161618] border border-[#2E2E34] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#26262B]">
                            <div>
                                <span className="text-[10px] font-mono uppercase text-[#C9A227] tracking-wider">
                                    CONSIGNMENT FOUND
                                </span>
                                <h2 className="text-xl font-bold text-white font-mono mt-0.5">
                                    {shipment.tracking_number}
                                </h2>
                                <p className="text-xs text-gray-400 mt-1">
                                    Carrier: <strong className="text-white">{shipment.shipping_line}</strong> • Vessel: <strong className="text-white">{shipment.vessel_name}</strong> ({shipment.voyage_number})
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold uppercase">
                                    Status: {shipment.current_status.replace('_', ' ')}
                                </span>
                                <Link
                                    href={`/tracking/${shipment.tracking_number}`}
                                    className="px-4 py-2 bg-[#C9A227] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition hover:bg-[#dfba38]"
                                >
                                    Full Telemetry Dossier
                                </Link>
                            </div>
                        </div>

                        {/* Route Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                            <div className="p-4 bg-[#111112] rounded-xl border border-[#242428]">
                                <p className="text-[10px] text-gray-500 uppercase">Port of Loading</p>
                                <p className="text-sm font-bold text-white mt-1">{shipment.origin_port}</p>
                                <p className="text-gray-400 text-[11px] mt-0.5">Departed: {shipment.departure_date}</p>
                            </div>

                            <div className="p-4 bg-[#111112] rounded-xl border border-[#242428]">
                                <p className="text-[10px] text-gray-500 uppercase">Port of Discharge</p>
                                <p className="text-sm font-bold text-white mt-1">{shipment.destination_port}</p>
                                <p className="text-[#C9A227] text-[11px] mt-0.5">ETA: {shipment.estimated_arrival_date}</p>
                            </div>

                            <div className="p-4 bg-[#111112] rounded-xl border border-[#242428]">
                                <p className="text-[10px] text-gray-500 uppercase">Current Waypoint</p>
                                <p className="text-sm font-bold text-white mt-1">{shipment.current_location_name || 'En Route'}</p>
                                <p className="text-gray-400 text-[11px] mt-0.5">Lat: {shipment.current_lat}° N, Lng: {shipment.current_lng}° E</p>
                            </div>
                        </div>

                        {/* Milestone Stepper */}
                        {shipment.milestones && shipment.milestones.length > 0 && (
                            <div className="pt-4 border-t border-[#26262B]">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                                    Voyage Milestone Progression
                                </h3>

                                <div className="space-y-4">
                                    {shipment.milestones.map((m) => (
                                        <div key={m.id} className="flex items-start gap-4 text-xs">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                                                m.is_completed
                                                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
                                                    : 'bg-[#18181A] border-[#333] text-gray-500'
                                            }`}>
                                                {m.is_completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 pb-3 border-b border-[#222226]">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <p className={`font-semibold ${m.is_completed ? 'text-white' : 'text-gray-400'}`}>
                                                        {m.title}
                                                    </p>
                                                    {m.occurred_at && (
                                                        <span className="text-[10px] font-mono text-gray-500">
                                                            {new Date(m.occurred_at).toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 text-[11px] mt-0.5">{m.location_description}</p>
                                                {m.notes && <p className="text-gray-500 text-[11px] mt-1 font-mono">{m.notes}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : searchedNumber ? (
                    <div className="p-12 text-center bg-[#151518] border border-[#222226] rounded-2xl space-y-3">
                        <Truck className="w-10 h-10 text-gray-500 mx-auto" />
                        <h3 className="text-base font-bold text-white">No Record for "{searchedNumber}"</h3>
                        <p className="text-xs text-gray-400 max-w-md mx-auto">
                            Please verify the tracking code format or contact your designated VALQORA maritime officer to confirm the vessel booking reference.
                        </p>
                    </div>
                ) : null}

                {/* Maritime Process Overview */}
                <div className="mt-16 pt-12 border-t border-[#222226]">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl font-bold text-white">The VALQORA Maritime Transport Protocol</h2>
                        <p className="text-xs text-gray-400 mt-2">
                            From port-side receiving at Daikoku Yokohama to final discharge at destination customs bureaus.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                        <div className="p-5 bg-[#141416] border border-[#222226] rounded-xl">
                            <span className="text-[#C9A227] font-mono text-lg font-black">01</span>
                            <h4 className="text-white font-bold mt-2">Vessel Space Allocation</h4>
                            <p className="text-gray-400 mt-1 text-[11px]">Direct contracts with NYK, Wallenius, and MOL for guaranteed vehicle hold placement.</p>
                        </div>

                        <div className="p-5 bg-[#141416] border border-[#222226] rounded-xl">
                            <span className="text-[#C9A227] font-mono text-lg font-black">02</span>
                            <h4 className="text-white font-bold mt-2">Customs & Inspection Seal</h4>
                            <p className="text-gray-400 mt-1 text-[11px]">Official export declaration, JEVIC radiation audit, and physical lashing verification.</p>
                        </div>

                        <div className="p-5 bg-[#141416] border border-[#222226] rounded-xl">
                            <span className="text-[#C9A227] font-mono text-lg font-black">03</span>
                            <h4 className="text-white font-bold mt-2">Ocean Transit Telemetry</h4>
                            <p className="text-gray-400 mt-1 text-[11px]">Real-time satellite waypoint tracking across high-seas routes with speed and ETA updates.</p>
                        </div>

                        <div className="p-5 bg-[#141416] border border-[#222226] rounded-xl">
                            <span className="text-[#C9A227] font-mono text-lg font-black">04</span>
                            <h4 className="text-white font-bold mt-2">Destination Port Release</h4>
                            <p className="text-gray-400 mt-1 text-[11px]">Original ocean Bill of Lading delivery to consignee for expedited local customs clearing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
