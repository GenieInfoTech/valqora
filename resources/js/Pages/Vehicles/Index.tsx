import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { VehicleCard } from '@/Components/VehicleCard';
import { SearchFilterBar } from '@/Components/SearchFilterBar';
import { PaginatedData, Vehicle } from '@/types';
import { useWatchlist } from '@/context/WatchlistContext';
import {
    Car,
    ShieldCheck,
    SlidersHorizontal,
    Scale,
    Heart,
    Sparkles,
    FileCheck2,
    Globe2,
    RotateCcw,
} from 'lucide-react';

interface VehiclesIndexProps {
    vehicles: PaginatedData<Vehicle>;
    filters: Record<string, string>;
    filterOptions: {
        makes: string[];
        bodyTypes: string[];
        fuelTypes: string[];
        transmissions: string[];
        countries: string[];
        driveTypes?: string[];
        conditionGrades?: string[];
    };
}

const CatalogToolbar: React.FC<{ total: number; activeFilterCount: number; onReset: () => void }> = ({
    total,
    activeFilterCount,
    onReset,
}) => {
    const { savedVehicles, compareVehicles, openDrawer } = useWatchlist();

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 bg-[#161616] border border-white/10 rounded-xl mb-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300">
                <span className="flex items-center gap-2 font-mono font-semibold text-white">
                    <SlidersHorizontal className="w-4 h-4 text-[#C9A227]" />
                    Showing {total} Verified Export Units
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="hidden sm:flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" /> 150-Point Pre-Export Inspected
                </span>
                <span className="hidden md:inline text-white/20">|</span>
                <span className="hidden md:flex items-center gap-1.5 text-gray-400">
                    <FileCheck2 className="w-4 h-4 text-[#C9A227]" /> Auction Sheet & VIN Verified
                </span>
            </div>

            <div className="flex items-center gap-2.5">
                {activeFilterCount > 0 && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5 text-[#C9A227]" />
                        Clear Filters ({activeFilterCount})
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => openDrawer('saved')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-200 transition-colors"
                >
                    <Heart className="w-3.5 h-3.5 text-[#C9A227]" />
                    Saved ({savedVehicles.length})
                </button>
                <button
                    type="button"
                    onClick={() => openDrawer('compare')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C9A227]/15 hover:bg-[#C9A227] hover:text-[#111111] border border-[#C9A227]/40 text-xs font-bold text-[#C9A227] transition-colors"
                >
                    <Scale className="w-3.5 h-3.5" />
                    Compare Matrix ({compareVehicles.length}/4)
                </button>
            </div>
        </div>
    );
};

export default function Index({ vehicles, filters, filterOptions }: VehiclesIndexProps) {
    const activeFilterEntries = Object.entries(filters || {}).filter(
        ([key, val]) => val && val !== '' && key !== 'page'
    );

    const handleResetFilters = () => {
        router.get('/vehicles');
    };

    return (
        <AppLayout>
            <Head title="Global Vehicle Inventory & Industrial Export Catalogue — Valqora Global Trading" />

            {/* Header Section (Volume 5 Page 244-246) */}
            <section className="bg-[#161616] border-b border-white/10 py-12">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-xs font-semibold uppercase tracking-widest mb-3">
                                <Globe2 className="w-3.5 h-3.5" />
                                Valqora Auto • Global Export Catalogue
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                                Global Vehicle Inventory
                            </h1>
                            <p className="text-gray-400 mt-2 max-w-2xl text-sm sm:text-base">
                                Built for international dealers, fleet operators, and import distributors. Browse verified JDM and European stock with full auction grading, VIN verification, and instant CIF/FOB landed cost calculation.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href="/portal?view=dealer"
                                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-200 transition-colors"
                            >
                                Dealer Wholesale Portal
                            </Link>
                            <Link
                                href="/contact?department=Sales"
                                className="px-5 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#d8b336] text-[#111111] text-xs font-bold uppercase tracking-wider transition-colors"
                            >
                                Request Custom Sourcing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Catalogue Content */}
            <section className="py-10">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20">
                    {/* Search & Filter Bar with AI Natural Language Search */}
                    <div className="mb-8">
                        <SearchFilterBar filters={filters} filterOptions={filterOptions} />
                    </div>

                    {/* Active Filter Pills */}
                    {activeFilterEntries.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <span className="text-xs uppercase tracking-widest text-gray-400 mr-1 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" /> Active Criteria:
                            </span>
                            {activeFilterEntries.map(([key, value]) => (
                                <span
                                    key={key}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-xs text-[#C9A227] font-medium"
                                >
                                    <span className="uppercase text-[10px] text-gray-400">{key.replace('_', ' ')}:</span>
                                    <span>{value}</span>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Toolbar */}
                    <CatalogToolbar
                        total={vehicles.total}
                        activeFilterCount={activeFilterEntries.length}
                        onReset={handleResetFilters}
                    />

                    {/* Vehicle Grid */}
                    {vehicles.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {vehicles.data.map((vehicle) => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                ))}
                            </div>

                            {/* Pagination (Vol 2 Page 83: Simple numbered pagination with Previous / Next controls) */}
                            {vehicles.last_page > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center gap-2" aria-label="Pagination">
                                        {vehicles.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                preserveScroll
                                                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                                                    link.active
                                                        ? 'bg-[#C9A227] text-[#111111] font-bold'
                                                        : link.url
                                                        ? 'bg-[#1A1A1A] text-gray-300 hover:bg-white/10 border border-white/10'
                                                        : 'bg-[#141414] text-gray-600 cursor-not-allowed border border-white/5'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-16 text-center">
                            <Car className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No Matching Vehicles Found</h3>
                            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
                                No current stock matches your filter criteria. Reset your filters or submit a bespoke sourcing request for our Japan & European auction desk.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider"
                                >
                                    Reset All Filters
                                </button>
                                <Link
                                    href="/contact?department=Sales"
                                    className="px-6 py-2.5 rounded-lg bg-[#C9A227] text-[#111111] text-xs font-bold uppercase tracking-wider"
                                >
                                    Submit Custom Sourcing Order
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
