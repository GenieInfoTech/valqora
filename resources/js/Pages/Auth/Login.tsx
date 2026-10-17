import React, { useState } from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import { Logo } from '@/Components/Logo';
import { Lock, Mail, ArrowRight, Shield, User, CheckCircle2 } from 'lucide-react';

interface DemoAccount {
    role: string;
    email: string;
    password: string;
}

interface LoginProps {
    demoAccounts: DemoAccount[];
}

export default function Login({ demoAccounts = [] }: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const handleSelectDemo = (acc: DemoAccount) => {
        setData({
            email: acc.email,
            password: acc.password,
            remember: true,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-[#0D0D0F] text-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#C9A227] selection:text-black">
            <Head title="Client & Dealer Sign In | VALQORA Global Trading" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <Logo size="lg" className="justify-center" />
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
                    Client & Dealer Sign In
                </h2>
                <p className="mt-2 text-xs text-gray-400">
                    Access your trade document vault, active vessel tracking, and formal pro-forma proposals.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
                <div className="bg-[#151518] border border-[#26262B] py-8 px-6 sm:px-10 rounded-2xl shadow-2xl space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        <div>
                            <label className="block font-medium text-gray-300 mb-1">Corporate Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="officer@domain.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-300 mb-1">Passphrase</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#101012] border border-[#2A2A30] text-sm text-white rounded-lg focus:border-[#C9A227] outline-none"
                                />
                            </div>
                            {errors.password && <p className="text-rose-500 text-[11px] mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-[#2E2E34] text-[#C9A227] focus:ring-0 bg-[#111112]"
                                />
                                <span>Remember session</span>
                            </label>

                            <Link href="/contact" className="hover:text-white transition">
                                Reset credentials?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition duration-150 shadow-lg flex items-center justify-center gap-2"
                        >
                            <span>{processing ? 'Authenticating...' : 'Sign In to Portal'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Quick One-Click Demo Role Accounts Switcher */}
                    <div className="pt-4 border-t border-[#222226]">
                        <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400 mb-2">
                            Quick Evaluation Credentials:
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            {demoAccounts.map((acc) => (
                                <button
                                    key={acc.role}
                                    type="button"
                                    onClick={() => handleSelectDemo(acc)}
                                    className="p-2 rounded bg-[#1C1C20] hover:bg-[#25252B] border border-[#2C2C32] text-left transition"
                                >
                                    <p className="font-semibold text-white text-[11px] flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                                        {acc.role}
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-mono truncate">{acc.email}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center text-xs text-gray-400 pt-2">
                        <span>New trade partner? </span>
                        <Link href="/register" className="text-[#C9A227] hover:underline font-semibold">
                            Apply for Client Portal Access
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
