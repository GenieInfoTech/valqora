import React from 'react';
import { Link } from '@inertiajs/react';
import { Vehicle } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { ShieldCheck, Gauge, Compass, Fuel, CheckCircle2, ArrowRight } from 'lucide-react';

interface VehicleCardProps {
    vehicle: Vehicle;
    compact?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, compact = false }) => {
    const { formatPrice, currentCurrency } = useCurrency();

    const imageUrl =
        vehicle.primary_image?.url ||
        vehicle.images?.[0]?.url ||
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80';

    return (
        <div className="group relative bg-[#18181A] hover:bg-[#1E1E22] border border-[#26262A] hover:border-[#C9A227]/60 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-[#C9A227]/5">
            {/* Image & Status Overlays */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                <img
                    src={imageUrl}
                    alt={vehicle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181A] via-transparent to-black/40" />

                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-black/80 backdrop-blur-md text-[#C9A227] border border-[#C9A227]/40 rounded">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {vehicle.condition_grade}
                    </span>
                    {vehicle.is_verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium uppercase bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            160-Pt Passed
                        </span>
                    )}
                </div>

                <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-[10px] font-mono tracking-wider uppercase bg-[#111111]/80 text-gray-300 border border-[#333333] rounded">
                        {vehicle.location_country}
                    </span>
                </div>

                <div className="absolute bottom-2.5 left-3">
                    <span className="text-[11px] font-mono text-gray-400 tracking-wider">
                        {vehicle.stock_id}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1 font-mono">
                        <span>{vehicle.year} • {vehicle.make}</span>
                        <span className="text-gray-500 uppercase">{vehicle.body_type}</span>
                    </div>

                    <h3 className="text-base font-semibold text-white group-hover:text-[#C9A227] transition-colors duration-200 line-clamp-1">
                        <Link href={`/vehicles/${vehicle.slug}`}>
                            {vehicle.title}
                        </Link>
                    </h3>

                    {/* Quick Specs Grid */}
                    <div className="mt-3.5 grid grid-cols-3 gap-2 py-2.5 border-y border-[#26262A] text-[11px] text-gray-300">
                        <div className="flex items-center gap-1.5 truncate">
                            <Gauge className="w-3.5 h-3.5 text-[#C9A227] flex-shrink-0" />
                            <span>{vehicle.mileage_km.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                            <Compass className="w-3.5 h-3.5 text-[#C9A227] flex-shrink-0" />
                            <span>{vehicle.steering} Drive</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                            <Fuel className="w-3.5 h-3.5 text-[#C9A227] flex-shrink-0" />
                            <span>{vehicle.fuel_type}</span>
                        </div>
                    </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-2 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                            FOB Price ({currentCurrency})
                        </p>
                        <p className="text-lg font-bold font-mono text-white tracking-tight">
                            {formatPrice(vehicle.fob_price_usd)}
                        </p>
                        {currentCurrency !== 'USD' && (
                            <p className="text-[10px] text-gray-500 font-mono">
                                (${Number(vehicle.fob_price_usd).toLocaleString()} USD)
                            </p>
                        )}
                    </div>

                    <Link
                        href={`/vehicles/${vehicle.slug}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-black bg-[#C9A227] hover:bg-[#e0b83a] rounded-lg transition-colors duration-150 shadow"
                    >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
