import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { PaginatedData, Article } from '@/types';
import { Calendar, Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

interface InsightsIndexProps {
    articles: PaginatedData<Article>;
    currentCategory?: string | null;
    categories: { id: string; name: string }[];
}

export default function InsightsIndex({ articles, currentCategory = null, categories = [] }: InsightsIndexProps) {
    return (
        <AppLayout
            title="Market Intelligence & Trade Reports"
            description="Authoritative briefings on international automotive import regulations, Japanese auction clearance indices, and maritime freight trends."
        >
            <div className="bg-[#111111] py-16 border-b border-[#222226]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                        GLOBAL TRADE INTELLIGENCE
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                        Market Reports & Tariff Briefings
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                        Rigorous intelligence on evolving customs rules, auction price spreads, and ocean freight logistics published by the VALQORA Research Group.
                    </p>

                    {/* Category Filter Pills */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
                        <Link
                            href="/insights"
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                !currentCategory
                                    ? 'bg-[#C9A227] text-black font-bold shadow'
                                    : 'bg-[#18181A] border border-[#2A2A30] text-gray-300 hover:text-white hover:bg-[#222226]'
                            }`}
                        >
                            All Briefings
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/insights?category=${cat.id}`}
                                className={`px-4 py-2 rounded-lg font-medium transition ${
                                    currentCategory === cat.id
                                        ? 'bg-[#C9A227] text-black font-bold shadow'
                                        : 'bg-[#18181A] border border-[#2A2A30] text-gray-300 hover:text-white hover:bg-[#222226]'
                                }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.data.map((article) => (
                        <article
                            key={article.id}
                            className="group flex flex-col justify-between bg-[#161618] border border-[#25252A] hover:border-[#C9A227]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-black/60 relative">
                                <img
                                    src={article.cover_image_url || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/80 text-[#C9A227] border border-[#C9A227]/40 rounded">
                                        {article.category.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{new Date(article.published_at).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{article.read_time_minutes} min read</span>
                                    </div>

                                    <h3 className="text-base font-bold text-white group-hover:text-[#C9A227] transition-colors duration-200 line-clamp-2">
                                        <Link href={`/insights/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h3>

                                    <p className="mt-2 text-xs text-gray-400 line-clamp-3 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-[#25252A] flex items-center justify-between text-xs">
                                    <div>
                                        <p className="font-semibold text-white">{article.author_name}</p>
                                        <p className="text-[10px] text-gray-500">{article.author_role}</p>
                                    </div>

                                    <Link
                                        href={`/insights/${article.slug}`}
                                        className="text-[#C9A227] font-semibold flex items-center gap-1 group-hover:underline"
                                    >
                                        <span>Read</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {articles.last_page > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        {articles.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                                    link.active
                                        ? 'bg-[#C9A227] text-black font-bold'
                                        : link.url
                                        ? 'bg-[#18181A] border border-[#28282E] text-gray-300 hover:text-white hover:bg-[#222228]'
                                        : 'text-gray-600 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
