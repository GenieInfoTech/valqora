import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps, Vehicle } from '@/types';
import { X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    vehicle?: Vehicle | null;
    inquiryType?: string;
    defaultSubject?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
    isOpen,
    onClose,
    vehicle,
    inquiryType = 'general',
    defaultSubject = '',
}) => {
    const { auth, ports } = usePage<PageProps>().props;

    const { data, setData, post, processing, reset, errors, wasSuccessful } = useForm({
        vehicle_id: vehicle ? vehicle.id : null,
        inquiry_type: vehicle ? 'vehicle_inquiry' : inquiryType,
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        phone: auth.user?.phone || '',
        company_name: auth.user?.company_name || '',
        country: auth.user?.country || '',
        destination_port: '',
        subject: defaultSubject || (vehicle ? `Inquiry regarding ${vehicle.title} (${vehicle.stock_id})` : 'Commercial Trade Inquiry'),
        message: vehicle
            ? `I would like to receive an official CIF quotation and inspection documentation for ${vehicle.year} ${vehicle.make} ${vehicle.model} (Stock ID: ${vehicle.stock_id}). Please advise on fastest vessel departure date.`
            : '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/inquiries', {
            onSuccess: () => {
                setTimeout(() => {
                    reset();
                    onClose();
                }, 2000);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl bg-[#161618] border border-[#2A2A2E] rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#242428] bg-[#111112]">
                    <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9A227]">
                            DIRECT TRADE DESK ACCESS
                        </span>
                        <h3 className="text-lg font-bold text-white">
                            {vehicle ? `Inquire: ${vehicle.title}` : 'Submit Trade Directive'}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#202024] transition"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {wasSuccessful ? (
                    <div className="p-10 text-center space-y-3">
                        <CheckCircle2 className="w-12 h-12 text-[#C9A227] mx-auto animate-bounce" />
                        <h4 className="text-xl font-bold text-white">Directive Lodged Successfully</h4>
                        <p className="text-sm text-gray-400 max-w-md mx-auto">
                            Your inquiry has been routed to our regional maritime desk. A licensed trade director will respond within 4 business hours.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                        {vehicle && (
                            <div className="flex items-center gap-3 p-3 bg-[#1C1C20] border border-[#2E2E34] rounded-lg">
                                <img
                                    src={vehicle.primary_image?.url || vehicle.images?.[0]?.url}
                                    alt={vehicle.title}
                                    className="w-14 h-10 object-cover rounded"
                                />
                                <div className="text-xs">
                                    <p className="font-semibold text-white">{vehicle.title}</p>
                                    <p className="text-gray-400 font-mono">Stock ID: {vehicle.stock_id} • FOB: ${Number(vehicle.fob_price_usd).toLocaleString()}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#111111] border border-[#2C2C30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Corporate / Contact Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#111111] border border-[#2C2C30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Phone / WhatsApp</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="+1 555 0192"
                                    className="w-full px-3 py-2 bg-[#111111] border border-[#2C2C30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Company / Entity</label>
                                <input
                                    type="text"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    placeholder="Al-Mansoor Trading"
                                    className="w-full px-3 py-2 bg-[#111111] border border-[#2C2C30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Destination Port</label>
                                <select
                                    value={data.destination_port}
                                    onChange={(e) => setData('destination_port', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#111111] border border-[#2C2C30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                >
                                    <option value="">Select Port of Discharge</option>
                                    {ports.map((p) => (
                                        <option key={p.code} value={p.name}>
                                            {p.name} ({p.country})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">Subject *</label>
                            <input
                                type="text"
                                required
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className="w-full px-3 py-2 bg-[#111111] border border-[#2C2C30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">Message & Specific Requirements *</label>
                            <textarea
                                required
                                rows={4}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full px-3 py-2 bg-[#111111] border border-[#2C2C30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none resize-none"
                            />
                            {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message}</p>}
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                            <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                                Guaranteed strict client confidentiality & AML protocol.
                            </span>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-[#C9A227] hover:bg-[#dfba38] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition duration-150 flex items-center gap-2 shadow"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>{processing ? 'Lodging...' : 'Transmit Directive'}</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
