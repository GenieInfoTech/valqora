import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { ShieldCheck, Award, Globe, Building2, FileCheck2, Scale, Users, ArrowRight } from 'lucide-react';

interface AboutProps {
    governance: {
        legalEntity: string;
        registeredOffices: string[];
        complianceStandards: string[];
    };
}

export default function About({ governance }: AboutProps) {
    const leadership = [
        {
            name: 'Alexander Vance',
            role: 'Managing Director & Chief Executive',
            bio: 'Over 22 years in international multi-commodity trading, cross-border structured trade finance, and Japanese automotive wholesale.',
            location: 'Tokyo / Dubai',
        },
        {
            name: 'Hiroshi Sato',
            role: 'Director of Vehicle Verification & Quality Desk',
            bio: 'Former senior technical inspector at JEVIC and USS Tokyo; oversees our proprietary 160-point mechanical evaluation protocol.',
            location: 'Yokohama, Japan',
        },
        {
            name: 'Elena Rostova',
            role: 'Head of Maritime Operations & Fleet Charter',
            bio: 'Expert in maritime ocean freight chartering, Ro-Ro vessel stowage allocations, and containerized luxury asset transport.',
            location: 'Frankfurt / Singapore',
        },
        {
            name: 'Tariq Mansoor',
            role: 'Director of Middle East & GCC Trade Operations',
            bio: 'Directs regional customs clearance, GSO standard harmonization, and commercial distributor relationships across UAE, KSA, and Oman.',
            location: 'Dubai, UAE',
        },
    ];

    return (
        <AppLayout
            title="Corporate Profile & Governance"
            description="VALQORA Global Trading — International sovereign corporate profile, regulatory accreditations, leadership, and ESG compliance commitment."
        >
            {/* Header */}
            <div className="bg-[#111111] py-16 border-b border-[#222226]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                        SOVEREIGN TRADING HOUSE
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                        Corporate Profile & Governance
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                        Operating at the nexus of high-precision Japanese engineering, European prestige marques, and worldwide maritime distribution.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
                {/* Brand Narrative */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase">
                            OUR HERITAGE
                        </span>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            Built on Authenticity, Precision, and Uncompromising Verification
                        </h2>
                        <p>
                            VALQORA was established to eliminate the opacity, fraud, and logistical vulnerabilities traditionally associated with cross-border automotive trading. By instituting mandatory 160-point mechanical audits, verified odometer telemetry, and sovereign escrow settlement structures, we provide institutional confidence to private buyers, government delegations, and multi-franchise dealerships.
                        </p>
                        <p>
                            From our headquarters in Tokyo to our commercial trading desk in the Dubai International Financial Centre (DIFC) and European logistics bureau in Frankfurt, we coordinate end-to-end acquisitions with sovereign precision.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-[#161618] border border-[#26262B] space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#C9A227]">
                            Corporate Structure & Registration
                        </h3>
                        <div className="space-y-3 text-xs">
                            <div>
                                <p className="text-gray-400">Legal Entity:</p>
                                <p className="font-semibold text-white font-mono">{governance.legalEntity}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Registered Corporate Desks:</p>
                                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-1">
                                    {governance.registeredOffices.map((office, idx) => (
                                        <li key={idx} className="font-mono">{office}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-gray-400">Compliance & Regulatory Accreditations:</p>
                                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-1">
                                    {governance.complianceStandards.map((std, idx) => (
                                        <li key={idx} className="text-[#C9A227]">{std}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ESG & Anti-Money Laundering (AML) Compliance */}
                <section className="p-8 sm:p-10 rounded-2xl bg-[#141416] border border-[#26262B] space-y-6">
                    <div className="max-w-2xl">
                        <span className="text-xs font-mono font-bold text-[#C9A227] uppercase tracking-wider">
                            REGULATORY INTEGRITY
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1">
                            Anti-Money Laundering (AML) & Sanctions Governance
                        </h3>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                            VALQORA operates strict adherence to international financial governance frameworks, including FATF guidelines, OFSI, EU sanctions databases, and Japan METI export control policies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-300">
                        <div className="p-4 bg-[#111112] border border-[#222226] rounded-xl space-y-2">
                            <Scale className="w-5 h-5 text-[#C9A227]" />
                            <h4 className="font-bold text-white">Full KYC & Beneficial Ownership</h4>
                            <p className="text-gray-400 text-[11px]">Comprehensive corporate due diligence on all cross-border counterparties prior to quote binding.</p>
                        </div>

                        <div className="p-4 bg-[#111112] border border-[#222226] rounded-xl space-y-2">
                            <ShieldCheck className="w-5 h-5 text-[#C9A227]" />
                            <h4 className="font-bold text-white">Chassis Lien & Theft Clearance</h4>
                            <p className="text-gray-400 text-[11px]">Direct integration with national police registries confirming unencumbered title ownership.</p>
                        </div>

                        <div className="p-4 bg-[#111112] border border-[#222226] rounded-xl space-y-2">
                            <Award className="w-5 h-5 text-[#C9A227]" />
                            <h4 className="font-bold text-white">Emissions & Environmental Audits</h4>
                            <p className="text-gray-400 text-[11px]">Verification of destination euro-norm compliance and radioactive residue screening at port terminals.</p>
                        </div>
                    </div>
                </section>

                {/* Executive Leadership */}
                <section className="space-y-6">
                    <div>
                        <span className="text-xs font-mono font-bold text-[#C9A227] uppercase tracking-wider">
                            EXECUTIVE DIRECTORS
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-1">
                            Leadership Directorate
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {leadership.map((leader, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-[#161618] border border-[#26262B] space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-base font-bold text-white">{leader.name}</h4>
                                        <p className="text-xs font-semibold text-[#C9A227]">{leader.role}</p>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#1F1F24] border border-[#333] rounded text-gray-400">
                                        {leader.location}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {leader.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="p-8 rounded-2xl bg-[#1C180E] border border-[#3E3414] text-center space-y-4">
                    <h3 className="text-xl font-bold text-white">Engage with VALQORA Trade Directorate</h3>
                    <p className="text-xs text-gray-300 max-w-lg mx-auto">
                        For institutional partnership discussions, consular procurement, or fleet acquisitions, schedule a private consultation.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow"
                        >
                            <span>Contact Trade Directorate</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
