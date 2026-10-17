import React from 'react';
import { Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { useCurrency } from '@/context/CurrencyContext';
import { Vehicle, Inquiry, Shipment } from '@/types';
import {
    DollarSign,
    Car,
    Mail,
    Truck,
    Users,
    FileSpreadsheet,
    ArrowRight,
    CheckCircle2,
    Clock,
    AlertCircle,
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

export default function AdminDashboard({
    metrics,
    recentInquiries = [],
    activeShipments = [],
    recentVehicles = [],
}: AdminDashboardProps) {
    const { formatPrice } = useCurrency();

    return (
        <AdminLayout title="Executive Directorate Dashboard">
            {/* Top KPI Metrics Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-[#141418] border border-[#222228]">
                    <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <span>Available Inventory Value</span>
                        <DollarSign className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <p className="text-2xl font-black text-[#C9A227] font-mono tracking-tight">
                        ${metrics.totalInventoryValueUsd.toLocaleString()} USD
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 font-mono">
                        {metrics.availableVehicles} of {metrics.totalVehicles} units ready for export
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#141418] border border-[#222228]">
                    <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <span>Active Lead Inquiries</span>
                        <Mail className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <p className="text-2xl font-black text-white font-mono tracking-tight">
                        {metrics.activeInquiries}
                    </p>
                    <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Awaiting specialist response
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#141418] border border-[#222228]">
                    <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <span>Ocean Vessels at Sea</span>
                        <Truck className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <p className="text-2xl font-black text-white font-mono tracking-tight">
                        {metrics.activeShipments}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 font-mono">
                        NYK & Wallenius charter legs
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#141418] border border-[#222228]">
                    <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <span>Registered Counterparties</span>
                        <Users className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <p className="text-2xl font-black text-white font-mono tracking-tight">
                        {metrics.registeredUsers}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                        Dealers, buyers & consignors
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Recent Inquiries Inbox */}
                <div className="p-6 bg-[#141418] border border-[#222228] rounded-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#222228]">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Incoming Commercial Inquiries
                        </h3>
                        <Link href="/admin/inquiries" className="text-xs text-[#C9A227] hover:underline flex items-center gap-1">
                            <span>Open CRM Board</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentInquiries.map((inq) => (
                            <div key={inq.id} className="p-3 bg-[#0F0F12] border border-[#1E1E24] rounded-xl flex items-center justify-between text-xs">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[#C9A227] font-bold">{inq.ticket_number}</span>
                                        <span className="text-white font-semibold">{inq.name}</span>
                                        {inq.company_name && (
                                            <span className="text-gray-400 font-mono text-[10px]">({inq.company_name})</span>
                                        )}
                                    </div>
                                    <p className="text-gray-300 text-[11px] mt-1 font-medium truncate max-w-sm">
                                        {inq.subject}
                                    </p>
                                    <p className="text-gray-500 text-[10px] mt-0.5">
                                        Type: {inq.inquiry_type} • Port: {inq.destination_port || 'General'}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                                        inq.status === 'new'
                                            ? 'bg-rose-950/60 border border-rose-500/40 text-rose-400'
                                            : inq.status === 'quoted'
                                            ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                                            : 'bg-amber-950/60 border border-amber-500/40 text-amber-400'
                                    }`}>
                                        {inq.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Shipments */}
                <div className="p-6 bg-[#141418] border border-[#222228] rounded-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#222228]">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Active Vessel Consignments
                        </h3>
                        <Link href="/admin/shipments" className="text-xs text-[#C9A227] hover:underline flex items-center gap-1">
                            <span>Manage Fleet</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {activeShipments.map((shp) => (
                            <div key={shp.id} className="p-3 bg-[#0F0F12] border border-[#1E1E24] rounded-xl flex items-center justify-between text-xs">
                                <div>
                                    <p className="font-mono font-bold text-[#C9A227]">{shp.tracking_number}</p>
                                    <p className="text-white text-[11px] font-semibold mt-0.5">
                                        {shp.vessel_name} ({shp.voyage_number})
                                    </p>
                                    <p className="text-gray-400 text-[10px]">
                                        {shp.origin_port} → {shp.destination_port}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span className="inline-block px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 text-[10px] uppercase font-mono font-bold mb-1">
                                        {shp.current_status.replace('_', ' ')}
                                    </span>
                                    <div>
                                        <Link
                                            href={`/tracking/${shp.tracking_number}`}
                                            className="text-xs text-gray-400 hover:text-white transition"
                                        >
                                            View Telemetry →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inventory Quick Overview */}
            <div className="p-6 bg-[#141418] border border-[#222228] rounded-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#222228]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Current Floor Inventory
                    </h3>
                    <Link href="/admin/vehicles" className="text-xs text-[#C9A227] hover:underline flex items-center gap-1">
                        <span>Manage All Vehicles</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentVehicles.map((v) => (
                        <div key={v.id} className="p-3 rounded-xl bg-[#0F0F12] border border-[#1E1E24] flex items-center gap-3">
                            <img
                                src={v.primary_image?.url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80'}
                                alt={v.title}
                                className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1 text-xs">
                                <p className="font-semibold text-white truncate">{v.title}</p>
                                <p className="text-gray-400 font-mono text-[10px]">
                                    {v.stock_id} • {v.year}
                                </p>
                                <p className="text-[#C9A227] font-mono font-bold mt-0.5">
                                    ${Number(v.fob_price_usd).toLocaleString()} USD
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
