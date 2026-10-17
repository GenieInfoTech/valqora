import React from 'react';
import { Link } from '@inertiajs/react';

interface LogoProps {
    variant?: 'full' | 'mark-only' | 'light';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
    variant = 'full',
    size = 'md',
    className = '',
    showSubtitle = true,
}) => {
    const sizeConfig = {
        sm: {
            img: 'h-8 w-8',
            title: 'text-base',
            sub: 'text-[9px]',
        },
        md: {
            img: 'h-10 w-10',
            title: 'text-lg',
            sub: 'text-[10px]',
        },
        lg: {
            img: 'h-14 w-14',
            title: 'text-2xl',
            sub: 'text-[11px]',
        },
    };

    const cfg = sizeConfig[size];

    return (
        <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
            <div className={`relative overflow-hidden rounded-md border border-[#2A2A2A] bg-[#111111] p-0.5 transition-all duration-300 group-hover:border-[#C9A227] ${cfg.img}`}>
                <img
                    src="/images/valqora-logo.jpg"
                    alt="VALQORA Emblem"
                    className="w-full h-full object-cover rounded-sm"
                />
            </div>

            {variant === 'full' && (
                <div className="flex flex-col">
                    <span className={`font-bold tracking-[0.25em] text-white leading-none group-hover:text-[#C9A227] transition-colors duration-200 ${cfg.title}`}>
                        VALQORA
                    </span>
                    {showSubtitle && (
                        <span className={`font-medium tracking-[0.28em] text-[#C9A227] uppercase mt-1 leading-none ${cfg.sub}`}>
                            GLOBAL TRADING
                        </span>
                    )}
                </div>
            )}
        </Link>
    );
};
