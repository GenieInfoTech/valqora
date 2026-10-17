import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

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
        root.render(<App {...props} />);
    },
    progress: {
        color: '#C9A227',
    },
});
