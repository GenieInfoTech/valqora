import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { WatchlistProvider } from './context/WatchlistContext';

const appName = import.meta.env.VITE_APP_NAME || 'VALQORA Global Trading';

createInertiaApp({
    title: (title) => (title ? `${title} | ${appName}` : appName),
    resolve: (name: string) => {
        const pages = import.meta.glob('./Pages/**/*.tsx');
        const pageImporter = pages[`./Pages/${name}.tsx`];
        if (!pageImporter) {
            throw new Error(`Page ./Pages/${name}.tsx not found.`);
        }
        return pageImporter();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        const initialCurrencies = (props.initialPage?.props as any)?.currencies;
        root.render(
            <ThemeProvider>
                <LanguageProvider>
                    <CurrencyProvider initialCurrencies={initialCurrencies}>
                        <WatchlistProvider>
                            <App {...props} />
                        </WatchlistProvider>
                    </CurrencyProvider>
                </LanguageProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: '#C9A227',
    },
});
