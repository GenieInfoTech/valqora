import React, { useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { PageProps, Port } from '@/types';
import {
    Compass,
    ShieldCheck,
    CheckCircle2,
    Search,
    Truck,
    DollarSign,
    Anchor,
    ArrowRight,
    ArrowLeft,
    Car,
} from 'lucide-react';

interface SourcingCreateProps {
    ports: Port[];
}

export default function SourcingCreate({ ports = [] }: SourcingCreateProps) {
    const { auth } = usePage<PageProps>().props;
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        category: 'luxury',
        target_make: '',
        target_model: '',
        year_min: 2022,
        year_max: 2026,
        steering: 'lhd',
        transmission: 'automatic',
        fuel_type: 'petrol',
        max_budget_usd: 120000,
        destination_country: 'United Arab Emirates',
        destination_port: ports[0]?.name || 'Port of Jebel Ali, Dubai',
        timeline: 'immediate',
        additional_specifications: '',
        contact_name: auth.user?.name || '',
        contact_email: auth.user?.email || '',
        contact_phone: auth.user?.phone || '',
        company_name: auth.user?.company_name || '',
    });

    const categories = [
        { id: 'luxury', title: 'Luxury & Exotic', desc: 'Rolls-Royce, Bentley, Maybach, Porsche GT' },
        { id: 'suv_vip', title: 'Executive SUV & 4WD', desc: 'Land Cruiser 300, Lexus LX600, Defender V8' },
        { id: 'commercial', title: 'Commercial Cargo', desc: 'Japanese Wing Trucks, Dumpers, Forward FTR' },
        { id: 'armored', title: 'Armored & Diplomatic', desc: 'B6/B7 Ballistic Protection Transports' },
        { id: 'machinery', title: 'Industrial Machinery', desc: 'Komatsu, Caterpillar, Hitachi Heavy Equipment' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/sourcing');
    };

    return (
        <AppLayout
            title="Custom Sourcing Directive Wizard"
            description="Lodge an institutional vehicle sourcing directive. VALQORA procures certified inventory directly from Japanese auction houses and European dealer allocations."
        >
            <div className="bg-[#111111] py-12 border-b border-[#222226]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                        INSTITUTIONAL PROCUREMENT ON DEMAND
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                        Global Vehicle Sourcing Directive
                    </h1>
                    <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
                        Specify your exact vehicle specifications, target budget, and discharge port. Our Tokyo and Frankfurt procurement desks will inspect and present authenticated options within 24 hours.
                    </p>

                    {/* Step indicator */}
                    <div className="mt-8 flex items-center justify-center gap-4 text-xs">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#C9A227]' : 'text-gray-500'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 1 ? 'border-[#C9A227] bg-[#C9A227]/20 text-[#C9A227]' : 'border-gray-600'}`}>
                                1
                            </span>
                            <span>Vehicle Criteria</span>
                        </div>
                        <span className="text-gray-600">—</span>
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C9A227]' : 'text-gray-500'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 2 ? 'border-[#C9A227] bg-[#C9A227]/20 text-[#C9A227]' : 'border-gray-600'}`}>
                                2
                            </span>
                            <span>Destination & Budget</span>
                        </div>
                        <span className="text-gray-600">—</span>
                        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#C9A227]' : 'text-gray-500'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 3 ? 'border-[#C9A227] bg-[#C9A227]/20 text-[#C9A227]' : 'border-gray-600'}`}>
                                3
                            </span>
                            <span>Consignee Details</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <form onSubmit={handleSubmit} className="bg-[#161618] border border-[#26262B] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
                    {/* STEP 1: Vehicle Criteria */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Select Vehicle Classification</h3>
                                <p className="text-xs text-gray-400 mt-1">Choose the primary operational category for this procurement directive.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {categories.map((c) => (
                                    <button
                                        type="button"
                                        key={c.id}
                                        onClick={() => setData('category', c.id)}
                                        className={`p-4 rounded-xl border text-left transition ${
                                            data.category === c.id
                                                ? 'bg-[#222216] border-[#C9A227] text-white shadow'
                                                : 'bg-[#121214] border-[#25252A] text-gray-300 hover:border-gray-600'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-xs">{c.title}</span>
                                            {data.category === c.id && <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />}
                                        </div>
                                        <p className="text-[11px] text-gray-400 mt-1">{c.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Target Manufacturer / Make *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Mercedes-Benz, Toyota, Porsche"
                                        value={data.target_make}
                                        onChange={(e) => setData('target_make', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                    />
                                    {errors.target_make && <p className="text-rose-500 text-xs mt-1">{errors.target_make}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Target Model / Trim *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Maybach S 680, Land Cruiser 300 ZX"
                                        value={data.target_model}
                                        onChange={(e) => setData('target_model', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                    />
                                    {errors.target_model && <p className="text-rose-500 text-xs mt-1">{errors.target_model}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Steering / Drive</label>
                                    <select
                                        value={data.steering}
                                        onChange={(e) => setData('steering', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-xs text-white rounded-lg outline-none focus:border-[#C9A227]"
                                    >
                                        <option value="lhd">Left Hand Drive (LHD)</option>
                                        <option value="rhd">Right Hand Drive (RHD)</option>
                                        <option value="any">Either / No Preference</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Transmission</label>
                                    <select
                                        value={data.transmission}
                                        onChange={(e) => setData('transmission', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-xs text-white rounded-lg outline-none focus:border-[#C9A227]"
                                    >
                                        <option value="automatic">Automatic</option>
                                        <option value="manual">Manual</option>
                                        <option value="any">Any Transmission</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Fuel Type</label>
                                    <select
                                        value={data.fuel_type}
                                        onChange={(e) => setData('fuel_type', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-xs text-white rounded-lg outline-none focus:border-[#C9A227]"
                                    >
                                        <option value="petrol">Petrol / Gasoline</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="electric">Electric (EV)</option>
                                        <option value="any">Any Fuel</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!data.target_make || !data.target_model) {
                                            alert('Please specify the target make and model.');
                                            return;
                                        }
                                        setStep(2);
                                    }}
                                    className="px-6 py-3 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2"
                                >
                                    <span>Continue to Logistics & Budget</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Destination & Budget */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Logistics & Budget Limits</h3>
                                <p className="text-xs text-gray-400 mt-1">Configure your destination discharge port and target acquisition budget.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Destination Country *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.destination_country}
                                        onChange={(e) => setData('destination_country', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Discharge Port *</label>
                                    <select
                                        value={data.destination_port}
                                        onChange={(e) => setData('destination_port', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-xs text-white rounded-lg outline-none focus:border-[#C9A227]"
                                    >
                                        {ports.map((p) => (
                                            <option key={p.code} value={p.name}>
                                                {p.name} ({p.country})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Max Ceiling Budget (USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono">$</span>
                                        <input
                                            type="number"
                                            value={data.max_budget_usd}
                                            onChange={(e) => setData('max_budget_usd', Number(e.target.value))}
                                            className="w-full pl-8 pr-4 py-2.5 bg-[#111112] border border-[#2E2E34] text-sm font-mono text-white rounded-lg focus:border-[#C9A227] outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Acquisition Timeline</label>
                                    <select
                                        value={data.timeline}
                                        onChange={(e) => setData('timeline', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-xs text-white rounded-lg outline-none focus:border-[#C9A227]"
                                    >
                                        <option value="immediate">Immediate Dispatch (Under 14 Days)</option>
                                        <option value="30_days">Within 30 Days</option>
                                        <option value="60_days">Within 60 Days</option>
                                        <option value="flexible">Flexible / Looking for Rare Allocation</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Bespoke Options, Colorway & Specs</label>
                                <textarea
                                    rows={3}
                                    placeholder="e.g. Prefer Obsidian Black or Guards Red, must have carbon ceramic brakes, rear executive lounge package, zero repaints."
                                    value={data.additional_specifications}
                                    onChange={(e) => setData('additional_specifications', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-xs text-white rounded-lg focus:border-[#C9A227] outline-none resize-none"
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-5 py-2.5 bg-[#1C1C1E] text-gray-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="px-6 py-3 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2"
                                >
                                    <span>Continue to Client Info</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Consignee & Contact Information */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Consignee Contact Verification</h3>
                                <p className="text-xs text-gray-400 mt-1">Provide the authorized entity details where the pro-forma sourcing report should be delivered.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Full Name / Authorized Officer *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.contact_name}
                                        onChange={(e) => setData('contact_name', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                    />
                                    {errors.contact_name && <p className="text-rose-500 text-xs mt-1">{errors.contact_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Corporate Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                    />
                                    {errors.contact_email && <p className="text-rose-500 text-xs mt-1">{errors.contact_email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Phone / WhatsApp</label>
                                    <input
                                        type="text"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300 mb-1">Company / Entity Name</label>
                                    <input
                                        type="text"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        className="w-full px-3 py-2.5 bg-[#111112] border border-[#2E2E34] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                    />
                                </div>
                            </div>

                            {/* Summary Review */}
                            <div className="p-4 rounded-xl bg-[#121214] border border-[#25252A] text-xs space-y-1 text-gray-400">
                                <p className="text-white font-semibold">Directive Summary:</p>
                                <p>Vehicle: <strong className="text-white">{data.target_make} {data.target_model}</strong> ({data.category.toUpperCase()})</p>
                                <p>Destination: <strong className="text-white">{data.destination_port} ({data.destination_country})</strong></p>
                                <p>Budget Ceiling: <strong className="text-[#C9A227]">${Number(data.max_budget_usd).toLocaleString()} USD</strong></p>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-5 py-2.5 bg-[#1C1C1E] text-gray-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back</span>
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3.5 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center gap-2"
                                >
                                    <span>{processing ? 'Lodging Directive...' : 'Lodge Sourcing Directive'}</span>
                                    <CheckCircle2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </AppLayout>
    );
}
