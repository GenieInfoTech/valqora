import React from 'react';
import { router, Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { PaginatedData, Vehicle } from '@/types';
import { Car, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdminVehiclesProps {
    vehicles: PaginatedData<Vehicle>;
}

export default function AdminVehicles({ vehicles }: AdminVehiclesProps) {
    const handleStatusChange = (vehicleId: number, status: string) => {
        router.post(`/admin/vehicles/${vehicleId}/status`, { status });
    };

    return (
        <AdminLayout title="Vehicle Inventory Management">
            <div className="bg-[#141418] border border-[#222228] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-[#222228] flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Global Fleet & Inventory Floor
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Real-time status management, pricing, and inspection records.
                        </p>
                    </div>

                    <Link
                        href="/vehicles"
                        className="px-4 py-2 bg-[#C9A227] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#dfba38] transition"
                    >
                        View Public Catalog
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                        <thead>
                            <tr className="border-b border-[#222228] bg-[#0E0E12] text-gray-400 uppercase text-[10px]">
                                <th className="p-4">Stock ID</th>
                                <th className="p-4">Vehicle Model</th>
                                <th className="p-4">Year & Specs</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Inspection Grade</th>
                                <th className="p-4">FOB Price</th>
                                <th className="p-4">Operational Status</th>
                                <th className="p-4 text-right">Preview</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1C1C24] text-gray-200">
                            {vehicles.data.map((v) => (
                                <tr key={v.id} className="hover:bg-[#181820] transition">
                                    <td className="p-4 font-bold text-[#C9A227]">{v.stock_id}</td>
                                    <td className="p-4 font-sans font-semibold text-white">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={v.primary_image?.url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=150&q=80'}
                                                alt="thumb"
                                                className="w-10 h-7 object-cover rounded"
                                            />
                                            <span className="truncate max-w-xs">{v.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {v.year} • {v.steering} • {v.fuel_type}
                                    </td>
                                    <td className="p-4 font-sans text-gray-300">
                                        {v.location_city}, {v.location_country}
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-0.5 rounded bg-black border border-[#C9A227]/40 text-[#C9A227] text-[10px] uppercase font-bold">
                                            {v.condition_grade}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-white">
                                        ${Number(v.fob_price_usd).toLocaleString()} USD
                                    </td>
                                    <td className="p-4 font-sans">
                                        <select
                                            value={v.status}
                                            onChange={(e) => handleStatusChange(v.id, e.target.value)}
                                            className={`px-2 py-1 rounded text-[11px] font-semibold border outline-none ${
                                                v.status === 'available'
                                                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                                                    : v.status === 'sold'
                                                    ? 'bg-rose-950/60 border-rose-500/40 text-rose-400'
                                                    : 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                                            }`}
                                        >
                                            <option value="available">Available</option>
                                            <option value="reserved">Reserved</option>
                                            <option value="in_transit">In Transit</option>
                                            <option value="sold">Sold</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link
                                            href={`/vehicles/${v.slug}`}
                                            className="p-1.5 text-gray-400 hover:text-white inline-block"
                                            title="View Public Details"
                                        >
                                            <ExternalLink className="w-4 h-4" />
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
