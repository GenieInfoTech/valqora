import React, { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { VehicleCard } from '@/Components/VehicleCard';
import { InquiryModal } from '@/Components/InquiryModal';
import { useCurrency } from '@/context/CurrencyContext';
import { PageProps, Vehicle, Port } from '@/types';
import {
    ShieldCheck,
    CheckCircle2,
    Gauge,
    Compass,
    Fuel,
    Calendar,
    MapPin,
    ArrowRight,
    Anchor,
    Download,
    Share2,
    FileText,
    Calculator,
    AlertCircle,
    ChevronRight,
    Eye,
} from 'lucide-react';

interface VehiclesShowProps {
    vehicle: Vehicle;
    relatedVehicles: Vehicle[];
    ports: Port[];
}

export default function VehiclesShow({ vehicle, relatedVehicles = [], ports = [] }: VehiclesShowProps) {
    const { auth } = usePage<PageProps>().props;
    const { formatPrice, currentCurrency } = useCurrency();

    // Image gallery state
    const allImages = vehicle.images && vehicle.images.length > 0
        ? vehicle.images
        : [
              {
                  id: 1,
                  vehicle_id: vehicle.id,
                  url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
                  caption: 'Main Perspective',
                  category: 'exterior',
                  is_primary: true,
                  sort_order: 0,
              },
          ];

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [imageFilter, setImageFilter] = useState<'all' | 'exterior' | 'interior' | 'detail'>('all');
    const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
    const [quoteModalOpen, setQuoteModalOpen] = useState(false);

    // Filter images
    const displayedImages = allImages.filter((img) =>
        imageFilter === 'all' ? true : img.category === imageFilter
    );

    // Interactive Shipping & CIF Calculator State
    const [selectedPortCode, setSelectedPortCode] = useState<string>(ports[0]?.code || 'AEJEA');
    const [shippingMethod, setShippingMethod] = useState<'roro' | 'container'>('roro');

    const selectedPort = ports.find((p) => p.code === selectedPortCode) || ports[0];

    const vehiclePrice = Number(vehicle.fob_price_usd);
    const freightCost = shippingMethod === 'container'
        ? Number(selectedPort?.standard_container_freight_usd || 3800)
        : Number(selectedPort?.standard_roro_freight_usd || 1950);
    const insuranceCost = Math.round((vehiclePrice * 0.005) + 150);
    const docsFee = 450;
    const totalCif = vehiclePrice + freightCost + insuranceCost + docsFee;

    // Quote Request Form
    const quoteForm = useForm({
        vehicle_id: vehicle.id,
        port_code: selectedPortCode,
        incoterm: 'CIF',
        method: shippingMethod,
        customer_name: auth.user?.name || '',
        customer_email: auth.user?.email || '',
        customer_phone: auth.user?.phone || '',
        customer_company: auth.user?.company_name || '',
        notes: '',
    });

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        quoteForm.setData('port_code', selectedPortCode);
        quoteForm.setData('method', shippingMethod);
        quoteForm.post('/quotations', {
            onSuccess: () => {
                setQuoteModalOpen(false);
            },
        });
    };

    return (
        <AppLayout
            title={`${vehicle.title} (${vehicle.stock_id})`}
            description={vehicle.overview || `Export listing for ${vehicle.title}. Verified Grade ${vehicle.condition_grade}. Immediate ocean dispatch.`}
        >
            {/* Breadcrumb Bar */}
            <div className="bg-[#0C0C0E] border-b border-[#222226] py-3 text-xs text-gray-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <ChevronRight className="w-3 h-3 text-gray-600" />
                    <Link href="/vehicles" className="hover:text-white transition">Vehicles</Link>
                    <ChevronRight className="w-3 h-3 text-gray-600" />
                    <span className="text-gray-500">{vehicle.make}</span>
                    <ChevronRight className="w-3 h-3 text-gray-600" />
                    <span className="text-white truncate max-w-xs">{vehicle.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#222226]">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#1B1B1E] border border-[#2E2E34] text-[#C9A227] rounded">
                                {vehicle.stock_id}
                            </span>
                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-black border border-[#C9A227]/40 text-[#C9A227] rounded flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                {vehicle.condition_grade}
                            </span>
                            {vehicle.is_verified && (
                                <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    160-Point Verified
                                </span>
                            )}
                            <span className="px-2.5 py-0.5 text-xs text-gray-400 bg-[#161618] border border-[#26262B] rounded">
                                Origin: {vehicle.location_city}, {vehicle.location_country}
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {vehicle.title}
                        </h1>

                        <p className="text-xs text-gray-400 font-mono mt-1">
                            VIN / Chassis: {vehicle.vin_chassis || 'Verified on Pro-Forma'} • Year: {vehicle.year} • Mileage: {vehicle.mileage_km.toLocaleString()} km
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setInquiryModalOpen(true)}
                            className="px-5 py-2.5 bg-[#202026] hover:bg-[#282832] text-white border border-[#33333E] rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                        >
                            Direct Inquiry
                        </button>
                        <button
                            onClick={() => setQuoteModalOpen(true)}
                            className="px-6 py-2.5 bg-[#C9A227] hover:bg-[#dfba38] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-lg"
                        >
                            Request Pro-Forma Quote
                        </button>
                    </div>
                </div>

                {/* Main 2-Column Layout */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left 7 Columns: Gallery & Inspection & Specs */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Gallery */}
                        <div className="bg-[#161618] border border-[#26262B] rounded-2xl overflow-hidden p-4">
                            {/* Main Active Image */}
                            <div className="relative aspect-[16/10] bg-black/60 rounded-xl overflow-hidden">
                                <img
                                    src={displayedImages[activeImageIndex]?.url || allImages[0]?.url}
                                    alt={vehicle.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs text-gray-300 font-mono">
                                    {displayedImages[activeImageIndex]?.caption || `Perspective ${activeImageIndex + 1} of ${displayedImages.length}`}
                                </div>
                            </div>

                            {/* Category Filter Pills */}
                            <div className="mt-4 flex items-center justify-between border-b border-[#26262B] pb-2">
                                <div className="flex gap-2">
                                    {(['all', 'exterior', 'interior', 'detail'] as const).map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setImageFilter(cat);
                                                setActiveImageIndex(0);
                                            }}
                                            className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded transition ${
                                                imageFilter === cat
                                                    ? 'bg-[#C9A227] text-black font-semibold'
                                                    : 'text-gray-400 hover:text-white hover:bg-[#202024]'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                <span className="text-[11px] text-gray-500 font-mono">
                                    {displayedImages.length} Certified Photos
                                </span>
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                                {displayedImages.map((img, idx) => (
                                    <button
                                        key={img.id || idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`w-20 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${
                                            activeImageIndex === idx ? 'border-[#C9A227]' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img.url} alt="thumb" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Spec Bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-4 bg-[#161618] border border-[#242428] rounded-xl text-center">
                                <Gauge className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
                                <p className="text-[10px] text-gray-400 uppercase">Mileage</p>
                                <p className="text-sm font-bold text-white font-mono mt-0.5">
                                    {vehicle.mileage_km.toLocaleString()} km
                                </p>
                            </div>
                            <div className="p-4 bg-[#161618] border border-[#242428] rounded-xl text-center">
                                <Compass className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
                                <p className="text-[10px] text-gray-400 uppercase">Steering</p>
                                <p className="text-sm font-bold text-white font-mono mt-0.5">
                                    {vehicle.steering} Drive
                                </p>
                            </div>
                            <div className="p-4 bg-[#161618] border border-[#242428] rounded-xl text-center">
                                <Fuel className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
                                <p className="text-[10px] text-gray-400 uppercase">Powertrain</p>
                                <p className="text-sm font-bold text-white font-mono mt-0.5">
                                    {vehicle.fuel_type}
                                </p>
                            </div>
                            <div className="p-4 bg-[#161618] border border-[#242428] rounded-xl text-center">
                                <Calendar className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
                                <p className="text-[10px] text-gray-400 uppercase">Model Year</p>
                                <p className="text-sm font-bold text-white font-mono mt-0.5">
                                    {vehicle.year}
                                </p>
                            </div>
                        </div>

                        {/* Overview & Description */}
                        {vehicle.overview && (
                            <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C9A227] mb-3">
                                    Vehicle Overview & Provenance
                                </h3>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {vehicle.overview}
                                </p>
                            </div>
                        )}

                        {/* 160-Point Inspection Details */}
                        {vehicle.inspection && (
                            <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl">
                                <div className="flex items-center justify-between pb-4 border-b border-[#26262B]">
                                    <div>
                                        <span className="text-[10px] font-mono uppercase text-[#C9A227]">
                                            VERIFIED AUDIT REPORT
                                        </span>
                                        <h3 className="text-base font-bold text-white">
                                            160-Point Mechanical & Structural Grading
                                        </h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-black text-[#C9A227] font-mono">
                                            {vehicle.inspection.overall_grade}
                                        </span>
                                        <p className="text-[10px] text-gray-400">Audited {new Date(vehicle.inspection.inspection_date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Score matrix */}
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                    <div className="p-3 bg-[#111112] border border-[#222226] rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300">Chassis & Frame Alignment</span>
                                            <span className="text-[#C9A227] font-mono font-bold">{vehicle.inspection.chassis_score} / 5.0</span>
                                        </div>
                                        <div className="h-1.5 bg-[#252528] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#C9A227]" style={{ width: `${(vehicle.inspection.chassis_score / 5.0) * 100}%` }} />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-[#111112] border border-[#222226] rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300">Engine & Powertrain</span>
                                            <span className="text-[#C9A227] font-mono font-bold">{vehicle.inspection.engine_score} / 5.0</span>
                                        </div>
                                        <div className="h-1.5 bg-[#252528] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#C9A227]" style={{ width: `${(vehicle.inspection.engine_score / 5.0) * 100}%` }} />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-[#111112] border border-[#222226] rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300">Interior Craftsmanship</span>
                                            <span className="text-[#C9A227] font-mono font-bold">{vehicle.inspection.interior_score} / 5.0</span>
                                        </div>
                                        <div className="h-1.5 bg-[#252528] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#C9A227]" style={{ width: `${(vehicle.inspection.interior_score / 5.0) * 100}%` }} />
                                        </div>
                                    </div>

                                    <div className="p-3 bg-[#111112] border border-[#222226] rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300">Electronics & Diagnostic ECU</span>
                                            <span className="text-[#C9A227] font-mono font-bold">{vehicle.inspection.electronics_score} / 5.0</span>
                                        </div>
                                        <div className="h-1.5 bg-[#252528] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#C9A227]" style={{ width: `${(vehicle.inspection.electronics_score / 5.0) * 100}%` }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Certification badges */}
                                <div className="mt-4 pt-4 border-t border-[#26262B] flex flex-wrap gap-4 text-xs text-gray-300">
                                    <span className="flex items-center gap-1.5 text-emerald-400">
                                        <CheckCircle2 className="w-4 h-4" /> Genuine Odometer Certified
                                    </span>
                                    <span className="flex items-center gap-1.5 text-emerald-400">
                                        <CheckCircle2 className="w-4 h-4" /> 100% Accident Free History
                                    </span>
                                    <span className="flex items-center gap-1.5 text-emerald-400">
                                        <CheckCircle2 className="w-4 h-4" /> Flood Damage Negative
                                    </span>
                                </div>

                                {vehicle.inspection.summary_notes && (
                                    <div className="mt-4 p-3 bg-[#111112] border border-[#222226] rounded text-[11px] text-gray-400">
                                        <strong className="text-gray-300">Inspector Statement:</strong> {vehicle.inspection.summary_notes}
                                        <p className="mt-1 text-gray-500 font-mono">Sign-off: {vehicle.inspection.inspector_name}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Technical Specifications */}
                        {vehicle.specifications && Object.keys(vehicle.specifications).length > 0 && (
                            <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C9A227] mb-4">
                                    Technical Specifications
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                    {Object.entries(vehicle.specifications).map(([key, val]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-[#242428]">
                                            <span className="text-gray-400">{key}</span>
                                            <span className="font-semibold text-white font-mono">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Features & Equipment List */}
                        {vehicle.features && vehicle.features.length > 0 && (
                            <div className="p-6 bg-[#161618] border border-[#26262B] rounded-2xl">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-[#C9A227] mb-4">
                                    Equipment & Factory Options
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-gray-300">
                                    {vehicle.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2 rounded bg-[#121214] border border-[#242428]">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227] flex-shrink-0" />
                                            <span className="truncate">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right 5 Columns: Pricing, Real-time CIF Calculator, Port Selection & Quote Action */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Pricing & Incoterm Box */}
                        <div className="p-6 bg-[#18181C] border border-[#2C2C32] rounded-2xl shadow-xl sticky top-28">
                            <div className="flex items-center justify-between pb-4 border-b border-[#2C2C32]">
                                <div>
                                    <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                                        FOB EXPORT PRICE
                                    </span>
                                    <h2 className="text-3xl font-black text-white font-mono mt-0.5">
                                        {formatPrice(vehicle.fob_price_usd)}
                                    </h2>
                                    {currentCurrency !== 'USD' && (
                                        <p className="text-xs text-gray-400 font-mono">
                                            (${vehiclePrice.toLocaleString()} USD)
                                        </p>
                                    )}
                                </div>
                                <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase rounded">
                                    {vehicle.status.replace('_', ' ')}
                                </span>
                            </div>

                            {/* Live Shipping & Landed Cost Calculator */}
                            <div className="mt-5 space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-[#C9A227] uppercase tracking-wider">
                                    <Calculator className="w-4 h-4" />
                                    <span>Instant CIF / Freight Calculator</span>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Destination Port</label>
                                    <select
                                        value={selectedPortCode}
                                        onChange={(e) => setSelectedPortCode(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#111112] border border-[#2E2E34] text-xs text-white rounded-lg outline-none focus:border-[#C9A227]"
                                    >
                                        {ports.map((p) => (
                                            <option key={p.code} value={p.code}>
                                                {p.name} ({p.country})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Ocean Transit Method</label>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <button
                                            type="button"
                                            onClick={() => setShippingMethod('roro')}
                                            className={`py-2 px-3 rounded-lg border text-center transition ${
                                                shippingMethod === 'roro'
                                                    ? 'bg-[#C9A227]/20 border-[#C9A227] text-white font-bold'
                                                    : 'bg-[#111112] border-[#2E2E34] text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            Ro-Ro Carrier
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShippingMethod('container')}
                                            className={`py-2 px-3 rounded-lg border text-center transition ${
                                                shippingMethod === 'container'
                                                    ? 'bg-[#C9A227]/20 border-[#C9A227] text-white font-bold'
                                                    : 'bg-[#111112] border-[#2E2E34] text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            Sealed Container
                                        </button>
                                    </div>
                                </div>

                                {/* Itemized Landed Cost Breakdown */}
                                <div className="p-4 bg-[#111112] border border-[#25252A] rounded-xl text-xs space-y-2">
                                    <div className="flex justify-between text-gray-400">
                                        <span>FOB Vehicle Price:</span>
                                        <span className="font-mono text-white">{formatPrice(vehiclePrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Ocean Freight ({shippingMethod === 'roro' ? 'Ro-Ro' : 'Container'}):</span>
                                        <span className="font-mono text-white">{formatPrice(freightCost)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Marine Cargo Insurance:</span>
                                        <span className="font-mono text-white">{formatPrice(insuranceCost)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Customs & Export Certs:</span>
                                        <span className="font-mono text-white">{formatPrice(docsFee)}</span>
                                    </div>

                                    <div className="pt-2 border-t border-[#25252A] flex justify-between items-baseline font-bold text-white text-sm">
                                        <span className="text-[#C9A227]">Estimated Total CIF:</span>
                                        <span className="text-lg font-mono text-[#C9A227]">{formatPrice(totalCif)}</span>
                                    </div>

                                    {selectedPort && selectedPort.transit_days_from_japan > 0 && (
                                        <p className="text-[10px] text-gray-500 pt-1">
                                            Est. Transit Time: ~{selectedPort.transit_days_from_japan} Days from Yokohama Terminal
                                        </p>
                                    )}
                                </div>

                                {/* Call to action buttons */}
                                <div className="space-y-2.5 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setQuoteModalOpen(true)}
                                        className="w-full py-3.5 bg-[#C9A227] hover:bg-[#dfba38] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <FileText className="w-4 h-4" />
                                        <span>Lock In CIF Quotation</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setInquiryModalOpen(true)}
                                        className="w-full py-3 bg-[#222228] hover:bg-[#2c2c34] text-white border border-[#33333E] rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                                    >
                                        Ask Specialist About This Vehicle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Vehicles Carousel */}
                {relatedVehicles.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-[#222226]">
                        <h2 className="text-xl font-bold text-white mb-6">
                            Comparable Export Vehicles
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedVehicles.map((rel) => (
                                <VehicleCard key={rel.id} vehicle={rel} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Direct Inquiry Modal */}
            <InquiryModal
                isOpen={inquiryModalOpen}
                onClose={() => setInquiryModalOpen(false)}
                vehicle={vehicle}
            />

            {/* Formal Pro-Forma Quote Modal */}
            {quoteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-lg bg-[#161618] border border-[#2E2E34] rounded-2xl shadow-2xl p-6">
                        <div className="flex items-center justify-between pb-3 border-b border-[#25252A]">
                            <div>
                                <span className="text-[10px] font-mono text-[#C9A227] uppercase">FORMAL COMMERCIAL PROPOSAL</span>
                                <h3 className="text-base font-bold text-white">Generate Pro-Forma Quotation</h3>
                            </div>
                            <button
                                onClick={() => setQuoteModalOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleQuoteSubmit} className="mt-4 space-y-3 text-xs">
                            <div className="p-3 bg-[#111112] rounded-lg border border-[#25252A]">
                                <p className="font-semibold text-white">{vehicle.title}</p>
                                <p className="text-gray-400 font-mono">Stock ID: {vehicle.stock_id}</p>
                                <p className="text-[#C9A227] font-mono font-bold mt-1">
                                    Total CIF ({selectedPort?.name}): {formatPrice(totalCif)}
                                </p>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Customer / Consignee Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={quoteForm.data.customer_name}
                                    onChange={(e) => quoteForm.setData('customer_name', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#111112] border border-[#2C2C30] rounded-lg text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Email for Official Quote *</label>
                                <input
                                    type="email"
                                    required
                                    value={quoteForm.data.customer_email}
                                    onChange={(e) => quoteForm.setData('customer_email', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#111112] border border-[#2C2C30] rounded-lg text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Company / Entity (Optional)</label>
                                <input
                                    type="text"
                                    value={quoteForm.data.customer_company}
                                    onChange={(e) => quoteForm.setData('customer_company', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#111112] border border-[#2C2C30] rounded-lg text-white"
                                />
                            </div>

                            <div className="pt-3">
                                <button
                                    type="submit"
                                    disabled={quoteForm.processing}
                                    className="w-full py-3 bg-[#C9A227] text-black font-bold uppercase rounded-lg hover:bg-[#dfba38] transition"
                                >
                                    {quoteForm.processing ? 'Issuing Proposal...' : 'Issue Pro-Forma Invoice'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
