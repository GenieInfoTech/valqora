import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/types';

interface CurrencyContextType {
    currentCurrency: string;
    setCurrency: (code: string) => void;
    convertPrice: (amountInUsd: number) => number;
    formatPrice: (amountInUsd: number) => string;
    currencies: Currency[];
}

const defaultCurrencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 152.5 },
    { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rate: 3.67 },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
];

const CurrencyContext = createContext<CurrencyContextType>({
    currentCurrency: 'USD',
    setCurrency: () => {},
    convertPrice: (n) => n,
    formatPrice: (n) => `$${n.toLocaleString()}`,
    currencies: defaultCurrencies,
});

export const CurrencyProvider: React.FC<{
    children: React.ReactNode;
    initialCurrencies?: Currency[];
    defaultCode?: string;
}> = ({ children, initialCurrencies, defaultCode = 'USD' }) => {
    const currencies = initialCurrencies || defaultCurrencies;

    const [currentCurrency, setCurrentCurrency] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('valqora_currency');
            if (saved && currencies.some((c) => c.code === saved)) {
                return saved;
            }
        }
        return defaultCode;
    });

    const setCurrency = (code: string) => {
        setCurrentCurrency(code);
        if (typeof window !== 'undefined') {
            localStorage.setItem('valqora_currency', code);
        }
    };

    const convertPrice = (amountInUsd: number): number => {
        const curr = currencies.find((c) => c.code === currentCurrency) || currencies[0];
        return Math.round(amountInUsd * curr.rate);
    };

    const formatPrice = (amountInUsd: number): string => {
        if (!amountInUsd && amountInUsd !== 0) return 'Price on Request';
        const curr = currencies.find((c) => c.code === currentCurrency) || currencies[0];
        const converted = Math.round(amountInUsd * curr.rate);
        return `${curr.symbol}${converted.toLocaleString()}`;
    };

    return (
        <CurrencyContext.Provider
            value={{
                currentCurrency,
                setCurrency,
                convertPrice,
                formatPrice,
                currencies,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);
