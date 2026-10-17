import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { SourcingRequest } from '@/types';
import { CheckCircle2, ShieldCheck, ArrowRight, Clock, FileCheck, Anchor, ExternalLink } from 'lucide-react';

interface SourcingSuccessProps {
    sourcing: SourcingRequest;
}

export default function SourcingSuccess({ sourcing }: SourcingSuccessProps) {
    return (
        <AppLayout
            title="Sourcing Directive Confirmed"
            description="Your bespoke procurement directive has been lodged with the VALQORA international trade desk."
        >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-[#161618] border border-[#2E2E34] rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-[#C9A227]/20 border border-[#C9A227] flex items-center justify-center text-[#C9A227] mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                        PROCUREMENT DIRECTIVE LODGED
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                        Directive Reference: <span className="text-[#C9A227]">{sourcing.reference_no}</span>
                    </h1>

                    <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
                        Your sourcing directive for a <strong className="text-white">{sourcing.target_make} {sourcing.target_model}</strong> targeting destination <strong className="text-white">{sourcing.destination_port}</strong> has been assigned to our Tokyo and Frankfurt procurement specialists.
                    </p>

                    {/* Timeline Next Milestones */}
                    <div className="mt-10 p-6 bg-[#111112] border border-[#242428] rounded-2xl text-left space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#242428] pb-3">
                            Procurement & Inspection Lifecycle
                        </h4>

                        <div className="space-y-4 text-xs">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 border border-[#C9A227] text-[#C9A227] flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                                    01
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Auction & Private Network Cross-Reference (0-12 hrs)</p>
                                    <p className="text-gray-400 text-[11px]">USS Tokyo, ARAI, CAA, and German authorized dealer inventory screening.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#242428] text-gray-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-[10px]">
                                    02
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-300">160-Point Certified Mechanical Inspection (12-24 hrs)</p>
                                    <p className="text-gray-500 text-[11px]">Chassis ultrasound, ECU diagnostic dump, and condition grading sheet generation.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#242428] text-gray-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-[10px]">
                                    03
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-300">Formal Pro-Forma Invoice & CIF Schedule Presentation</p>
                                    <p className="text-gray-500 text-[11px]">Delivered directly to {sourcing.contact_email} with photos and vessel departure ETA.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/vehicles"
                            className="w-full sm:w-auto px-6 py-3 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow"
                        >
                            Browse Current Stock
                        </Link>

                        <Link
                            href="/tracking"
                            className="w-full sm:w-auto px-6 py-3 bg-[#1C1C1E] text-white border border-[#2E2E34] hover:border-[#C9A227] rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                        >
                            Ocean Tracking Console
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
