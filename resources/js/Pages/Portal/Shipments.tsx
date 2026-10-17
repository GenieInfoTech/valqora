import React from 'react';
import { Link } from '@inertiajs/react';
import { PortalLayout } from '@/Layouts/PortalLayout';
import { PaginatedData, Shipment } from '@/types';
import { Truck, ArrowRight, ExternalLink } from 'lucide-react';

interface PortalShipmentsProps {
    shipments: PaginatedData<Shipment>;
}

export default function PortalShipments({ shipments }: PortalShipmentsProps) {
    return (
        <PortalLayout title="My Ocean Consignments">
            <div className="bg-[#161618] border border-[#26262B] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-[#242428] flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Ocean Vessel Consignments
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Real-time tracking of booked hold allocations and customs releases.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                        <thead>
                            <tr className="border-b border-[#242428] bg-[#111112] text-gray-400 uppercase text-[10px]">
                                <th className="p-4">Tracking Code</th>
                                <th className="p-4">Vessel & Carrier</th>
                                <th className="p-4">Discharge Port</th>
                                <th className="p-4">Current Waypoint</th>
                                <th className="p-4">Estimated Berth</th>
                                <th className="p-4">Voyage Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#202024] text-gray-200">
                            {shipments.data.map((s) => (
                                <tr key={s.id} className="hover:bg-[#1A1A1E] transition">
                                    <td className="p-4 font-bold text-[#C9A227]">{s.tracking_number}</td>
                                    <td className="p-4 font-sans text-white">
                                        <p className="font-semibold">{s.vessel_name}</p>
                                        <p className="text-[10px] text-gray-400 font-mono">{s.shipping_line}</p>
                                    </td>
                                    <td className="p-4 font-sans text-gray-300">{s.destination_port}</td>
                                    <td className="p-4 text-gray-300">{s.current_location_name || 'In Transit'}</td>
                                    <td className="p-4 text-[#C9A227]">{s.estimated_arrival_date}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 text-[10px] uppercase font-bold">
                                            {s.current_status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link
                                            href={`/tracking/${s.tracking_number}`}
                                            className="px-3 py-1.5 bg-[#25252B] hover:bg-[#C9A227] text-white hover:text-black font-semibold rounded transition duration-150 inline-block font-sans"
                                        >
                                            Track →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {shipments.data.length === 0 && (
                    <div className="p-12 text-center text-xs text-gray-400">
                        No ocean consignments currently active.
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
