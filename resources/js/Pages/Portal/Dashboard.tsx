import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PortalLayout } from '@/Layouts/PortalLayout';
import { useCurrency } from '@/context/CurrencyContext';
import { PageProps, Quotation, SourcingRequest, Shipment, TradeDocument } from '@/types';
import {
    LayoutDashboard,
    FileSpreadsheet,
    Truck,
    FolderLock,
    Search,
    Car,
    ArrowRight,
    CheckCircle2,
    Clock,
    Download,
    ExternalLink,
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

export default function PortalDashboard({
    metrics,
    quotations = [],
    sourcingRequests = [],
    shipments = [],
    documents = [],
}: PortalDashboardProps) {
    const { auth } = usePage<PageProps>().props;
    const { formatPrice } = useCurrency();

    return (
        <PortalLayout title="Client Trade Console Overview">
            {/* Welcome Banner */}
            <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-[10px] font-mono uppercase text-[#C9A227] tracking-wider">
                        CLIENT ACCESS CONSOLE
                    </span>
                    <h2 className="text-xl font-bold text-white mt-0.5">
                        Welcome, {auth.user?.name}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                        Entity: <strong className="text-white">{auth.user?.company_name || 'Private Collector'}</strong> • Region: <strong className="text-white">{auth.user?.country || 'International'}</strong>
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/sourcing"
                        className="px-4 py-2 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition"
                    >
                        New Sourcing Directive
                    </Link>
                </div>
            </div>

            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-[#141416] border border-[#222226]">
                    <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <span>Active Shipments</span>
                        <Truck className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <p className="text-2xl font-black text-white font-mono">{metrics.activeShipments}</p>
                    <p className="text-[10px] text-gray-500 mt-1">Ocean cargo en route</p>
                </div>

                <div className="p-5 rounded-xl bg-[#141416] border border-[#222226]">
                    <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <span>Quotations Issued</span>
                        <FileSpreadsheet className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <p className="text-2xl font-black text-white font-mono">{metrics.totalQuotes}</p>
                    <p className="text-[10px] text-gray-500 mt-1">Pro-forma proposals</p>
                </div>

                <div className="p-5 rounded-xl bg-[#141416] border border-[#222226]">
                    <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <span>Sourcing Directives</span>
                        <Search className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <p className="text-2xl font-black text-white font-mono">{metrics.sourcingRequests}</p>
                    <p className="text-[10px] text-gray-500 mt-1">Active procurement orders</p>
                </div>

                <div className="p-5 rounded-xl bg-[#141416] border border-[#222226]">
                    <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <span>Vault Documents</span>
                        <FolderLock className="w-4 h-4 text-[#C9A227]" />
                    </div>
                    <p className="text-2xl font-black text-white font-mono">{metrics.verifiedDocuments}</p>
                    <p className="text-[10px] text-gray-500 mt-1">B/L and Export Certs</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Shipments Table */}
                <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#242428]">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Active Maritime Consignments
                        </h3>
                        <Link href="/portal/shipments" className="text-xs text-[#C9A227] hover:underline flex items-center gap-1">
                            <span>View All</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {shipments.length > 0 ? (
                        <div className="space-y-3">
                            {shipments.map((s) => (
                                <div key={s.id} className="p-3 bg-[#111112] border border-[#242428] rounded-xl flex items-center justify-between text-xs">
                                    <div>
                                        <p className="font-mono font-bold text-white">{s.tracking_number}</p>
                                        <p className="text-gray-400 text-[11px] mt-0.5">
                                            {s.vessel_name} → {s.destination_port}
                                        </p>
                                        <p className="text-[10px] text-[#C9A227] mt-0.5">ETA: {s.estimated_arrival_date}</p>
                                    </div>

                                    <div className="text-right">
                                        <span className="inline-block px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 text-[10px] font-mono font-bold uppercase mb-1">
                                            {s.current_status.replace('_', ' ')}
                                        </span>
                                        <div>
                                            <Link
                                                href={`/tracking/${s.tracking_number}`}
                                                className="text-xs text-[#C9A227] hover:underline font-semibold"
                                            >
                                                Track Vessel →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-gray-500 py-4 text-center">No ocean consignments currently registered.</p>
                    )}
                </div>

                {/* Recent Quotations Table */}
                <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#242428]">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Commercial Pro-Forma Quotes
                        </h3>
                        <Link href="/portal/quotations" className="text-xs text-[#C9A227] hover:underline flex items-center gap-1">
                            <span>View All</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {quotations.length > 0 ? (
                        <div className="space-y-3">
                            {quotations.map((q) => (
                                <div key={q.id} className="p-3 bg-[#111112] border border-[#242428] rounded-xl flex items-center justify-between text-xs">
                                    <div>
                                        <p className="font-mono font-bold text-white">{q.quotation_no}</p>
                                        <p className="text-gray-300 text-[11px] font-semibold mt-0.5">
                                            {q.vehicle?.title || 'Custom Sourced Allocation'}
                                        </p>
                                        <p className="text-gray-400 text-[10px]">
                                            Terms: {q.incoterm} • {q.destination_port}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-mono font-bold text-[#C9A227]">
                                            ${Number(q.total_amount_usd).toLocaleString()}
                                        </p>
                                        <Link
                                            href={`/quotations/${q.quotation_no}`}
                                            className="text-xs text-gray-400 hover:text-white transition mt-1 inline-block"
                                        >
                                            View Proposal →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-gray-500 py-4 text-center">No pro-forma proposals issued yet.</p>
                    )}
                </div>
            </div>
        </PortalLayout>
    );
}
