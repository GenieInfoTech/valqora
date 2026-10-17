<?php

namespace App\Modules\Core\Services;

class CurrencyService
{
    /**
     * Standard currency rates relative to base USD.
     */
    protected const RATES = [
        'USD' => 1.0,
        'EUR' => 0.92,
        'JPY' => 152.5,
        'AED' => 3.67,
        'GBP' => 0.79,
    ];

    protected const SYMBOLS = [
        'USD' => '$',
        'EUR' => '€',
        'JPY' => '¥',
        'AED' => 'AED ',
        'GBP' => '£',
    ];

    public static function convert(float $amountInUsd, string $targetCurrency = 'USD'): float
    {
        $targetCurrency = strtoupper($targetCurrency);
        $rate = self::RATES[$targetCurrency] ?? 1.0;

        return round($amountInUsd * $rate, 2);
    }

    public static function format(float $amountInUsd, string $currency = 'USD'): string
    {
        $currency = strtoupper($currency);
        $converted = self::convert($amountInUsd, $currency);
        $symbol = self::SYMBOLS[$currency] ?? '$';

        if ($currency === 'JPY') {
            return $symbol.number_format(round($converted));
        }

        return $symbol.number_format($converted, 0);
    }

    public static function getSupportedCurrencies(): array
    {
        return [
            ['code' => 'USD', 'symbol' => '$', 'name' => 'US Dollar', 'rate' => 1.0],
            ['code' => 'EUR', 'symbol' => '€', 'name' => 'Euro', 'rate' => 0.92],
            ['code' => 'JPY', 'symbol' => '¥', 'name' => 'Japanese Yen', 'rate' => 152.5],
            ['code' => 'AED', 'symbol' => 'AED', 'name' => 'UAE Dirham', 'rate' => 3.67],
            ['code' => 'GBP', 'symbol' => '£', 'name' => 'British Pound', 'rate' => 0.79],
        ];
    }
}
