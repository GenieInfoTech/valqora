<?php

namespace App\Modules\Core\Services;

class CurrencyService
{
    /**
     * Standard currency rates relative to base USD (7 Official ISO Currencies - PDF Vol 3 p. 150).
     */
    protected const RATES = [
        'USD' => 1.0,
        'EUR' => 0.92,
        'JPY' => 152.5,
        'AED' => 3.67,
        'GBP' => 0.79,
        'AUD' => 1.52,
        'BDT' => 119.5,
    ];

    protected const SYMBOLS = [
        'USD' => '$',
        'EUR' => '€',
        'JPY' => '¥',
        'AED' => 'AED ',
        'GBP' => '£',
        'AUD' => 'A$',
        'BDT' => '৳',
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
            ['id' => 1, 'code' => 'USD', 'symbol' => '$', 'name' => 'US Dollar', 'rate' => 1.0, 'exchange_rate' => 1.0, 'is_default' => true],
            ['id' => 2, 'code' => 'EUR', 'symbol' => '€', 'name' => 'Euro', 'rate' => 0.92, 'exchange_rate' => 0.92, 'is_default' => false],
            ['id' => 3, 'code' => 'JPY', 'symbol' => '¥', 'name' => 'Japanese Yen', 'rate' => 152.5, 'exchange_rate' => 152.5, 'is_default' => false],
            ['id' => 4, 'code' => 'AED', 'symbol' => 'AED', 'name' => 'UAE Dirham', 'rate' => 3.67, 'exchange_rate' => 3.67, 'is_default' => false],
            ['id' => 5, 'code' => 'GBP', 'symbol' => '£', 'name' => 'British Pound', 'rate' => 0.79, 'exchange_rate' => 0.79, 'is_default' => false],
            ['id' => 6, 'code' => 'AUD', 'symbol' => 'A$', 'name' => 'Australian Dollar', 'rate' => 1.52, 'exchange_rate' => 1.52, 'is_default' => false],
            ['id' => 7, 'code' => 'BDT', 'symbol' => '৳', 'name' => 'Bangladeshi Taka', 'rate' => 119.5, 'exchange_rate' => 119.5, 'is_default' => false],
        ];
    }
}
