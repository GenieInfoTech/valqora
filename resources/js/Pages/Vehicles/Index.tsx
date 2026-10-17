import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { VehicleCard } from '@/Components/VehicleCard';
import { SearchFilterBar } from '@/Components/SearchFilterBar';
import { PaginatedData, Vehicle } from '@/types';
import { Car, Search, ArrowRight, ShieldCheck, FilterX } from 'lucide-react';

interface VehiclesIndexProps {
    vehicles: PaginatedData<Vehicle>;
    filters: Record<string, string>;
    filterOptions: {
        makes: string[];
        bodyTypes: string[];
        fuelTypes: string[];
        transmissions: string[];
        countries: string[];
    };
}

export default function VehiclesIndex({ vehicles, filters, filterOptions }: VehiclesIndexProps) {
    const hasActiveFilters = Object.keys(filters).some(
        (k) => filters[k] && k !== 'page' && filters[k] !== 'newest'
    );

    return (
        <AppLayout
            title="Certified Automotive Export Catalog"
            description="Explore VALQORA's verified inventory of prestige sedans, supercars, luxury SUVs, and commercial transports ready for international export."
        >
            <div className="bg-[#111111] py-12 border-b border-[#222226]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                                GLOBAL AUTOMOTIVE INVENTORY
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                                Certified Export Vehicle Catalog
                            </h1>
                            <p className="text-sm text-gray-400 mt-2 max-w-xl">
                                Real-time stock inspected under VALQORA 160-point mechanical standards, complete with authentic chassis verification and immediate Ro-Ro dispatch capability.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="px-3.5 py-1.5 rounded-lg bg-[#18181C] border border-[#2A2A30] text-xs font-mono text-gray-300">
                                <strong>{vehicles.total}</strong> Vehicles Available
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Search & Filters */}
                <div className="mb-8">
                    <SearchFilterBar filters={filters} filterOptions={filterOptions} />
                </div>

                {/* Active Filters Bar */}
                {hasActiveFilters && (
                    <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-gray-400">Active Filters:</span>
                        {Object.entries(filters).map(([k, v]) => {
                            if (!v || k === 'page' || v === 'newest') return null;
                            return (
                                <span
                                    key={k}
                                    className="px-2.5 py-1 rounded bg-[#202026] border border-[#33333E] text-white flex items-center gap-1.5"
                                >
                                    <strong className="text-gray-400 uppercase text-[10px]">{k}:</strong> {v}
                                </span>
                            );
                        })}
                        <Link
                            href="/vehicles"
                            className="text-[#C9A227] hover:underline flex items-center gap-1 ml-2"
                        >
                            <FilterX className="w-3.5 h-3.5" />
                            <span>Clear All</span>
                        </Link>
                    </div>
                )}

                {/* Vehicles Grid */}
                {vehicles.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {vehicles.data.map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                ) : (
                    <div className="p-16 text-center bg-[#151518] border border-[#222226] rounded-2xl space-y-4">
                        <Car className="w-12 h-12 text-[#C9A227] mx-auto opacity-70" />
                        <h3 className="text-lg font-bold text-white">No Matching Vehicles in Stock</h3>
                        <p className="text-xs text-gray-400 max-w-md mx-auto">
                            No vehicles currently match your exact filter combination. Our procurement team can source any specific make, model, or year via Japanese and European auction floors.
                        </p>
                        <div className="pt-2 flex justify-center gap-4">
                            <Link
                                href="/vehicles"
                                className="px-4 py-2 bg-[#202026] text-white text-xs font-semibold rounded-lg hover:bg-[#282830] transition"
                            >
                                Reset Search Filters
                            </Link>
                            <Link
                                href="/sourcing"
                                className="px-5 py-2 bg-[#C9A227] text-black text-xs font-bold uppercase rounded-lg hover:bg-[#dfba38] transition"
                            >
                                Request Custom Sourcing
                            </Link>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {vehicles.last_page > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        {vehicles.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                preserveScroll
                                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                                    link.active
                                        ? 'bg-[#C9A227] text-black font-bold'
                                        : link.url
                                        ? 'bg-[#18181A] border border-[#28282E] text-gray-300 hover:text-white hover:bg-[#222228]'
                                        : 'text-gray-600 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
