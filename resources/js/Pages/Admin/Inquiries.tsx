import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { PaginatedData, Inquiry } from '@/types';
import { Mail, CheckCircle2, MessageSquare, UserCheck } from 'lucide-react';

interface AdminInquiriesProps {
    inquiries: PaginatedData<Inquiry>;
}

export default function AdminInquiries({ inquiries }: AdminInquiriesProps) {
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [status, setStatus] = useState('reviewing');
    const [adminNotes, setAdminNotes] = useState('');

    const handleUpdateStatus = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setStatus(inquiry.status);
        setAdminNotes(inquiry.admin_notes || '');
    };

    const handleSaveStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedInquiry) return;

        router.post(`/admin/inquiries/${selectedInquiry.id}/status`, {
            status,
            admin_notes: adminNotes,
        }, {
            onSuccess: () => setSelectedInquiry(null),
        });
    };

    return (
        <AdminLayout title="Lead Management & CRM Pipeline">
            <div className="bg-[#141418] border border-[#222228] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-[#222228]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Commercial Lead Queue
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Inquiries received from website touchpoints, vehicle detail sheets, and consignment desk.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                        <thead>
                            <tr className="border-b border-[#222228] bg-[#0E0E12] text-gray-400 uppercase text-[10px]">
                                <th className="p-4">Ticket Ref</th>
                                <th className="p-4">Client / Entity</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Discharge Port</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1C1C24] text-gray-200">
                            {inquiries.data.map((inq) => (
                                <tr key={inq.id} className="hover:bg-[#181820] transition">
                                    <td className="p-4 font-bold text-[#C9A227]">{inq.ticket_number}</td>
                                    <td className="p-4 font-sans text-white">
                                        <p className="font-semibold">{inq.name}</p>
                                        <p className="text-[11px] text-gray-400">{inq.email}</p>
                                        {inq.company_name && (
                                            <p className="text-[10px] text-[#C9A227] font-mono">{inq.company_name}</p>
                                        )}
                                    </td>
                                    <td className="p-4 uppercase text-[10px] text-gray-400">
                                        {inq.inquiry_type.replace('_', ' ')}
                                    </td>
                                    <td className="p-4 font-sans text-gray-300 max-w-xs truncate">
                                        {inq.subject}
                                    </td>
                                    <td className="p-4 font-sans text-gray-400">{inq.destination_port || 'General'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            inq.status === 'new'
                                                ? 'bg-rose-950/60 border border-rose-500/40 text-rose-400'
                                                : inq.status === 'quoted'
                                                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                                                : 'bg-amber-950/60 border border-amber-500/40 text-amber-400'
                                        }`}>
                                            {inq.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => handleUpdateStatus(inq)}
                                            className="px-3 py-1.5 bg-[#222228] hover:bg-[#C9A227] text-white hover:text-black font-semibold rounded transition font-sans"
                                        >
                                            Process Lead →
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Process Modal */}
            {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-xl bg-[#161618] border border-[#2E2E34] rounded-2xl shadow-2xl p-6 text-xs">
                        <div className="flex items-center justify-between pb-3 border-b border-[#25252A]">
                            <div>
                                <span className="text-[10px] font-mono text-[#C9A227]">
                                    LEAD TICKET: {selectedInquiry.ticket_number}
                                </span>
                                <h3 className="text-base font-bold text-white">Process Client Inquiry</h3>
                            </div>
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-4 p-3 bg-[#101012] border border-[#222228] rounded-xl space-y-1">
                            <p className="text-white font-semibold">{selectedInquiry.name} ({selectedInquiry.email})</p>
                            <p className="text-gray-400">Subject: {selectedInquiry.subject}</p>
                            <p className="text-gray-300 mt-2 p-2 bg-[#141416] rounded border border-[#25252A] leading-relaxed">
                                "{selectedInquiry.message}"
                            </p>
                        </div>

                        <form onSubmit={handleSaveStatus} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-gray-300 font-medium mb-1">Update Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#101012] border border-[#2C2C30] rounded-lg text-white"
                                >
                                    <option value="new">New</option>
                                    <option value="reviewing">In Review</option>
                                    <option value="contacted">Client Contacted</option>
                                    <option value="quoted">Proposal / Quote Issued</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 font-medium mb-1">Directorate / Specialist Notes</label>
                                <textarea
                                    rows={3}
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Add internal memorandum regarding telephone briefings or quotation terms..."
                                    className="w-full px-3 py-2 bg-[#101012] border border-[#2C2C30] rounded-lg text-white resize-none"
                                />
                            </div>

                            <div className="pt-2 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedInquiry(null)}
                                    className="px-4 py-2 bg-[#202026] text-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#C9A227] text-black font-bold uppercase rounded-lg hover:bg-[#dfba38] transition"
                                >
                                    Save Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
