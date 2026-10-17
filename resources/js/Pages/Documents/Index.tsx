import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { PaginatedData, TradeDocument } from '@/types';
import {
    FolderLock,
    FileText,
    Download,
    ShieldCheck,
    CheckCircle2,
    Calendar,
    ArrowRight,
    Search,
} from 'lucide-react';

interface DocumentsIndexProps {
    documents: PaginatedData<TradeDocument>;
}

export default function DocumentsIndex({ documents }: DocumentsIndexProps) {
    return (
        <AppLayout
            title="Authenticated Trade Document Vault"
            description="Secure international repository for bills of lading, Japanese export certificates, certified commercial invoices, and accredited inspection sheets."
        >
            <div className="bg-[#111111] py-12 border-b border-[#222226]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                                CRYPTOGRAPHICALLY SECURED REPOSITORY
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                                International Trade Document Vault
                            </h1>
                            <p className="text-sm text-gray-400 mt-2 max-w-xl">
                                Access certified maritime manifests, stamped customs declaration certificates, and authenticated inspection reports for your active consignments.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-lg bg-[#18181C] border border-[#2A2A30] text-xs font-mono text-gray-300">
                                Total Vault Records: <strong>{documents.total}</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-[#161618] border border-[#26262B] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-mono">
                            <thead>
                                <tr className="border-b border-[#26262B] bg-[#111112] text-gray-400 uppercase text-[10px]">
                                    <th className="p-4">Document Title & Specification</th>
                                    <th className="p-4">Document Ref.</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Linked Vehicle</th>
                                    <th className="p-4">Issue Date</th>
                                    <th className="p-4">Verification</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#202024] text-gray-200">
                                {documents.data.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-[#1C1C20] transition">
                                        <td className="p-4 font-sans">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#222226] border border-[#33333A] flex items-center justify-center text-[#C9A227] flex-shrink-0">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{doc.title}</p>
                                                    <p className="text-[11px] text-gray-400">
                                                        {doc.file_extension.toUpperCase()} • {Math.round(doc.file_size_bytes / 1024)} KB
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4 text-[#C9A227]">{doc.document_no}</td>

                                        <td className="p-4 uppercase text-[11px] text-gray-400">
                                            {doc.document_type.replace('_', ' ')}
                                        </td>

                                        <td className="p-4 font-sans">
                                            {doc.vehicle ? (
                                                <Link
                                                    href={`/vehicles/${doc.vehicle.slug}`}
                                                    className="text-white hover:text-[#C9A227] transition font-semibold"
                                                >
                                                    {doc.vehicle.stock_id} ({doc.vehicle.make})
                                                </Link>
                                            ) : (
                                                <span className="text-gray-500">—</span>
                                            )}
                                        </td>

                                        <td className="p-4 text-gray-400">{doc.issue_date || 'N/A'}</td>

                                        <td className="p-4">
                                            {doc.is_verified ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] uppercase font-bold">
                                                    <CheckCircle2 className="w-3 h-3" /> Sealed
                                                </span>
                                            ) : (
                                                <span className="text-gray-500 text-[10px]">Processing</span>
                                            )}
                                        </td>

                                        <td className="p-4 text-right">
                                            <a
                                                href={`/documents/download/${doc.document_no}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#24242A] hover:bg-[#C9A227] text-white hover:text-black font-semibold text-xs rounded transition duration-150"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>Download</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
