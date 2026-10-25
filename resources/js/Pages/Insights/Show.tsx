import React, { useState, useEffect, useMemo } from 'react';
import { Link, Head } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { InquiryModal } from '@/Components/InquiryModal';
import { Article } from '@/types';
import {
    Calendar,
    Clock,
    ArrowLeft,
    ArrowRight,
    UserCheck,
    Share2,
    Printer,
    Bookmark,
    CheckCircle2,
    Eye,
    Globe,
    ShieldCheck,
    BookOpen,
    ChevronRight,
    MessageSquare,
    QrCode,
    Sparkles,
} from 'lucide-react';

interface CategoryItem {
    id: string;
    name: string;
    count?: number;
}

interface CountryRegulation {
    country: string;
    code: string;
    ports: string;
    steering: string;
    age_limit: string;
    inspection_body: string;
    duty_notes: string;
    transit_days: string;
    filter_country: string;
}

interface InsightsShowProps {
    article: Article;
    relatedArticles: Article[];
    categories?: CategoryItem[];
    countryRegulations?: CountryRegulation[];
}

const categoryLabels: Record<string, string> = {
    market_intelligence: 'Market Intelligence',
    regulatory_updates: 'Regulatory & Tariffs',
    auction_trends: 'Auction Trends',
    global_logistics: 'Global Logistics',
    buyers_guides: 'Buyer & Import Guides',
    corporate_news: 'Corporate Announcements',
};

export default function InsightsShow({
    article,
    relatedArticles = [],
    categories = [],
    countryRegulations = [],
}: InsightsShowProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [inquirySubject, setInquirySubject] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const raw = localStorage.getItem('valqora_saved_articles');
                if (raw) {
                    const list: string[] = JSON.parse(raw);
                    setIsSaved(list.includes(article.slug));
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, [article.slug]);

    const handleToggleSave = () => {
        if (typeof window === 'undefined') return;
        try {
            const raw = localStorage.getItem('valqora_saved_articles');
            const list: string[] = raw ? JSON.parse(raw) : [];
            const next = list.includes(article.slug)
                ? list.filter((s) => s !== article.slug)
                : [...list, article.slug];
            localStorage.setItem('valqora_saved_articles', JSON.stringify(next));
            setIsSaved(next.includes(article.slug));
        } catch (e) {
            console.error(e);
        }
    };

    const handleShare = () => {
        if (typeof window !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const formatCategory = (cat: string) =>
        categoryLabels[cat] || cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    const contentBlocks = useMemo(() => {
        return article.content.split('\n\n').map((block, index) => {
            const trimmed = block.trim();
            const lines = trimmed.split('\n');
            if (lines.length > 1 && /^\d+\.\s+/.test(lines[0])) {
                return {
                    id: `section-${index}`,
                    heading: lines[0],
                    body: lines.slice(1).join('\n'),
                };
            }
            return {
                id: `section-${index}`,
                heading: null,
                body: trimmed,
            };
        });
    }, [article.content]);

    const sectionHeadings = useMemo(
        () => contentBlocks.filter((b) => b.heading !== null),
        [contentBlocks]
    );

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.cover_image_url,
        datePublished: article.published_at,
        author: {
            '@type': 'Person',
            name: article.author_name,
            jobTitle: article.author_role,
        },
        publisher: {
            '@type': 'Organization',
            name: 'VALQORA Global Trading LLC',
            logo: {
                '@type': 'ImageObject',
                url: 'https://valqora.com/images/valqora-logo.png',
            },
        },
    };

    return (
        <AppLayout title={article.title} description={article.excerpt}>
            <Head>
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Head>

            {/* Top Navigation & Action Bar */}
            <div className="bg-[#161616] border-b border-white/10 py-4 print:hidden">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link href="/insights" className="hover:text-white">
                            News & Insights
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link
                            href={`/insights?category=${article.category}`}
                            className="text-[#C9A227] font-mono hover:underline"
                        >
                            {formatCategory(article.category)}
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleToggleSave}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                                isSaved
                                    ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                    : 'bg-[#111111] text-gray-300 border-white/10 hover:border-[#C9A227]'
                            }`}
                        >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                            <span>{isSaved ? 'Saved Briefing' : 'Save Briefing'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleShare}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#111111] text-gray-300 border border-white/10 hover:border-[#C9A227] transition"
                        >
                            <Share2 className="w-3.5 h-3.5 text-[#C9A227]" />
                            <span>{copied ? 'Link Copied!' : 'Share'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#C9A227] text-[#111111] hover:bg-[#d8b132] transition"
                        >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print / PDF</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Article Column */}
                    <article className="lg:col-span-8">
                        <Link
                            href="/insights"
                            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#C9A227] transition mb-6 print:hidden"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to All Market Intelligence Briefings</span>
                        </Link>

                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-[#1A1A1A] border border-[#C9A227]/40 text-[#C9A227] rounded">
                                    {formatCategory(article.category)}
                                </span>
                                <span className="px-3 py-1 text-xs font-mono text-gray-400 bg-[#161618] border border-white/10 rounded">
                                    Ref: VQ-RES-{article.id}026
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-mono pt-2 border-b border-white/10 pb-6">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                                    {new Date(article.published_at).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                                    {article.read_time_minutes} min read
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5">
                                    <Eye className="w-3.5 h-3.5 text-[#C9A227]" />
                                    {Number(article.view_count || 1240).toLocaleString()} views
                                </span>
                                <span>•</span>
                                <span>
                                    By <strong className="text-white">{article.author_name}</strong> ({article.author_role})
                                </span>
                            </div>
                        </div>

                        {article.cover_image_url && (
                            <div className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden bg-[#0D0D0F] border border-white/10 shadow-xl">
                                <img
                                    src={article.cover_image_url}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Executive Summary Box */}
                        <div className="mt-8 p-6 rounded-2xl bg-[#161618] border border-[#C9A227]/40 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#C9A227]">
                                <Sparkles className="w-4 h-4" />
                                <span>Executive Briefing Abstract</span>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed">
                                {article.excerpt}
                            </p>
                        </div>

                        {/* Table of Contents (if structured headings exist) */}
                        {sectionHeadings.length > 0 && (
                            <div className="mt-8 p-5 rounded-xl bg-[#161618] border border-white/10 print:hidden">
                                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                                    Briefing Sections & Navigation
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {sectionHeadings.map((sec) => (
                                        <a
                                            key={sec.id}
                                            href={`#${sec.id}`}
                                            className="text-xs font-semibold text-white hover:text-[#C9A227] flex items-center gap-2 p-2 rounded-lg bg-[#111111] border border-white/5 transition"
                                        >
                                            <ChevronRight className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                                            <span className="truncate">{sec.heading}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Structured Article Prose Content */}
                        <div className="mt-10 space-y-8 text-base text-gray-200 leading-relaxed">
                            {contentBlocks.map((block) => (
                                <div key={block.id} id={block.id} className="scroll-mt-28">
                                    {block.heading && (
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 pb-2 border-b border-white/10">
                                            {block.heading}
                                        </h2>
                                    )}
                                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                                        {block.body}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Cryptographic Verification & Author Sign-off */}
                        <div className="mt-12 p-6 rounded-2xl bg-[#161618] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#202026] border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shrink-0">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">{article.author_name}</h4>
                                    <p className="text-[#C9A227] font-mono text-xs">{article.author_role}</p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        VALQORA Global Trade Directorate & Research Group • Minato-ku, Tokyo
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111111] border border-white/10 shrink-0">
                                <QrCode className="w-8 h-8 text-[#C9A227]" />
                                <div className="text-[11px] font-mono">
                                    <div className="text-white font-bold">VERIFIED RESEARCH</div>
                                    <div className="text-gray-400">ISO / JEVIC Compliant</div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Right Sidebar: Advisory Desk, Category Index & Quick Tools */}
                    <aside className="lg:col-span-4 space-y-6 print:hidden">
                        {/* Consult Specialist CTA Card */}
                        <div className="bg-[#161618] border border-[#C9A227]/40 rounded-2xl p-6 space-y-4">
                            <div className="text-xs font-mono uppercase tracking-widest text-[#C9A227]">
                                DIRECT TRADE DESK ADVISORY
                            </div>
                            <h3 className="text-lg font-bold text-white">
                                Need Customs or Sourcing Guidance on This Topic?
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Connect directly with our Tokyo or Dubai trade compliance directors for bespoke tariff calculations, L/C structuring, or vehicle inspection verification.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setInquirySubject(`Advisory Inquiry: ${article.title}`);
                                    setIsInquiryOpen(true);
                                }}
                                className="w-full py-3 px-4 rounded-xl bg-[#C9A227] hover:bg-[#d8b132] text-[#111111] font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Consult Trade Director</span>
                            </button>
                            <Link
                                href="/vehicles"
                                className="w-full py-3 px-4 rounded-xl bg-[#111111] hover:bg-[#222226] text-white border border-white/15 font-semibold text-xs text-center transition block"
                            >
                                Explore Verified Inventory →
                            </Link>
                        </div>

                        {/* Intelligence Categories */}
                        {categories.length > 0 && (
                            <div className="bg-[#161618] border border-white/10 rounded-2xl p-6">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-[#C9A227] mb-4">
                                    Intelligence Categories
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/insights?category=${cat.id}`}
                                            className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium transition border ${
                                                article.category === cat.id
                                                    ? 'bg-[#C9A227]/15 text-[#C9A227] border-[#C9A227]/40 font-bold'
                                                    : 'bg-[#111111] text-gray-300 border-white/5 hover:border-[#C9A227]/40'
                                            }`}
                                        >
                                            <span>{cat.name}</span>
                                            {typeof cat.count === 'number' && (
                                                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5">
                                                    {cat.count}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Country Import Rules Quick Check */}
                        {countryRegulations.length > 0 && (
                            <div className="bg-[#161618] border border-white/10 rounded-2xl p-6 space-y-3">
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A227]">
                                    <Globe className="w-4 h-4" />
                                    <span>Destination Port Snapshots</span>
                                </div>
                                <div className="space-y-2.5">
                                    {countryRegulations.slice(0, 4).map((reg) => (
                                        <div
                                            key={reg.code}
                                            className="p-3 rounded-xl bg-[#111111] border border-white/5 text-xs"
                                        >
                                            <div className="flex items-center justify-between font-bold text-white">
                                                <span>{reg.country}</span>
                                                <span className="font-mono text-[10px] text-[#C9A227]">
                                                    {reg.transit_days}
                                                </span>
                                            </div>
                                            <div className="text-[11px] text-gray-400 mt-1">
                                                {reg.age_limit} • {reg.inspection_body}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/insights#country-regulations"
                                    className="text-xs font-semibold text-[#C9A227] hover:underline inline-flex items-center gap-1 pt-1"
                                >
                                    <span>View Full Country Duty Matrix</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        )}
                    </aside>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section className="mt-16 pt-12 border-t border-white/10 print:hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">Related Trade Intelligence</h3>
                            <Link
                                href="/insights"
                                className="text-xs font-semibold text-[#C9A227] hover:underline flex items-center gap-1"
                            >
                                <span>View All Briefings</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/insights/${rel.slug}`}
                                    className="p-6 rounded-2xl bg-[#161618] border border-white/10 hover:border-[#C9A227]/50 transition group flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-[10px] font-mono font-bold uppercase text-[#C9A227]">
                                            {formatCategory(rel.category)}
                                        </span>
                                        <h4 className="text-base font-bold text-white group-hover:text-[#C9A227] transition line-clamp-2 mt-2 leading-snug">
                                            {rel.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                                            {rel.excerpt}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                                        <span>{rel.read_time_minutes} min read</span>
                                        <span className="text-[#C9A227] font-sans font-semibold">Read Report →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <InquiryModal
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
                inquiryType="market_intelligence"
                defaultSubject={inquirySubject}
            />
        </AppLayout>
    );
}
