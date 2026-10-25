import React from "react";
import { Link } from "@inertiajs/react";
import { useTheme } from "@/context/ThemeContext";

interface LogoProps {
    variant?:
        | "primary"
        | "horizontal"
        | "stacked"
        | "monogram"
        | "wordmark"
        | "seal"
        | "emboss"
        | "outline";
    theme?: "dark" | "light" | "monochrome-black" | "monochrome-white" | "gold";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    showTagline?: boolean;
    className?: string;
    asLink?: boolean;
}

export function Logo({
    variant = "horizontal",
    theme,
    size = "md",
    showTagline = false,
    className = "",
    asLink = false,
}: LogoProps) {
    const { theme: contextTheme } = useTheme();
    const resolvedTheme = theme ?? contextTheme;

    const sizeConfig = {
        xs: {
            box: "w-7 h-7",
            wordmark: "text-sm tracking-[0.22em]",
            descriptor: "text-[7px] tracking-[0.34em]",
            tagline: "text-[6px] tracking-[0.22em]",
            gap: "gap-2.5",
        },
        sm: {
            box: "w-9 h-9",
            wordmark: "text-base tracking-[0.24em]",
            descriptor: "text-[8px] tracking-[0.36em]",
            tagline: "text-[7px] tracking-[0.24em]",
            gap: "gap-3",
        },
        md: {
            box: "w-10 h-10",
            wordmark: "text-lg tracking-[0.25em]",
            descriptor: "text-[8.5px] tracking-[0.36em]",
            tagline: "text-[7.5px] tracking-[0.25em]",
            gap: "gap-3.5",
        },
        lg: {
            box: "w-12 h-12",
            wordmark: "text-2xl tracking-[0.26em]",
            descriptor: "text-[10px] tracking-[0.38em]",
            tagline: "text-[8.5px] tracking-[0.26em]",
            gap: "gap-4",
        },
        xl: {
            box: "w-16 h-16",
            wordmark: "text-3xl tracking-[0.28em]",
            descriptor: "text-xs tracking-[0.40em]",
            tagline: "text-[10px] tracking-[0.28em]",
            gap: "gap-5",
        },
    }[size];

    const isLightBg =
        resolvedTheme === "light" || resolvedTheme === "monochrome-black";
    const isMonoBlack = resolvedTheme === "monochrome-black";
    const isMonoWhite = resolvedTheme === "monochrome-white";
    const isGoldOnly = resolvedTheme === "gold";
    const isEmboss = variant === "emboss";

    const wordmarkColor = isMonoBlack
        ? "text-[#111111]"
        : isMonoWhite
          ? "text-white"
          : isGoldOnly
            ? "text-[#C9A227]"
            : isEmboss
              ? "text-neutral-400 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
              : isLightBg
                ? "text-[#111111]"
                : "text-white";

    const descriptorColor = isMonoBlack
        ? "text-[#111111]/70"
        : isMonoWhite
          ? "text-white/75"
          : isEmboss
            ? "text-neutral-400"
            : "text-[#C9A227]";

    const MonogramMark = () => (
        <div
            className={`${sizeConfig.box} rounded-[8px] flex items-center justify-center relative overflow-hidden shrink-0 transition-all duration-200 theme-preserve-dark ${
                isEmboss
                    ? "bg-[#1A1A1A] border border-white/20 shadow-inner"
                    : isMonoBlack
                      ? "bg-[#111111] border-2 border-[#111111]"
                      : isMonoWhite
                        ? "bg-[#111111] border-2 border-white"
                        : "bg-[#111111] border border-[#C9A227]/45 group-hover:border-[#C9A227] shadow-[0_2px_10px_rgba(0,0,0,0.22)]"
            }`}
        >
            <img
                src="/images/valqora-logo.png"
                alt="Valqora VQ Emblem"
                className="w-full h-full object-contain scale-[1.35] select-none pointer-events-none"
                draggable={false}
            />
        </div>
    );

    const WordmarkLockup = ({ centered = false }: { centered?: boolean }) => (
        <div
            className={`flex flex-col justify-center ${
                centered ? "items-center text-center" : "items-start"
            }`}
        >
            <div
                className={`font-extrabold uppercase leading-none flex items-center select-none ${sizeConfig.wordmark} ${wordmarkColor}`}
                style={{
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
            >
                <span>VAL</span>
                <span
                    className={`relative inline-block ${
                        isMonoBlack
                            ? "text-[#111111]"
                            : isMonoWhite
                              ? "text-white"
                              : "text-[#C9A227]"
                    }`}
                >
                    Q
                </span>
                <span>ORA</span>
            </div>
            <div
                className={`font-semibold uppercase leading-none mt-1.5 flex items-center gap-1.5 ${sizeConfig.descriptor} ${descriptorColor}`}
            >
                <span className="w-2 h-[1px] bg-current opacity-60"></span>
                <span>GLOBAL TRADING</span>
                <span className="w-2 h-[1px] bg-current opacity-60"></span>
            </div>
            {showTagline && (
                <span
                    className={`uppercase font-medium mt-1 ${sizeConfig.tagline} ${
                        isLightBg ? "text-[#5A5F66]" : "text-neutral-400"
                    }`}
                >
                    Connecting Markets. Creating Value.
                </span>
            )}
        </div>
    );

    const SealBadge = () => (
        <div className="relative w-28 h-28 rounded-full border-2 border-[#C9A227] bg-[#111111] theme-preserve-dark flex flex-col items-center justify-center p-3 shadow-xl">
            <div className="absolute inset-1.5 rounded-full border border-[#C9A227]/30 pointer-events-none"></div>
            <span className="text-[6.5px] font-bold uppercase tracking-[0.28em] text-[#C9A227] mb-1">
                VALQORA GLOBAL
            </span>
            <MonogramMark />
            <span className="text-[6px] font-mono uppercase tracking-[0.24em] text-white/80 mt-1">
                VERIFIED TRADE SEAL
            </span>
        </div>
    );

    const content = (
        <div
            className={`inline-flex items-center group ${sizeConfig.gap} ${
                variant === "stacked" ? "flex-col text-center" : "flex-row"
            } ${className}`}
            style={{ minWidth: variant === "horizontal" ? "180px" : undefined }}
        >
            {variant === "seal" ? (
                <SealBadge />
            ) : variant === "monogram" ? (
                <MonogramMark />
            ) : variant === "wordmark" ? (
                <WordmarkLockup />
            ) : variant === "stacked" ? (
                <>
                    <MonogramMark />
                    <WordmarkLockup centered />
                </>
            ) : (
                <>
                    <MonogramMark />
                    <WordmarkLockup />
                </>
            )}
        </div>
    );

    if (!asLink) {
        return content;
    }

    return (
        <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] rounded-[8px] inline-flex items-center"
            aria-label="Valqora Global Trading — Home"
        >
            {content}
        </Link>
    );
}

export default Logo;
