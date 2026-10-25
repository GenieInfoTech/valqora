import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Logo } from '@/Components/Logo';
import { useLanguage, Language } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { PageProps } from '@/types';
import {
    Search,
    Globe,
    DollarSign,
    Sun,
    Moon,
    Heart,
    Scale,
    Phone,
    ShieldCheck,
    Building2,
    Lock,
    ArrowUpRight,
    Menu,
    X,
    ChevronDown,
    Check,
    LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
    theme?: 'dark' | 'light';
    toggleTheme?: () => void;
}

const LANGUAGES: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'EN', native: 'English' },
    { code: 'ja', label: 'JA', native: '日本語' },
    { code: 'ar', label: 'AR', native: 'العربية' },
    { code: 'zh', label: 'ZH', native: '中文' },
    { code: 'ko', label: 'KO', native: '한국어' },
];

export function Navbar({ theme: propTheme, toggleTheme: propToggleTheme }: NavbarProps) {
    const { props, url } = usePage<PageProps>();
    const user = props.auth?.user;
    const { language, setLanguage, t } = useLanguage();
    const { currency, setCurrency, availableCurrencies } = useCurrency();
    const { savedVehicles = [], compareVehicles = [], openDrawer } = useWatchlist();

    // Standalone theme state fallback if not controlled via props
    const [localTheme, setLocalTheme] = useState<'dark' | 'light'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('valqora_theme');
            if (saved === 'light' || saved === 'dark') return saved;
        }
        return 'dark';
    });

    const activeTheme = propTheme ?? localTheme;
    const isLight = activeTheme === 'light';

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const onThemeEvent = (e: Event) => {
            const customEvent = e as CustomEvent<{ theme: 'dark' | 'light' }>;
            const next = customEvent.detail?.theme;
            if ((next === 'light' || next === 'dark') && next !== localTheme) {
                setLocalTheme(next);
            }
        };
        window.addEventListener('valqora-theme-change', onThemeEvent);
        return () => window.removeEventListener('valqora-theme-change', onThemeEvent);
    }, [localTheme]);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const html = document.documentElement;
            if (activeTheme === 'light') {
                html.classList.add('light-mode');
                html.classList.remove('dark');
                html.setAttribute('data-theme', 'light');
            } else {
                html.classList.remove('light-mode');
                html.classList.add('dark');
                html.setAttribute('data-theme', 'dark');
            }
            localStorage.setItem('valqora_theme', activeTheme);
            window.dispatchEvent(new CustomEvent('valqora-theme-change', { detail: { theme: activeTheme } }));
        }
    }, [activeTheme]);

    const handleToggleTheme = () => {
        if (propToggleTheme) {
            propToggleTheme();
        } else {
            setLocalTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
        }
    };

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    const currencyRef = useRef<HTMLDivElement>(null);
    const langRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
                setCurrencyOpen(false);
            }
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setSearchOpen(false);
        router.get('/vehicles', { search: searchQuery.trim() });
    };

    const navLinks = [
        { label: t('nav.inventory', 'Inventory'), href: '/vehicles' },
        { label: t('nav.sourcing', 'Sourcing'), href: '/sourcing' },
        { label: t('nav.tracking', 'Tracking'), href: '/tracking' },
        { label: t('nav.services', 'Services'), href: '/services' },
        { label: t('nav.divisions', 'Divisions'), href: '/divisions' },
        { label: t('nav.insights', 'Insights'), href: '/news' },
        { label: t('nav.about', 'About'), href: '/about' },
        { label: t('nav.contact', 'Contact'), href: '/contact' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        if (href === '/news' || href === '/insights') {
            return url.startsWith('/news') || url.startsWith('/insights') || url.startsWith('/global-markets');
        }
        if (href === '/vehicles' || href === '/inventory') {
            return url.startsWith('/vehicles') || url.startsWith('/inventory');
        }
        return url.startsWith(href);
    };

    const currentCurrencyCode = typeof currency === 'string' ? currency : (currency as any)?.code || 'USD';

    return (
        <header className="sticky top-0 z-50 w-full transition-colors duration-200">
            {/* =====================================================================
                TIER 1: INSTITUTIONAL UTILITY BAR (36px)
            ===================================================================== */}
            <div
                className={`w-full border-b transition-colors duration-200 ${
                    isLight
                        ? 'bg-[#F3F4F6] border-[#E5E7EB] text-[#4B5563]'
                        : 'bg-[#0A0A0A] border-white/[0.07] text-[#9CA3AF]'
                }`}
            >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-between text-[11px] font-medium tracking-wide">
                    {/* Left: Corporate Governance & Direct Desk */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/investor-relations"
                            className={`inline-flex items-center gap-1.5 transition-colors ${
                                isLight ? 'hover:text-[#111111]' : 'hover:text-white'
                            }`}
                        >
                            <Building2 className="w-3 h-3 text-[#C9A227]" />
                            <span>{t('nav.investor_relations', 'Investor Relations')}</span>
                        </Link>
                        <span className={`${isLight ? 'text-[#D1D5DB]' : 'text-white/15'}`}>|</span>
                        <Link
                            href="/esg"
                            className={`inline-flex items-center gap-1.5 transition-colors ${
                                isLight ? 'hover:text-[#111111]' : 'hover:text-white'
                            }`}
                        >
                            <ShieldCheck className="w-3 h-3 text-[#2E8B57]" />
                            <span>{t('nav.esg', 'ESG & Governance')}</span>
                        </Link>
                        <span className={`hidden sm:inline ${isLight ? 'text-[#D1D5DB]' : 'text-white/15'}`}>|</span>
                        <a
                            href="tel:+81355550199"
                            className={`hidden sm:inline-flex items-center gap-1.5 font-mono text-[10.5px] transition-colors ${
                                isLight ? 'hover:text-[#111111]' : 'hover:text-white'
                            }`}
                        >
                            <Phone className="w-2.5 h-2.5 text-[#C9A227]" />
                            <span>+81 3 5555 0199</span>
                        </a>
                    </div>

                    {/* Right: Saved/Compare, Currency, Language, Theme, Portal */}
                    <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">

                        <span className={`hidden lg:inline ${isLight ? 'text-[#D1D5DB]' : 'text-white/15'}`}>|</span>

                        {/* Saved & Compare Quick Triggers */}
                        <div className="hidden md:flex items-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => openDrawer('saved')}
                                className={`inline-flex items-center gap-1 transition-colors ${
                                    isLight ? 'hover:text-[#111111]' : 'hover:text-white'
                                }`}
                                title={t('nav.saved', 'Saved Vehicles')}
                            >
                                <Heart className="w-3 h-3 text-[#C9A227]" />
                                <span>{t('nav.saved', 'Saved')}</span>
                                {savedVehicles.length > 0 && (
                                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#C9A227] text-[#111111] font-mono text-[9.5px] font-bold">
                                        {savedVehicles.length}
                                    </span>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => openDrawer('compare')}
                                className={`inline-flex items-center gap-1 transition-colors ${
                                    isLight ? 'hover:text-[#111111]' : 'hover:text-white'
                                }`}
                                title={t('nav.compare', 'Compare Vehicles')}
                            >
                                <Scale className="w-3 h-3 text-[#C9A227]" />
                                <span>{t('nav.compare', 'Compare')}</span>
                                {compareVehicles.length > 0 && (
                                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#C9A227] text-[#111111] font-mono text-[9.5px] font-bold">
                                        {compareVehicles.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        <span className={`hidden md:inline ${isLight ? 'text-[#D1D5DB]' : 'text-white/15'}`}>|</span>

                        {/* Currency Selector */}
                        <div className="relative" ref={currencyRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setCurrencyOpen(!currencyOpen);
                                    setLangOpen(false);
                                }}
                                className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold transition-colors ${
                                    isLight ? 'text-[#111111] hover:text-[#9A7816]' : 'text-white/90 hover:text-[#C9A227]'
                                }`}
                                aria-label="Select Currency"
                            >
                                <DollarSign className="w-3 h-3 text-[#C9A227]" />
                                <span>{currentCurrencyCode}</span>
                                <ChevronDown className="w-3 h-3 opacity-60" />
                            </button>

                            {currencyOpen && (
                                <div
                                    className={`absolute right-0 mt-2 w-44 rounded-lg border shadow-2xl py-1.5 z-50 ${
                                        isLight
                                            ? 'bg-white border-[#E5E7EB] text-[#111111]'
                                            : 'bg-[#161616] border-white/10 text-white'
                                    }`}
                                >
                                    <div className="px-3 py-1 text-[9.5px] font-mono uppercase tracking-widest text-[#C9A227] border-b border-current/10 mb-1">
                                        Settlement Currency
                                    </div>
                                    {availableCurrencies.map((c) => {
                                        const code = typeof c === 'string' ? c : c.code;
                                        const symbol = typeof c === 'string' ? '' : c.symbol;
                                        const selected = code === currentCurrencyCode;
                                        return (
                                            <button
                                                key={code}
                                                type="button"
                                                onClick={() => {
                                                    setCurrency(code as any);
                                                    setCurrencyOpen(false);
                                                }}
                                                className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between transition-colors ${
                                                    selected
                                                        ? 'bg-[#C9A227]/15 text-[#C9A227] font-semibold'
                                                        : isLight
                                                        ? 'hover:bg-[#F3F4F6] text-[#111111]'
                                                        : 'hover:bg-white/5 text-white/80'
                                                }`}
                                            >
                                                <span className="font-mono">
                                                    {code} {symbol ? `(${symbol})` : ''}
                                                </span>
                                                {selected && <Check className="w-3.5 h-3.5 text-[#C9A227]" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Language Selector */}
                        <div className="relative" ref={langRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setLangOpen(!langOpen);
                                    setCurrencyOpen(false);
                                }}
                                className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase transition-colors ${
                                    isLight ? 'text-[#111111] hover:text-[#9A7816]' : 'text-white/90 hover:text-[#C9A227]'
                                }`}
                                aria-label="Select Language"
                            >
                                <Globe className="w-3 h-3 text-[#C9A227]" />
                                <span>{language.toUpperCase()}</span>
                                <ChevronDown className="w-3 h-3 opacity-60" />
                            </button>

                            {langOpen && (
                                <div
                                    className={`absolute right-0 mt-2 w-40 rounded-lg border shadow-2xl py-1.5 z-50 ${
                                        isLight
                                            ? 'bg-white border-[#E5E7EB] text-[#111111]'
                                            : 'bg-[#161616] border-white/10 text-white'
                                    }`}
                                >
                                    <div className="px-3 py-1 text-[9.5px] font-mono uppercase tracking-widest text-[#C9A227] border-b border-current/10 mb-1">
                                        Global Locale
                                    </div>
                                    {LANGUAGES.map((l) => {
                                        const selected = language === l.code;
                                        return (
                                            <button
                                                key={l.code}
                                                type="button"
                                                onClick={() => {
                                                    setLanguage(l.code);
                                                    setLangOpen(false);
                                                }}
                                                className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between transition-colors ${
                                                    selected
                                                        ? 'bg-[#C9A227]/15 text-[#C9A227] font-semibold'
                                                        : isLight
                                                        ? 'hover:bg-[#F3F4F6] text-[#111111]'
                                                        : 'hover:bg-white/5 text-white/80'
                                                }`}
                                            >
                                                <span>
                                                    <strong className="font-mono mr-1.5">{l.label}</strong>
                                                    <span className="opacity-75">{l.native}</span>
                                                </span>
                                                {selected && <Check className="w-3.5 h-3.5 text-[#C9A227]" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Theme Switcher Button */}
                        <button
                            type="button"
                            onClick={handleToggleTheme}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10.5px] font-mono transition-all ${
                                isLight
                                    ? 'bg-white border-[#D1D5DB] text-[#111111] hover:border-[#C9A227]'
                                    : 'bg-white/[0.04] border-white/10 text-white/85 hover:border-[#C9A227]/50 hover:text-[#C9A227]'
                            }`}
                            title={isLight ? 'Switch to Executive Dark Mode' : 'Switch to Executive Light Mode'}
                            aria-label="Toggle Theme"
                        >
                            {isLight ? (
                                <>
                                    <Moon className="w-3 h-3 text-[#9A7816]" />
                                    <span className="hidden sm:inline">Dark</span>
                                </>
                            ) : (
                                <>
                                    <Sun className="w-3 h-3 text-[#C9A227]" />
                                    <span className="hidden sm:inline">Light</span>
                                </>
                            )}
                        </button>

                        {/* Portal Login / Dashboard Pill */}
                        {user ? (
                            <Link
                                href="/dashboard"
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[11px] font-semibold transition-all ${
                                    isLight
                                        ? 'bg-[#111111] text-white border-[#111111] hover:bg-[#2D2D2D]'
                                        : 'bg-white/[0.06] border-white/15 text-white hover:border-[#C9A227] hover:text-[#C9A227]'
                                }`}
                            >
                                <LayoutDashboard className="w-3 h-3 text-[#C9A227]" />
                                <span>{t('nav.dashboard', 'Dashboard')}</span>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-[11px] font-semibold transition-all ${
                                    isLight
                                        ? 'bg-white border-[#D1D5DB] text-[#111111] hover:border-[#C9A227] hover:text-[#9A7816]'
                                        : 'bg-white/[0.05] border-white/15 text-white/90 hover:border-[#C9A227] hover:text-[#C9A227]'
                                }`}
                            >
                                <Lock className="w-2.5 h-2.5 text-[#C9A227]" />
                                <span>{t('nav.portal_login', 'Portal Login')}</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* =====================================================================
                TIER 2: MAIN ARCHITECTURAL HEADER (76px)
            ===================================================================== */}
            <div
                className={`w-full border-b transition-all duration-200 ${
                    isLight
                        ? scrolled
                            ? 'bg-white/95 backdrop-blur-md border-[#E5E7EB] shadow-sm'
                            : 'bg-white border-[#E5E7EB]'
                        : scrolled
                        ? 'bg-[#111111]/95 backdrop-blur-md border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.65)]'
                        : 'bg-[#111111] border-white/[0.08]'
                }`}
            >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-[76px] flex items-center justify-between gap-4">
                    {/* Left: Master Horizontal Logo Lockup */}
                    <div className="shrink-0 flex items-center">
                        <Link href="/" className="focus:outline-none group">
                            <Logo variant="horizontal" theme={isLight ? 'light' : 'dark'} />
                        </Link>
                    </div>

                    {/* Center: 8 Single-Line Architectural Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Primary Navigation">
                        {navLinks.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-3 py-2 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150 ${
                                        active
                                            ? 'text-[#C9A227] font-semibold'
                                            : isLight
                                            ? 'text-[#374151] hover:text-[#111111]'
                                            : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                    {active && (
                                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C9A227] rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Search Trigger + Primary Gold CTA */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <button
                            type="button"
                            onClick={() => setSearchOpen(!searchOpen)}
                            className={`p-2.5 rounded-lg border transition-colors ${
                                isLight
                                    ? 'border-[#E5E7EB] text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111111]'
                                    : 'border-white/10 text-white/80 hover:bg-white/5 hover:text-[#C9A227]'
                            }`}
                            aria-label={t('nav.search', 'Search Inventory')}
                            title={t('nav.search', 'Search Inventory')}
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        <Link
                            href="/sourcing"
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#d8b132] text-[#111111] font-semibold text-[13px] tracking-wide whitespace-nowrap transition-all duration-150 shadow-sm"
                        >
                            <span>{t('nav.request_sourcing', 'Request Sourcing')}</span>
                            <ArrowUpRight className="w-4 h-4 stroke-[2.25]" />
                        </Link>

                        {/* Mobile Hamburger Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`lg:hidden p-2.5 rounded-lg border transition-colors ${
                                isLight
                                    ? 'border-[#E5E7EB] text-[#111111] hover:bg-[#F3F4F6]'
                                    : 'border-white/10 text-white hover:bg-white/5'
                            }`}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Expandable Global Search Bar */}
                {searchOpen && (
                    <div
                        className={`border-t px-4 sm:px-6 lg:px-10 py-3.5 transition-colors ${
                            isLight ? 'bg-[#F9FAFB] border-[#E5E7EB]' : 'bg-[#161616] border-white/10'
                        }`}
                    >
                        <form
                            onSubmit={handleSearchSubmit}
                            className="max-w-[1440px] mx-auto flex items-center gap-3"
                        >
                            <Search className="w-4 h-4 text-[#C9A227] shrink-0" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by make, model, chassis code (e.g. Land Cruiser 300, GT3 RS, stock ID)..."
                                className={`w-full bg-transparent text-sm focus:outline-none ${
                                    isLight
                                        ? 'text-[#111111] placeholder-[#6B7280]'
                                        : 'text-white placeholder-white/40'
                                }`}
                            />
                            <button
                                type="submit"
                                className="px-4 py-1.5 rounded bg-[#C9A227] text-[#111111] text-xs font-semibold uppercase tracking-wider shrink-0"
                            >
                                {t('nav.search', 'Search')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="p-1 opacity-60 hover:opacity-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* =====================================================================
                MOBILE NAVIGATION DRAWER
            ===================================================================== */}
            {mobileMenuOpen && (
                <div
                    className={`lg:hidden border-b px-6 py-6 space-y-5 ${
                        isLight
                            ? 'bg-white border-[#E5E7EB] text-[#111111]'
                            : 'bg-[#111111] border-white/10 text-white'
                    }`}
                >
                    <div className="grid grid-cols-1 gap-1">
                        {navLinks.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                                        active
                                            ? 'bg-[#C9A227]/15 text-[#C9A227] font-semibold'
                                            : isLight
                                            ? 'text-[#374151] hover:bg-[#F3F4F6]'
                                            : 'text-white/85 hover:bg-white/5'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-4 border-t border-current/10 flex flex-col gap-2.5">
                        <Link
                            href="/sourcing"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full py-3 rounded-lg bg-[#C9A227] text-[#111111] font-semibold text-center text-sm flex items-center justify-center gap-1.5"
                        >
                            <span>{t('nav.request_sourcing', 'Request Sourcing')}</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                            <Link
                                href="/investor-relations"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 rounded border border-current/15 text-xs text-center font-medium"
                            >
                                {t('nav.investor_relations', 'Investor Relations')}
                            </Link>
                            <Link
                                href="/esg"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 rounded border border-current/15 text-xs text-center font-medium"
                            >
                                {t('nav.esg', 'ESG')}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
