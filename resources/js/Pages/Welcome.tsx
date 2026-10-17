import React from 'react';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
            <Head title="Enterprise Global Trading" />
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-[#C9A227]">VALQORA</h1>
                <p className="mt-2 text-gray-400">Global Trading Platform</p>
            </div>
        </div>
    );
}
