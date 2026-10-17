import React from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { Logo } from '@/Components/Logo';
import { FlashMessage } from '@/Components/FlashMessage';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { PageProps } from '@/types';
import {
    LayoutDashboard,
    Car,
    Mail,
    FileSpreadsheet,
    Truck,
    ArrowLeft,
    LogOut,
    ShieldAlert,
    ExternalLink,
} from 'lucide-react';

interface AdminLayoutProps {
    title: string;
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
    const { auth, currencies } = usePage<PageProps>().props;
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';

    const navigation = [
        { name: 'Executive Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Vehicle Inventory', href: '/admin/vehicles', icon: Car },
        { name: 'Inquiry Pipeline', href: '/admin/inquiries', icon: Mail },
        { name: 'Quotations', href: '/admin/quotations', icon: FileSpreadsheet },
        { name: 'Ocean Shipments', href: '/admin/shipments', icon: Truck },
    ];

    return (
        <CurrencyProvider initialCurrencies={currencies}>
            <LanguageProvider>
                <div className="min-h-screen bg-[#0A0A0C] text-gray-100 flex flex-col md:flex-row">
                    <Head title={`${title} | Executive Administration`} />

                    {/* Admin Sidebar */}
                    <aside className="w-full md:w-64 bg-[#111114] border-r border-[#1F1F24] flex flex-col justify-between flex-shrink-0">
                        <div>
                            {/* Brand Header */}
                            <div className="p-5 border-b border-[#1F1F24]">
                                <Logo size="sm" />
                                <div className="mt-4 px-3 py-2 bg-[#1C180E] border border-[#3E3414] rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ShieldAlert className="w-4 h-4 text-[#C9A227]" />
                                        <span className="text-xs font-bold text-[#C9A227] tracking-wider uppercase">
                                            Admin Directorate
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-mono">v2.6</span>
                                </div>
                            </div>

                            {/* Nav links */}
                            <nav className="p-3 space-y-1">
                                <p className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-500">
                                    Management Desks
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
                                                    ? 'bg-[#C9A227] text-black font-semibold shadow'
                                                    : 'text-gray-300 hover:text-white hover:bg-[#1C1C22]'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4 flex-shrink-0" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}

                                <div className="pt-4">
                                    <p className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-500">
                                        Portals
                                    </p>
                                    <Link
                                        href="/portal"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-[#181820] transition"
                                    >
                                        <ExternalLink className="w-4 h-4 text-[#C9A227]" />
                                        <span>Client View</span>
                                    </Link>
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-[#181820] transition"
                                    >
                                        <ArrowLeft className="w-4 h-4 text-[#C9A227]" />
                                        <span>Live Website</span>
                                    </Link>
                                </div>
                            </nav>
                        </div>

                        {/* Bottom Actions */}
                        <div className="p-4 border-t border-[#1F1F24]">
                            <div className="text-[11px] text-gray-400 mb-2 truncate">
                                Signed in as <strong className="text-white">{auth.user?.name}</strong>
                            </div>
                            <button
                                onClick={() => router.post('/logout')}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-[#201416] rounded-lg transition"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Sign Out Admin</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                        <header className="h-16 bg-[#111114]/90 backdrop-blur-md border-b border-[#1F1F24] px-6 flex items-center justify-between sticky top-0 z-40">
                            <div>
                                <h1 className="text-base font-bold text-white tracking-wide">{title}</h1>
                                <p className="text-[11px] text-gray-400">VALQORA Master Operations & CRM Control</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    ALL SYSTEMS NORMAL
                                </span>
                            </div>
                        </header>

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
