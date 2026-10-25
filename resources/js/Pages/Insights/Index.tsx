import React, { useState, useEffect, useMemo } from 'react';
import { Link, router } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { InquiryModal } from '@/Components/InquiryModal';
import { PaginatedData, Article } from '@/types';
import {
    Calendar,
    Clock,
    ArrowRight,
    BookOpen,
    Search,
    Globe,
    ShieldCheck,
    FileText,
    Bookmark,
    Share2,
    Printer,
    X,
    CheckCircle2,
    TrendingUp,
    Ship,
    Scale,
    Sparkles,
    Eye,
    RotateCcw,
    Send,
    QrCode,
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

interface InsightsIndexProps {
    articles: PaginatedData<Article>;
    featuredArticle?: Article | null;
    currentCategory?: string | null;
    searchQuery?: string;
    currentSort?: string;
    categories: CategoryItem[];
    countryRegulations?: CountryRegulation[];
    totalArticles?: number;
}

const categoryLabels: Record<string, string> = {
    market_intelligence: 'Market Intelligence',
    regulatory_updates: 'Regulatory & Tariffs',
    auction_trends: 'Auction Trends',
    global_logistics: 'Global Logistics',
    buyers_guides: 'Buyer & Import Guides',
    corporate_news: 'Corporate Announcements',
};

export default function InsightsIndex({
    articles,
    featuredArticle = null,
    currentCategory = null,
    searchQuery = '',
    currentSort = 'latest',
    categories = [],
    countryRegulations = [],
    totalArticles = 0,
}: InsightsIndexProps) {
    const [searchInput, setSearchInput] = useState(searchQuery || '');
    const [selectedSort, setSelectedSort] = useState(currentSort || 'latest');
    const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
    const [showSavedOnly, setShowSavedOnly] = useState(false);
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
    const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
        countryRegulations[0]?.code || 'BD'
    );
    const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [inquirySubject, setInquirySubject] = useState('');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const raw = localStorage.getItem('valqora_saved_articles');
                if (raw) {
                    setSavedSlugs(JSON.parse(raw));
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const toggleSavedArticle = (slug: string) => {
        setSavedSlugs((prev) => {
            const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
            if (typeof window !== 'undefined') {
                localStorage.setItem('valqora_saved_articles', JSON.stringify(next));
            }
            return next;
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/insights',
            {
                category: currentCategory || undefined,
                q: searchInput.trim() || undefined,
                sort: selectedSort !== 'latest' ? selectedSort : undefined,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleSortChange = (nextSort: string) => {
        setSelectedSort(nextSort);
        router.get(
            '/insights',
            {
                category: currentCategory || undefined,
                q: searchInput.trim() || undefined,
                sort: nextSort !== 'latest' ? nextSort : undefined,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleResetFilters = () => {
        setSearchInput('');
        setSelectedSort('latest');
        setShowSavedOnly(false);
        router.get('/insights');
    };

    const handleShareArticle = (slug: string) => {
        if (typeof window !== 'undefined' && navigator.clipboard) {
            const url = `${window.location.origin}/insights/${slug}`;
            navigator.clipboard.writeText(url);
            setCopiedSlug(slug);
            setTimeout(() => setCopiedSlug(null), 2500);
        }
    };

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;
        setNewsletterSubscribed(true);
        setNewsletterEmail('');
    };

    const displayedArticles = useMemo(() => {
        if (!showSavedOnly) return articles.data;
        return articles.data.filter((a) => savedSlugs.includes(a.slug));
    }, [articles.data, showSavedOnly, savedSlugs]);

    const activeCountryReg = useMemo(
        () =>
            countryRegulations.find((c) => c.code === selectedCountryCode) ||
            countryRegulations[0] ||
            null,
        [countryRegulations, selectedCountryCode]
    );

    const formatCategory = (cat: string) =>
        categoryLabels[cat] || cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    return (
        <AppLayout
            title="News, Market Intelligence & Trade Reports"
            description="Authoritative briefings on international automotive import regulations, Japanese auction clearance indices, and maritime freight trends."
        >
            {/* SECTION 1: HERO & INTELLIGENCE FILTER BAR */}
            <section className="bg-[#111111] py-16 border-b border-white/10 vq-pattern-trade-flow">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-[#C9A227]/40 mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                            <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#C9A227]">
                                VALQORA RESEARCH GROUP • VOLUME 8 THOUGHT LEADERSHIP
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Global Trade Intelligence & Market Briefings
                        </h1>
                        <p className="text-base sm:text-lg text-gray-400 mt-4 leading-relaxed">
                            Institutional research on cross-border customs regulations, Japanese auction price indices, JEVIC/QISJ inspection standards, and maritime logistics across 42+ destination markets.
                        </p>
                    </div>

                    {/* Search & Sort Controls */}
                    <div className="mt-8 bg-[#161618] border border-white/10 rounded-2xl p-5 shadow-lg">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4"
                        >
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Search reports by country, tariff, auction house, Ro-Ro, L/C, or keyword..."
                                    className="w-full pl-11 pr-4 py-3 bg-[#111111] border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                                />
                            </div>

                            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                                <select
                                    value={selectedSort}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    aria-label="Sort articles"
                                    className="px-4 py-3 bg-[#111111] border border-white/15 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#C9A227]"
                                >
                                    <option value="latest">Sort: Latest Published</option>
                                    <option value="popular">Sort: Most Read Briefings</option>
                                    <option value="read_time">Sort: Quickest Read Time</option>
                                </select>

                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl bg-[#C9A227] hover:bg-[#d8b132] text-[#111111] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shrink-0"
                                >
                                    <Search className="w-3.5 h-3.5" />
                                    <span>Filter Briefings</span>
                                </button>

                                {(currentCategory || searchQuery || selectedSort !== 'latest' || showSavedOnly) && (
                                    <button
                                        type="button"
                                        onClick={handleResetFilters}
                                        className="px-4 py-3 rounded-xl bg-[#202024] hover:bg-[#252528] text-gray-300 border border-white/10 text-xs font-semibold transition flex items-center gap-1.5 shrink-0"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Reset</span>
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Category Filter Pills */}
                        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                <Link
                                    href="/insights"
                                    onClick={() => setShowSavedOnly(false)}
                                    className={`px-3.5 py-2 rounded-lg font-medium transition inline-flex items-center gap-2 ${
                                        !currentCategory && !showSavedOnly
                                            ? 'bg-[#C9A227] text-[#111111] font-bold shadow'
                                            : 'bg-[#111111] border border-white/10 text-gray-300 hover:text-white hover:border-[#C9A227]/50'
                                    }`}
                                >
                                    <span>All Briefings</span>
                                    {totalArticles > 0 && (
                                        <span className="px-1.5 py-0.5 rounded bg-black/20 font-mono text-[10px]">
                                            {totalArticles}
                                        </span>
                                    )}
                                </Link>

                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/insights?category=${cat.id}${searchInput ? `&q=${encodeURIComponent(searchInput)}` : ''}`}
                                        onClick={() => setShowSavedOnly(false)}
                                        className={`px-3.5 py-2 rounded-lg font-medium transition inline-flex items-center gap-2 ${
                                            currentCategory === cat.id && !showSavedOnly
                                                ? 'bg-[#C9A227] text-[#111111] font-bold shadow'
                                                : 'bg-[#111111] border border-white/10 text-gray-300 hover:text-white hover:border-[#C9A227]/50'
                                        }`}
                                    >
                                        <span>{cat.name}</span>
                                        {typeof cat.count === 'number' && (
                                            <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">
                                                {cat.count}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowSavedOnly(!showSavedOnly)}
                                className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition inline-flex items-center gap-1.5 ${
                                    showSavedOnly
                                        ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                        : 'bg-[#111111] border-white/10 text-gray-300 hover:border-[#C9A227]'
                                }`}
                            >
                                <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current' : ''}`} />
                                <span>Saved Reading List ({savedSlugs.length})</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-14 space-y-16">
                {/* SECTION 2: FEATURED LEAD INTELLIGENCE REPORT */}
                {featuredArticle && !currentCategory && !searchQuery && !showSavedOnly && (
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227]">
                                <TrendingUp className="w-4 h-4" />
                                <span>LEAD INSTITUTIONAL BRIEFING • EDITOR'S SELECTION</span>
                            </div>
                            <span className="text-xs font-mono text-gray-400">
                                Verified by VALQORA Trade Directorate
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#161618] border border-white/10 hover:border-[#C9A227]/60 rounded-2xl overflow-hidden shadow-xl transition-all">
                            <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[360px] bg-[#0D0D0F] theme-preserve-dark">
                                <Link href={`/insights/${featuredArticle.slug}`} className="block w-full h-full">
                                    <img
                                        src={
                                            featuredArticle.cover_image_url ||
                                            'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80'
                                        }
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                                </Link>
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    <span className="px-3 py-1 rounded bg-[#C9A227] text-[#111111] text-[11px] font-mono font-bold uppercase tracking-wider">
                                        Featured Report
                                    </span>
                                    <span className="px-3 py-1 rounded bg-[#111111]/90 text-white border border-white/15 text-[11px] font-mono uppercase tracking-wider">
                                        {formatCategory(featuredArticle.category)}
                                    </span>
                                </div>
                            </div>

                            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 mb-4">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                                            {new Date(featuredArticle.published_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                                            {featuredArticle.read_time_minutes} min read
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1.5">
                                            <Eye className="w-3.5 h-3.5 text-[#C9A227]" />
                                            {Number(featuredArticle.view_count || 1240).toLocaleString()} institutional reads
                                        </span>
                                    </div>

                                    <Link href={`/insights/${featuredArticle.slug}`}>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white hover:text-[#C9A227] transition-colors leading-snug">
                                            {featuredArticle.title}
                                        </h2>
                                    </Link>

                                    <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                                        {featuredArticle.excerpt}
                                    </p>

                                    <div className="mt-6 p-4 rounded-xl bg-[#111111] border border-white/10 space-y-2">
                                        <div className="text-[11px] font-mono uppercase tracking-wider text-[#C9A227] font-bold">
                                            Key Executive Highlights
                                        </div>
                                        <ul className="text-xs text-gray-300 space-y-1.5">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                                                <span>Destination port customs valuation & pre-shipment inspection mandates</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                                                <span>JEVIC, QISJ, EAA & GSO 42/2015 documentary compliance checklists</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <div className="text-sm font-bold text-white">{featuredArticle.author_name}</div>
                                        <div className="text-xs text-gray-400 font-mono">{featuredArticle.author_role}</div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <button
                                            type="button"
                                            onClick={() => setPreviewArticle(featuredArticle)}
                                            className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#222226] text-gray-200 border border-white/15 text-xs font-semibold transition inline-flex items-center gap-1.5"
                                        >
                                            <Printer className="w-3.5 h-3.5 text-[#C9A227]" />
                                            <span>Executive Brief PDF</span>
                                        </button>
                                        <Link
                                            href={`/insights/${featuredArticle.slug}`}
                                            className="px-5 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#d8b132] text-[#111111] font-bold text-xs uppercase tracking-wider transition inline-flex items-center gap-1.5"
                                        >
                                            <span>Read Full Report</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION 3: ARTICLES & BRIEFINGS CATALOGUE */}
                <section>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {showSavedOnly
                                    ? 'Your Saved Reading List'
                                    : currentCategory
                                    ? `${formatCategory(currentCategory)} Briefings`
                                    : searchQuery
                                    ? `Search Results for "${searchQuery}"`
                                    : 'Published Trade Briefings & Research'}
                            </h2>
                            <p className="text-xs text-gray-400 mt-1">
                                Showing {displayedArticles.length} verified publication{displayedArticles.length === 1 ? '' : 's'}
                            </p>
                        </div>
                    </div>

                    {displayedArticles.length === 0 ? (
                        <div className="bg-[#161618] border border-white/10 rounded-2xl p-12 text-center space-y-4">
                            <BookOpen className="w-10 h-10 text-[#C9A227] mx-auto" />
                            <h3 className="text-xl font-bold text-white">
                                {showSavedOnly
                                    ? 'No Saved Briefings Yet'
                                    : 'No Matching Intelligence Briefings Found'}
                            </h3>
                            <p className="text-sm text-gray-400 max-w-md mx-auto">
                                {showSavedOnly
                                    ? 'Click the bookmark icon on any research briefing to save it to your personal reading list for quick reference.'
                                    : 'Try clearing your search filter or selecting another intelligence category.'}
                            </p>
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-wider"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>View All Briefings</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedArticles.map((article) => {
                                const isBookmarked = savedSlugs.includes(article.slug);
                                const isCopied = copiedSlug === article.slug;

                                return (
                                    <article
                                        key={article.id}
                                        className="group flex flex-col justify-between bg-[#161618] border border-white/10 hover:border-[#C9A227]/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden bg-[#0D0D0F] relative theme-preserve-dark">
                                            <Link href={`/insights/${article.slug}`} className="block w-full h-full">
                                                <img
                                                    src={
                                                        article.cover_image_url ||
                                                        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
                                                    }
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </Link>
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#111111]/90 text-[#C9A227] border border-[#C9A227]/40 rounded">
                                                    {formatCategory(article.category)}
                                                </span>
                                            </div>
                                            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => handleShareArticle(article.slug)}
                                                    title="Copy Article Link"
                                                    className="p-2 rounded-lg bg-[#111111]/85 text-white border border-white/15 hover:border-[#C9A227] hover:text-[#C9A227] transition"
                                                >
                                                    <Share2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSavedArticle(article.slug)}
                                                    title={isBookmarked ? 'Remove from Saved' : 'Save Briefing'}
                                                    className={`p-2 rounded-lg border transition ${
                                                        isBookmarked
                                                            ? 'bg-[#C9A227] text-[#111111] border-[#C9A227]'
                                                            : 'bg-[#111111]/85 text-white border-white/15 hover:border-[#C9A227] hover:text-[#C9A227]'
                                                    }`}
                                                >
                                                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                                                        {new Date(article.published_at).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                                                        {article.read_time_minutes} min read
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-3.5 h-3.5 text-[#C9A227]" />
                                                        {Number(article.view_count || 850).toLocaleString()}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-white group-hover:text-[#C9A227] transition-colors duration-200 line-clamp-2 leading-snug">
                                                    <Link href={`/insights/${article.slug}`}>
                                                        {article.title}
                                                    </Link>
                                                </h3>

                                                <p className="mt-2.5 text-xs text-gray-400 line-clamp-3 leading-relaxed">
                                                    {article.excerpt}
                                                </p>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                                                <div>
                                                    <p className="font-semibold text-white">{article.author_name}</p>
                                                    <p className="text-[11px] text-gray-500 font-mono">{article.author_role}</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {isCopied && (
                                                        <span className="text-[10px] font-mono text-emerald-400">
                                                            Copied!
                                                        </span>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewArticle(article)}
                                                        className="p-2 rounded-lg bg-[#111111] border border-white/10 text-gray-300 hover:border-[#C9A227] hover:text-[#C9A227] transition"
                                                        title="Preview / Print Executive Brief"
                                                    >
                                                        <Printer className="w-3.5 h-3.5" />
                                                    </button>
                                                    <Link
                                                        href={`/insights/${article.slug}`}
                                                        className="px-3.5 py-2 rounded-lg bg-[#C9A227] text-[#111111] font-bold flex items-center gap-1 hover:bg-[#d8b132] transition"
                                                    >
                                                        <span>Read</span>
                                                        <ArrowRight className="w-3.5 h-3.5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    {articles.last_page > 1 && !showSavedOnly && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            {articles.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                                        link.active
                                            ? 'bg-[#C9A227] text-[#111111] font-bold'
                                            : link.url
                                            ? 'bg-[#161618] border border-white/10 text-gray-300 hover:text-white hover:border-[#C9A227]'
                                            : 'text-gray-500 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* SECTION 4: INTERACTIVE COUNTRY IMPORT REGULATIONS & DUTY MATRIX */}
                {countryRegulations.length > 0 && (
                    <section id="country-regulations" className="bg-[#161618] border border-white/10 rounded-2xl p-8 sm:p-10">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] mb-2">
                                    <Globe className="w-4 h-4" />
                                    <span>DESTINATION CUSTOMS & REGULATORY COMPLIANCE MATRIX</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                    Country Import Rules, Pre-Shipment Inspection & Age Limits
                                </h2>
                                <p className="text-sm text-gray-400 mt-2 max-w-3xl">
                                    Select a destination market below to inspect mandatory roadworthiness certificates (JEVIC, QISJ, EAA, GSO), maximum vehicle age rules, steering configurations, and ocean transit windows.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setInquirySubject(
                                        `Customs & Import Regulation Advisory — ${activeCountryReg?.country || 'Global Market'}`
                                    );
                                    setIsInquiryOpen(true);
                                }}
                                className="px-5 py-3 rounded-xl bg-[#C9A227] hover:bg-[#d8b132] text-[#111111] font-bold text-xs uppercase tracking-wider transition inline-flex items-center gap-2 self-start lg:self-auto shrink-0"
                            >
                                <Scale className="w-4 h-4" />
                                <span>Request Customs & Duty Advisory</span>
                            </button>
                        </div>

                        {/* Country Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {countryRegulations.map((reg) => (
                                <button
                                    key={reg.code}
                                    type="button"
                                    onClick={() => setSelectedCountryCode(reg.code)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 border ${
                                        selectedCountryCode === reg.code
                                            ? 'bg-[#C9A227] text-[#111111] border-[#C9A227] font-bold shadow'
                                            : 'bg-[#111111] text-gray-300 border-white/10 hover:border-[#C9A227]/50 hover:text-white'
                                    }`}
                                >
                                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/20">
                                        {reg.code}
                                    </span>
                                    <span>{reg.country}</span>
                                </button>
                            ))}
                        </div>

                        {/* Active Country Detail Panel */}
                        {activeCountryReg && (
                            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    <div className="p-4 rounded-xl bg-[#161618] border border-white/10">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                                            Primary Discharge Ports
                                        </span>
                                        <span className="text-sm font-bold text-white mt-1.5 block">
                                            {activeCountryReg.ports}
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#161618] border border-white/10">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                                            Steering & Age Limit Rule
                                        </span>
                                        <span className="text-sm font-bold text-[#C9A227] mt-1.5 block">
                                            {activeCountryReg.age_limit}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-0.5 block">
                                            {activeCountryReg.steering}
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#161618] border border-white/10">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                                            Mandatory Pre-Shipment Audit
                                        </span>
                                        <span className="text-sm font-bold text-emerald-400 mt-1.5 block">
                                            {activeCountryReg.inspection_body}
                                        </span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#161618] border border-white/10">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                                            Estimated Ocean Transit
                                        </span>
                                        <span className="text-sm font-mono font-bold text-white mt-1.5 block">
                                            {activeCountryReg.transit_days} from Yokohama/Nagoya
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                                    <div className="text-xs text-gray-300 leading-relaxed max-w-3xl">
                                        <strong className="text-white uppercase font-mono mr-2">
                                            Tariff & Customs Protocol:
                                        </strong>
                                        {activeCountryReg.duty_notes}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                                        <Link
                                            href={`/vehicles?country=${encodeURIComponent(activeCountryReg.filter_country)}`}
                                            className="px-4 py-2.5 rounded-xl bg-[#161618] hover:bg-[#222226] text-white border border-white/15 text-xs font-semibold transition inline-flex items-center gap-1.5"
                                        >
                                            <span>Browse {activeCountryReg.country}-Eligible Stock</span>
                                            <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                                        </Link>
                                        <Link
                                            href="/sourcing"
                                            className="px-4 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#d8b132] text-[#111111] font-bold text-xs transition inline-flex items-center gap-1.5"
                                        >
                                            <span>Request {activeCountryReg.country} CIF Quote</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* SECTION 5: EXECUTIVE TRADE INTELLIGENCE BRIEFING SUBSCRIPTION */}
                <section className="rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#222222] to-[#1A1A1A] border border-[#C9A227]/40 p-8 sm:p-12 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-3">
                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227]">
                                INSTITUTIONAL RESEARCH DESK • WEEKLY DISPATCH
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                Receive Weekly Japanese Auction & Freight Indices
                            </h2>
                            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                                Subscribe to the VALQORA Research Group weekly briefing covering USS Tokyo clearing prices, Ro-Ro vessel schedule allocations, and destination customs tariff updates.
                            </p>
                        </div>

                        <div className="lg:col-span-5">
                            {newsletterSubscribed ? (
                                <div className="p-5 rounded-xl bg-[#122216] border border-[#2E8B57]/40 flex items-center gap-3 text-emerald-200 text-xs">
                                    <CheckCircle2 className="w-6 h-6 text-[#2E8B57] shrink-0" />
                                    <div>
                                        <div className="font-bold text-sm">Subscribed to Institutional Briefings</div>
                                        <p className="mt-0.5">
                                            Your corporate email has been registered for our weekly market & auction intelligence dispatch.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="email"
                                            required
                                            value={newsletterEmail}
                                            onChange={(e) => setNewsletterEmail(e.target.value)}
                                            placeholder="Enter corporate or dealership email..."
                                            className="flex-1 px-4 py-3 bg-[#111111] border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                                        />
                                        <button
                                            type="submit"
                                            className="px-6 py-3 rounded-xl bg-[#C9A227] hover:bg-[#d8b132] text-[#111111] font-bold text-xs uppercase tracking-wider transition inline-flex items-center justify-center gap-2 shrink-0"
                                        >
                                            <Send className="w-3.5 h-3.5" />
                                            <span>Subscribe</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                                        <span>Zero spam. Institutional market data only.</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setInquirySubject('Custom Market Research & Fleet Advisory Request');
                                                setIsInquiryOpen(true);
                                            }}
                                            className="text-[#C9A227] hover:underline font-semibold"
                                        >
                                            Request Bespoke Research →
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* EXECUTIVE BRIEF PDF PREVIEW MODAL */}
            {previewArticle && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-white text-[#111111] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-[#C9A227]">
                        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between theme-preserve-dark">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[#C9A227] text-[#111111] flex items-center justify-center font-bold text-xs">
                                    VQ
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider">
                                        Executive Intelligence Briefing
                                    </h3>
                                    <p className="text-[11px] font-mono text-gray-400">
                                        VALQORA RESEARCH GROUP • TOKYO / DUBAI / FRANKFURT
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-wider"
                                >
                                    <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewArticle(null)}
                                    className="p-1.5 text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto bg-white text-[#111111]">
                            <div className="border-b border-gray-200 pb-5">
                                <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
                                    <span className="uppercase font-bold text-[#9A7611]">
                                        {formatCategory(previewArticle.category)}
                                    </span>
                                    <span>
                                        Published:{' '}
                                        {new Date(previewArticle.published_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}{' '}
                                        • {previewArticle.read_time_minutes} min read
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-[#111111] leading-snug">
                                    {previewArticle.title}
                                </h2>
                                <p className="text-xs text-gray-600 mt-2 font-mono">
                                    Author: {previewArticle.author_name} ({previewArticle.author_role})
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 leading-relaxed">
                                <strong className="block text-[#111111] uppercase font-mono mb-1">
                                    Executive Abstract:
                                </strong>
                                {previewArticle.excerpt}
                            </div>

                            <div className="space-y-4 text-xs text-gray-800 leading-relaxed">
                                {previewArticle.content.split('\n\n').map((para, i) => (
                                    <p key={i} className="whitespace-pre-line">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <QrCode className="w-10 h-10 text-[#111111]" />
                                    <div className="text-xs">
                                        <p className="font-bold text-[#111111]">
                                            VALQORA Global Trade Directorate Research Publication
                                        </p>
                                        <p className="text-gray-600">
                                            Document Ref: VQ-RES-{previewArticle.id}026 • Verified Institutional Briefing
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/insights/${previewArticle.slug}`}
                                    className="px-4 py-2 rounded-lg bg-[#C9A227] text-[#111111] font-bold text-xs uppercase tracking-wider"
                                >
                                    Open Full View →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <InquiryModal
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
                inquiryType="market_intelligence"
                defaultSubject={inquirySubject}
            />
        </AppLayout>
    );
}
