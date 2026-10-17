import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import {
    ShieldCheck,
    Search,
    Truck,
    Anchor,
    FileCheck2,
    DollarSign,
    CheckCircle2,
    ArrowRight,
    Scale,
    Cpu,
} from 'lucide-react';

export default function Services() {
    const services = [
        {
            icon: Search,
            title: 'Sovereign On-Demand Procurement & Auction Representation',
            description: 'Direct institutional access to USS Tokyo, ARAI, CAA, and European franchise dealer allocations. Real-time translation of auction inspection sheets and proxy bidding execution.',
            features: [
                'Live bidding presence on 137 Japanese auto auction floors',
                'Negotiation of unlisted hypercars and limited production runs',
                'Direct title verification and lien release clearance',
            ],
        },
        {
            icon: ShieldCheck,
            title: '160-Point Pre-Export Verification & Diagnostic Grading',
            description: 'Independent physical and electronic inspection conducted at Daikoku and Yokohama port terminals. Zero tolerance for prior structural impact, flood damage, or odometer rollbacks.',
            features: [
                'Chassis ultrasound and laser subframe alignment scan',
                'Computerized ECU diagnostic dump verifying genuine mileage',
                'Accredited JEVIC, EAA, and KEBS roadworthiness certification',
            ],
        },
        {
            icon: Anchor,
            title: 'Maritime Ro-Ro Logistics & Containerized Transport',
            description: 'Direct vessel hold allocations with premier maritime carriers (NYK Line, Wallenius, MOL). End-to-end ocean transit coordination with real-time waypoint tracking.',
            features: [
                'Guaranteed space allocations on regular global Ro-Ro rotations',
                'Sealed 20ft & 40ft High Cube container packing for exotic cars',
                'Comprehensive all-risk marine cargo underwriting coverage',
            ],
        },
        {
            icon: FileCheck2,
            title: 'Customs Clearance, Export Stamping & Document Vault',
            description: 'Processing of Japanese Export Certificates, original Bills of Lading (B/L), Certificates of Conformity (CoC), and commercial packing manifests delivered via our cryptographic vault.',
            features: [
                'Original Japanese export certificate with certified English translation',
                'Direct customs bureau lodging for expedited port discharge',
                'Instant digital verification via the VALQORA Document Vault',
            ],
        },
        {
            icon: Scale,
            title: 'Structured Trade Finance & Escrow Advisory',
            description: 'Institutional payment structures designed to eliminate counterparty risk. Support for documentary letters of credit (L/C), bank guarantees, and multi-currency wire settlement.',
            features: [
                'Multi-currency settlement in USD, EUR, JPY, AED, and GBP',
                'Structured 50/50 payment milestones linked to B/L issue',
                'Direct correspondent banking via Tier-1 global institutions',
            ],
        },
    ];

    return (
        <AppLayout
            title="Institutional Trade & Export Services"
            description="Comprehensive cross-border trading services: on-demand sourcing, 160-point mechanical inspection, ocean Ro-Ro freight, and customs documentation."
        >
            <div className="bg-[#111111] py-16 border-b border-[#222226]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                        END-TO-END TRADE EXECUTION
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                        Institutional Export & Trade Services
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                        Eliminating friction from cross-border automotive acquisitions with certified physical inspection, maritime vessel chartering, and sovereign compliance.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
                {services.map((srv, idx) => {
                    const Icon = srv.icon;
                    return (
                        <div
                            key={idx}
                            className="p-8 rounded-2xl bg-[#161618] border border-[#26262B] hover:border-[#C9A227]/40 transition duration-300 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                        >
                            <div className="md:col-span-4 flex flex-col items-start space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-[#222226] border border-[#3A3A40] flex items-center justify-center text-[#C9A227]">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-mono text-[#C9A227] font-bold">SERVICE PROTOCOL {idx + 1}</span>
                                <h3 className="text-lg font-bold text-white leading-tight">{srv.title}</h3>
                            </div>

                            <div className="md:col-span-8 space-y-4">
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {srv.description}
                                </p>
                                <div className="space-y-2 pt-2 border-t border-[#25252A]">
                                    {srv.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-400">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227] flex-shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="p-10 rounded-2xl bg-[#1C180E] border border-[#3E3414] text-center space-y-4">
                    <h3 className="text-2xl font-bold text-white">Ready to Execute a Consignment?</h3>
                    <p className="text-xs text-gray-300 max-w-lg mx-auto">
                        Whether you are acquiring an individual flagship vehicle or establishing a multi-container wholesale dealer contract, our trade desk is at your service.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/sourcing"
                            className="w-full sm:w-auto px-6 py-3 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow"
                        >
                            Initiate Sourcing Directive
                        </Link>
                        <Link
                            href="/vehicles"
                            className="w-full sm:w-auto px-6 py-3 bg-[#24242A] text-white border border-[#3A3A44] hover:border-[#C9A227] rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                        >
                            View Ready Inventory
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
