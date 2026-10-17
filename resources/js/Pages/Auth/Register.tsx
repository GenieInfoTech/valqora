import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import { Logo } from '@/Components/Logo';
import { User, Mail, Lock, Building2, Globe, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: 'customer',
        company_name: '',
        phone: '',
        country: 'United Arab Emirates',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen bg-[#0D0D0F] text-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#C9A227] selection:text-black">
            <Head title="Client Account Registration | VALQORA Global Trading" />

            <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
                <Logo size="lg" className="justify-center" />
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
                    Apply for Client Portal Access
                </h2>
                <p className="mt-2 text-xs text-gray-400">
                    Join private collectors, diplomatic missions, and licensed motor dealerships.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
                <div className="bg-[#151518] border border-[#26262B] py-8 px-6 sm:px-10 rounded-2xl shadow-2xl space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        {/* Account Tier */}
                        <div>
                            <label className="block font-medium text-gray-300 mb-2">Account Tier Classification</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: 'customer', label: 'Private Buyer' },
                                    { id: 'dealer', label: 'B2B Dealer' },
                                    { id: 'supplier', label: 'Consignor' },
                                ].map((tier) => (
                                    <button
                                        key={tier.id}
                                        type="button"
                                        onClick={() => setData('role', tier.id)}
                                        className={`py-2 px-3 rounded-lg border text-center font-semibold transition ${
                                            data.role === tier.id
                                                ? 'bg-[#C9A227] text-black border-[#C9A227]'
                                                : 'bg-[#101012] border-[#2A2A30] text-gray-300 hover:text-white'
                                        }`}
                                    >
                                        {tier.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-300 mb-1">Full Legal Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Tariq Al-Mansoor"
                                    className="w-full px-3 py-2 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                                {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block font-medium text-gray-300 mb-1">Corporate / Personal Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="buyer@domain.com"
                                    className="w-full px-3 py-2 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                                {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-300 mb-1">Company / Entity Name</label>
                                <input
                                    type="text"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    placeholder="Al-Mansoor Prestige Auto"
                                    className="w-full px-3 py-2 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-300 mb-1">Country of Registration *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    placeholder="e.g. United Arab Emirates"
                                    className="w-full px-3 py-2 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-300 mb-1">Phone / WhatsApp</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+971 50 123 4567"
                                className="w-full px-3 py-2 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-300 mb-1">Password *</label>
                                <input
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                                {errors.password && <p className="text-rose-500 text-[11px] mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block font-medium text-gray-300 mb-1">Confirm Password *</label>
                                <input
                                    type="password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition duration-150 shadow-lg flex items-center justify-center gap-2"
                            >
                                <span>{processing ? 'Registering...' : 'Complete Portal Registration'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>

                    <div className="text-center text-xs text-gray-400">
                        <span>Already registered? </span>
                        <Link href="/login" className="text-[#C9A227] hover:underline font-semibold">
                            Sign In to Existing Account
                        </Link>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                    <Link href="/" className="hover:text-gray-300 transition">
                        ← Return to VALQORA Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
