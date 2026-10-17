import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search, RotateCcw, Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';

interface FilterOptions {
    makes: string[];
    bodyTypes: string[];
    fuelTypes: string[];
    transmissions: string[];
    countries: string[];
}

interface SearchFilterBarProps {
    filters: Record<string, string>;
    filterOptions: FilterOptions;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ filters, filterOptions }) => {
    const [q, setQ] = useState(filters.q || '');
    const [make, setMake] = useState(filters.make || '');
    const [bodyType, setBodyType] = useState(filters.body_type || '');
    const [fuelType, setFuelType] = useState(filters.fuel_type || '');
    const [steering, setSteering] = useState(filters.steering || '');
    const [country, setCountry] = useState(filters.country || '');
    const [sort, setSort] = useState(filters.sort || 'newest');
    const [priceMin, setPriceMin] = useState(filters.price_min || '');
    const [priceMax, setPriceMax] = useState(filters.price_max || '');
    const [advancedOpen, setAdvancedOpen] = useState(false);

    const applyFilters = (newParams: Record<string, string> = {}) => {
        const params: Record<string, string> = {
            ...(q ? { q } : {}),
            ...(make ? { make } : {}),
            ...(bodyType ? { body_type: bodyType } : {}),
            ...(fuelType ? { fuel_type: fuelType } : {}),
            ...(steering ? { steering } : {}),
            ...(country ? { country } : {}),
            ...(priceMin ? { price_min: priceMin } : {}),
            ...(priceMax ? { price_max: priceMax } : {}),
            ...(sort !== 'newest' ? { sort } : {}),
            ...newParams,
        };

        router.get('/vehicles', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const handleReset = () => {
        setQ('');
        setMake('');
        setBodyType('');
        setFuelType('');
        setSteering('');
        setCountry('');
        setSort('newest');
        setPriceMin('');
        setPriceMax('');
        router.get('/vehicles');
    };

    return (
        <div className="bg-[#18181A] border border-[#2A2A2E] rounded-xl p-5 shadow-xl">
            {/* Primary Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A227]" />
                    <input
                        type="text"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search by Make, Model, Stock ID, or VIN..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#2F2F33] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] rounded-lg text-sm text-white placeholder-gray-500 transition outline-none"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#C9A227] hover:bg-[#dfba38] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition duration-150 flex items-center justify-center gap-2"
                    >
                        <Search className="w-3.5 h-3.5" />
                        <span>Search</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setAdvancedOpen(!advancedOpen)}
                        className={`px-4 py-2.5 border text-xs font-medium rounded-lg transition flex items-center gap-2 ${
                            advancedOpen
                                ? 'bg-[#222226] border-[#C9A227] text-[#C9A227]'
                                : 'bg-[#1C1C1E] border-[#2E2E32] text-gray-300 hover:bg-[#252528]'
                        }`}
                    >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Filters</span>
                    </button>

                    {(q || make || bodyType || fuelType || steering || country || priceMin || priceMax) && (
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-3 py-2.5 text-xs text-gray-400 hover:text-white bg-[#1A1A1C] border border-[#2E2E32] rounded-lg transition flex items-center gap-1.5"
                            title="Reset all filters"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Reset</span>
                        </button>
                    )}
                </div>
            </form>

            {/* Quick Filter Selectors */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {/* Make */}
                <div>
                    <select
                        value={make}
                        onChange={(e) => {
                            setMake(e.target.value);
                            applyFilters({ make: e.target.value });
                        }}
                        className="w-full px-3 py-2 text-xs bg-[#111111] border border-[#2A2A2E] text-gray-200 rounded-lg outline-none focus:border-[#C9A227]"
                    >
                        <option value="">All Makes</option>
                        {filterOptions.makes.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* Body Type */}
                <div>
                    <select
                        value={bodyType}
                        onChange={(e) => {
                            setBodyType(e.target.value);
                            applyFilters({ body_type: e.target.value });
                        }}
                        className="w-full px-3 py-2 text-xs bg-[#111111] border border-[#2A2A2E] text-gray-200 rounded-lg outline-none focus:border-[#C9A227]"
                    >
                        <option value="">All Body Types</option>
                        {filterOptions.bodyTypes.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                {/* Steering */}
                <div>
                    <select
                        value={steering}
                        onChange={(e) => {
                            setSteering(e.target.value);
                            applyFilters({ steering: e.target.value });
                        }}
                        className="w-full px-3 py-2 text-xs bg-[#111111] border border-[#2A2A2E] text-gray-200 rounded-lg outline-none focus:border-[#C9A227]"
                    >
                        <option value="">Steering (All)</option>
                        <option value="RHD">Right Hand Drive (RHD)</option>
                        <option value="LHD">Left Hand Drive (LHD)</option>
                    </select>
                </div>

                {/* Origin Location */}
                <div>
                    <select
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            applyFilters({ country: e.target.value });
                        }}
                        className="w-full px-3 py-2 text-xs bg-[#111111] border border-[#2A2A2E] text-gray-200 rounded-lg outline-none focus:border-[#C9A227]"
                    >
                        <option value="">Origin (All)</option>
                        {filterOptions.countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* Fuel Type */}
                <div>
                    <select
                        value={fuelType}
                        onChange={(e) => {
                            setFuelType(e.target.value);
                            applyFilters({ fuel_type: e.target.value });
                        }}
                        className="w-full px-3 py-2 text-xs bg-[#111111] border border-[#2A2A2E] text-gray-200 rounded-lg outline-none focus:border-[#C9A227]"
                    >
                        <option value="">Fuel (All)</option>
                        {filterOptions.fuelTypes.map((f) => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                </div>

                {/* Sort Order */}
                <div>
                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            applyFilters({ sort: e.target.value });
                        }}
                        className="w-full px-3 py-2 text-xs bg-[#111111] border border-[#2A2A2E] text-gray-200 rounded-lg outline-none focus:border-[#C9A227]"
                    >
                        <option value="newest">Sort: Latest Added</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="year_desc">Year: Newest</option>
                        <option value="mileage_asc">Mileage: Lowest</option>
                    </select>
                </div>
            </div>

            {/* Advanced Filters Expandable Drawer */}
            {advancedOpen && (
                <div className="mt-4 pt-4 border-t border-[#26262A] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                        <label className="block text-gray-400 mb-1 font-mono">FOB Price Range (USD)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min USD"
                                value={priceMin}
                                onChange={(e) => setPriceMin(e.target.value)}
                                className="w-full px-3 py-1.5 bg-[#111111] border border-[#2A2A2E] text-white rounded outline-none focus:border-[#C9A227]"
                            />
                            <span className="text-gray-500">—</span>
                            <input
                                type="number"
                                placeholder="Max USD"
                                value={priceMax}
                                onChange={(e) => setPriceMax(e.target.value)}
                                className="w-full px-3 py-1.5 bg-[#111111] border border-[#2A2A2E] text-white rounded outline-none focus:border-[#C9A227]"
                            />
                        </div>
                    </div>

                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={() => applyFilters()}
                            className="w-full py-2 bg-[#26262B] hover:bg-[#323238] text-white border border-[#3E3E44] rounded text-xs font-semibold transition"
                        >
                            Apply Advanced Range
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
