<?php

namespace App\Http\Middleware;

use App\Modules\Core\Models\Port;
use App\Modules\Core\Services\CurrencyService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                    'company_name' => $request->user()->company_name,
                    'country' => $request->user()->country,
                    'preferred_currency' => $request->user()->preferred_currency ?? 'USD',
                ] : null,
            ],
            'currencies' => CurrencyService::getSupportedCurrencies(),
            'ports' => Port::where('is_active', true)->select('id', 'name', 'code', 'country', 'region', 'transit_days_from_japan', 'standard_roro_freight_usd', 'standard_container_freight_usd')->get(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'info' => fn () => $request->session()->get('info'),
            ],
            'appName' => config('app.name', 'VALQORA Global Trading'),
        ];
    }
}
