import React from 'react';
import { Link } from '@inertiajs/react';

interface LogoProps {
    variant?: 'full' | 'horizontal' | 'mark-only' | 'light';
    size?: 'sm' | 'md' | 'lg';
    theme?: 'dark' | 'light';
    className?: string;
    showSubtitle?: boolean;
    asLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
    variant = 'full',
    size = 'md',
    theme = 'dark',
    className = '',
    showSubtitle = true,
    asLink = true,
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
    const isLight = theme === 'light' || variant === 'light';
    const showWordmark = variant === 'full' || variant === 'horizontal' || variant === 'light';

    const content = (
        <>
            <div
                className={`relative overflow-hidden rounded-md border bg-[#111111] p-0.5 transition-all duration-300 group-hover:border-[#C9A227] shrink-0 ${
                    isLight ? 'border-[#D1D5DB] shadow-xs' : 'border-[#2A2A2A]'
                } ${cfg.img}`}
            >
                <img
                    src="/images/valqora-logo.png"
                    alt="VALQORA Emblem"
                    className="w-full h-full object-cover rounded-sm"
                />
            </div>

            {showWordmark && (
                <div className="flex flex-col text-left">
                    <span
                        className={`font-bold tracking-[0.25em] leading-none transition-colors duration-200 ${
                            isLight
                                ? 'text-[#111111] group-hover:text-[#9A7816]'
                                : 'text-white group-hover:text-[#C9A227]'
                        } ${cfg.title}`}
                    >
                        VAL<span className="text-[#C9A227]">Q</span>ORA
                    </span>
                    {showSubtitle && (
                        <span
                            className={`font-medium tracking-[0.28em] text-[#C9A227] uppercase mt-1 leading-none ${cfg.sub}`}
                        >
                            GLOBAL TRADING
                        </span>
                    )}
                </div>
            )}
        </>
    );

    if (!asLink) {
        return <div className={`inline-flex items-center gap-3 group ${className}`}>{content}</div>;
    }

    return (
        <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
            {content}
        </Link>
    );
};
