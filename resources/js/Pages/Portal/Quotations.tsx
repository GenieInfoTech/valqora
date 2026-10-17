import React from 'react';
import { Link } from '@inertiajs/react';
import { PortalLayout } from '@/Layouts/PortalLayout';
import { useCurrency } from '@/context/CurrencyContext';
import { PaginatedData, Quotation } from '@/types';
import { FileSpreadsheet, ArrowRight, ExternalLink } from 'lucide-react';

interface PortalQuotationsProps {
    quotations: PaginatedData<Quotation>;
}

export default function PortalQuotations({ quotations }: PortalQuotationsProps) {
    const { formatPrice } = useCurrency();

    return (
        <PortalLayout title="Issued Commercial Quotations">
            <div className="bg-[#161618] border border-[#26262B] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-[#242428] flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Pro-Forma Trade Proposals
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Official CIF/FOB proposals issued by VALQORA Trade Directorate.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                        <thead>
                            <tr className="border-b border-[#242428] bg-[#111112] text-gray-400 uppercase text-[10px]">
                                <th className="p-4">Quotation Ref</th>
                                <th className="p-4">Consigned Vehicle</th>
                                <th className="p-4">Incoterm</th>
                                <th className="p-4">Port of Discharge</th>
                                <th className="p-4">Total Amount</th>
                                <th className="p-4">Valid Until</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#202024] text-gray-200">
                            {quotations.data.map((q) => (
                                <tr key={q.id} className="hover:bg-[#1A1A1E] transition">
                                    <td className="p-4 font-bold text-[#C9A227]">{q.quotation_no}</td>
                                    <td className="p-4 font-sans font-semibold text-white">
                                        {q.vehicle?.title || 'Sourced Allocation'}
                                    </td>
                                    <td className="p-4 uppercase">{q.incoterm}</td>
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
                                            className="px-3 py-1.5 bg-[#25252B] hover:bg-[#C9A227] text-white hover:text-black font-semibold rounded transition duration-150 inline-block font-sans"
                                        >
                                            View Sheet →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {quotations.data.length === 0 && (
                    <div className="p-12 text-center text-xs text-gray-400">
                        No commercial quotations issued yet.
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
