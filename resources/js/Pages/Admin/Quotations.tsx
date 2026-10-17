import React from 'react';
import { Link } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { PaginatedData, Quotation } from '@/types';
import { FileSpreadsheet, ExternalLink } from 'lucide-react';

interface AdminQuotationsProps {
    quotations: PaginatedData<Quotation>;
}

export default function AdminQuotations({ quotations }: AdminQuotationsProps) {
    return (
        <AdminLayout title="Commercial Quotation Pipeline">
            <div className="bg-[#141418] border border-[#222228] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-[#222228]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Issued Pro-Forma Quotations
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Audit trail of all formal CIF/FOB proposals issued to private buyers and dealer consortiums.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                        <thead>
                            <tr className="border-b border-[#222228] bg-[#0E0E12] text-gray-400 uppercase text-[10px]">
                                <th className="p-4">Quotation Ref</th>
                                <th className="p-4">Customer Entity</th>
                                <th className="p-4">Consigned Vehicle</th>
                                <th className="p-4">Terms</th>
                                <th className="p-4">Discharge Port</th>
                                <th className="p-4">Total Amount (USD)</th>
                                <th className="p-4">Valid Until</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1C1C24] text-gray-200">
                            {quotations.data.map((q) => (
                                <tr key={q.id} className="hover:bg-[#181820] transition">
                                    <td className="p-4 font-bold text-[#C9A227]">{q.quotation_no}</td>
                                    <td className="p-4 font-sans text-white">
                                        <p className="font-semibold">{q.customer_name}</p>
                                        {q.customer_company && (
                                            <p className="text-[10px] text-gray-400 font-mono">{q.customer_company}</p>
                                        )}
                                    </td>
                                    <td className="p-4 font-sans text-gray-300">
                                        {q.vehicle?.title || 'Bespoke Sourcing Spec'}
                                    </td>
                                    <td className="p-4 uppercase text-[#C9A227]">{q.incoterm}</td>
                                    <td className="p-4 font-sans text-gray-300">{q.destination_port}</td>
                                    <td className="p-4 font-bold text-white">
                                        ${Number(q.total_amount_usd).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-gray-400">{q.valid_until}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] uppercase font-bold">
                                            {q.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link
                                            href={`/quotations/${q.quotation_no}`}
                                            className="px-3 py-1.5 bg-[#222228] hover:bg-[#C9A227] text-white hover:text-black font-semibold rounded transition font-sans inline-block"
                                        >
                                            View Sheet →
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
