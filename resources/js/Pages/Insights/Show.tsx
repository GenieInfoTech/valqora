import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Article } from '@/types';
import { Calendar, Clock, ArrowLeft, ArrowRight, UserCheck, Share2 } from 'lucide-react';

interface InsightsShowProps {
    article: Article;
    relatedArticles: Article[];
}

export default function InsightsShow({ article, relatedArticles = [] }: InsightsShowProps) {
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
        <AppLayout
            title={article.title}
            description={article.excerpt}
        >
            <Head>
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href="/insights"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Market Intelligence</span>
                </Link>

                <div className="space-y-4">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#1B1B1E] border border-[#2E2E34] text-[#C9A227] rounded">
                        {article.category.replace('_', ' ')}
                    </span>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-mono pt-2 border-b border-[#222226] pb-6">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                            {new Date(article.published_at).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                            {article.read_time_minutes} min read
                        </span>
                        <span>•</span>
                        <span>Author: {article.author_name} ({article.author_role})</span>
                    </div>
                </div>

                {article.cover_image_url && (
                    <div className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 shadow-2xl">
                        <img
                            src={article.cover_image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Article Prose Content */}
                <div className="mt-10 text-sm text-gray-300 leading-relaxed space-y-6 max-w-none">
                    {article.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Author Bio Box */}
                <div className="mt-14 p-6 rounded-2xl bg-[#161618] border border-[#26262B] flex items-center gap-4 text-xs">
                    <div className="w-12 h-12 rounded-full bg-[#202026] border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] flex-shrink-0">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">{article.author_name}</h4>
                        <p className="text-[#C9A227] font-mono text-[11px]">{article.author_role}</p>
                        <p className="text-gray-400 text-[11px] mt-1">
                            VALQORA Global Trade Directorate & Research Group, Minato-ku, Tokyo.
                        </p>
                    </div>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-[#222226]">
                        <h3 className="text-lg font-bold text-white mb-6">Related Trade Intelligence</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/insights/${rel.slug}`}
                                    className="p-5 rounded-xl bg-[#161618] border border-[#26262B] hover:border-[#C9A227]/40 transition group block"
                                >
                                    <span className="text-[10px] font-mono uppercase text-[#C9A227]">
                                        {rel.category.replace('_', ' ')}
                                    </span>
                                    <h4 className="text-xs font-bold text-white group-hover:text-[#C9A227] transition line-clamp-2 mt-1">
                                        {rel.title}
                                    </h4>
                                    <p className="text-[11px] text-gray-500 mt-2 font-mono">
                                        {rel.read_time_minutes} min read
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </AppLayout>
    );
}
