import React from 'react';
import { Link } from '@inertiajs/react';
import { Vehicle } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useWatchlist } from '@/context/WatchlistContext';
import {
    Calendar,
    Gauge,
    Fuel,
    Settings2,
    MapPin,
    ShieldCheck,
    Heart,
    Scale,
    ArrowUpRight,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';

interface VehicleCardProps {
    vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
    const { formatPrice, formatIsoPrice } = useCurrency();
    const { isSaved, toggleSave, isComparing, toggleCompare } = useWatchlist();

    const saved = isSaved(vehicle.id);
    const comparing = isComparing(vehicle.id);

    const primaryImage =
        vehicle.primary_image?.url ||
        (vehicle.primary_image as any)?.image_path ||
        vehicle.images?.find((img) => img.is_primary)?.url ||
        (vehicle.images?.find((img) => img.is_primary) as any)?.image_path ||
        vehicle.images?.[0]?.url ||
        (vehicle.images?.[0] as any)?.image_path ||
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80';

    const statusBadge = {
        available: { bg: 'bg-[#2E8B57]/90 text-white border-[#2E8B57]', label: 'Available for Export' },
        reserved: { bg: 'bg-[#E6A700]/90 text-[#111111] border-[#E6A700]', label: 'Reserved' },
        in_transit: { bg: 'bg-[#0057B8]/90 text-white border-[#0057B8]', label: 'In Transit' },
        sold: { bg: 'bg-[#C62828]/90 text-white border-[#C62828]', label: 'Sold' },
    }[vehicle.status] || { bg: 'bg-neutral-800 text-white border-neutral-700', label: vehicle.status };

    return (
        <div className="group bg-[#161618] border border-white/10 rounded-xl overflow-hidden hover:border-[#C9A227]/60 transition-all duration-200 flex flex-col shadow-lg">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-[#0D0D0F]">
                <Link href={`/vehicles/${vehicle.slug}`} className="block w-full h-full">
                    <img
                        src={primaryImage}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} — ${vehicle.exterior_color} export specification`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded border backdrop-blur-md ${statusBadge.bg}`}>
                        {statusBadge.label}
                    </span>
                    <span className="bg-[#111111]/90 backdrop-blur-md text-[#C9A227] border border-[#C9A227]/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                        Grade {vehicle.condition_grade}
                    </span>
                </div>

                {/* Save & Compare Quick Actions */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleCompare(vehicle);
                        }}
                        title={comparing ? 'Remove from Comparison' : 'Add to Compare (Up to 4)'}
                        className={`p-2 rounded-lg backdrop-blur-md border transition ${
                            comparing
                                ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                : 'bg-[#111111]/80 text-white border-white/15 hover:border-[#C9A227] hover:text-[#C9A227]'
                        }`}
                    >
                        <Scale className="w-3.5 h-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleSave(vehicle);
                        }}
                        title={saved ? 'Remove from Saved Vehicles' : 'Save Vehicle to Watchlist'}
                        className={`p-2 rounded-lg backdrop-blur-md border transition ${
                            saved
                                ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                : 'bg-[#111111]/80 text-white border-white/15 hover:border-[#C9A227] hover:text-[#C9A227]'
                        }`}
                    >
                        <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Bottom Stock & Origin Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent px-4 pt-6 pb-2.5 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-neutral-300">{vehicle.stock_id}</span>
                    <span className="flex items-center gap-1 text-neutral-300">
                        <MapPin className="w-3 h-3 text-[#C9A227]" />
                        {vehicle.location_city}, {vehicle.location_country}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                        <span className="uppercase tracking-widest font-mono text-[#C9A227] font-semibold">
                            {vehicle.make} • {vehicle.body_type}
                        </span>
                        <span className="font-mono text-neutral-400">{vehicle.drive_type || 'AWD'}</span>
                    </div>

                    <Link href={`/vehicles/${vehicle.slug}`}>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#C9A227] transition line-clamp-1 mb-3">
                            {vehicle.title}
                        </h3>
                    </Link>

                    {/* Key Specs Grid (Tabular Numerals per Vol 3 Page 14) */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-xs text-neutral-300 font-mono tabular-nums">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span>{vehicle.year} Model</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Gauge className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span>{vehicle.mileage_km.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Fuel className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span className="truncate">{vehicle.fuel_type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Settings2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span className="truncate">{vehicle.transmission}</span>
                        </div>
                    </div>

                    {/* Professional Features Strip (Vol 5 Page 12) */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span className="inline-flex items-center gap-1 text-[10px] bg-[#2E8B57]/10 text-[#2E8B57] border border-[#2E8B57]/25 px-2 py-0.5 rounded font-medium">
                            <CheckCircle2 className="w-2.5 h-2.5" /> VIN Verified
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] bg-white/5 text-neutral-300 border border-white/10 px-2 py-0.5 rounded">
                            <ShieldCheck className="w-2.5 h-2.5 text-[#C9A227]" /> 150-Pt Inspected
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] bg-white/5 text-neutral-400 border border-white/10 px-2 py-0.5 rounded">
                            <Sparkles className="w-2.5 h-2.5 text-[#C9A227]" /> Export Eligible
                        </span>
                    </div>
                </div>

                {/* Price & Action Footer */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between gap-2">
                    <div>
                        <span className="block text-[10px] uppercase tracking-wider text-neutral-500 font-mono">
                            FOB Export Price
                        </span>
                        <div className="text-xl font-bold text-white font-mono tabular-nums leading-tight">
                            {formatPrice(vehicle.fob_price_usd)}
                        </div>
                        <span className="block text-[10px] font-mono text-neutral-500 tabular-nums">
                            {formatIsoPrice(vehicle.fob_price_usd)} • Est. CIF {formatPrice(vehicle.cif_estimate_usd || vehicle.fob_price_usd + 1850)}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Link
                            href={`/vehicles/${vehicle.slug}#inquiry`}
                            className="px-3 py-2 rounded-lg border border-white/15 hover:border-[#C9A227] text-xs font-medium text-neutral-200 hover:text-[#C9A227] transition"
                        >
                            Inquire
                        </Link>
                        <Link
                            href={`/vehicles/${vehicle.slug}`}
                            className="bg-[#C9A227] hover:bg-[#d8b236] text-[#111111] font-semibold px-3.5 py-2 rounded-lg text-xs transition inline-flex items-center gap-1"
                        >
                            Details <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
