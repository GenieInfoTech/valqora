import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Truck, Anchor, Factory, Zap, Cpu, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Divisions() {
    return (
        <AppLayout
            title="Commercial Business Divisions"
            description="Explore VALQORA's operating business divisions: Automotive Export and Maritime Logistics, alongside phased expansion into industrial machinery and clean energy."
        >
            <div className="bg-[#111111] py-16 border-b border-[#222226]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                        MODULAR MONOLITH COMMERCIAL STRUCTURE
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                        Operating Business Divisions
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                        VALQORA is designed as an enterprise international trading house with distinct domain divisions, rigorous capital allocation, and phased global scaling.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
                {/* ACTIVE DIVISIONS */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                            Currently Active Operating Divisions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Division 1 */}
                        <div className="p-8 rounded-2xl bg-[#161618] border border-[#2E2E34] hover:border-[#C9A227] transition duration-300 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-xl bg-[#222226] border border-[#3A3A40] flex items-center justify-center text-[#C9A227]">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase rounded-full">
                                    Active & Operational
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white">Automotive Export & Fleet</h3>
                                <p className="text-xs text-[#C9A227] font-mono mt-1">VALQORA Motors Division</p>
                                <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                                    Direct acquisition and export of prestige German, Japanese, and British vehicles. We operate registered bidding access across all 137 Japanese auto auctions (USS, ARAI, CAA, JU) and European franchise networks.
                                </p>
                            </div>

                            <div className="space-y-2 text-xs text-gray-400 pt-2 border-t border-[#26262B]">
                                <p className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                                    160-Point Certified Mechanical & Structural Inspections
                                </p>
                                <p className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                                    Bespoke Sourcing for Diplomatic & Commercial Fleets
                                </p>
                                <p className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                                    LHD and RHD Worldwide Export Compliance
                                </p>
                            </div>

                            <Link
                                href="/vehicles"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A227] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#dfba38] transition"
                            >
                                <span>Browse Active Inventory</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Division 2 */}
                        <div className="p-8 rounded-2xl bg-[#161618] border border-[#2E2E34] hover:border-[#C9A227] transition duration-300 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-xl bg-[#222226] border border-[#3A3A40] flex items-center justify-center text-[#C9A227]">
                                    <Anchor className="w-6 h-6" />
                                </div>
                                <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase rounded-full">
                                    Active & Operational
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white">Maritime Logistics & Charters</h3>
                                <p className="text-xs text-[#C9A227] font-mono mt-1">VALQORA Marine Desk</p>
                                <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                                    Contracted carrier hold allocations with NYK Line, Wallenius Wilhelmsen, and "K" Line. Offering Ro-Ro (Roll-on/Roll-off) and specialized 20ft/40ft containerized cargo logistics across 48+ international discharge ports.
                                </p>
                            </div>

                            <div className="space-y-2 text-xs text-gray-400 pt-2 border-t border-[#26262B]">
                                <p className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                                    Guaranteed Ro-Ro Vessel Space Allocations
                                </p>
                                <p className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                                    All-Risk Marine Cargo Underwriting Endorsements
                                </p>
                                <p className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                                    Real-time Waypoint & Telemetry Milestone Tracking
                                </p>
                            </div>

                            <Link
                                href="/tracking"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A227] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#dfba38] transition"
                            >
                                <span>Track Active Voyages</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* STRATEGIC EXPANSION DIVISIONS */}
                <div className="pt-8 border-t border-[#222226]">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                            Strategic Phased Expansion Horizons
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Planned 1 */}
                        <div className="p-6 rounded-2xl bg-[#141416] border border-[#222226] space-y-4">
                            <div className="flex items-center justify-between">
                                <Factory className="w-8 h-8 text-amber-500" />
                                <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase rounded">
                                    Phase II (Q2 2027)
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-white">Industrial Machinery & Mining</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Cross-border supply of heavy excavators, mobile cranes, and agricultural combines from Komatsu, Hitachi, and Caterpillar.
                            </p>
                        </div>

                        {/* Planned 2 */}
                        <div className="p-6 rounded-2xl bg-[#141416] border border-[#222226] space-y-4">
                            <div className="flex items-center justify-between">
                                <Zap className="w-8 h-8 text-amber-500" />
                                <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase rounded">
                                    Phase II (Q4 2027)
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-white">Clean Energy & Battery Storage</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Commercial photovoltaic arrays, utility-scale lithium-iron-phosphate (LFP) battery systems, and rare mineral trading.
                            </p>
                        </div>

                        {/* Planned 3 */}
                        <div className="p-6 rounded-2xl bg-[#141416] border border-[#222226] space-y-4">
                            <div className="flex items-center justify-between">
                                <Cpu className="w-8 h-8 text-amber-500" />
                                <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase rounded">
                                    Phase III (2028)
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-white">Cross-Border Trade Fintech</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Decentralized document vault verification, automated multi-currency escrow, and programmatic letters of credit (L/C).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Partnership Callout */}
                <div className="p-8 rounded-2xl bg-[#18181C] border border-[#2E2E34] text-center space-y-4">
                    <h3 className="text-xl font-bold text-white">Explore Strategic Division Partnerships</h3>
                    <p className="text-xs text-gray-400 max-w-lg mx-auto">
                        VALQORA welcomes discussions with regional distributors, maritime freight forwarders, and institutional consignment partners.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#24242A] hover:bg-[#303038] text-white border border-[#3E3E48] rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                    >
                        <span>Submit Partnership Directive</span>
                        <ArrowRight className="w-4 h-4 text-[#C9A227]" />
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
