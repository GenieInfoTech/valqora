import React, { ReactNode, useState, useEffect } from 'react';
import { Navbar } from '@/Components/Navbar';
import { Footer } from '@/Components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { WatchlistProvider, useWatchlist } from '@/context/WatchlistContext';
import { usePage, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
    Heart,
    Scale,
    X,
    Trash2,
    ArrowRight,
    Phone,
    MessageSquare,
    Mail,
    Home,
    Car,
    Ship,
    LayoutDashboard,
    ShieldCheck,
    CheckCircle2,
} from 'lucide-react';

interface AppLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

const getVehicleThumb = (v: any): string =>
    v?.primary_image?.url ||
    v?.images?.[0]?.url ||
    v?.images?.[0]?.image_path ||
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80';

const WatchlistCompareDrawer: React.FC = () => {
    const {
        savedVehicles,
        compareVehicles,
        removeSaved,
        removeCompare,
        clearSaved,
        clearCompare,
        isDrawerOpen,
        activeTab,
        openDrawer,
        closeDrawer,
    } = useWatchlist();

    if (!isDrawerOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-4xl bg-[#111111] border-l border-white/10 h-full flex flex-col shadow-2xl">
                {/* Drawer Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#161616]">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => openDrawer('compare')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                                activeTab === 'compare'
                                    ? 'bg-[#C9A227] text-[#111111]'
                                    : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                        >
                            <Scale className="w-4 h-4" />
                            Compare Matrix ({compareVehicles.length}/4)
                        </button>
                        <button
                            onClick={() => openDrawer('saved')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                                activeTab === 'saved'
                                    ? 'bg-[#C9A227] text-[#111111]'
                                    : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                        >
                            <Heart className="w-4 h-4" />
                            Saved Watchlist ({savedVehicles.length})
                        </button>
                    </div>
                    <button
                        onClick={closeDrawer}
                        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        aria-label="Close drawer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'compare' ? (
                        compareVehicles.length === 0 ? (
                            <div className="text-center py-20">
                                <Scale className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">
                                    No Vehicles Selected for Comparison
                                </h3>
                                <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
                                    Select up to 4 vehicles across the inventory catalogue to evaluate technical specifications, auction grades, mileage, and FOB export pricing side by side.
                                </p>
                                <Link
                                    href="/vehicles"
                                    onClick={closeDrawer}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-lg"
                                >
                                    Explore Global Inventory <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs uppercase tracking-widest text-gray-400">
                                        Side-by-Side Technical Specification Matrix
                                    </p>
                                    <button
                                        onClick={clearCompare}
                                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Clear All
                                    </button>
                                </div>

                                <div className="overflow-x-auto border border-white/10 rounded-xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-[#161616]">
                                                <th className="p-4 text-xs uppercase tracking-wider text-gray-400 w-44">
                                                    Specification
                                                </th>
                                                {compareVehicles.map((v) => (
                                                    <th key={v.id} className="p-4 min-w-[200px] border-l border-white/10">
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => removeCompare(v.id)}
                                                                className="absolute -top-1 -right-1 p-1 bg-black/70 text-gray-400 hover:text-white rounded-full"
                                                                title="Remove"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </button>
                                                            <img
                                                                src={getVehicleThumb(v)}
                                                                alt={v.title || `${v.make} ${v.model}`}
                                                                className="w-full h-28 object-cover rounded-lg mb-3 border border-white/10"
                                                            />
                                                            <Link
                                                                href={`/vehicles/${v.slug || v.id}`}
                                                                onClick={closeDrawer}
                                                                className="text-sm font-bold text-white hover:text-[#C9A227] block leading-snug"
                                                            >
                                                                {v.year} {v.make} {v.model}
                                                            </Link>
                                                            <span className="text-[11px] font-mono text-gray-400">
                                                                {(v as any).stock_number || v.stock_id}
                                                            </span>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10 text-xs">
                                            <tr>
                                                <td className="p-3.5 font-semibold text-gray-400 bg-[#141414]">FOB Price (USD)</td>
                                                {compareVehicles.map((v) => (
                                                    <td key={v.id} className="p-3.5 font-mono font-bold text-[#C9A227] text-sm border-l border-white/10">
                                                        USD {Number((v as any).price_usd ?? v.fob_price_usd ?? 0).toLocaleString()}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td className="p-3.5 font-semibold text-gray-400 bg-[#141414]">Auction / Inspection Grade</td>
                                                {compareVehicles.map((v) => {
                                                    const rawGrade = String(v.condition_grade || '4.5').replace(/^Grade\s+/i, '');
                                                    return (
                                                        <td key={v.id} className="p-3.5 font-mono text-white border-l border-white/10">
                                                            <span className="px-2 py-0.5 bg-[#2E8B57]/20 text-emerald-400 border border-[#2E8B57]/40 rounded">
                                                                Grade {rawGrade} Verified
                                                            </span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            <tr>
                                                <td className="p-3.5 font-semibold text-gray-400 bg-[#141414]">Mileage</td>
                                                {compareVehicles.map((v) => (
                                                    <td key={v.id} className="p-3.5 font-mono text-gray-200 border-l border-white/10">
                                                        {Number(v.mileage_km).toLocaleString()} km
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td className="p-3.5 font-semibold text-gray-400 bg-[#141414]">Engine & Fuel</td>
                                                {compareVehicles.map((v) => (
                                                    <td key={v.id} className="p-3.5 text-gray-200 border-l border-white/10">
                                                        {v.engine_cc ? `${Number(v.engine_cc).toLocaleString()} cc` : 'Standard'} • {v.fuel_type}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td className="p-3.5 font-semibold text-gray-400 bg-[#141414]">Transmission / Drive</td>
                                                {compareVehicles.map((v) => (
                                                    <td key={v.id} className="p-3.5 text-gray-200 border-l border-white/10">
                                                        {v.transmission} • {v.drive_type || '2WD/4WD'}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td className="p-3.5 font-semibold text-gray-400 bg-[#141414]">Origin Location</td>
                                                {compareVehicles.map((v) => (
                                                    <td key={v.id} className="p-3.5 text-gray-200 border-l border-white/10">
                                                        {(v as any).location || v.location_city || v.location_country} ({(v as any).origin_country || v.location_country})
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td className="p-3.5 font-semibold text-gray-400 bg-[#141414]">VIN / Chassis</td>
                                                {compareVehicles.map((v) => (
                                                    <td key={v.id} className="p-3.5 font-mono text-gray-300 border-l border-white/10">
                                                        {(v as any).vin_number || v.vin_chassis || 'Verified on Inspection'}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td className="p-3.5 font-semibold text-gray-400 bg-[#141414]">Action</td>
                                                {compareVehicles.map((v) => (
                                                    <td key={v.id} className="p-3.5 border-l border-white/10">
                                                        <Link
                                                            href={`/vehicles/${v.slug || v.id}`}
                                                            onClick={closeDrawer}
                                                            className="block w-full text-center py-2 bg-[#C9A227] text-[#111111] font-bold rounded text-xs uppercase tracking-wider hover:bg-[#d8b138]"
                                                        >
                                                            View Dossier
                                                        </Link>
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    ) : savedVehicles.length === 0 ? (
                        <div className="text-center py-20">
                            <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">
                                Your Saved Watchlist is Empty
                            </h3>
                            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
                                Bookmark vehicles while browsing our Japanese and European export catalogue to request multi-vehicle fleet quotations or inspection videos.
                            </p>
                            <Link
                                href="/vehicles"
                                onClick={closeDrawer}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-lg"
                            >
                                Browse Inventory <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs uppercase tracking-widest text-gray-400">
                                    Saved Export Units ({savedVehicles.length})
                                </p>
                                <button
                                    onClick={clearSaved}
                                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Clear Watchlist
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {savedVehicles.map((v) => (
                                    <div
                                        key={v.id}
                                        className="flex gap-4 p-4 rounded-xl bg-[#161616] border border-white/10 hover:border-[#C9A227]/40 transition-all"
                                    >
                                        <img
                                            src={getVehicleThumb(v)}
                                            alt={v.title || `${v.make} ${v.model}`}
                                            className="w-28 h-24 object-cover rounded-lg border border-white/10 shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <Link
                                                    href={`/vehicles/${v.slug || v.id}`}
                                                    onClick={closeDrawer}
                                                    className="text-sm font-bold text-white hover:text-[#C9A227] truncate"
                                                >
                                                    {v.year} {v.make} {v.model}
                                                </Link>
                                                <button
                                                    onClick={() => removeSaved(v.id)}
                                                    className="text-gray-500 hover:text-red-400"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-[11px] font-mono text-gray-400 mt-0.5">
                                                {(v as any).stock_number || v.stock_id} • {Number(v.mileage_km).toLocaleString()} km
                                            </p>
                                            <p className="text-sm font-mono font-bold text-[#C9A227] mt-2">
                                                USD {Number((v as any).price_usd ?? v.fob_price_usd ?? 0).toLocaleString()} FOB
                                            </p>
                                            <div className="mt-2 flex items-center gap-3">
                                                <Link
                                                    href={`/vehicles/${v.slug || v.id}`}
                                                    onClick={closeDrawer}
                                                    className="text-[11px] font-semibold text-white hover:text-[#C9A227] uppercase tracking-wider"
                                                >
                                                    Inspect & Quote →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Drawer Footer */}
                <div className="p-4 border-t border-white/10 bg-[#161616] flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                        <span>All listed vehicles undergo Valqora 150-Point Pre-Export Verification.</span>
                    </div>
                    <Link
                        href="/contact?department=Sales"
                        onClick={closeDrawer}
                        className="px-4 py-2 bg-white/10 hover:bg-[#C9A227] hover:text-[#111111] text-white font-semibold rounded-lg transition-colors uppercase tracking-wider"
                    >
                        Request Multi-Vehicle Fleet Quote
                    </Link>
                </div>
            </div>
        </div>
    );
};

const MobileQuickBarAndFloatingActions: React.FC = () => {
    const { savedVehicles, compareVehicles, openDrawer } = useWatchlist();
    const { url } = usePage();

    return (
        <>
            {/* Floating One-Touch Quick Actions (Vol 2 Page 84 & Vol 5 Page 252) */}
            <div className="fixed bottom-20 lg:bottom-6 right-4 z-40 flex flex-col gap-2.5">
                {compareVehicles.length > 0 && (
                    <button
                        onClick={() => openDrawer('compare')}
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#C9A227] text-[#111111] font-bold text-xs shadow-lg hover:scale-105 transition-transform"
                        title="Open Vehicle Comparison Matrix"
                    >
                        <Scale className="w-4 h-4" />
                        <span>Compare ({compareVehicles.length})</span>
                    </button>
                )}
                <a
                    href="https://wa.me/81355550199?text=Hello%20Valqora%20Global%20Trading%2C%20I%20would%20like%20to%20inquire%20about%20vehicle%20sourcing%20and%20export."
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 rounded-full bg-[#2E8B57] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-white/15"
                    title="One-Touch WhatsApp Business Desk"
                    aria-label="WhatsApp Business Desk"
                >
                    <MessageSquare className="w-5 h-5" />
                </a>
                <a
                    href="tel:+81355550199"
                    className="w-11 h-11 rounded-full bg-[#1F2937] text-[#C9A227] flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-[#C9A227]/40"
                    title="One-Touch Direct Export Desk Call"
                    aria-label="Direct Call"
                >
                    <Phone className="w-4 h-4" />
                </a>
                <Link
                    href="/contact"
                    className="w-11 h-11 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-white/15"
                    title="One-Touch Export Inquiry"
                    aria-label="Direct Inquiry"
                >
                    <Mail className="w-4 h-4" />
                </Link>
            </div>

            {/* Mobile Bottom Navigation Bar (Vol 5 Page 265-266: Home, Inventory, Track Shipment, Saved/Compare, Account) */}
            <nav
                aria-label="Mobile Primary Navigation"
                className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#111111]/95 backdrop-blur-md border-t border-white/10 px-2 py-1.5 grid grid-cols-5 gap-1"
            >
                <Link
                    href="/"
                    className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium ${
                        url === '/' ? 'text-[#C9A227]' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Home className="w-4 h-4 mb-0.5" />
                    <span>Home</span>
                </Link>
                <Link
                    href="/vehicles"
                    className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium ${
                        url.startsWith('/vehicles') ? 'text-[#C9A227]' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Car className="w-4 h-4 mb-0.5" />
                    <span>Inventory</span>
                </Link>
                <Link
                    href="/tracking"
                    className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium ${
                        url.startsWith('/tracking') ? 'text-[#C9A227]' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Ship className="w-4 h-4 mb-0.5" />
                    <span>Track</span>
                </Link>
                <button
                    type="button"
                    onClick={() => openDrawer(compareVehicles.length > 0 ? 'compare' : 'saved')}
                    className="flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium text-gray-400 hover:text-white relative"
                >
                    <Scale className="w-4 h-4 mb-0.5" />
                    <span>Compare</span>
                    {compareVehicles.length + savedVehicles.length > 0 && (
                        <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-[#C9A227] text-[#111111] text-[9px] font-bold flex items-center justify-center">
                            {compareVehicles.length + savedVehicles.length}
                        </span>
                    )}
                </button>
                <Link
                    href="/portal"
                    className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-medium ${
                        url.startsWith('/portal') ? 'text-[#C9A227]' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <LayoutDashboard className="w-4 h-4 mb-0.5" />
                    <span>Portal</span>
                </Link>
            </nav>
        </>
    );
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { props } = usePage<PageProps>();
    const flash = (props as any).flash as { success?: string; error?: string } | undefined;
    const [visibleFlash, setVisibleFlash] = useState<string | null>(null);
    const [theme, setTheme] = useState<"dark" | "light">(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("valqora_theme");
            if (saved === "light" || saved === "dark") return saved;
        }
        return "dark";
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const onThemeEvent = (e: Event) => {
            const customEvent = e as CustomEvent<{ theme: "dark" | "light" }>;
            const next = customEvent.detail?.theme;
            if ((next === "light" || next === "dark") && next !== theme) {
                setTheme(next);
            }
        };
        window.addEventListener("valqora-theme-change", onThemeEvent);
        return () => window.removeEventListener("valqora-theme-change", onThemeEvent);
    }, [theme]);

    useEffect(() => {
        if (typeof document !== "undefined") {
            const html = document.documentElement;
            if (theme === "light") {
                html.classList.add("light-mode");
                html.classList.remove("dark");
                html.setAttribute("data-theme", "light");
            } else {
                html.classList.remove("light-mode");
                html.classList.add("dark");
                html.setAttribute("data-theme", "dark");
            }
            localStorage.setItem("valqora_theme", theme);
            window.dispatchEvent(new CustomEvent("valqora-theme-change", { detail: { theme } }));
        }
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    useEffect(() => {
        if (flash?.success) {
            setVisibleFlash(flash.success);
            const timer = setTimeout(() => setVisibleFlash(null), 6000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <LanguageProvider>
            <CurrencyProvider initialCurrencies={props.currencies}>
                <WatchlistProvider>
                    <div className={`min-h-screen flex flex-col selection:bg-[#C9A227] selection:text-[#111111] pb-16 lg:pb-0 transition-colors duration-200 ${theme === "light" ? "bg-[#FAFAFA] text-[#111111]" : "bg-[#111111] text-white"}`}>
                        <Navbar theme={theme} toggleTheme={toggleTheme} />
                        {visibleFlash && (
                            <div className="fixed top-20 right-6 z-[60] max-w-md bg-[#161616] border border-[#2E8B57] text-white px-5 py-4 rounded-xl shadow-2xl flex items-start gap-3 animate-fade-in">
                                <CheckCircle2 className="w-5 h-5 text-[#2E8B57] shrink-0 mt-0.5" />
                                <div className="flex-1 text-xs leading-relaxed">
                                    <p className="font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                                        Transaction Confirmed
                                    </p>
                                    <p className="text-gray-200">{visibleFlash}</p>
                                </div>
                                <button
                                    onClick={() => setVisibleFlash(null)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <main className="flex-grow">{children}</main>
                        <Footer />
                        <WatchlistCompareDrawer />
                        <MobileQuickBarAndFloatingActions />
                    </div>
                </WatchlistProvider>
            </CurrencyProvider>
        </LanguageProvider>
    );
};

export default AppLayout;
