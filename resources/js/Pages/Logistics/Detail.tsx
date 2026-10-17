import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Shipment } from '@/types';
import {
    Anchor,
    Truck,
    MapPin,
    ArrowLeft,
    CheckCircle2,
    Clock,
    FileText,
    Download,
    ShieldCheck,
    Navigation,
    Compass,
} from 'lucide-react';

interface LogisticsDetailProps {
    shipment: Shipment;
}

export default function LogisticsDetail({ shipment }: LogisticsDetailProps) {
    return (
        <AppLayout
            title={`Consignment ${shipment.tracking_number} Telemetry`}
            description={`Live ocean telemetry and milestone tracking for shipment ${shipment.tracking_number} on ${shipment.vessel_name}.`}
        >
            <div className="bg-[#111111] py-10 border-b border-[#222226]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/tracking"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition mb-4"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Tracking Portal</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                                MARITIME TELEMETRY DOSSIER
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight mt-0.5">
                                {shipment.tracking_number}
                            </h1>
                            <p className="text-xs text-gray-400 mt-1">
                                Carrier: <strong className="text-white">{shipment.shipping_line}</strong> • Booking: <strong className="text-white">{shipment.booking_reference}</strong>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="px-3.5 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold uppercase">
                                {shipment.current_status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left 8 Cols: Live Milestones & Vessel Telemetry */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Live Waypoint & Coordinates Banner */}
                        <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl relative overflow-hidden shadow-xl">
                            <div className="flex items-center justify-between pb-4 border-b border-[#26262B]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#222226] border border-[#3A3A40] flex items-center justify-center text-[#C9A227]">
                                        <Navigation className="w-5 h-5 animate-pulse" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase text-[#C9A227]">LIVE WAYPOINT</span>
                                        <h3 className="text-base font-bold text-white">{shipment.current_location_name || 'En Route'}</h3>
                                    </div>
                                </div>
                                <div className="text-right font-mono text-xs">
                                    <p className="text-gray-400">Position Coordinates:</p>
                                    <p className="text-[#C9A227] font-bold">{shipment.current_lat}° N, {shipment.current_lng}° E</p>
                                </div>
                            </div>

                            {/* Voyage progress visualizer */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                                <div className="p-3 bg-[#111112] border border-[#25252A] rounded-xl">
                                    <p className="text-[10px] text-gray-500 uppercase">Port of Origin (Japan)</p>
                                    <p className="font-bold text-white mt-1">{shipment.origin_port}</p>
                                    <p className="text-gray-400 text-[11px] mt-0.5">Sailed: {shipment.departure_date}</p>
                                </div>

                                <div className="p-3 bg-[#111112] border border-[#25252A] rounded-xl">
                                    <p className="text-[10px] text-gray-500 uppercase">Port of Discharge (Discharge)</p>
                                    <p className="font-bold text-white mt-1">{shipment.destination_port}</p>
                                    <p className="text-[#C9A227] text-[11px] mt-0.5">Estimated Berth: {shipment.estimated_arrival_date}</p>
                                </div>
                            </div>
                        </div>

                        {/* Complete Milestones History */}
                        <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl shadow-xl">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
                                Certified Chronological Milestones
                            </h3>

                            <div className="space-y-6">
                                {shipment.milestones?.map((m, idx) => (
                                    <div key={m.id} className="relative flex items-start gap-4 text-xs">
                                        {/* Connector line */}
                                        {idx < (shipment.milestones?.length || 0) - 1 && (
                                            <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-[#25252A]" />
                                        )}

                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 border ${
                                            m.is_completed
                                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                                                : 'bg-[#18181A] border-[#333] text-gray-500'
                                        }`}>
                                            {m.is_completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                        </div>

                                        <div className="flex-1 pb-4 border-b border-[#222226]">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                <h4 className={`text-sm font-bold ${m.is_completed ? 'text-white' : 'text-gray-400'}`}>
                                                    {m.title}
                                                </h4>
                                                {m.occurred_at && (
                                                    <span className="text-[11px] font-mono text-gray-400">
                                                        {new Date(m.occurred_at).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-xs mt-1">{m.location_description}</p>
                                            {m.notes && (
                                                <p className="mt-2 p-2 rounded bg-[#111112] border border-[#222226] text-[11px] text-gray-300 font-mono">
                                                    {m.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right 4 Cols: Vehicle Details & Trade Document Vault */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Vehicle Card */}
                        {shipment.vehicle && (
                            <div className="p-5 bg-[#161618] border border-[#26262B] rounded-2xl">
                                <span className="text-[10px] font-mono uppercase text-[#C9A227] tracking-wider">
                                    CONSIGNED VEHICLE
                                </span>
                                <div className="mt-3 aspect-[16/10] rounded-xl overflow-hidden bg-black/60">
                                    <img
                                        src={shipment.vehicle.primary_image?.url || shipment.vehicle.images?.[0]?.url}
                                        alt={shipment.vehicle.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-sm font-bold text-white mt-3">{shipment.vehicle.title}</h4>
                                <p className="text-xs text-gray-400 font-mono mt-0.5">Stock ID: {shipment.vehicle.stock_id}</p>
                                <div className="mt-3 pt-3 border-t border-[#25252A] flex justify-between text-xs">
                                    <span className="text-gray-400">Chassis No:</span>
                                    <span className="font-mono text-white">{shipment.vehicle.vin_chassis || 'Verified'}</span>
                                </div>
                            </div>
                        )}

                        {/* Trade Document Vault for This Shipment */}
                        <div className="p-5 bg-[#161618] border border-[#26262B] rounded-2xl space-y-4">
                            <div>
                                <span className="text-[10px] font-mono uppercase text-[#C9A227] tracking-wider">
                                    AUTHENTICATED TRADE DOCUMENTS
                                </span>
                                <h3 className="text-sm font-bold text-white mt-1">Export Documentation Vault</h3>
                            </div>

                            {shipment.documents && shipment.documents.length > 0 ? (
                                <div className="space-y-2">
                                    {shipment.documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="p-3 bg-[#111112] border border-[#25252A] rounded-xl flex items-center justify-between text-xs"
                                        >
                                            <div className="flex items-center gap-2.5 truncate">
                                                <FileText className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                                                <div className="truncate">
                                                    <p className="font-semibold text-white truncate">{doc.title}</p>
                                                    <p className="text-[10px] text-gray-500 font-mono">{doc.document_no}</p>
                                                </div>
                                            </div>

                                            <a
                                                href={`/documents/download/${doc.document_no}`}
                                                className="p-1.5 text-gray-400 hover:text-[#C9A227] rounded transition"
                                                title="Download Document"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500">Documents will appear as released by Japan customs.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
