import React from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { Logo } from '@/Components/Logo';
import { FlashMessage } from '@/Components/FlashMessage';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { PageProps } from '@/types';
import {
    LayoutDashboard,
    FileSpreadsheet,
    Truck,
    FolderLock,
    Search,
    Car,
    LogOut,
    ArrowLeft,
    Shield,
    ExternalLink,
} from 'lucide-react';

interface PortalLayoutProps {
    title: string;
    children: React.ReactNode;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ title, children }) => {
    const { auth, currencies } = usePage<PageProps>().props;
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';

    const navigation = [
        { name: 'Portal Overview', href: '/portal', icon: LayoutDashboard },
        { name: 'Formal Quotations', href: '/portal/quotations', icon: FileSpreadsheet },
        { name: 'Vessel Shipments', href: '/portal/shipments', icon: Truck },
        { name: 'Document Vault', href: '/portal/documents', icon: FolderLock },
    ];

    return (
        <CurrencyProvider initialCurrencies={currencies} defaultCode={auth.user?.preferred_currency || 'USD'}>
            <LanguageProvider>
                <div className="min-h-screen bg-[#0E0E10] text-gray-100 flex flex-col md:flex-row">
                    <Head title={`${title} | Client Portal`} />

                    {/* Sidebar */}
                    <aside className="w-full md:w-64 bg-[#141416] border-r border-[#222226] flex flex-col justify-between flex-shrink-0">
                        <div>
                            {/* Brand Header */}
                            <div className="p-5 border-b border-[#222226]">
                                <Logo size="sm" />
                                <div className="mt-4 px-3 py-2 bg-[#1B1B1E] border border-[#2B2B30] rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                                            {auth.user?.name}
                                        </span>
                                        <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded bg-[#C9A227]/20 text-[#C9A227] border border-[#C9A227]/40">
                                            {auth.user?.role}
                                        </span>
                                    </div>
                                    {auth.user?.company_name && (
                                        <p className="text-[10px] text-gray-400 truncate mt-0.5">
                                            {auth.user.company_name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Nav links */}
                            <nav className="p-3 space-y-1">
                                <p className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-500">
                                    Account Operations
                                </p>
                                {navigation.map((item) => {
                                    const active = currentUrl === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                                                active
                                                    ? 'bg-[#C9A227] text-black font-semibold'
                                                    : 'text-gray-300 hover:text-white hover:bg-[#1E1E22]'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4 flex-shrink-0" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}

                                <div className="pt-4 pb-1">
                                    <p className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-500">
                                        Trade Directives
                                    </p>
                                    <Link
                                        href="/vehicles"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-[#1E1E22] transition"
                                    >
                                        <Car className="w-4 h-4 text-[#C9A227]" />
                                        <span>Browse Inventory</span>
                                    </Link>
                                    <Link
                                        href="/sourcing"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-[#1E1E22] transition"
                                    >
                                        <Search className="w-4 h-4 text-[#C9A227]" />
                                        <span>Initiate Sourcing</span>
                                    </Link>
                                </div>

                                {auth.user?.role === 'admin' && (
                                    <div className="pt-2">
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-3 px-3 py-2 bg-[#262414] border border-[#484218] rounded-lg text-xs text-amber-300 font-semibold hover:bg-[#322f18] transition"
                                        >
                                            <Shield className="w-4 h-4 text-[#C9A227]" />
                                            <span>Admin Console</span>
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>

                        {/* Bottom Actions */}
                        <div className="p-4 border-t border-[#222226] space-y-2">
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-white transition"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>Return to Main Website</span>
                            </Link>

                            <button
                                onClick={() => router.post('/logout')}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-[#201518] rounded-lg transition"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                        {/* Topbar */}
                        <header className="h-16 bg-[#141416]/80 backdrop-blur-md border-b border-[#222226] px-6 flex items-center justify-between sticky top-0 z-40">
                            <div>
                                <h1 className="text-base font-bold text-white tracking-wide">{title}</h1>
                                <p className="text-[11px] text-gray-400">VALQORA Sovereign Commercial Trading Console</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/vehicles"
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C20] hover:bg-[#26262C] border border-[#2E2E34] text-xs font-medium text-gray-200 rounded-md transition"
                                >
                                    <span>Marketplace</span>
                                    <ExternalLink className="w-3 h-3 text-gray-400" />
                                </Link>
                            </div>
                        </header>

                        {/* Page Content */}
                        <main className="p-6 md:p-8 flex-1">
                            {children}
                        </main>
                    </div>

                    <FlashMessage />
                </div>
            </LanguageProvider>
        </CurrencyProvider>
    );
};
