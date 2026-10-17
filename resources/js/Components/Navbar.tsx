import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Logo } from '@/Components/Logo';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { PageProps } from '@/types';
import {
    Globe,
    DollarSign,
    Menu,
    X,
    User as UserIcon,
    Shield,
    LogOut,
    ChevronDown,
    Truck,
    Compass,
    FileText,
} from 'lucide-react';

export const Navbar: React.FC = () => {
    const { auth } = usePage<PageProps>().props;
    const { currentCurrency, setCurrency, currencies } = useCurrency();
    const { language, setLanguage, t } = useLanguage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navLinks = [
        { href: '/vehicles', label: t('nav.vehicles') },
        { href: '/sourcing', label: t('nav.sourcing') },
        { href: '/tracking', label: t('nav.tracking') },
        { href: '/insights', label: t('nav.insights') },
        { href: '/divisions', label: t('nav.divisions') },
        { href: '/about', label: t('nav.about') },
        { href: '/contact', label: t('nav.contact') },
    ];

    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <header className="sticky top-0 z-50 w-full bg-[#111111]/95 backdrop-blur-md border-b border-[#222222] transition-colors duration-200">
            {/* Top Bar for High-Level Trading Ticker / Contact */}
            <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-xs text-gray-400 bg-[#0A0A0A] border-b border-[#1E1E1E]">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5 text-[#C9A227]">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        GLOBAL TRADE DESKS: TOKYO | DUBAI | FRANKFURT | SINGAPORE
                    </span>
                    <span className="text-gray-500">|</span>
                    <span>Maritime Dispatch: NYK & Wallenius Regular Ro-Ro Schedules Active</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>Direct Trade Hotline: +81 3 5555 0192</span>
                    <span className="text-gray-600">•</span>
                    <Link href="/contact" className="hover:text-white transition-colors">
                        Consignment Inquiries
                    </Link>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Emblem & Wordmark */}
                    <div className="flex-shrink-0">
                        <Logo size="md" />
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                        {navLinks.map((link) => {
                            const isActive = currentUrl === link.href || (link.href !== '/' && currentUrl.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-150 rounded-md ${
                                        isActive
                                            ? 'text-[#C9A227] font-semibold'
                                            : 'text-gray-300 hover:text-white hover:bg-[#1A1A1A]'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Utilities (Currency, Language, Auth) */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {/* Currency Selector */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setCurrencyOpen(!currencyOpen);
                                    setLangOpen(false);
                                    setUserMenuOpen(false);
                                }}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-gray-300 bg-[#1A1A1A] hover:bg-[#242424] border border-[#2A2A2A] rounded transition"
                                aria-label="Select Currency"
                            >
                                <DollarSign className="w-3.5 h-3.5 text-[#C9A227]" />
                                <span>{currentCurrency}</span>
                                <ChevronDown className="w-3 h-3 text-gray-400" />
                            </button>

                            {currencyOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-2xl py-1 z-50">
                                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-400 tracking-wider border-b border-[#252525]">
                                        Trade Currency
                                    </div>
                                    {currencies.map((curr) => (
                                        <button
                                            key={curr.code}
                                            onClick={() => {
                                                setCurrency(curr.code);
                                                setCurrencyOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#252525] transition ${
                                                currentCurrency === curr.code ? 'text-[#C9A227] font-bold bg-[#202020]' : 'text-gray-300'
                                            }`}
                                        >
                                            <span>{curr.name}</span>
                                            <span className="font-mono text-gray-400">{curr.code} ({curr.symbol})</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setLangOpen(!langOpen);
                                    setCurrencyOpen(false);
                                    setUserMenuOpen(false);
                                }}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-gray-300 bg-[#1A1A1A] hover:bg-[#242424] border border-[#2A2A2A] rounded transition"
                                aria-label="Select Language"
                            >
                                <Globe className="w-3.5 h-3.5 text-[#C9A227]" />
                                <span className="uppercase">{language}</span>
                                <ChevronDown className="w-3 h-3 text-gray-400" />
                            </button>

                            {langOpen && (
                                <div className="absolute right-0 mt-2 w-36 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-2xl py-1 z-50">
                                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-400 tracking-wider border-b border-[#252525]">
                                        Language / 言語
                                    </div>
                                    {[
                                        { code: 'en', label: 'English' },
                                        { code: 'ja', label: '日本語' },
                                        { code: 'ar', label: 'العربية' },
                                        { code: 'de', label: 'Deutsch' },
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code as any);
                                                setLangOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#252525] transition ${
                                                language === lang.code ? 'text-[#C9A227] font-bold bg-[#202020]' : 'text-gray-300'
                                            }`}
                                        >
                                            <span>{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* User Profile or Sign In */}
                        {auth.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setUserMenuOpen(!userMenuOpen);
                                        setCurrencyOpen(false);
                                        setLangOpen(false);
                                    }}
                                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#1C1C1E] border border-[#333333] hover:border-[#C9A227] rounded-md transition"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#C9A227]/20 border border-[#C9A227] text-[#C9A227] flex items-center justify-center text-xs font-bold">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <span className="text-xs font-medium text-white max-w-[100px] truncate">
                                        {auth.user.name.split(' ')[0]}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 uppercase tracking-wider rounded bg-[#2A2A2A] text-gray-300">
                                        {auth.user.role}
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-2xl py-1 z-50">
                                        <div className="px-4 py-2 border-b border-[#252525]">
                                            <p className="text-xs font-semibold text-white truncate">{auth.user.name}</p>
                                            <p className="text-[11px] text-gray-400 truncate">{auth.user.email}</p>
                                            {auth.user.company_name && (
                                                <p className="text-[10px] text-[#C9A227] font-mono mt-0.5 truncate">{auth.user.company_name}</p>
                                            )}
                                        </div>

                                        <Link
                                            href="/portal"
                                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-[#252525] transition"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <Compass className="w-4 h-4 text-[#C9A227]" />
                                            Client Portal Overview
                                        </Link>

                                        <Link
                                            href="/portal/shipments"
                                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-[#252525] transition"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <Truck className="w-4 h-4 text-[#C9A227]" />
                                            My Vessel Consignments
                                        </Link>

                                        <Link
                                            href="/portal/documents"
                                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-200 hover:bg-[#252525] transition"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <FileText className="w-4 h-4 text-[#C9A227]" />
                                            Trade Document Vault
                                        </Link>

                                        {auth.user.role === 'admin' && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center gap-2.5 px-4 py-2 text-xs text-amber-300 font-semibold bg-[#222216] hover:bg-[#2a2a1a] transition border-t border-b border-[#3a3518]"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <Shield className="w-4 h-4 text-[#C9A227]" />
                                                Executive Admin Console
                                            </Link>
                                        )}

                                        <button
                                            onClick={() => router.post('/logout')}
                                            className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-[#252525] transition"
                                        >
                                            <LogOut className="w-4 h-4 text-rose-400" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-black bg-[#C9A227] hover:bg-[#dfba38] uppercase rounded transition-all duration-200 shadow"
                            >
                                <UserIcon className="w-3.5 h-3.5" />
                                <span>{t('nav.login')}</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <div className="flex lg:hidden items-center gap-2">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 text-gray-400 hover:text-white focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="lg:hidden bg-[#141414] border-b border-[#2A2A2A] px-4 pt-2 pb-6 space-y-3">
                    <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#222222]">
                        <button
                            onClick={() => {
                                const nextIndex = (currencies.findIndex((c) => c.code === currentCurrency) + 1) % currencies.length;
                                setCurrency(currencies[nextIndex].code);
                            }}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1C1C1E] border border-[#2E2E30] text-xs text-gray-200 rounded"
                        >
                            <DollarSign className="w-3.5 h-3.5 text-[#C9A227]" />
                            <span>Currency: <strong>{currentCurrency}</strong></span>
                        </button>

                        <button
                            onClick={() => {
                                const codes = ['en', 'ja', 'ar', 'de'];
                                const nextIndex = (codes.indexOf(language) + 1) % codes.length;
                                setLanguage(codes[nextIndex] as any);
                            }}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1C1C1E] border border-[#2E2E30] text-xs text-gray-200 rounded"
                        >
                            <Globe className="w-3.5 h-3.5 text-[#C9A227]" />
                            <span>Lang: <strong className="uppercase">{language}</strong></span>
                        </button>
                    </div>

                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-[#C9A227] hover:bg-[#1E1E1E] rounded-md"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-3 border-t border-[#222222]">
                        {auth.user ? (
                            <div className="space-y-2">
                                <div className="px-3 py-2 text-xs text-gray-400">
                                    Signed in as <strong className="text-white">{auth.user.name}</strong> ({auth.user.role})
                                </div>
                                <Link
                                    href="/portal"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full text-center py-2 text-xs font-semibold text-black bg-[#C9A227] rounded"
                                >
                                    Client Portal
                                </Link>
                                {auth.user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        onClick={() => setMobileOpen(false)}
                                        className="block w-full text-center py-2 text-xs font-semibold text-white bg-[#252525] border border-[#C9A227] rounded"
                                    >
                                        Executive Admin Console
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        router.post('/logout');
                                    }}
                                    className="block w-full text-center py-2 text-xs text-rose-400 hover:bg-[#1C1C1E] rounded"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="block w-full text-center py-2.5 text-xs font-semibold text-black bg-[#C9A227] uppercase tracking-wider rounded"
                            >
                                {t('nav.login')}
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
