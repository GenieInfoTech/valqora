import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { PageProps } from '@/types';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    ShieldCheck,
    CheckCircle2,
    Building2,
    Globe,
} from 'lucide-react';

export default function Contact() {
    const { auth, ports } = usePage<PageProps>().props;

    const { data, setData, post, processing, reset, errors, wasSuccessful } = useForm({
        inquiry_type: 'general',
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        phone: auth.user?.phone || '',
        company_name: auth.user?.company_name || '',
        country: auth.user?.country || '',
        destination_port: '',
        subject: '',
        message: '',
    });

    const offices = [
        {
            city: 'Tokyo, Japan',
            title: 'Global Headquarters & Auto Export Desk',
            address: 'Roppongi Hills Mori Tower, 6-10-1 Roppongi, Minato-ku, Tokyo 105-0001',
            phone: '+81 3 5555 0192',
            email: 'tokyo.desk@valqora.com',
            hours: '09:00 - 18:00 JST (Mon - Fri)',
        },
        {
            city: 'Dubai, UAE',
            title: 'Middle East & GCC Commercial Hub',
            address: 'DIFC Gate Precinct 4, Level 5, Trade Centre, Dubai, UAE',
            phone: '+971 4 390 1284',
            email: 'dubai.desk@valqora.com',
            hours: '09:00 - 18:00 GST (Sun - Thu)',
        },
        {
            city: 'Frankfurt, Germany',
            title: 'European Luxury & Fleet Logistics',
            address: 'Westhafen Tower, Speicherstraße 55, 60327 Frankfurt am Main, Germany',
            phone: '+49 69 9500 812',
            email: 'frankfurt.desk@valqora.com',
            hours: '08:30 - 17:30 CET (Mon - Fri)',
        },
        {
            city: 'Singapore',
            title: 'Asia-Pacific Maritime Charter Operations',
            address: 'Marina Bay Financial Centre Tower 1, 8 Marina Blvd, Singapore 018981',
            phone: '+65 6820 9100',
            email: 'singapore.desk@valqora.com',
            hours: '09:00 - 18:00 SGT (Mon - Fri)',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/inquiries', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout
            title="Global Trade Desks & Direct Inquiries"
            description="Contact VALQORA international corporate offices in Tokyo, Dubai, Frankfurt, and Singapore for vehicle sourcing, dealer contracts, and consignment directives."
        >
            <div className="bg-[#111111] py-16 border-b border-[#222226]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                        WORLDWIDE DIRECTORY & CONTACT
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                        Global Trade Desks
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                        Connect with our licensed trade directors across key financial hubs for vehicle procurement, wholesale allocations, and maritime chartering.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left 6 Cols: Regional Offices */}
                    <div className="lg:col-span-6 space-y-6">
                        <h2 className="text-xl font-bold text-white tracking-wide">
                            International Operating Hubs
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {offices.map((off, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-xl bg-[#161618] border border-[#26262B] hover:border-[#C9A227]/40 transition space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-bold text-white">{off.city}</h3>
                                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1C1C20] text-[#C9A227] border border-[#2E2E34]">
                                            TRADE DESK
                                        </span>
                                    </div>
                                    <p className="text-xs font-semibold text-gray-300">{off.title}</p>
                                    <p className="text-xs text-gray-400 leading-relaxed flex items-start gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                                        <span>{off.address}</span>
                                    </p>
                                    <div className="pt-2 border-t border-[#222226] flex flex-wrap gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                                            {off.phone}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
                                            {off.email}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right 6 Cols: Direct Lead Ingestion Form */}
                    <div className="lg:col-span-6">
                        <div className="p-8 rounded-2xl bg-[#161618] border border-[#26262B] shadow-2xl">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A227]">
                                DIRECT INTAKE DESK
                            </span>
                            <h2 className="text-xl font-bold text-white mt-1">Transmit Commercial Directive</h2>
                            <p className="text-xs text-gray-400 mt-1 mb-6">
                                All submissions are routed directly to the regional specialist and governed by strict confidentiality.
                            </p>

                            {wasSuccessful ? (
                                <div className="p-8 text-center bg-[#111112] border border-[#2E2E34] rounded-xl space-y-3">
                                    <CheckCircle2 className="w-10 h-10 text-[#C9A227] mx-auto animate-bounce" />
                                    <h4 className="text-base font-bold text-white">Directive Transmitted</h4>
                                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                                        Your commercial inquiry has been logged. An assigned trade director will follow up within 4 business hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                    <div>
                                        <label className="block text-gray-300 font-medium mb-1">Inquiry Classification *</label>
                                        <select
                                            value={data.inquiry_type}
                                            onChange={(e) => setData('inquiry_type', e.target.value)}
                                            className="w-full px-3 py-2.5 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227]"
                                        >
                                            <option value="general">General Commercial Inquiries</option>
                                            <option value="dealership_application">B2B Dealership / Wholesale Allocation</option>
                                            <option value="consignment">Vehicle Consignment / Supplier Listing</option>
                                            <option value="investor">Corporate Investor Relations</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-300 font-medium mb-1">Authorized Contact *</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full px-3 py-2 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227]"
                                            />
                                            {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 font-medium mb-1">Corporate Email *</label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-3 py-2 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227]"
                                            />
                                            {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-300 font-medium mb-1">Phone / WhatsApp</label>
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full px-3 py-2 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 font-medium mb-1">Company / Entity</label>
                                            <input
                                                type="text"
                                                value={data.company_name}
                                                onChange={(e) => setData('company_name', e.target.value)}
                                                className="w-full px-3 py-2 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-300 font-medium mb-1">Country</label>
                                            <input
                                                type="text"
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                                placeholder="e.g. United Arab Emirates"
                                                className="w-full px-3 py-2 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 font-medium mb-1">Primary Port of Interest</label>
                                            <select
                                                value={data.destination_port}
                                                onChange={(e) => setData('destination_port', e.target.value)}
                                                className="w-full px-3 py-2 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227]"
                                            >
                                                <option value="">Select Discharge Port</option>
                                                {ports.map((p) => (
                                                    <option key={p.code} value={p.name}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 font-medium mb-1">Subject *</label>
                                        <input
                                            type="text"
                                            required
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            placeholder="e.g. Allocation of 5 Units Lexus LX600 VIP"
                                            className="w-full px-3 py-2 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 font-medium mb-1">Message & Commercial Terms *</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full px-3 py-2 bg-[#111112] border border-[#2A2A2E] text-white rounded-lg outline-none focus:border-[#C9A227] resize-none"
                                        />
                                        {errors.message && <p className="text-rose-500 text-[11px] mt-1">{errors.message}</p>}
                                    </div>

                                    <div className="pt-2 flex items-center justify-between">
                                        <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
                                            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
                                            AML & KYC compliant transmission.
                                        </span>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-6 py-2.5 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition flex items-center gap-2 shadow"
                                        >
                                            <Send className="w-3.5 h-3.5" />
                                            <span>{processing ? 'Transmitting...' : 'Send Directive'}</span>
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
