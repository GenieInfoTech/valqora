<?php

namespace App\Modules\CMS\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CMS\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Article::where('is_published', true);

        if ($category = $request->input('category')) {
            $query->where('category', $category);
        }

        $articles = $query->latest('published_at')->paginate(9)->withQueryString();

        $categories = [
            ['id' => 'market_intelligence', 'name' => 'Market Intelligence'],
            ['id' => 'regulatory_updates', 'name' => 'Regulatory & Tariffs'],
            ['id' => 'auction_trends', 'name' => 'Auction Trends'],
            ['id' => 'global_logistics', 'name' => 'Global Logistics'],
        ];

        return Inertia::render('Insights/Index', [
            'articles' => $articles,
            'currentCategory' => $category,
            'categories' => $categories,
        ]);
    }

    public function show(string $slug): Response
    {
        $article = Article::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $article->increment('view_count');

        $relatedArticles = Article::where('id', '!=', $article->id)
            ->where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Insights/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
