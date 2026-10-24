import React from 'react';
import { Link } from '@inertiajs/react';
import { Logo } from '@/Components/Logo';
import { ShieldCheck, Anchor, Award, FileCheck2, Mail, Phone, MapPin, Globe, QrCode } from 'lucide-react';

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
                                <p className="text-[11px] text-gray-500">JEVIC / JAAI / EAA Pre-Export Verified</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#C9A227] flex-shrink-0">
                                <Anchor className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-white">Direct Vessel Allocations</h4>
                                <p className="text-[11px] text-gray-500">NYK, Wallenius, MOL & Maersk Charters</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#C9A227] flex-shrink-0">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-white">ISO 9001 & ISO 28000</h4>
                                <p className="text-[11px] text-gray-500">Supply Chain Security & GSO Compliant</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#C9A227] flex-shrink-0">
                                <FileCheck2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-white">L/C & Escrow Advisory</h4>
                                <p className="text-[11px] text-gray-500">UCP 600 Bank-to-Bank Settlement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Columns */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
                    {/* Column 1-2: Brand Identity & Global Desks */}
                    <div className="lg:col-span-2 space-y-5">
                        <Logo size="md" />
                        <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                            <strong className="text-white">Building Trust Across Borders.</strong> Valqora Global Trading is a multinational trading and investment group connecting manufacturers, auction houses, institutional fleets, and sovereign distributors across 48+ international markets.
                        </p>

                        <div className="space-y-2 text-xs text-gray-400 pt-1">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong className="text-gray-200">Tokyo HQ:</strong> Marunouchi Trust Tower, Chiyoda-ku, Tokyo 100-0005, Japan
                                </span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Globe className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong className="text-gray-200">Regional Hubs:</strong> Dubai (DMCC) • Frankfurt • Singapore • Dhaka
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                                <span>+81 3 5555 0192 (24/7 Maritime & Export Desk)</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                                <span>trade.desk@valqoraglobal.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Automotive & Sourcing */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                            Automotive & Trade
                        </h3>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/vehicles" className="hover:text-[#C9A227] transition">
                                    Verified Export Inventory
                                </Link>
                            </li>
                            <li>
                                <Link href="/vehicles?country=Japan" className="hover:text-[#C9A227] transition">
                                    JDM Direct Stock (USS / TAA)
                                </Link>
                            </li>
                            <li>
                                <Link href="/vehicles?country=Germany" className="hover:text-[#C9A227] transition">
                                    European Prestige & LHD
                                </Link>
                            </li>
                            <li>
                                <Link href="/sourcing" className="hover:text-[#C9A227] transition">
                                    Bespoke Vehicle Sourcing
                                </Link>
                            </li>
                            <li>
                                <Link href="/tracking" className="hover:text-[#C9A227] transition">
                                    10-Stage Shipment Tracker
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-[#C9A227] transition">
                                    Export & Logistics Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Brand Architecture Divisions (7 Official Divisions - PDF Vol 1 p. 24-25) */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                            Group Divisions
                        </h3>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/divisions" className="hover:text-[#C9A227] transition">
                                    Valqora Global Trading
                                </Link>
                            </li>
                            <li>
                                <Link href="/divisions" className="hover:text-[#C9A227] transition">
                                    Valqora Auto
                                </Link>
                            </li>
                            <li>
                                <Link href="/divisions" className="hover:text-[#C9A227] transition">
                                    Valqora Logistics
                                </Link>
                            </li>
                            <li>
                                <Link href="/divisions" className="hover:text-[#C9A227] transition">
                                    Valqora Industrial
                                </Link>
                            </li>
                            <li>
                                <Link href="/divisions" className="hover:text-[#C9A227] transition">
                                    Valqora Energy
                                </Link>
                            </li>
                            <li>
                                <Link href="/divisions" className="hover:text-[#C9A227] transition">
                                    Valqora Capital & Tech
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 5: Corporate Governance & Investors */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                            Corporate & Governance
                        </h3>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/about" className="hover:text-[#C9A227] transition">
                                    Company Profile & Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/about?tab=governance" className="hover:text-[#C9A227] transition">
                                    Corporate Governance
                                </Link>
                            </li>
                            <li>
                                <Link href="/about?tab=risk" className="hover:text-[#C9A227] transition">
                                    Risk Management Framework
                                </Link>
                            </li>
                            <li>
                                <Link href="/about?tab=esg" className="hover:text-[#C9A227] transition">
                                    ESG & Sustainability
                                </Link>
                            </li>
                            <li>
                                <Link href="/about?tab=investors" className="hover:text-[#C9A227] transition">
                                    Investor Relations
                                </Link>
                            </li>
                            <li>
                                <Link href="/about?tab=careers" className="hover:text-[#C9A227] transition">
                                    Careers & Talent (EVP)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 6: Digital Ecosystem Portals */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                            Digital Portals
                        </h3>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/portal" className="hover:text-[#C9A227] transition">
                                    Customer Ownership Portal
                                </Link>
                            </li>
                            <li>
                                <Link href="/portal?view=dealer" className="hover:text-[#C9A227] transition">
                                    Authorized Dealer Portal
                                </Link>
                            </li>
                            <li>
                                <Link href="/portal?view=supplier" className="hover:text-[#C9A227] transition">
                                    Global Supplier Portal
                                </Link>
                            </li>
                            <li>
                                <Link href="/portal/documents" className="hover:text-[#C9A227] transition flex items-center gap-1.5">
                                    <QrCode className="w-3.5 h-3.5 text-[#C9A227]" />
                                    QR Document Verification
                                </Link>
                            </li>
                            <li>
                                <Link href="/insights" className="hover:text-[#C9A227] transition">
                                    Market Intelligence & Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#C9A227] transition">
                                    Global Offices & Warehouses
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Legal, Social (@ValqoraGlobal), & Compliance Bar */}
            <div className="border-t border-[#1C1C1C] bg-[#080808] py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <div>
                        © {new Date().getFullYear()} VALQORA GLOBAL TRADING. All rights reserved. Unified Handle:{' '}
                        <span className="text-[#C9A227] font-mono">@ValqoraGlobal</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-5">
                        <Link href="/about?tab=compliance" className="hover:text-gray-300 transition">
                            AML / KYC & Sanctions Policy
                        </Link>
                        <Link href="/about?tab=compliance" className="hover:text-gray-300 transition">
                            Incoterms® 2020 Compliance
                        </Link>
                        <Link href="/about?tab=compliance" className="hover:text-gray-300 transition">
                            GDPR Privacy & Cookie Controls
                        </Link>
                        <Link href="/portal/documents" className="hover:text-gray-300 transition">
                            Anti-Counterfeit QR Registry
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
