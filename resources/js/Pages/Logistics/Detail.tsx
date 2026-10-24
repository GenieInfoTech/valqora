import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Shipment } from '@/types';
import {
    Ship,
    MapPin,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    ArrowLeft,
    Navigation,
    ShieldCheck,
    Lock,
    Container,
    QrCode,
    Globe,
    PhoneCall,
} from 'lucide-react';

interface LogisticsDetailProps {
    shipment: Shipment;
}

const TEN_STAGE_EXPORT_TIMELINE = [
    { step: 1, label: 'Vehicle Purchased', dept: 'Auction & Procurement Desk' },
    { step: 2, label: '150-Point Quality Inspection', dept: 'Yokohama / Kobe PDI Facility' },
    { step: 3, label: 'Export Documentation Approved', dept: 'METI & JEVIC Compliance' },
    { step: 4, label: 'Port Terminal Delivery', dept: 'Inland Bonded Carrier' },
    { step: 5, label: 'Container Loading & Lashing', dept: 'Certified Stevedore Crew' },
    { step: 6, label: 'Vessel Departure', dept: 'Ocean Carrier Line' },
    { step: 7, label: 'Ocean Transit & Telemetry', dept: 'AIS Satellite Tracking' },
    { step: 8, label: 'Destination Port Arrival', dept: 'Port Authority Terminal' },
    { step: 9, label: 'WCO Customs Clearance', dept: 'Licensed Customs Broker' },
    { step: 10, label: 'Final Customer Delivery', dept: 'Client Handover & Welcome Pack' },
];

export default function Detail({ shipment }: LogisticsDetailProps) {
    const statusMap: Record<string, number> = {
        BOOKED: 3,
        AT_ORIGIN_PORT: 4,
        LOADED_ON_VESSEL: 5,
        IN_TRANSIT: 7,
        ARRIVED_AT_DESTINATION: 8,
        CUSTOMS_CLEARANCE: 9,
        DELIVERED: 10,
    };

    const currentStageIndex = statusMap[shipment.current_status] || 6;

    return (
        <AppLayout
            title={`Shipment ${shipment.tracking_number} | Valqora Global Logistics`}
            description={`Real-time satellite telemetry, ISO 17712 bolt seal verification, and WCO customs dossier for shipment ${shipment.tracking_number}.`}
        >
            <Head title={`Shipment ${shipment.tracking_number} — Valqora Global Trading`} />

            {/* Header */}
            <div className="bg-vq-black text-vq-white py-12 border-b border-neutral-800">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <Link
                        href="/logistics/track"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-vq-gold text-sm mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Global Tracking Portal
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <span className="font-mono text-xs uppercase tracking-widest text-vq-gold bg-vq-gold/10 px-2.5 py-1 rounded border border-vq-gold/20">
                                    EXPORT SHIPMENT DOSSIER
                                </span>
                                <span className="font-mono text-sm text-neutral-400">
                                    Vessel: <strong className="text-vq-white">{shipment.vessel_name || 'MV Apollon Highway'}</strong> ({shipment.shipping_line || 'NYK Line'})
                                </span>
                                <span className="font-mono text-xs text-vq-green bg-vq-green/10 px-2.5 py-1 rounded border border-vq-green/30">
                                    ISO 17712 Seal Verified
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight">
                                {shipment.tracking_number}
                            </h1>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-800 px-6 py-4 rounded-xl flex items-center gap-4">
                            <Ship className="w-8 h-8 text-vq-gold" />
                            <div>
                                <div className="text-xs text-neutral-400 uppercase tracking-wider">Current Status</div>
                                <div className="font-bold text-lg text-vq-white capitalize">
                                    {shipment.current_status.replace(/_/g, ' ')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Route, 10-Stage Timeline, Container Seal & Milestones */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Route Card */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-sm">
                            <h3 className="text-lg font-bold text-vq-black mb-6 flex items-center gap-2">
                                <Navigation className="w-5 h-5 text-vq-gold" /> Voyage Telemetry & Route Schedule
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                <div>
                                    <div className="text-xs font-mono text-neutral-400 uppercase mb-1">Port of Loading</div>
                                    <div className="text-xl font-bold text-vq-black">{shipment.origin_port}</div>
                                    <div className="text-sm text-neutral-500 mt-1 flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" /> ETD:{' '}
                                        {shipment.departure_date
                                            ? new Date(shipment.departure_date).toLocaleDateString('en-GB', {
                                                  day: '2-digit',
                                                  month: 'short',
                                                  year: 'numeric',
                                              })
                                            : 'Scheduled'}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center py-4">
                                    <div className="w-full flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-vq-green"></div>
                                        <div className="flex-1 h-0.5 bg-gradient-to-r from-vq-green via-vq-gold to-neutral-300 mx-2 relative">
                                            <Ship className="w-5 h-5 text-vq-gold absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-0.5" />
                                        </div>
                                        <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
                                    </div>
                                    <div className="text-xs font-mono text-neutral-500 mt-2 text-center">
                                        Current Position: {shipment.current_location_name || 'Pacific Ocean Lane'}
                                        {shipment.current_lat && shipment.current_lng && (
                                            <span className="block text-[10px] text-neutral-400">
                                                ({shipment.current_lat.toFixed(2)}°, {shipment.current_lng.toFixed(2)}°)
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="md:text-right">
                                    <div className="text-xs font-mono text-neutral-400 uppercase mb-1">Port of Discharge</div>
                                    <div className="text-xl font-bold text-vq-black">{shipment.destination_port}</div>
                                    <div className="text-sm text-neutral-500 mt-1 flex items-center md:justify-end gap-1">
                                        <Calendar className="w-3.5 h-3.5" /> ETA:{' '}
                                        {shipment.estimated_arrival_date
                                            ? new Date(shipment.estimated_arrival_date).toLocaleDateString('en-GB', {
                                                  day: '2-digit',
                                                  month: 'short',
                                                  year: 'numeric',
                                              })
                                            : 'Scheduled'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Standardized 10-Stage Export Timeline (Vol 5 p. 260 & Vol 7 p. 404) */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-widest text-vq-gold">
                                        VOLUME 5 & VOLUME 7 — STANDARDIZED PIPELINE
                                    </span>
                                    <h3 className="text-lg font-bold text-vq-black">
                                        10-Stage End-to-End Export Lifecycle
                                    </h3>
                                </div>
                                <span className="text-xs font-mono bg-neutral-100 px-3 py-1 rounded text-vq-black font-semibold">
                                    Stage {currentStageIndex} of 10 Active
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                                {TEN_STAGE_EXPORT_TIMELINE.map((item) => {
                                    const isDone = item.step <= currentStageIndex;
                                    const isCurrent = item.step === currentStageIndex;
                                    return (
                                        <div
                                            key={item.step}
                                            className={`p-3.5 rounded-lg border text-xs transition-all ${
                                                isCurrent
                                                    ? 'bg-vq-black text-white border-vq-gold shadow-sm'
                                                    : isDone
                                                    ? 'bg-vq-green/5 border-vq-green/30 text-vq-black'
                                                    : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-mono text-[10px] uppercase font-bold">
                                                    STEP {String(item.step).padStart(2, '0')}
                                                </span>
                                                {isDone ? (
                                                    <CheckCircle2
                                                        className={`w-3.5 h-3.5 ${
                                                            isCurrent ? 'text-vq-gold' : 'text-vq-green'
                                                        }`}
                                                    />
                                                ) : (
                                                    <Clock className="w-3.5 h-3.5 text-neutral-300" />
                                                )}
                                            </div>
                                            <div className="font-semibold leading-snug mb-1">{item.label}</div>
                                            <div
                                                className={`text-[10px] font-mono ${
                                                    isCurrent ? 'text-neutral-300' : 'text-neutral-500'
                                                }`}
                                            >
                                                {item.dept}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Container Identification & High-Security Bolt Seal Verification (Vol 7 pp. 368-371, 401-402) */}
                        <div className="bg-vq-black text-white rounded-xl border border-neutral-800 p-8 shadow-sm">
                            <div className="flex items-center justify-between gap-4 mb-6">
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-widest text-vq-gold">
                                        VOLUME 7 — CONTAINER & SEAL INTEGRITY
                                    </span>
                                    <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                                        <Container className="w-5 h-5 text-vq-gold" /> Container Identification & Bolt Seal Ledger
                                    </h3>
                                </div>
                                <QrCode className="w-8 h-8 text-vq-gold shrink-0" />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                <div className="p-3.5 bg-neutral-900 rounded-lg border border-neutral-800">
                                    <div className="text-[10px] font-mono uppercase text-neutral-400">Container ID</div>
                                    <div className="text-sm font-mono font-bold text-white mt-0.5">VQCU-409821-7</div>
                                    <div className="text-[10px] text-vq-gold mt-0.5">40ft High Cube</div>
                                </div>
                                <div className="p-3.5 bg-neutral-900 rounded-lg border border-neutral-800">
                                    <div className="text-[10px] font-mono uppercase text-neutral-400">Bolt Seal Serial</div>
                                    <div className="text-sm font-mono font-bold text-vq-green mt-0.5">SEAL-VQ-77419</div>
                                    <div className="text-[10px] text-neutral-400 mt-0.5">ISO 17712 High-Security</div>
                                </div>
                                <div className="p-3.5 bg-neutral-900 rounded-lg border border-neutral-800">
                                    <div className="text-[10px] font-mono uppercase text-neutral-400">Lashing Standard</div>
                                    <div className="text-sm font-bold text-white mt-0.5">Ratchet & Chocks</div>
                                    <div className="text-[10px] text-neutral-400 mt-0.5">Zero-Movement Verified</div>
                                </div>
                                <div className="p-3.5 bg-neutral-900 rounded-lg border border-neutral-800">
                                    <div className="text-[10px] font-mono uppercase text-neutral-400">Marine Insurance</div>
                                    <div className="text-sm font-bold text-white mt-0.5">ICC Clause (A)</div>
                                    <div className="text-[10px] text-vq-green mt-0.5">110% CIF All-Risk</div>
                                </div>
                            </div>

                            <div className="p-4 bg-neutral-900/70 rounded-lg border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2 text-neutral-300">
                                    <Lock className="w-4 h-4 text-vq-gold shrink-0" />
                                    <span>
                                        Seal Checkpoints Verified: <strong>Warehouse Loading → Port Gate-In → Vessel Stowage → Customs</strong>
                                    </span>
                                </div>
                                <span className="font-mono text-vq-gold">Booking: {shipment.booking_reference || 'BKG-JP-88310'}</span>
                            </div>
                        </div>

                        {/* Detailed Milestones Log */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-sm">
                            <h3 className="text-lg font-bold text-vq-black mb-8">Detailed Port & Vessel Checkpoints</h3>

                            {shipment.milestones && shipment.milestones.length > 0 ? (
                                <div className="relative border-l-2 border-neutral-200 ml-4 space-y-8">
                                    {shipment.milestones.map((milestone) => (
                                        <div key={milestone.id} className="relative pl-8">
                                            <div
                                                className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center ${
                                                    milestone.is_completed
                                                        ? 'bg-vq-green text-white'
                                                        : 'bg-neutral-200 text-neutral-500'
                                                }`}
                                            >
                                                {milestone.is_completed ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                ) : (
                                                    <Clock className="w-3 h-3" />
                                                )}
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                                <h4
                                                    className={`font-bold text-base ${
                                                        milestone.is_completed ? 'text-vq-black' : 'text-neutral-500'
                                                    }`}
                                                >
                                                    {milestone.title}
                                                </h4>
                                                {milestone.occurred_at && (
                                                    <span className="font-mono text-xs text-neutral-500">
                                                        {new Date(milestone.occurred_at).toLocaleString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-sm text-neutral-600 flex items-center gap-1.5 mb-2">
                                                <MapPin className="w-3.5 h-3.5 text-neutral-400" />{' '}
                                                {milestone.location_description}
                                            </div>

                                            {milestone.notes && (
                                                <p className="text-xs text-neutral-500 bg-neutral-50 p-3 rounded border border-neutral-100">
                                                    {milestone.notes}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-neutral-500 text-sm">
                                    Milestone logs are being synchronized with the port terminal.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Vehicle Details, WCO Compliance & Trade Documents */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Vehicle Summary Card */}
                        {shipment.vehicle && (
                            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                                <div className="p-4 bg-vq-black text-white font-bold text-sm uppercase tracking-wider flex items-center justify-between">
                                    <span>Assigned Vehicle Asset</span>
                                    <span className="text-[11px] font-mono text-vq-gold">360° Protected</span>
                                </div>
                                <div className="aspect-[16/10] bg-neutral-100">
                                    <img
                                        src={
                                            shipment.vehicle.primary_image?.url ||
                                            shipment.vehicle.images?.[0]?.url ||
                                            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80'
                                        }
                                        alt={shipment.vehicle.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="font-mono text-xs text-vq-gold mb-1">
                                        STOCK ID: {shipment.vehicle.stock_id}
                                    </div>
                                    <h4 className="font-bold text-lg text-vq-black mb-2">{shipment.vehicle.title}</h4>
                                    <div className="text-xs text-neutral-500 space-y-1 mb-4 font-mono">
                                        <div>VIN / Chassis: {shipment.vehicle.vin_chassis}</div>
                                        <div>Booking Ref: {shipment.booking_reference}</div>
                                        <div>Pre-Export QC: 10/10 Checkpoints Passed</div>
                                    </div>
                                    <Link
                                        href={`/vehicles/${shipment.vehicle.slug}`}
                                        className="block w-full text-center py-2.5 bg-neutral-100 hover:bg-neutral-200 text-vq-black font-semibold text-xs rounded transition-colors"
                                    >
                                        View Vehicle Specification Dossier
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Trade Documents Vault */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
                            <h3 className="font-bold text-lg text-vq-black mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-vq-gold" /> Export Documentation Package
                            </h3>
                            <p className="text-xs text-neutral-500 mb-4">
                                Verified customs, shipping, and inspection documents linked to this Bill of Lading.
                            </p>

                            {shipment.documents && shipment.documents.length > 0 ? (
                                <div className="space-y-3">
                                    {shipment.documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="p-3 rounded-lg border border-neutral-200 flex items-center justify-between hover:border-vq-gold transition-colors"
                                        >
                                            <div>
                                                <div className="font-semibold text-sm text-vq-black">{doc.title}</div>
                                                <div className="text-xs font-mono text-neutral-400">
                                                    {doc.document_no} • Verified
                                                </div>
                                            </div>
                                            <a
                                                href={`/documents/${doc.id}/download`}
                                                className="px-3 py-1.5 bg-vq-black text-vq-white text-xs font-medium rounded hover:bg-neutral-800 transition-colors"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-xs text-neutral-400 italic py-4 text-center border border-dashed border-neutral-200 rounded-lg">
                                    Documents are being finalized by the export compliance department.
                                </div>
                            )}

                            <Link
                                href="/documents"
                                className="mt-4 block w-full text-center py-2.5 bg-vq-gold/15 text-vq-black font-semibold text-xs rounded-lg hover:bg-vq-gold/25 transition-colors"
                            >
                                Open Digital Document Center
                            </Link>
                        </div>

                        {/* Assigned Export Coordinator */}
                        <div className="bg-neutral-900 text-white rounded-xl p-6 border border-neutral-800 space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-vq-gold" />
                                <div>
                                    <div className="text-xs font-mono uppercase text-vq-gold">Global Logistics Control Tower</div>
                                    <div className="font-bold text-sm">24/7 Shipment Desk Support</div>
                                </div>
                            </div>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                Need a Telex Release amendment, consignee update, or destination customs broker coordination?
                            </p>
                            <div className="flex gap-2">
                                <Link
                                    href="/contact?department=Export+Support"
                                    className="flex-1 py-2.5 bg-vq-gold text-vq-black font-semibold text-xs rounded-lg text-center hover:bg-vq-gold/90"
                                >
                                    Contact Export Desk
                                </Link>
                                <a
                                    href="https://wa.me/81355550199"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-2.5 bg-neutral-800 text-white text-xs font-mono rounded-lg hover:bg-neutral-700 inline-flex items-center gap-1"
                                >
                                    <PhoneCall className="w-3.5 h-3.5 text-vq-gold" /> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
