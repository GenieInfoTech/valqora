import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '@/Components/Navbar';
import { Footer } from '@/Components/Footer';
import { FlashMessage } from '@/Components/FlashMessage';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { PageProps } from '@/types';

interface AppLayoutProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ title, description, children }) => {
    const { currencies, auth } = usePage<PageProps>().props;

    const metaDescription =
        description ||
        'VALQORA Global Trading — Sovereign international automotive export, verified 160-point inspection, maritime Ro-Ro logistics, and cross-border commercial trade execution.';

    return (
        <CurrencyProvider initialCurrencies={currencies} defaultCode={auth.user?.preferred_currency || 'USD'}>
            <LanguageProvider>
                <div className="min-h-screen flex flex-col bg-[#111111] text-gray-100 selection:bg-[#C9A227] selection:text-black">
                    <Head>
                        <title>{title ? `${title} | VALQORA Global Trading` : 'VALQORA | Premier International Trading & Automotive Export'}</title>
                        <meta name="description" content={metaDescription} />
                        <meta property="og:title" content={title || 'VALQORA Global Trading'} />
                        <meta property="og:description" content={metaDescription} />
                        <meta property="og:image" content="/images/valqora-logo.jpg" />
                        <meta name="theme-color" content="#111111" />
                    </Head>

                    <Navbar />

                    <main className="flex-1">
                        {children}
                    </main>

                    <FlashMessage />

                    <Footer />
                </div>
            </LanguageProvider>
        </CurrencyProvider>
    );
};
