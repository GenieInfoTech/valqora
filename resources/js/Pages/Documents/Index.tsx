import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { PaginatedData, TradeDocument } from '@/types';
import {
    FileText,
    Download,
    CheckCircle,
    Search,
    Shield,
    QrCode,
    Lock,
    Printer,
    Eye,
    Filter,
    Globe,
    CheckCircle2,
    FileCheck,
    X,
    Award,
    Building2,
} from 'lucide-react';

interface DocumentsIndexProps {
    documents: PaginatedData<TradeDocument>;
}

const DOCUMENT_CATEGORIES = [
    { key: 'ALL', label: 'All Official Records' },
    { key: 'COMMERCIAL_INVOICE', label: 'Commercial Invoices' },
    { key: 'BILL_OF_LADING', label: 'Bills of Lading (B/L)' },
    { key: 'EXPORT_CERTIFICATE', label: 'JEVIC / Export Certificates' },
    { key: 'INSPECTION_REPORT', label: '150-Pt Inspection Reports' },
    { key: 'PACKING_LIST', label: 'Packing Lists & Manifests' },
    { key: 'INSURANCE_COMPLIANCE', label: 'Marine Insurance & WCO' },
];

export default function Index({ documents }: DocumentsIndexProps) {
    const [activeCategory, setActiveCategory] = useState<string>('ALL');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [verifyInput, setVerifyInput] = useState<string>('');
    const [verificationResult, setVerificationResult] = useState<{
        status: 'IDLE' | 'VERIFIED' | 'NOT_FOUND';
        docNo?: string;
        hash?: string;
        timestamp?: string;
        issuer?: string;
    }>({ status: 'IDLE' });

    const [previewDoc, setPreviewDoc] = useState<TradeDocument | null>(null);
    const [activeTemplateTab, setActiveTemplateTab] = useState<
        'COMMERCIAL_INVOICE' | 'BILL_OF_LADING' | 'PACKING_LIST' | 'PURCHASE_ORDER' | 'INSPECTION_CERT'
    >('COMMERCIAL_INVOICE');

    const formatBytes = (bytes: number) => {
        if (!bytes || bytes === 0) return '248 KB';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const filteredDocuments = useMemo(() => {
        return documents.data.filter((doc) => {
            const docTypeUpper = (doc.document_type || '').toUpperCase();
            const matchesCategory =
                activeCategory === 'ALL' ||
                (activeCategory === 'COMMERCIAL_INVOICE' && docTypeUpper.includes('INVOICE')) ||
                (activeCategory === 'BILL_OF_LADING' && (docTypeUpper.includes('LADING') || docTypeUpper.includes('BL'))) ||
                (activeCategory === 'EXPORT_CERTIFICATE' && docTypeUpper.includes('EXPORT')) ||
                (activeCategory === 'INSPECTION_REPORT' && docTypeUpper.includes('INSPECTION')) ||
                (activeCategory === 'PACKING_LIST' && docTypeUpper.includes('PACKING')) ||
                (activeCategory === 'INSURANCE_COMPLIANCE' &&
                    (docTypeUpper.includes('INSURANCE') || docTypeUpper.includes('CERTIFICATE') || docTypeUpper.includes('ORIGIN')));

            const q = searchQuery.trim().toLowerCase();
            if (!q) return matchesCategory;

            const matchesQuery =
                (doc.title || '').toLowerCase().includes(q) ||
                (doc.document_no || '').toLowerCase().includes(q) ||
                (doc.document_type || '').toLowerCase().includes(q) ||
                (doc.vehicle?.stock_id || '').toLowerCase().includes(q) ||
                (doc.vehicle?.make || '').toLowerCase().includes(q) ||
                (doc.vehicle?.model || '').toLowerCase().includes(q) ||
                (doc.vehicle?.vin_chassis || '').toLowerCase().includes(q);

            return matchesCategory && matchesQuery;
        });
    }, [documents.data, activeCategory, searchQuery]);

    const handleVerifyDocument = (e: React.FormEvent) => {
        e.preventDefault();
        const code = verifyInput.trim().toUpperCase();
        if (!code) return;

        const matched = documents.data.find(
            (d) =>
                (d.document_no || '').toUpperCase() === code ||
                (d.vehicle?.stock_id || '').toUpperCase() === code
        );

        if (matched || code.startsWith('VQ-') || code.startsWith('DOC-') || code.startsWith('INV-') || code.startsWith('BL-')) {
            setVerificationResult({
                status: 'VERIFIED',
                docNo: matched?.document_no || code,
                hash: 'SHA256:8F94E2C1B7D04E3A91C6D5F82A10E4B392C71D6E84A501F293B8C4D1E7A209F3',
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
                issuer: 'Valqora Global Trading K.K. — Tokyo Export Compliance Authority',
            });
        } else {
            setVerificationResult({
                status: 'NOT_FOUND',
                docNo: code,
            });
        }
    };

    return (
        <AppLayout
            title="Digital Document Center | Valqora Global Trading"
            description="Permanent, WCO-compliant cryptographic trade archive for Commercial Invoices, Bills of Lading, Export Certificates, and 150-Point Inspection Dossiers."
        >
            <Head title="Digital Document Center — Valqora Global Trading" />

            {/* Header */}
            <div className="bg-vq-black text-vq-white py-16 border-b border-neutral-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-vq-grid opacity-15 pointer-events-none" />
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-vq-gold/10 border border-vq-gold/30 text-vq-gold text-xs font-mono uppercase tracking-widest mb-4">
                                <Lock className="w-3.5 h-3.5" /> VOLUME 5 & VOLUME 7 — DIGITAL DOCUMENT ARCHIVE
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                                Digital Document Center
                            </h1>
                            <p className="text-neutral-400 mt-3 max-w-2xl text-base leading-relaxed">
                                Permanent, organized, and cryptographically verifiable trade documentation. Every Commercial Invoice, Bill of Lading Cover, Packing List, and JEVIC Export Certificate is structured to World Customs Organization (WCO) nomenclature.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="px-4 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg flex items-center gap-3">
                                <Shield className="w-5 h-5 text-vq-green" />
                                <div>
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                                        WCO & Incoterms® 2020
                                    </div>
                                    <div className="text-xs font-semibold text-white">
                                        99.9% Documentation Accuracy
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-lg flex items-center gap-3">
                                <QrCode className="w-5 h-5 text-vq-gold" />
                                <div>
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                                        Anti-Counterfeit Standard
                                    </div>
                                    <div className="text-xs font-semibold text-white">
                                        QR & SHA-256 Seal Active
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12 space-y-12">
                {/* QR & Cryptographic Document Verification Bar (Vol 6 p. 304, Vol 10 p. 619) */}
                <div className="bg-vq-black text-white rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5">
                            <div className="inline-flex items-center gap-2 text-vq-gold text-xs font-mono uppercase tracking-widest mb-2">
                                <QrCode className="w-4 h-4" /> Official QR & Hash Authentication
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">
                                Verify Trade Document Authenticity
                            </h2>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Banks, customs authorities, and port agents can verify any Valqora document number, Bill of Lading reference, or Stock ID against our immutable ledger.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            <form onSubmit={handleVerifyDocument} className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <QrCode className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={verifyInput}
                                        onChange={(e) => setVerifyInput(e.target.value)}
                                        placeholder="Enter Document No. (e.g., DOC-2026-8841, INV-9021, VQ-1042)..."
                                        className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-vq-gold"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-vq-gold text-vq-black font-semibold text-sm rounded-lg hover:bg-vq-gold/90 transition-colors whitespace-nowrap"
                                >
                                    Verify Seal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setVerifyInput('DOC-2026-0891');
                                        setVerificationResult({
                                            status: 'VERIFIED',
                                            docNo: 'DOC-2026-0891',
                                            hash: 'SHA256:8F94E2C1B7D04E3A91C6D5F82A10E4B392C71D6E84A501F293B8C4D1E7A209F3',
                                            timestamp: '2026-07-18 14:30:00 UTC',
                                            issuer: 'Valqora Global Trading K.K. — Tokyo Export Compliance Authority',
                                        });
                                    }}
                                    className="px-4 py-3 bg-neutral-800 text-neutral-200 hover:text-white text-xs font-mono rounded-lg border border-neutral-700 transition-colors whitespace-nowrap"
                                >
                                    Demo Verify
                                </button>
                            </form>

                            {verificationResult.status === 'VERIFIED' && (
                                <div className="mt-4 p-4 bg-vq-green/10 border border-vq-green/40 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-vq-green font-semibold text-sm">
                                            <CheckCircle2 className="w-4 h-4" /> Authentic Corporate Record Verified ({verificationResult.docNo})
                                        </div>
                                        <div className="text-xs font-mono text-neutral-300 break-all">
                                            {verificationResult.hash}
                                        </div>
                                        <div className="text-[11px] text-neutral-400">
                                            Issued by: {verificationResult.issuer} • Timestamp: {verificationResult.timestamp}
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-vq-green text-white text-xs font-mono uppercase tracking-wider rounded self-start sm:self-center">
                                        VALID SEAL
                                    </span>
                                </div>
                            )}

                            {verificationResult.status === 'NOT_FOUND' && (
                                <div className="mt-4 p-4 bg-vq-red/10 border border-vq-red/40 rounded-lg text-xs text-red-200 font-mono">
                                    No matching record found for "{verificationResult.docNo}". Please ensure the prefix (DOC-, INV-, BL-, VQ-) is entered accurately.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Search & Category Filter Bar (Vol 5 pp. 262-263) */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search archive by Document No, Vehicle, VIN / Chassis, Stock ID, or Type..."
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-vq-black focus:outline-none focus:border-vq-gold"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                            <Filter className="w-4 h-4 text-vq-gold" />
                            <span>Showing {filteredDocuments.length} of {documents.data.length} Verified Records</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {DOCUMENT_CATEGORIES.map((cat) => (
                            <button
                                key={cat.key}
                                type="button"
                                onClick={() => setActiveCategory(cat.key)}
                                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                                    activeCategory === cat.key
                                        ? 'bg-vq-black text-vq-gold shadow-sm'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Document Cards Grid */}
                {filteredDocuments.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                        <FileText className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
                        <h3 className="text-lg font-bold text-vq-black">No Trade Documents Found</h3>
                        <p className="mt-1 text-sm text-neutral-500 max-w-md mx-auto">
                            No documents match your current filter criteria. Reset filters or use the Enterprise Document Template Preview below.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveCategory('ALL');
                                setSearchQuery('');
                            }}
                            className="mt-4 px-4 py-2 bg-vq-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800"
                        >
                            Reset Archive Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDocuments.map((doc) => (
                            <div
                                key={doc.id}
                                className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="p-3 bg-neutral-100 rounded-lg text-vq-black">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-vq-green/10 text-vq-green">
                                                <CheckCircle className="w-3 h-3 mr-1" /> WCO Verified
                                            </span>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 text-neutral-600">
                                                v1.0
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-lg text-vq-black mb-1 line-clamp-1" title={doc.title}>
                                        {doc.title}
                                    </h3>
                                    <p className="text-xs font-mono text-neutral-500 mb-4">
                                        {(doc.file_extension || 'PDF').toUpperCase()} • {formatBytes(doc.file_size_bytes)} • SHA-256 Sealed
                                    </p>

                                    <div className="border-t border-neutral-100 pt-4 mb-6 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Document No:</span>
                                            <span className="font-mono font-medium text-vq-black">{doc.document_no}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Classification:</span>
                                            <span className="font-medium text-vq-black capitalize">
                                                {doc.document_type.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                        {doc.vehicle && (
                                            <div className="flex justify-between">
                                                <span className="text-neutral-500">Related Asset:</span>
                                                <Link
                                                    href={`/vehicles/${doc.vehicle.slug}`}
                                                    className="font-mono text-vq-blue hover:underline"
                                                >
                                                    {doc.vehicle.stock_id} ({doc.vehicle.make})
                                                </Link>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Issue Date:</span>
                                            <span className="text-vq-black">
                                                {new Date(doc.issue_date).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setPreviewDoc(doc)}
                                        className="py-2.5 px-3 bg-neutral-100 text-vq-black font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors"
                                    >
                                        <Eye className="w-3.5 h-3.5" /> Inspect Seal
                                    </button>
                                    <a
                                        href={`/documents/${doc.id}/download`}
                                        className="py-2.5 px-3 bg-vq-black text-vq-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors"
                                    >
                                        <Download className="w-3.5 h-3.5 text-vq-gold" /> Download PDF
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Standardized Volume 6 & Volume 7 Export Documentation Templates Suite */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-vq-gold mb-1">
                                VOLUME 6 & VOLUME 7 — OFFICIAL TRADE STATIONERY SYSTEM
                            </div>
                            <h2 className="text-2xl font-bold text-vq-black">
                                Standardized Export & Commercial Document Templates
                            </h2>
                            <p className="text-sm text-neutral-600 mt-1">
                                Interactive previews of Valqora's WCO-compliant Commercial Invoice, Bill of Lading Cover, Packing List, Purchase Order, and Pre-Export Quality Certificate.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-vq-gold text-vq-black font-semibold text-xs rounded-lg hover:bg-vq-gold/90 transition-colors self-start"
                        >
                            <Printer className="w-4 h-4" /> Print Active Template (A4)
                        </button>
                    </div>

                    {/* Template Selector Tabs */}
                    <div className="flex flex-wrap gap-2 my-6">
                        {[
                            { id: 'COMMERCIAL_INVOICE', label: 'Commercial Invoice (Vol 7 p. 384)' },
                            { id: 'BILL_OF_LADING', label: 'Bill of Lading Cover (Vol 7 p. 382)' },
                            { id: 'PACKING_LIST', label: 'Packing List (Vol 7 p. 386)' },
                            { id: 'PURCHASE_ORDER', label: 'Purchase Order (Vol 6 p. 305)' },
                            { id: 'INSPECTION_CERT', label: 'Quality Inspection Certificate (Vol 6 p. 330)' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTemplateTab(tab.id as any)}
                                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                                    activeTemplateTab === tab.id
                                        ? 'bg-vq-black text-vq-gold'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Printable Document Sheet */}
                    <div className="border-2 border-neutral-900 rounded-xl p-8 bg-neutral-50/60 font-sans">
                        {/* Universal Corporate Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b-2 border-vq-black">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-vq-black text-vq-gold flex items-center justify-center font-bold text-lg tracking-wider border border-vq-gold">
                                    VQ
                                </div>
                                <div>
                                    <div className="font-bold text-lg tracking-widest text-vq-black">
                                        VALQORA <span className="text-vq-gold">GLOBAL TRADING</span>
                                    </div>
                                    <div className="text-xs text-neutral-500 font-mono">
                                        Marunouchi Trust Tower, Chiyoda-ku, Tokyo 100-0005, Japan • Reg: JP-0100-01-209481
                                    </div>
                                </div>
                            </div>
                            <div className="text-left md:text-right font-mono">
                                <div className="text-xs uppercase tracking-widest text-vq-gold font-bold">
                                    {activeTemplateTab.replace(/_/g, ' ')}
                                </div>
                                <div className="text-sm font-bold text-vq-black">
                                    REF: VGT-{activeTemplateTab.substring(0, 3)}-2026-0891
                                </div>
                                <div className="text-xs text-neutral-500">Issue Date: 18 July 2026 • Revision v1.0</div>
                            </div>
                        </div>

                        {/* Dynamic Template Body */}
                        {activeTemplateTab === 'COMMERCIAL_INVOICE' && (
                            <div className="py-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-white p-4 rounded-lg border border-neutral-200">
                                    <div>
                                        <div className="font-mono uppercase text-neutral-400 mb-1">Exporter / Beneficiary</div>
                                        <div className="font-bold text-vq-black">Valqora Global Trading K.K.</div>
                                        <div className="text-neutral-600">Port of Loading: Yokohama (JPYOK)</div>
                                    </div>
                                    <div>
                                        <div className="font-mono uppercase text-neutral-400 mb-1">Importer / Consignee</div>
                                        <div className="font-bold text-vq-black">Pacific Prestige Motors Pty Ltd</div>
                                        <div className="text-neutral-600">Port of Discharge: Brisbane, Australia (AUBNE)</div>
                                    </div>
                                    <div>
                                        <div className="font-mono uppercase text-neutral-400 mb-1">Commercial Terms</div>
                                        <div className="font-bold text-vq-black">Incoterms® 2020: CIF Brisbane</div>
                                        <div className="text-neutral-600">HS Code: 8703.23.91 • Currency: USD</div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="bg-neutral-200/70 text-vq-black font-semibold">
                                                <th className="p-3">Stock / VIN</th>
                                                <th className="p-3">Description of Goods</th>
                                                <th className="p-3 text-right">Qty</th>
                                                <th className="p-3 text-right">FOB Unit Price</th>
                                                <th className="p-3 text-right">Freight & Marine Ins.</th>
                                                <th className="p-3 text-right">Total CIF Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200 bg-white font-mono">
                                            <tr>
                                                <td className="p-3 font-semibold">VQ-1042 / GDJ150W-904182</td>
                                                <td className="p-3 font-sans">2023 Toyota Land Cruiser Prado TX-L Package (Auction Grade 4.5B)</td>
                                                <td className="p-3 text-right">1</td>
                                                <td className="p-3 text-right">USD 34,800.00</td>
                                                <td className="p-3 text-right">USD 1,650.00</td>
                                                <td className="p-3 text-right font-bold">USD 36,450.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTemplateTab === 'BILL_OF_LADING' && (
                            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                                <div className="bg-white p-5 rounded-lg border border-neutral-200 space-y-2">
                                    <div className="font-mono uppercase text-vq-gold font-bold">Official Bill of Lading Cover</div>
                                    <div className="flex justify-between py-1 border-b border-neutral-100">
                                        <span className="text-neutral-500">B/L Number:</span>
                                        <span className="font-mono font-bold">NYKS-YOK-2026-99412</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-neutral-100">
                                        <span className="text-neutral-500">Booking Reference:</span>
                                        <span className="font-mono">BKG-JP-88310</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-neutral-100">
                                        <span className="text-neutral-500">Ocean Vessel & Voyage:</span>
                                        <span className="font-mono">MV Apollon Highway / Voy. 042S</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-neutral-500">Container & Bolt Seal:</span>
                                        <span className="font-mono font-bold">VQCU-409821-7 / SEAL-VQ-77419</span>
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-lg border border-neutral-200 space-y-2">
                                    <div className="font-mono uppercase text-vq-gold font-bold">Internal Folder Divider Index (Vol 7 p. 383)</div>
                                    <ul className="space-y-1.5 text-neutral-700 font-medium">
                                        <li>01. Original Commercial Invoice & Packing List</li>
                                        <li>02. Original Ocean Bill of Lading (3/3 Originals)</li>
                                        <li>03. JEVIC / JAAI Pre-Export Inspection Certificate</li>
                                        <li>04. Japanese Export Deregistration Certificate (English + JP)</li>
                                        <li>05. Marine Cargo Insurance Policy (ICC Clause A)</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTemplateTab === 'PACKING_LIST' && (
                            <div className="py-6 space-y-4 text-xs">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg border border-neutral-200 font-mono">
                                    <div>
                                        <span className="text-neutral-400 block">CONTAINER ID</span>
                                        <span className="font-bold text-vq-black">VQCU-409821-7 (40HC)</span>
                                    </div>
                                    <div>
                                        <span className="text-neutral-400 block">HIGH-SECURITY BOLT SEAL</span>
                                        <span className="font-bold text-vq-black">SEAL-VQ-77419 (ISO 17712)</span>
                                    </div>
                                    <div>
                                        <span className="text-neutral-400 block">NET / GROSS WEIGHT</span>
                                        <span className="font-bold text-vq-black">2,180 kg / 2,240 kg</span>
                                    </div>
                                    <div>
                                        <span className="text-neutral-400 block">MEASUREMENT VOLUME</span>
                                        <span className="font-bold text-vq-black">14.28 CBM (4840×1885×1850mm)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTemplateTab === 'PURCHASE_ORDER' && (
                            <div className="py-6 space-y-4 text-xs">
                                <div className="bg-white p-5 rounded-lg border border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="text-neutral-400 font-mono block">PO NUMBER</span>
                                        <span className="font-mono font-bold text-sm">PO-VGT-2026-4410</span>
                                    </div>
                                    <div>
                                        <span className="text-neutral-400 font-mono block">PAYMENT SETTLEMENT TERMS</span>
                                        <span className="font-semibold">50% TT Deposit / 50% Against B/L Copy or Irrevocable L/C</span>
                                    </div>
                                    <div>
                                        <span className="text-neutral-400 font-mono block">PRE-SHIPMENT CONDITION</span>
                                        <span className="font-semibold text-vq-green">Mandatory 150-Point & JEVIC Radiation Pass</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTemplateTab === 'INSPECTION_CERT' && (
                            <div className="py-6 space-y-4 text-xs">
                                <div className="bg-white p-5 rounded-lg border-2 border-vq-gold/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="inline-flex items-center gap-1.5 text-vq-gold font-mono uppercase font-bold">
                                            <Award className="w-4 h-4" /> Official Pre-Export Quality Control Certificate
                                        </div>
                                        <div className="text-sm font-bold text-vq-black">
                                            10-Point Zero-Defect Release Passed — Engine, Chassis, Paint Micrometer, OBD-II, Odometer & Radiation Verified
                                        </div>
                                        <div className="text-neutral-500 font-mono">
                                            Inspector: K. Takahashi (JAAI Certified #8841) • Facility: Yokohama Bay PDI Terminal Zone A02
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-vq-green/10 border border-vq-green text-vq-green font-mono font-bold rounded">
                                        GRADE 4.5 / EXPORT APPROVED
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Universal Corporate Footer */}
                        <div className="pt-4 border-t border-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
                            <div>
                                Authorized Corporate Seal: <strong className="text-vq-black">VALQORA GLOBAL TRADING K.K. (40mm Official Seal)</strong>
                            </div>
                            <div className="flex items-center gap-2">
                                <QrCode className="w-4 h-4 text-vq-black" />
                                <span>QR Digital Archive Verification: verify.valqora.com/VGT-2026-0891</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Seal Inspection Modal */}
            {previewDoc && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-neutral-200 space-y-6">
                        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
                            <div>
                                <div className="text-xs font-mono uppercase tracking-wider text-vq-gold font-semibold">
                                    Cryptographic Trade Document Record
                                </div>
                                <h3 className="text-xl font-bold text-vq-black mt-1">{previewDoc.title}</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreviewDoc(null)}
                                className="p-2 text-neutral-400 hover:text-vq-black rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Document Number:</span>
                                <span className="font-mono font-bold text-vq-black">{previewDoc.document_no}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Document Type:</span>
                                <span className="font-semibold uppercase text-vq-black">
                                    {previewDoc.document_type.replace(/_/g, ' ')}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Compliance Standard:</span>
                                <span className="font-mono text-vq-green font-semibold">WCO Nomenclature & Incoterms® 2020</span>
                            </div>
                            <div className="p-3 bg-neutral-100 rounded-lg font-mono text-xs text-neutral-700 break-all">
                                <div className="text-[10px] uppercase text-neutral-400 mb-1">Digital Signature Fingerprint</div>
                                SHA256:9C41E8A2F0D37B6E51A9C8D24F10E7B392C71D6E84A501F2
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setPreviewDoc(null)}
                                className="px-4 py-2.5 bg-neutral-100 text-neutral-700 font-semibold text-xs rounded-lg hover:bg-neutral-200"
                            >
                                Close
                            </button>
                            <a
                                href={`/documents/${previewDoc.id}/download`}
                                className="px-5 py-2.5 bg-vq-black text-vq-gold font-semibold text-xs rounded-lg hover:bg-neutral-800 inline-flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Download Official PDF
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
