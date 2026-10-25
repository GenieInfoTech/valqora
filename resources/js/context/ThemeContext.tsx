import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
    isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeToDOM(mode: ThemeMode) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    if (mode === 'light') {
        root.classList.add('light-mode');
        root.classList.remove('dark');
    } else {
        root.classList.remove('light-mode');
        root.classList.add('dark');
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('valqora_theme');
            if (saved === 'light' || saved === 'dark') {
                return saved;
            }
            if (document.documentElement.classList.contains('light-mode')) {
                return 'light';
            }
        }
        return 'dark';
    });

    useEffect(() => {
        applyThemeToDOM(theme);
    }, [theme]);

    useEffect(() => {
        const handleCustomEvent = (e: Event) => {
            const customEvent = e as CustomEvent<ThemeMode>;
            if (customEvent.detail === 'light' || customEvent.detail === 'dark') {
                setThemeState(customEvent.detail);
                applyThemeToDOM(customEvent.detail);
            }
        };
        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'valqora_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
                setThemeState(e.newValue);
                applyThemeToDOM(e.newValue);
            }
        };
        window.addEventListener('valqora-theme-change', handleCustomEvent);
        window.addEventListener('storage', handleStorage);
        return () => {
            window.removeEventListener('valqora-theme-change', handleCustomEvent);
            window.removeEventListener('storage', handleStorage);
        };
    }, []);

    const setTheme = (next: ThemeMode) => {
        setThemeState(next);
        if (typeof window !== 'undefined') {
            localStorage.setItem('valqora_theme', next);
            applyThemeToDOM(next);
            window.dispatchEvent(new CustomEvent('valqora-theme-change', { detail: next }));
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                toggleTheme,
                isLight: theme === 'light',
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        const isLightDom =
            typeof document !== 'undefined' &&
            document.documentElement.classList.contains('light-mode');
        const fallbackTheme: ThemeMode = isLightDom ? 'light' : 'dark';
        return {
            theme: fallbackTheme,
            isLight: fallbackTheme === 'light',
            setTheme: (next: ThemeMode) => {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('valqora_theme', next);
                    applyThemeToDOM(next);
                    window.dispatchEvent(new CustomEvent('valqora-theme-change', { detail: next }));
                }
            },
            toggleTheme: () => {
                const next: ThemeMode =
                    typeof document !== 'undefined' &&
                    document.documentElement.classList.contains('light-mode')
                        ? 'dark'
                        : 'light';
                if (typeof window !== 'undefined') {
                    localStorage.setItem('valqora_theme', next);
                    applyThemeToDOM(next);
                    window.dispatchEvent(new CustomEvent('valqora-theme-change', { detail: next }));
                }
            },
        };
    }
    return context;
}
