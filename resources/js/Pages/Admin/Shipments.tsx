import React from 'react';
import { Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { PaginatedData, Shipment } from '@/types';
import { Truck, ExternalLink, Anchor } from 'lucide-react';

interface AdminShipmentsProps {
    shipments: PaginatedData<Shipment>;
}

export default function AdminShipments({ shipments }: AdminShipmentsProps) {
    return (
        <AdminLayout title="Ocean Fleet & Logistics Operations">
            <div className="bg-[#141418] border border-[#222228] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-[#222228]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Active Ocean Maritime Fleet
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Carrier allocations with NYK Line, Wallenius Wilhelmsen, and "K" Line.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                        <thead>
                            <tr className="border-b border-[#222228] bg-[#0E0E12] text-gray-400 uppercase text-[10px]">
                                <th className="p-4">Tracking Number</th>
                                <th className="p-4">Vessel & Shipping Line</th>
                                <th className="p-4">Carrier Booking</th>
                                <th className="p-4">Route (Origin → Discharge)</th>
                                <th className="p-4">ETA Berth</th>
                                <th className="p-4">Voyage Status</th>
                                <th className="p-4 text-right">Telemetry</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1C1C24] text-gray-200">
                            {shipments.data.map((s) => (
                                <tr key={s.id} className="hover:bg-[#181820] transition">
                                    <td className="p-4 font-bold text-[#C9A227]">{s.tracking_number}</td>
                                    <td className="p-4 font-sans text-white">
                                        <p className="font-semibold">{s.vessel_name}</p>
                                        <p className="text-[10px] text-gray-400 font-mono">{s.shipping_line}</p>
                                    </td>
                                    <td className="p-4 text-gray-300">{s.booking_reference || 'N/A'}</td>
                                    <td className="p-4 font-sans text-gray-300">
                                        {s.origin_port} → <strong className="text-white">{s.destination_port}</strong>
                                    </td>
                                    <td className="p-4 text-[#C9A227]">{s.estimated_arrival_date}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 text-[10px] uppercase font-bold">
                                            {s.current_status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link
                                            href={`/tracking/${s.tracking_number}`}
                                            className="px-3 py-1.5 bg-[#222228] hover:bg-[#C9A227] text-white hover:text-black font-semibold rounded transition font-sans inline-block"
                                        >
                                            Track →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
