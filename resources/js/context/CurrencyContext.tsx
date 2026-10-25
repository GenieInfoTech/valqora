import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency } from '../types';

interface CurrencyContextType {
    currentCurrency: string;
    currency: string;
    currentCurrencyObj: Currency;
    currencies: Currency[];
    availableCurrencies: Currency[];
    setCurrency: (code: string) => void;
    setCurrencyByCode: (code: string) => void;
    formatPrice: (amountInUsd: number) => string;
    formatIsoPrice: (amountInUsd: number) => string;
}

const defaultCurrencies: Currency[] = [
    { id: 1, code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0, exchange_rate: 1.000000, is_default: true },
    { id: 2, code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 152.5, exchange_rate: 152.500000, is_default: false },
    { id: 3, code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, exchange_rate: 0.920000, is_default: false },
    { id: 4, code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52, exchange_rate: 1.520000, is_default: false },
    { id: 5, code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, exchange_rate: 0.790000, is_default: false },
    { id: 6, code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', rate: 119.5, exchange_rate: 119.500000, is_default: false },
    { id: 7, code: 'AED', name: 'UAE Dirham', symbol: 'AED ', rate: 3.67, exchange_rate: 3.672500, is_default: false },
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const normalizeCurrency = (c: any, idx: number): Currency => {
    const rateVal = Number(c?.exchange_rate ?? c?.rate ?? 1);
    return {
        id: c?.id ?? idx + 1,
        code: String(c?.code ?? 'USD'),
        name: String(c?.name ?? c?.code ?? 'US Dollar'),
        symbol: String(c?.symbol ?? '$'),
        rate: Number.isFinite(rateVal) && rateVal > 0 ? rateVal : 1,
        exchange_rate: Number.isFinite(rateVal) && rateVal > 0 ? rateVal : 1,
        is_default: Boolean(c?.is_default ?? c?.code === 'USD'),
    };
};

export const CurrencyProvider: React.FC<{
    children: ReactNode;
    initialCurrencies?: Currency[];
    defaultCode?: string;
}> = ({ children, initialCurrencies, defaultCode }) => {
    const mergedCurrencies = React.useMemo(() => {
        if (!initialCurrencies || !Array.isArray(initialCurrencies) || initialCurrencies.length === 0) {
            return defaultCurrencies;
        }
        const map = new Map<string, Currency>();
        initialCurrencies.forEach((c, idx) => {
            const normalized = normalizeCurrency(c, idx);
            map.set(normalized.code, normalized);
        });
        defaultCurrencies.forEach((dc, idx) => {
            if (!map.has(dc.code)) {
                map.set(dc.code, normalizeCurrency(dc, idx + 10));
            }
        });
        return Array.from(map.values());
    }, [initialCurrencies]);

    const [currencies] = useState<Currency[]>(mergedCurrencies);
    const [currentCurrencyObj, setCurrentCurrencyObj] = useState<Currency>(() => {
        if (typeof window !== 'undefined') {
            const savedCode = localStorage.getItem('valqora_currency');
            if (savedCode) {
                const found = mergedCurrencies.find((c) => c.code === savedCode);
                if (found) return found;
            }
        }
        if (defaultCode) {
            const foundDefault = mergedCurrencies.find((c) => c.code === defaultCode);
            if (foundDefault) return foundDefault;
        }
        return mergedCurrencies.find((c) => c.is_default) || mergedCurrencies[0] || defaultCurrencies[0];
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const savedCode = localStorage.getItem('valqora_currency');
        if (savedCode) {
            const found = currencies.find((c) => c.code === savedCode);
            if (found) setCurrentCurrencyObj(found);
        }

        const handleCurrencyEvent = (e: Event) => {
            const customEvent = e as CustomEvent<{ code: string }>;
            const nextCode = customEvent.detail?.code;
            if (nextCode) {
                const found = currencies.find((c) => c.code === nextCode);
                if (found) setCurrentCurrencyObj(found);
            }
        };

        window.addEventListener('valqora-currency-change', handleCurrencyEvent);
        return () => window.removeEventListener('valqora-currency-change', handleCurrencyEvent);
    }, [currencies]);

    const setCurrencyByCode = (code: string) => {
        const found = currencies.find((c) => c.code === code);
        if (found) {
            setCurrentCurrencyObj(found);
            if (typeof window !== 'undefined') {
                localStorage.setItem('valqora_currency', code);
                window.dispatchEvent(new CustomEvent('valqora-currency-change', { detail: { code } }));
            }
        }
    };

    const activeRate = Number(currentCurrencyObj?.exchange_rate ?? currentCurrencyObj?.rate ?? 1);

    const formatPrice = (amountInUsd: number): string => {
        const safeUsd = Number(amountInUsd) || 0;
        const converted = safeUsd * activeRate;
        const formattedNumber = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0,
        }).format(Math.round(converted));

        return `${currentCurrencyObj.symbol}${formattedNumber}`;
    };

    const formatIsoPrice = (amountInUsd: number): string => {
        const safeUsd = Number(amountInUsd) || 0;
        const converted = safeUsd * activeRate;
        const formattedNumber = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0,
        }).format(Math.round(converted));

        return `${currentCurrencyObj.code} ${formattedNumber}`;
    };

    return (
        <CurrencyContext.Provider
            value={{
                currentCurrency: currentCurrencyObj.code,
                currency: currentCurrencyObj.code,
                currentCurrencyObj,
                currencies,
                availableCurrencies: currencies,
                setCurrency: setCurrencyByCode,
                setCurrencyByCode,
                formatPrice,
                formatIsoPrice,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
