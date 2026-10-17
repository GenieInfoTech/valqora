import React from 'react';
import { Link } from '@inertiajs/react';
import { Logo } from '@/Components/Logo';
import { ShieldCheck, Anchor, Award, FileCheck2, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0D0D0D] text-gray-400 border-t border-[#222222] text-sm">
            {/* Accreditation & Regulatory Credentials Strip */}
            <div className="border-b border-[#1A1A1A] bg-[#080808] py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#C9A227] flex-shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-white">160-Point Certified</h4>
                                <p className="text-[11px] text-gray-500">JEVIC / EAA Pre-Export Verified</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#C9A227] flex-shrink-0">
                                <Anchor className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-white">Direct Vessel Allocations</h4>
                                <p className="text-[11px] text-gray-500">NYK, Wallenius, & MOL Charters</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#C9A227] flex-shrink-0">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-white">GSO 42/2015 Compliant</h4>
                                <p className="text-[11px] text-gray-500">Middle East Gulf Harmonized Spec</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#C9A227] flex-shrink-0">
                                <FileCheck2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-white">L/C & Escrow Advisory</h4>
                                <p className="text-[11px] text-gray-500">Institutional Banking Assurance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <Logo size="lg" />
                        <p className="text-xs leading-relaxed text-gray-400 max-w-sm mt-3">
                            VALQORA is a sovereign international trading house specializing in premier automotive procurement, verified multi-point mechanical grading, Ro-Ro and containerized maritime freight, and cross-border commercial trade fulfillment.
                        </p>
                        <div className="pt-2 text-xs space-y-1 text-gray-500">
                            <p className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                                Global Directorate: Minato-ku, Tokyo 105-0001, Japan
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
                                trade@valqora.com | clearance@valqora.com
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                                +81 3 5555 0192 (Tokyo) | +971 4 390 1284 (Dubai)
                            </p>
                        </div>
                    </div>

                    {/* Divisions */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                            Business Divisions
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/vehicles" className="hover:text-[#C9A227] transition">
                                    Automotive Export (Active)
                                </Link>
                            </li>
                            <li>
                                <Link href="/tracking" className="hover:text-[#C9A227] transition">
                                    Maritime Logistics (Active)
                                </Link>
                            </li>
                            <li>
                                <Link href="/divisions" className="text-gray-500 hover:text-gray-300 transition flex items-center justify-between">
                                    <span>Industrial Machinery</span>
                                    <span className="text-[9px] px-1 bg-[#1A1A1A] border border-[#333] text-amber-500 rounded">Phase II</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/divisions" className="text-gray-500 hover:text-gray-300 transition flex items-center justify-between">
                                    <span>Clean Energy Tech</span>
                                    <span className="text-[9px] px-1 bg-[#1A1A1A] border border-[#333] text-amber-500 rounded">Phase II</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/divisions" className="text-gray-500 hover:text-gray-300 transition flex items-center justify-between">
                                    <span>Cross-Border Fintech</span>
                                    <span className="text-[9px] px-1 bg-[#1A1A1A] border border-[#333] text-amber-500 rounded">Phase III</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Trading Tools */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                            Operations & Tools
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/sourcing" className="hover:text-[#C9A227] transition">
                                    Custom Sourcing Wizard
                                </Link>
                            </li>
                            <li>
                                <Link href="/tracking" className="hover:text-[#C9A227] transition">
                                    Ocean Vessel Tracker
                                </Link>
                            </li>
                            <li>
                                <Link href="/vehicles" className="hover:text-[#C9A227] transition">
                                    Certified 360 Inventory
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-[#C9A227] transition">
                                    Inspection & Grading Protocol
                                </Link>
                            </li>
                            <li>
                                <Link href="/insights" className="hover:text-[#C9A227] transition">
                                    Global Trade & Tariff Reports
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:text-[#C9A227] transition">
                                    Dealer & Consignor Sign In
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Regional Trade Desks */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                            International Hubs
                        </h4>
                        <ul className="space-y-3 text-xs">
                            <li>
                                <p className="font-semibold text-gray-200">Tokyo Headquarters</p>
                                <p className="text-[11px] text-gray-500">Minato-ku, Roppongi Hills Mori Tower</p>
                            </li>
                            <li>
                                <p className="font-semibold text-gray-200">Dubai Commercial Desk</p>
                                <p className="text-[11px] text-gray-500">DIFC Gate Precinct 4, UAE</p>
                            </li>
                            <li>
                                <p className="font-semibold text-gray-200">Frankfurt Logistics Office</p>
                                <p className="text-[11px] text-gray-500">Westhafen Tower, Speicherstraße, Germany</p>
                            </li>
                            <li>
                                <p className="font-semibold text-gray-200">Singapore Maritime Desk</p>
                                <p className="text-[11px] text-gray-500">Marina Bay Financial Centre Tower 1</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Subfooter */}
                <div className="mt-14 pt-8 border-t border-[#1C1C1E] flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <p>© {new Date().getFullYear()} VALQORA Global Trading LLC. All international rights reserved.</p>
                    <div className="flex items-center space-x-6 text-[11px]">
                        <Link href="/about" className="hover:text-gray-300 transition">Compliance & AML</Link>
                        <Link href="/about" className="hover:text-gray-300 transition">Sanctions Governance</Link>
                        <Link href="/about" className="hover:text-gray-300 transition">Terms of Sale</Link>
                        <Link href="/about" className="hover:text-gray-300 transition">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
