import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search, SlidersHorizontal, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

interface FilterOptionsBag {
    makes?: string[];
    bodyTypes?: string[];
    fuelTypes?: string[];
    transmissions?: string[];
    countries?: string[];
    driveTypes?: string[];
    conditionGrades?: string[];
}

interface SearchFilterBarProps {
    filters: {
        search?: string;
        make?: string;
        body_type?: string;
        fuel_type?: string;
        origin?: string;
        max_price?: string;
        sort?: string;
        drive_type?: string;
        condition_grade?: string;
        transmission?: string;
        status?: string;
        year_min?: string;
        year_max?: string;
        mileage_max?: string;
        [key: string]: string | undefined;
    };
    filterOptions?: FilterOptionsBag;
    makes?: string[];
    bodyTypes?: string[];
    fuelTypes?: string[];
    origins?: string[];
    driveTypes?: string[];
    conditionGrades?: string[];
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
    filters,
    filterOptions,
    makes,
    bodyTypes,
    fuelTypes,
    origins,
    driveTypes,
    conditionGrades,
}) => {
    const resolvedMakes = makes || filterOptions?.makes || ['Toyota', 'Lexus', 'Nissan', 'Honda', 'Porsche', 'Mercedes-Benz', 'BMW', 'Land Rover'];
    const resolvedBodyTypes = bodyTypes || filterOptions?.bodyTypes || ['SUV', 'Sedan', 'Coupe', 'Sports', 'Hatchback', 'Commercial', 'MPV / Van', 'Pickup'];
    const resolvedFuelTypes = fuelTypes || filterOptions?.fuelTypes || ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'Plug-in Hybrid'];
    const resolvedOrigins = origins || filterOptions?.countries || ['Japan', 'Germany', 'United Kingdom', 'United Arab Emirates'];
    const resolvedDriveTypes = driveTypes || filterOptions?.driveTypes || ['4WD / AWD', 'RWD', 'FWD', 'AWD', '4WD'];
    const resolvedConditionGrades = conditionGrades || filterOptions?.conditionGrades || ['S (Brand New)', '6.0', '5.0', '4.5', '4.0'];

    const [localFilters, setLocalFilters] = useState({
        search: filters.search || '',
        make: filters.make || '',
        body_type: filters.body_type || '',
        fuel_type: filters.fuel_type || '',
        origin: filters.origin || '',
        max_price: filters.max_price || '',
        sort: filters.sort || 'newest',
        drive_type: filters.drive_type || '',
        condition_grade: filters.condition_grade || '',
        transmission: filters.transmission || '',
        status: filters.status || '',
        year_min: filters.year_min || '',
        mileage_max: filters.mileage_max || '',
    });

    const [showAdvanced, setShowAdvanced] = useState(
        Boolean(
            filters.drive_type ||
            filters.condition_grade ||
            filters.transmission ||
            filters.status ||
            filters.year_min ||
            filters.mileage_max
        )
    );

    const applyFilters = (updated = localFilters) => {
        const cleanParams: Record<string, string> = {};
        Object.entries(updated).forEach(([key, val]) => {
            if (val && val !== '') {
                cleanParams[key] = val;
            }
        });
        router.get('/vehicles', cleanParams, { preserveState: true, replace: true });
    };

    const handleChange = (key: keyof typeof localFilters, value: string) => {
        const next = { ...localFilters, [key]: value };
        setLocalFilters(next);
        if (key !== 'search') {
            applyFilters(next);
        }
    };

    const handleReset = () => {
        const cleared = {
            search: '',
            make: '',
            body_type: '',
            fuel_type: '',
            origin: '',
            max_price: '',
            sort: 'newest',
            drive_type: '',
            condition_grade: '',
            transmission: '',
            status: '',
            year_min: '',
            mileage_max: '',
        };
        setLocalFilters(cleared);
        router.get('/vehicles', {}, { preserveState: true, replace: true });
    };

    const aiPrompts = [
        'Find a white 2023 Toyota Land Cruiser 300 under 15,000 km',
        'Hybrid SUV from Japan under $45,000',
        'Grade 5.0 Porsche 911 GT3 or Lexus LX600',
    ];

    return (
        <div className="bg-[#161618] border border-white/10 rounded-xl p-5 shadow-2xl">
            {/* Natural Language AI Search Input */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    applyFilters();
                }}
                className="flex flex-col md:flex-row gap-3 mb-3"
            >
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#C9A227] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={localFilters.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                        placeholder='AI Smart Search: e.g. "Find a white 2024 Toyota Corolla Cross Hybrid under 20,000 km" or Stock ID / VIN...'
                        className="w-full bg-[#111111] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A227]"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#C9A227] hover:bg-[#d8b236] text-[#111111] font-semibold px-6 py-3 rounded-lg text-sm transition flex items-center justify-center gap-2 shrink-0"
                >
                    <Sparkles className="w-4 h-4" /> Search Catalog
                </button>
                <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`px-4 py-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 shrink-0 ${
                        showAdvanced
                            ? 'bg-[#C9A227]/15 border-[#C9A227] text-[#C9A227]'
                            : 'bg-[#111111] border-white/10 text-neutral-300 hover:border-white/30'
                    }`}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    {showAdvanced ? 'Less Filters' : 'All Filters'}
                </button>
            </form>

            {/* AI Natural Language Example Prompts */}
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C9A227]" /> Smart Prompts:
                </span>
                {aiPrompts.map((prompt) => (
                    <button
                        key={prompt}
                        type="button"
                        onClick={() => {
                            const next = { ...localFilters, search: prompt };
                            setLocalFilters(next);
                            applyFilters(next);
                        }}
                        className="text-[11px] bg-white/[0.03] hover:bg-[#C9A227]/15 border border-white/10 hover:border-[#C9A227]/40 text-neutral-400 hover:text-[#C9A227] px-2.5 py-1 rounded-full transition flex items-center gap-1"
                    >
                        "{prompt}" <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                ))}
            </div>

            {/* Primary Filter Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Manufacturer</label>
                    <select
                        value={localFilters.make}
                        onChange={(e) => handleChange('make', e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                    >
                        <option value="">All Brands</option>
                        {resolvedMakes.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Body Configuration</label>
                    <select
                        value={localFilters.body_type}
                        onChange={(e) => handleChange('body_type', e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                    >
                        <option value="">All Body Styles</option>
                        {resolvedBodyTypes.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Powertrain / Fuel</label>
                    <select
                        value={localFilters.fuel_type}
                        onChange={(e) => handleChange('fuel_type', e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                    >
                        <option value="">All Fuel Types</option>
                        {resolvedFuelTypes.map((f) => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Country of Origin</label>
                    <select
                        value={localFilters.origin}
                        onChange={(e) => handleChange('origin', e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                    >
                        <option value="">All Origins</option>
                        {resolvedOrigins.map((o) => (
                            <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Max FOB Ceiling</label>
                    <select
                        value={localFilters.max_price}
                        onChange={(e) => handleChange('max_price', e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                    >
                        <option value="">Unlimited Budget</option>
                        <option value="25000">Under USD 25,000</option>
                        <option value="50000">Under USD 50,000</option>
                        <option value="85000">Under USD 85,000</option>
                        <option value="150000">Under USD 150,000</option>
                        <option value="250000">Under USD 250,000</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Sort Order (Vol 5)</label>
                    <select
                        value={localFilters.sort}
                        onChange={(e) => handleChange('sort', e.target.value)}
                        className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="featured">Featured Priority</option>
                        <option value="price_asc">Lowest Price</option>
                        <option value="price_desc">Highest Price</option>
                        <option value="mileage_asc">Lowest Mileage</option>
                        <option value="year_desc">Newest Model Year</option>
                    </select>
                </div>
            </div>

            {/* Extended Industrial Filter Matrix (Vol 5 Page 12) */}
            {showAdvanced && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-white/10">
                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Drive Type</label>
                        <select
                            value={localFilters.drive_type}
                            onChange={(e) => handleChange('drive_type', e.target.value)}
                            className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                        >
                            <option value="">All Drivetrain</option>
                            {resolvedDriveTypes.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Auction Grade</label>
                        <select
                            value={localFilters.condition_grade}
                            onChange={(e) => handleChange('condition_grade', e.target.value)}
                            className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                        >
                            <option value="">Any Auction Grade</option>
                            {resolvedConditionGrades.map((g) => (
                                <option key={g} value={g}>Grade {g}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Transmission</label>
                        <select
                            value={localFilters.transmission}
                            onChange={(e) => handleChange('transmission', e.target.value)}
                            className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                        >
                            <option value="">All Transmissions</option>
                            <option value="Automatic">Automatic / PDK / e-CVT</option>
                            <option value="Manual">6-Speed / Manual</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Min Model Year</label>
                        <select
                            value={localFilters.year_min}
                            onChange={(e) => handleChange('year_min', e.target.value)}
                            className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                        >
                            <option value="">Any Year</option>
                            <option value="2025">2025+</option>
                            <option value="2024">2024+</option>
                            <option value="2023">2023+</option>
                            <option value="2022">2022+</option>
                            <option value="2020">2020+</option>
                            <option value="2015">2015+</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Max Mileage (km)</label>
                        <select
                            value={localFilters.mileage_max}
                            onChange={(e) => handleChange('mileage_max', e.target.value)}
                            className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                        >
                            <option value="">Any Mileage</option>
                            <option value="5000">Under 5,000 km</option>
                            <option value="15000">Under 15,000 km</option>
                            <option value="30000">Under 30,000 km</option>
                            <option value="50000">Under 50,000 km</option>
                            <option value="80000">Under 80,000 km</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Availability</label>
                        <div className="flex gap-2">
                            <select
                                value={localFilters.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A227] focus:outline-none"
                            >
                                <option value="">All Status</option>
                                <option value="available">Available Now</option>
                                <option value="reserved">Reserved</option>
                                <option value="in_transit">In Transit</option>
                            </select>
                            <button
                                type="button"
                                onClick={handleReset}
                                title="Reset All Filters"
                                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white rounded-lg transition shrink-0"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchFilterBar;
