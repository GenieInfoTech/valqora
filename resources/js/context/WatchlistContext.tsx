import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vehicle } from '@/types';

interface WatchlistContextType {
    savedVehicles: Vehicle[];
    compareVehicles: Vehicle[];
    isSaved: (id: number) => boolean;
    isComparing: (id: number) => boolean;
    isCompared: (id: number) => boolean;
    toggleSave: (vehicle: Vehicle) => void;
    toggleSaved: (vehicle: Vehicle) => void;
    toggleCompare: (vehicle: Vehicle) => void;
    removeSaved: (id: number) => void;
    removeCompare: (id: number) => void;
    clearSaved: () => void;
    clearCompare: () => void;
    isDrawerOpen: boolean;
    activeTab: 'saved' | 'compare';
    openDrawer: (tab?: 'saved' | 'compare') => void;
    closeDrawer: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [savedVehicles, setSavedVehicles] = useState<Vehicle[]>([]);
    const [compareVehicles, setCompareVehicles] = useState<Vehicle[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'saved' | 'compare'>('saved');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const storedSaved = localStorage.getItem('valqora_saved_vehicles');
                if (storedSaved) {
                    setSavedVehicles(JSON.parse(storedSaved));
                }
                const storedCompare = localStorage.getItem('valqora_compare_vehicles');
                if (storedCompare) {
                    setCompareVehicles(JSON.parse(storedCompare));
                }
            } catch (e) {
                console.error('Error loading watchlist from localStorage', e);
            }
        }
    }, []);

    const isSaved = (id: number) => savedVehicles.some(v => v.id === id);
    const isComparing = (id: number) => compareVehicles.some(v => v.id === id);

    const toggleSave = (vehicle: Vehicle) => {
        setSavedVehicles(prev => {
            const exists = prev.some(v => v.id === vehicle.id);
            const updated = exists ? prev.filter(v => v.id !== vehicle.id) : [...prev, vehicle];
            if (typeof window !== 'undefined') {
                localStorage.setItem('valqora_saved_vehicles', JSON.stringify(updated));
            }
            return updated;
        });
    };

    const toggleCompare = (vehicle: Vehicle) => {
        setCompareVehicles(prev => {
            const exists = prev.some(v => v.id === vehicle.id);
            if (!exists && prev.length >= 4) {
                return prev;
            }
            const updated = exists ? prev.filter(v => v.id !== vehicle.id) : [...prev, vehicle];
            if (typeof window !== 'undefined') {
                localStorage.setItem('valqora_compare_vehicles', JSON.stringify(updated));
            }
            return updated;
        });
    };

    const removeSaved = (id: number) => {
        setSavedVehicles(prev => {
            const updated = prev.filter(v => v.id !== id);
            if (typeof window !== 'undefined') {
                localStorage.setItem('valqora_saved_vehicles', JSON.stringify(updated));
            }
            return updated;
        });
    };

    const removeCompare = (id: number) => {
        setCompareVehicles(prev => {
            const updated = prev.filter(v => v.id !== id);
            if (typeof window !== 'undefined') {
                localStorage.setItem('valqora_compare_vehicles', JSON.stringify(updated));
            }
            return updated;
        });
    };

    const clearSaved = () => {
        setSavedVehicles([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('valqora_saved_vehicles');
        }
    };

    const clearCompare = () => {
        setCompareVehicles([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('valqora_compare_vehicles');
        }
    };

    const openDrawer = (tab: 'saved' | 'compare' = 'saved') => {
        setActiveTab(tab);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <WatchlistContext.Provider
            value={{
                savedVehicles,
                compareVehicles,
                isSaved,
                isComparing,
                isCompared: isComparing,
                toggleSave,
                toggleSaved: toggleSave,
                toggleCompare,
                removeSaved,
                removeCompare,
                clearSaved,
                clearCompare,
                isDrawerOpen,
                activeTab,
                openDrawer,
                closeDrawer,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};
