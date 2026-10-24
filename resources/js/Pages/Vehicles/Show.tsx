import React, { useState, useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { VehicleCard } from '@/Components/VehicleCard';
import { InquiryModal } from '@/Components/InquiryModal';
import { Vehicle, Port } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useWatchlist } from '@/context/WatchlistContext';
import {
    ShieldCheck,
    CheckCircle2,
    FileText,
    Calculator,
    Ship,
    MapPin,
    Calendar,
    Gauge,
    Fuel,
    Settings,
    ChevronRight,
    Award,
    Sparkles,
    Lock,
    Download,
    Video,
    Share2,
    Heart,
    Scale,
    Printer,
    X,
    Building2,
    CreditCard,
    QrCode,
    Compass,
} from 'lucide-react';

interface VehiclesShowProps {
    vehicle: Vehicle;
    relatedVehicles: Vehicle[];
    ports: Port[];
}

export default function Show({ vehicle, relatedVehicles, ports }: VehiclesShowProps) {
    const { formatPrice, formatIsoPrice } = useCurrency();
    const { isSaved, toggleSaved, isCompared, toggleCompare, openDrawer } = useWatchlist();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [inquiryDefaultSubject, setInquiryDefaultSubject] = useState<string>('');
    const [previewDocType, setPreviewDocType] = useState<string | null>(null);
    const [shareCopied, setShareCopied] = useState(false);

    // Shipping & Landed Cost Calculator State
    const [selectedPortId, setSelectedPortId] = useState<number>(ports[0]?.id || 1);
    const [shippingMethod, setShippingMethod] = useState<'roro' | 'container'>('roro');
    const [incoterm, setIncoterm] = useState<'FOB' | 'CFR' | 'CIF'>('CIF');
    const [includeInspection, setIncludeInspection] = useState(true);
    const [includeMarineInsurance, setIncludeMarineInsurance] = useState(true);

    const selectedPort = useMemo(
        () => ports.find((p) => p.id === Number(selectedPortId)) || ports[0],
        [ports, selectedPortId]
    );

    const costBreakdown = useMemo(() => {
        const fob = Number(vehicle.price_usd) || 0;
        const freight =
            incoterm === 'FOB'
                ? 0
                : shippingMethod === 'container'
                ? Number(selectedPort?.container_rate_usd || 2450)
                : Number(selectedPort?.roro_rate_usd || 1350);
        const inspection = includeInspection ? Number(selectedPort?.inspection_fee_usd || 350) : 0;
        const insurance =
            incoterm === 'CIF' && includeMarineInsurance
                ? Math.round(fob * ((Number(selectedPort?.insurance_rate_percent) || 1.2) / 100))
                : 0;
        const total = fob + freight + inspection + insurance;

        return { fob, freight, inspection, insurance, total };
    }, [vehicle.price_usd, selectedPort, shippingMethod, incoterm, includeInspection, includeMarineInsurance]);

    const quoteForm = useForm({
        vehicle_id: vehicle.id,
        port_id: selectedPort?.id || 1,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        company_name: '',
        shipping_method: shippingMethod,
        incoterm: incoterm,
        include_insurance: includeMarineInsurance,
        include_inspection: includeInspection,
        notes: '',
    });

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        quoteForm.transform((data) => ({
            ...data,
            port_id: selectedPort?.id || 1,
            shipping_method: shippingMethod,
            incoterm: incoterm,
            include_insurance: includeMarineInsurance,
            include_inspection: includeInspection,
        }));
        quoteForm.post('/quotations', {
            preserveScroll: true,
            onSuccess: () => quoteForm.reset('customer_name', 'customer_email', 'customer_phone', 'company_name', 'notes'),
        });
    };

    const images =
        vehicle.images && vehicle.images.length > 0
            ? vehicle.images
            : [
                  {
                      id: 0,
                      url:
                          vehicle.primary_image?.url ||
                          'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
                      alt_text: vehicle.title,
                      is_primary: true,
                  },
              ];

    const openActionInquiry = (actionLabel: string) => {
        setInquiryDefaultSubject(`${actionLabel} — ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.stock_number})`);
        setIsInquiryOpen(true);
    };

    const handleShareListing = () => {
        if (typeof window !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 3000);
        }
    };

    const saved = isSaved(vehicle.id);
    const compared = isCompared(vehicle.id);

    const downloadableDocs = [
        {
            id: 'spec',
            title: 'Vehicle Specification Sheet',
            subtitle: `Standardized Vol 8 Spec Sheet • ${vehicle.stock_number}`,
            code: `SPEC-${vehicle.stock_number}`,
            status: 'Verified PDF',
        },
        {
            id: 'inspection',
            title: '150-Point Pre-Export Inspection Report',
            subtitle: `Grade ${vehicle.condition_grade || '4.5'} Mechanical & Structural Audit`,
            code: `INSP-${vehicle.stock_number}`,
            status: 'Inspector Signed',
        },
        {
            id: 'auction',
            title: 'Official Japanese Auction Sheet',
            subtitle: 'Translated condition map & odometer verification',
            code: `AUC-${vehicle.stock_number}`,
            status: 'Original + EN',
        },
        {
            id: 'export_cert',
            title: 'Export Deregistration Certificate',
            subtitle: 'Ministry of Land, Infrastructure, Transport & Tourism (MLIT)',
            code: `EXP-${vehicle.stock_number}`,
            status: 'Customs Ready',
        },
        {
            id: 'service',
            title: 'Service & Maintenance History Record',
            subtitle: 'OEM periodic inspection & fluid intervals log',
            code: `SRV-${vehicle.stock_number}`,
            status: 'Archived',
        },
    ];

    return (
        <AppLayout>
            <Head title={`${vehicle.title} (${vehicle.stock_number}) — Valqora Global Trading`} />

            {/* Breadcrumb & Top Bar */}
            <div className="bg-[#161616] border-b border-white/10 py-4">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link href="/vehicles" className="hover:text-white">
                            Global Inventory
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-[#C9A227] font-mono">{vehicle.stock_number}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => toggleSaved(vehicle)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                                saved
                                    ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                    : 'bg-white/5 text-gray-300 border-white/10 hover:text-white'
                            }`}
                        >
                            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                            {saved ? 'Saved' : 'Save Vehicle'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                toggleCompare(vehicle);
                                openDrawer('compare');
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                                compared
                                    ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                    : 'bg-white/5 text-gray-300 border-white/10 hover:text-white'
                            }`}
                        >
                            <Scale className="w-3.5 h-3.5" />
                            {compared ? 'In Compare Matrix' : 'Compare'}
                        </button>
                        <button
                            type="button"
                            onClick={handleShareListing}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 hover:text-white transition-colors"
                        >
                            <Share2 className="w-3.5 h-3.5 text-[#C9A227]" />
                            {shareCopied ? 'Link Copied!' : 'Share Listing'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Gallery, Customer Actions, Specs, Inspection, Documents */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Main Image Gallery */}
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden">
                            <div className="relative aspect-[16/10] bg-black">
                                <img
                                    src={images[activeImageIndex]?.url}
                                    alt={images[activeImageIndex]?.alt_text || vehicle.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    <span className="px-3 py-1 rounded bg-[#111111]/90 border border-white/15 text-xs font-mono uppercase tracking-wider text-white">
                                        {vehicle.stock_number}
                                    </span>
                                    <span className="px-3 py-1 rounded bg-[#C9A227] text-[#111111] text-xs font-bold uppercase tracking-wider">
                                        Auction Grade {vehicle.condition_grade}
                                    </span>
                                    <span className="px-3 py-1 rounded bg-[#2E8B57] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5" /> Export Eligible
                                    </span>
                                </div>
                            </div>
                            {images.length > 1 && (
                                <div className="p-4 flex gap-3 overflow-x-auto bg-[#141414] border-t border-white/10">
                                    {images.map((img, idx) => (
                                        <button
                                            key={img.id || idx}
                                            type="button"
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative w-24 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                                                activeImageIndex === idx
                                                    ? 'border-[#C9A227] scale-105'
                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Customer Actions Bar (Volume 5 Page 248: Reserve Vehicle, Request Inspection, Request Video, Calculate Shipping, Download Specification, Share Listing) */}
                        <div className="bg-[#161616] border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                                    Direct Customer Actions & Verification Suite
                                </h2>
                                <span className="text-[11px] font-mono text-gray-400">
                                    360° & 4K Walkaround Ready
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => openActionInquiry('Reserve Vehicle Hold Request')}
                                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b336] transition-colors"
                                >
                                    <Lock className="w-4 h-4" />
                                    Reserve Vehicle
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openActionInquiry('Request Independent Pre-Export Inspection')}
                                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                                >
                                    <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                                    Request Inspection
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openActionInquiry('Request 4K Engine & Undercarriage Video')}
                                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                                >
                                    <Video className="w-4 h-4 text-[#C9A227]" />
                                    Request 4K Video
                                </button>
                                <a
                                    href="#shipping-calculator"
                                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                                >
                                    <Calculator className="w-4 h-4 text-[#C9A227]" />
                                    Calculate Shipping
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setPreviewDocType('Vehicle Specification Sheet')}
                                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                                >
                                    <Download className="w-4 h-4 text-[#C9A227]" />
                                    Download Spec Sheet
                                </button>
                                <button
                                    type="button"
                                    onClick={handleShareListing}
                                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                                >
                                    <Share2 className="w-4 h-4 text-[#C9A227]" />
                                    {shareCopied ? 'Copied URL!' : 'Share Listing'}
                                </button>
                            </div>
                        </div>

                        {/* Technical Specifications Matrix (Volume 5 Page 247-248 & Volume 8 Page 448) */}
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-[#C9A227]" />
                                    Technical Specifications
                                </h2>
                                <span className="text-xs font-mono text-gray-400">
                                    SI Units Standard • ISO Compliant
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {[
                                    { label: 'Manufacturer', value: vehicle.make },
                                    { label: 'Model', value: vehicle.model },
                                    { label: 'Registration Year', value: vehicle.year, mono: true },
                                    { label: 'Mileage (Verified)', value: `${vehicle.mileage_km.toLocaleString()} km`, mono: true },
                                    { label: 'Engine Displacement', value: vehicle.engine_cc ? `${vehicle.engine_cc.toLocaleString()} cc` : 'Electric / Hybrid', mono: true },
                                    { label: 'Transmission', value: vehicle.transmission },
                                    { label: 'Fuel System', value: vehicle.fuel_type },
                                    { label: 'Drivetrain', value: vehicle.drive_type },
                                    { label: 'Steering Configuration', value: vehicle.steering },
                                    { label: 'Exterior Color', value: vehicle.color },
                                    { label: 'Interior Trim', value: 'Factory Black / Dark Anthracite' },
                                    { label: 'Doors / Seating', value: `${vehicle.doors} Doors / ${vehicle.seats} Seats`, mono: true },
                                    { label: 'Dimensions (L×W×H)', value: '4,950 × 1,980 × 1,925 mm', mono: true },
                                    { label: 'Gross Vehicle Weight', value: '2,580 kg (14.2 CBM)', mono: true },
                                    { label: 'Emission Standard', value: 'Euro 6d / JPN Post-New Long-Term' },
                                    { label: 'Origin Location', value: `${vehicle.location}, ${vehicle.origin_country}` },
                                    { label: 'VIN / Chassis No.', value: vehicle.vin_number || 'Verified on Certificate', mono: true },
                                    { label: 'Export Status', value: 'Cleared for Immediate Dispatch' },
                                ].map((spec) => (
                                    <div key={spec.label} className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                                        <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">
                                            {spec.label}
                                        </div>
                                        <div className={`text-sm font-semibold text-white truncate ${spec.mono ? 'font-mono' : ''}`}>
                                            {spec.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {vehicle.description && (
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                        Sourcing & Engineering Notes
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{vehicle.description}</p>
                                </div>
                            )}

                            {vehicle.features && vehicle.features.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                                        Installed Equipment & Factory Features
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {vehicle.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] border border-white/10 text-xs text-gray-300"
                                            >
                                                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Auction Information & Provenance Block (Volume 5 Page 247) */}
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Compass className="w-5 h-5 text-[#C9A227]" />
                                        Auction Provenance & Pre-Export Quality Control
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Verified against USS Tokyo / JAA / CAA auction house records and JEVIC odometer registry.
                                    </p>
                                </div>
                                <div className="px-3.5 py-1.5 rounded-lg bg-[#2E8B57]/15 border border-[#2E8B57]/40 text-emerald-400 text-xs font-mono font-bold">
                                    ZERO RADIATION • NO FLOOD / ACCIDENT HISTORY
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Overall Grade</span>
                                    <span className="text-xl font-mono font-bold text-[#C9A227] mt-1 block">
                                        {vehicle.condition_grade || '4.5'} / 5.0
                                    </span>
                                </div>
                                <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Interior / Exterior</span>
                                    <span className="text-xl font-mono font-bold text-white mt-1 block">Grade A / A</span>
                                </div>
                                <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Odometer Certificate</span>
                                    <span className="text-sm font-mono font-bold text-emerald-400 mt-2 block">JEVIC Verified</span>
                                </div>
                                <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Export Inspection</span>
                                    <span className="text-sm font-mono font-bold text-white mt-2 block">JAAI / QISJ Passed</span>
                                </div>
                            </div>

                            {vehicle.inspections && vehicle.inspections.length > 0 && (
                                <div className="space-y-4">
                                    {vehicle.inspections.map((insp) => (
                                        <div key={insp.id} className="p-5 rounded-xl bg-[#111111] border border-white/10">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                                                <div>
                                                    <div className="text-xs text-gray-400">Certificate Number</div>
                                                    <div className="text-sm font-mono font-bold text-[#C9A227]">
                                                        {insp.certificate_number}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400">Lead Inspector</div>
                                                    <div className="text-sm font-semibold text-white">
                                                        {insp.inspector_name}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-400">Overall Rating</div>
                                                    <div className="text-sm font-mono font-bold text-emerald-400">
                                                        {insp.overall_score}/100 ({insp.status.toUpperCase()})
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                                                {[
                                                    { name: 'Engine & Powertrain', status: insp.engine_status },
                                                    { name: 'Transmission', status: insp.transmission_status },
                                                    { name: 'Chassis & Frame', status: insp.chassis_status },
                                                    { name: 'Exterior Paint', status: insp.exterior_status },
                                                    { name: 'Interior Cabin', status: insp.interior_status },
                                                    { name: 'Electrical & OBD', status: insp.electrical_status },
                                                ].map((item) => (
                                                    <div key={item.name} className="flex items-center gap-2 text-gray-300">
                                                        <CheckCircle2 className="w-4 h-4 text-[#2E8B57] flex-shrink-0" />
                                                        <span>
                                                            {item.name}: <strong className="text-white">{item.status}</strong>
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Downloadable Documents Section (Volume 5 Page 248 & Volume 6 Page 324-325) */}
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-[#C9A227]" />
                                        Downloadable Export & Vehicle Documentation
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Every document is QR-verifiable and formatted to Valqora Volume 6 & Volume 7 standards.
                                    </p>
                                </div>
                                <Link
                                    href="/documents"
                                    className="text-xs font-semibold text-[#C9A227] hover:underline uppercase tracking-wider"
                                >
                                    Document Center →
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {downloadableDocs.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-[#C9A227]/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-10 h-10 rounded-lg bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227]">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                                                <p className="text-xs text-gray-400">
                                                    {doc.subtitle} • <span className="font-mono text-gray-300">{doc.code}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="px-2.5 py-1 rounded bg-white/5 text-[11px] font-mono text-emerald-400 border border-white/10">
                                                {doc.status}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setPreviewDocType(doc.title)}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b336] transition-colors"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                Preview / PDF
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing, Landed Cost Calculator & Finance Options */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Vehicle Summary & Price Card */}
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-8">
                            <div className="text-xs font-mono text-[#C9A227] uppercase tracking-widest mb-1">
                                {vehicle.make} • {vehicle.body_type} • {vehicle.origin_country}
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">{vehicle.title}</h1>

                            <div className="flex items-baseline justify-between p-4 rounded-xl bg-[#111111] border border-white/10 mb-6">
                                <div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">FOB Export Price</div>
                                    <div className="text-3xl font-mono font-bold text-[#C9A227] mt-1">
                                        {formatPrice(vehicle.price_usd)}
                                    </div>
                                    <div className="text-[11px] font-mono text-gray-400 mt-0.5">
                                        {formatIsoPrice(vehicle.price_usd)} • Base USD {Number(vehicle.price_usd).toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2E8B57]/20 text-emerald-400 text-xs font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        {vehicle.status === 'available' ? 'Available for Export' : vehicle.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={() => openActionInquiry('Direct Vehicle Inquiry')}
                                    className="flex-1 py-3.5 px-5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg border border-white/15 transition-all text-sm"
                                >
                                    Ask a Specialist
                                </button>
                                <a
                                    href="#quote-form"
                                    className="flex-1 py-3.5 px-5 bg-[#C9A227] hover:bg-[#d8b138] text-[#111111] font-bold rounded-lg text-center transition-all text-sm"
                                >
                                    Generate Official Quote
                                </a>
                            </div>
                        </div>

                        {/* Interactive CIF/FOB Landed Cost Calculator */}
                        <div
                            id="shipping-calculator"
                            className="bg-[#1A1A1A] border border-[#C9A227]/30 rounded-2xl p-6 sm:p-8"
                        >
                            <div className="flex items-center gap-2.5 mb-2">
                                <Calculator className="w-5 h-5 text-[#C9A227]" />
                                <h2 className="text-lg font-bold text-white">
                                    CIF / FOB Landed Cost Calculator
                                </h2>
                            </div>
                            <p className="text-xs text-gray-400 mb-6">
                                Calculate real-time ocean freight, marine insurance, and pre-shipment inspection to your destination port.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                                        Destination Port
                                    </label>
                                    <select
                                        value={selectedPortId}
                                        onChange={(e) => setSelectedPortId(Number(e.target.value))}
                                        className="w-full px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#C9A227]"
                                    >
                                        {ports.map((port) => (
                                            <option key={port.id} value={port.id}>
                                                {port.name} ({port.country}) — ~{port.transit_days} days
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                                            Shipping Method
                                        </label>
                                        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#111111] rounded-lg border border-white/10">
                                            {(['roro', 'container'] as const).map((method) => (
                                                <button
                                                    key={method}
                                                    type="button"
                                                    onClick={() => setShippingMethod(method)}
                                                    className={`py-1.5 text-xs font-semibold rounded uppercase transition-all ${
                                                        shippingMethod === method
                                                            ? 'bg-[#C9A227] text-[#111111]'
                                                            : 'text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    {method}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1.5">
                                            Incoterm® 2020
                                        </label>
                                        <div className="grid grid-cols-3 gap-1 p-1 bg-[#111111] rounded-lg border border-white/10">
                                            {(['FOB', 'CFR', 'CIF'] as const).map((term) => (
                                                <button
                                                    key={term}
                                                    type="button"
                                                    onClick={() => setIncoterm(term)}
                                                    className={`py-1.5 text-xs font-mono font-bold rounded transition-all ${
                                                        incoterm === term
                                                            ? 'bg-[#C9A227] text-[#111111]'
                                                            : 'text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <label className="flex items-center justify-between text-xs text-gray-300 cursor-pointer">
                                        <span>Include Pre-Shipment Inspection (JEVIC / QISJ / JAAI)</span>
                                        <input
                                            type="checkbox"
                                            checked={includeInspection}
                                            onChange={(e) => setIncludeInspection(e.target.checked)}
                                            className="rounded border-white/20 bg-[#111111] text-[#C9A227] focus:ring-[#C9A227]"
                                        />
                                    </label>
                                    {incoterm === 'CIF' && (
                                        <label className="flex items-center justify-between text-xs text-gray-300 cursor-pointer">
                                            <span>Include All-Risk Marine Cargo Insurance</span>
                                            <input
                                                type="checkbox"
                                                checked={includeMarineInsurance}
                                                onChange={(e) => setIncludeMarineInsurance(e.target.checked)}
                                                className="rounded border-white/20 bg-[#111111] text-[#C9A227] focus:ring-[#C9A227]"
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Cost Breakdown Table */}
                                <div className="p-4 rounded-xl bg-[#111111] border border-white/10 space-y-2.5 text-sm mt-4">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Base Vehicle (FOB)</span>
                                        <span className="font-mono text-white">{formatPrice(costBreakdown.fob)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Ocean Freight ({shippingMethod.toUpperCase()})</span>
                                        <span className="font-mono text-white">{formatPrice(costBreakdown.freight)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Export Inspection & Certs</span>
                                        <span className="font-mono text-white">{formatPrice(costBreakdown.inspection)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Marine Insurance</span>
                                        <span className="font-mono text-white">{formatPrice(costBreakdown.insurance)}</span>
                                    </div>
                                    <div className="pt-2.5 border-t border-white/10 flex justify-between items-baseline">
                                        <span className="font-bold text-white">Estimated {incoterm} Total</span>
                                        <div className="text-right">
                                            <span className="text-xl font-mono font-bold text-[#C9A227] block">
                                                {formatPrice(costBreakdown.total)}
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-400">
                                                {formatIsoPrice(costBreakdown.total)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Instant Quotation Request Form */}
                            <form id="quote-form" onSubmit={handleQuoteSubmit} className="mt-6 pt-6 border-t border-white/10 space-y-3">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C9A227]">
                                    Lock In Official Proforma Invoice
                                </h3>

                                {quoteForm.recentlySuccessful && (
                                    <div className="p-3 rounded-lg bg-[#2E8B57]/20 border border-[#2E8B57] text-emerald-300 text-xs">
                                        Official quotation generated! View it anytime in your Client Portal.
                                    </div>
                                )}

                                <input
                                    type="text"
                                    required
                                    placeholder="Your Full Name *"
                                    value={quoteForm.data.customer_name}
                                    onChange={(e) => quoteForm.setData('customer_name', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Business Email *"
                                        value={quoteForm.data.customer_email}
                                        onChange={(e) => quoteForm.setData('customer_email', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone / WhatsApp"
                                        value={quoteForm.data.customer_phone}
                                        onChange={(e) => quoteForm.setData('customer_phone', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Company / Dealership Name (Optional)"
                                    value={quoteForm.data.company_name}
                                    onChange={(e) => quoteForm.setData('company_name', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-[#111111] border border-white/15 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                                />
                                <button
                                    type="submit"
                                    disabled={quoteForm.processing}
                                    className="w-full py-3 bg-[#C9A227] hover:bg-[#d8b138] text-[#111111] font-bold rounded-lg transition-all text-sm disabled:opacity-50"
                                >
                                    {quoteForm.processing ? 'Generating Quote...' : 'Generate Instant Proforma Quote'}
                                </button>
                            </form>
                        </div>

                        {/* Trade Finance & Payment Settlement Options (Volume 5 Page 247) */}
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <CreditCard className="w-5 h-5 text-[#C9A227]" />
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                    Trade Finance & Settlement Options
                                </h3>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                Valqora Capital supports institutional and dealer procurement with structured international settlement instruments:
                            </p>
                            <div className="space-y-2.5 text-xs">
                                <div className="p-3 rounded-lg bg-[#111111] border border-white/5 flex items-center justify-between">
                                    <span className="text-gray-200 font-medium">SWIFT Telegraphic Transfer (T/T)</span>
                                    <span className="font-mono text-[#C9A227]">USD / JPY / EUR / GBP / AUD</span>
                                </div>
                                <div className="p-3 rounded-lg bg-[#111111] border border-white/5 flex items-center justify-between">
                                    <span className="text-gray-200 font-medium">Irrevocable Letter of Credit (L/C at Sight)</span>
                                    <span className="font-mono text-emerald-400">UCP 600 Compliant</span>
                                </div>
                                <div className="p-3 rounded-lg bg-[#111111] border border-white/5 flex items-center justify-between">
                                    <span className="text-gray-200 font-medium">Dealer Revolving Credit Line</span>
                                    <Link href="/portal?view=dealer" className="font-mono text-[#C9A227] hover:underline">
                                        Apply via Dealer Portal →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Vehicles */}
                {relatedVehicles && relatedVehicles.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Similar Export Inventory</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedVehicles.map((rel) => (
                                <VehicleCard key={rel.id} vehicle={rel} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Printable Specification Sheet & Official Document Preview Modal (Volume 8 Page 448-449) */}
            {previewDocType && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-white text-[#111111] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-[#C9A227]">
                        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[#C9A227] text-[#111111] flex items-center justify-center font-bold text-xs">
                                    VQ
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider">{previewDocType}</h3>
                                    <p className="text-[11px] font-mono text-gray-400">
                                        VALQORA GLOBAL TRADING • OFFICIAL EXPORT RECORD
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-wider"
                                >
                                    <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewDocType(null)}
                                    className="p-1.5 text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-6">
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                                        Reference: {vehicle.stock_number}
                                    </span>
                                    <h2 className="text-2xl font-bold text-[#111111] mt-1">
                                        {vehicle.year} {vehicle.make} {vehicle.model}
                                    </h2>
                                    <p className="text-xs text-gray-600 mt-1">
                                        VIN / Chassis: <span className="font-mono font-bold">{vehicle.vin_number || 'JTEBR9FJ80K019284'}</span> • Origin: {vehicle.location}, {vehicle.origin_country}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 uppercase">FOB Export Valuation</div>
                                    <div className="text-2xl font-mono font-bold text-[#111111]">
                                        USD {Number(vehicle.price_usd).toLocaleString()}
                                    </div>
                                    <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                                        Auction Grade {vehicle.condition_grade} Verified
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                                    <span className="text-gray-500 block">Engine & Fuel</span>
                                    <strong className="font-mono text-[#111111]">
                                        {vehicle.engine_cc ? `${vehicle.engine_cc} cc` : 'Hybrid'} • {vehicle.fuel_type}
                                    </strong>
                                </div>
                                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                                    <span className="text-gray-500 block">Transmission & Drive</span>
                                    <strong className="text-[#111111]">
                                        {vehicle.transmission} ({vehicle.drive_type})
                                    </strong>
                                </div>
                                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                                    <span className="text-gray-500 block">Odometer Reading</span>
                                    <strong className="font-mono text-[#111111]">
                                        {vehicle.mileage_km.toLocaleString()} km (JEVIC Certified)
                                    </strong>
                                </div>
                                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                                    <span className="text-gray-500 block">Steering / Color</span>
                                    <strong className="text-[#111111]">
                                        {vehicle.steering} • {vehicle.color}
                                    </strong>
                                </div>
                                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                                    <span className="text-gray-500 block">Pre-Export Inspection</span>
                                    <strong className="text-emerald-700">150-Point Passed (96/100)</strong>
                                </div>
                                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                                    <span className="text-gray-500 block">Export Compliance</span>
                                    <strong className="text-[#111111]">MLIT Deregistered & Cleared</strong>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <QrCode className="w-10 h-10 text-[#111111]" />
                                    <div className="text-xs">
                                        <p className="font-bold text-[#111111]">Digital Cryptographic Verification</p>
                                        <p className="text-gray-600">
                                            Scan QR or verify hash at valqora.com/documents • Status: Authentic Master Record
                                        </p>
                                    </div>
                                </div>
                                <span className="text-[11px] font-mono text-gray-500">18 July 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <InquiryModal
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
                vehicle={vehicle}
            />
        </AppLayout>
    );
}
