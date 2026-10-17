import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Logo } from '@/Components/Logo';
import { useCurrency } from '@/context/CurrencyContext';
import { Quotation } from '@/types';
import {
    Printer,
    Download,
    ShieldCheck,
    CheckCircle2,
    Calendar,
    ArrowLeft,
    Building2,
    Mail,
    Phone,
} from 'lucide-react';

interface QuotationShowProps {
    quotation: Quotation;
}

export default function QuotationShow({ quotation }: QuotationShowProps) {
    const { formatPrice } = useCurrency();

    return (
        <AppLayout
            title={`Commercial Quotation ${quotation.quotation_no}`}
            description={`Official pro-forma trade quotation ${quotation.quotation_no} issued by VALQORA Global Trading LLC.`}
        >
            <div className="bg-[#0C0C0E] border-b border-[#222226] py-4 print:hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <Link
                        href="/vehicles"
                        className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Inventory</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1C1C1E] hover:bg-[#252528] text-white border border-[#2E2E34] rounded-lg text-xs font-semibold transition"
                        >
                            <Printer className="w-3.5 h-3.5 text-[#C9A227]" />
                            <span>Print / Save PDF</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Official Pro-Forma Sheet */}
                <div className="bg-[#141416] border border-[#26262B] rounded-2xl p-8 sm:p-12 shadow-2xl text-xs space-y-8 print:bg-white print:text-black print:border-none print:shadow-none">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-[#26262B] print:border-gray-300">
                        <div>
                            <Logo size="lg" />
                            <div className="mt-3 text-[11px] text-gray-400 print:text-gray-600 leading-relaxed font-mono">
                                <p>VALQORA Global Trading LLC</p>
                                <p>Directorate of International Trade & Maritime Logistics</p>
                                <p>Minato-ku, Tokyo 105-0001, Japan</p>
                                <p>License: JP-METI-8891024 • Dubai Bureau: DIFC Gate 4</p>
                            </div>
                        </div>

                        <div className="text-left sm:text-right font-mono">
                            <span className="text-[10px] uppercase font-bold text-[#C9A227] tracking-widest block mb-1">
                                PRO-FORMA COMMERCIAL QUOTATION
                            </span>
                            <p className="text-xl font-bold text-white print:text-black">{quotation.quotation_no}</p>
                            <p className="text-gray-400 print:text-gray-600 mt-1">Issue Date: {new Date(quotation.created_at).toLocaleDateString()}</p>
                            <p className="text-[#C9A227] print:text-amber-800">Valid Until: {quotation.valid_until}</p>
                            <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold uppercase text-[10px]">
                                Status: {quotation.status}
                            </span>
                        </div>
                    </div>

                    {/* Buyer & Shipment Terms */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4 border-b border-[#26262B] print:border-gray-300">
                        <div>
                            <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">
                                Consignee / Buyer Details
                            </h4>
                            <p className="text-sm font-bold text-white print:text-black">{quotation.customer_name}</p>
                            {quotation.customer_company && (
                                <p className="text-gray-300 print:text-gray-700">{quotation.customer_company}</p>
                            )}
                            <p className="text-gray-400 print:text-gray-600">{quotation.customer_email}</p>
                            {quotation.customer_phone && (
                                <p className="text-gray-400 print:text-gray-600">{quotation.customer_phone}</p>
                            )}
                        </div>

                        <div className="sm:text-right">
                            <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">
                                Maritime Trade & Delivery Terms
                            </h4>
                            <p className="text-sm font-bold text-white print:text-black">
                                Incoterm: <span className="text-[#C9A227]">{quotation.incoterm}</span>
                            </p>
                            <p className="text-gray-300 print:text-gray-700">Discharge Port: {quotation.destination_port}</p>
                            <p className="text-gray-400 print:text-gray-600">Country: {quotation.destination_country}</p>
                            <p className="text-gray-400 print:text-gray-600">Loading Port: Yokohama Daikoku Terminal, Japan</p>
                        </div>
                    </div>

                    {/* Itemized Line Items Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono">
                            <thead>
                                <tr className="border-b border-[#26262B] text-gray-400 print:text-gray-600 uppercase text-[10px]">
                                    <th className="py-2.5">Description & Specification</th>
                                    <th className="py-2.5">Identifier</th>
                                    <th className="py-2.5 text-right">Incoterm Base</th>
                                    <th className="py-2.5 text-right">Amount (USD)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#202024] print:divide-gray-200 text-gray-200 print:text-black">
                                <tr>
                                    <td className="py-3 font-sans">
                                        <p className="font-bold text-white print:text-black">
                                            {quotation.vehicle?.title || 'Bespoke Sourced Vehicle Specification'}
                                        </p>
                                        <p className="text-[10px] text-gray-400 print:text-gray-600">
                                            Year: {quotation.vehicle?.year} • Steering: {quotation.vehicle?.steering} • Fuel: {quotation.vehicle?.fuel_type}
                                        </p>
                                    </td>
                                    <td className="py-3 text-gray-400">{quotation.vehicle?.stock_id || 'SOURCING-SPEC'}</td>
                                    <td className="py-3 text-right">FOB Price</td>
                                    <td className="py-3 text-right font-bold text-white print:text-black">
                                        ${Number(quotation.vehicle_price_usd).toLocaleString()}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="py-2.5 text-gray-300 print:text-gray-800">
                                        Ocean Freight (Direct Ro-Ro / Containerized Stowage)
                                    </td>
                                    <td className="py-2.5 text-gray-400">NYK/Wallenius</td>
                                    <td className="py-2.5 text-right">Freight</td>
                                    <td className="py-2.5 text-right">
                                        ${Number(quotation.freight_cost_usd).toLocaleString()}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="py-2.5 text-gray-300 print:text-gray-800">
                                        Marine Cargo All-Risk Underwriting (Lloyds / Tokio Marine Syndicate)
                                    </td>
                                    <td className="py-2.5 text-gray-400">Policy Endorsement</td>
                                    <td className="py-2.5 text-right">Insurance</td>
                                    <td className="py-2.5 text-right">
                                        ${Number(quotation.marine_insurance_usd).toLocaleString()}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="py-2.5 text-gray-300 print:text-gray-800">
                                        Japan Customs Clearance, Certified Export Certificate & 160-Pt Verification
                                    </td>
                                    <td className="py-2.5 text-gray-400">JEVIC/Customs</td>
                                    <td className="py-2.5 text-right">Documentation</td>
                                    <td className="py-2.5 text-right">
                                        ${Number(quotation.documentation_inspection_usd).toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-[#2A2A30] text-sm">
                                    <td colSpan={3} className="py-4 font-bold text-right text-white print:text-black uppercase">
                                        Total Commercial Amount Due ({quotation.incoterm}):
                                    </td>
                                    <td className="py-4 font-black text-right text-[#C9A227] print:text-amber-800 text-lg">
                                        ${Number(quotation.total_amount_usd).toLocaleString()} USD
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Commercial Conditions & Bank Wire Instructions */}
                    <div className="p-4 bg-[#111112] print:bg-gray-100 border border-[#25252A] rounded-xl text-[11px] text-gray-400 print:text-gray-700 leading-relaxed space-y-2">
                        <strong className="text-white print:text-black block">Institutional Wire & Escrow Conditions:</strong>
                        <p>
                            1. Payment terms: 50% upon pro-forma confirmation; balance 50% upon release of Bill of Lading (B/L) copy with official Japan Customs stamped seal.
                        </p>
                        <p>
                            2. Beneficiary Bank: Sumitomo Mitsui Banking Corporation (SMBC Tokyo) / Emirates NBD (Dubai Branch).
                        </p>
                        <p>
                            3. All ocean cargo is conveyed under Hague-Visby rules with authenticated cryptographic documentation vault access.
                        </p>
                    </div>

                    {/* Sign-off & Seal */}
                    <div className="pt-6 border-t border-[#26262B] print:border-gray-300 flex justify-between items-end">
                        <div>
                            <p className="text-gray-400">Authorized Officer:</p>
                            <p className="font-bold text-white print:text-black font-mono">Alexander Vance</p>
                            <p className="text-[10px] text-[#C9A227]">Trade Directorate & Legal Signatory</p>
                        </div>

                        <div className="text-right">
                            <span className="inline-block px-3 py-1.5 border border-[#C9A227]/40 text-[#C9A227] font-mono text-[10px] uppercase font-bold tracking-wider rounded">
                                VALQORA SEAL CERTIFIED
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
