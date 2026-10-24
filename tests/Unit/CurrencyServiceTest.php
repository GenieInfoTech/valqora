<?php

namespace Tests\Unit;

use App\Modules\Core\Services\CurrencyService;
use PHPUnit\Framework\TestCase;

class CurrencyServiceTest extends TestCase
{
    public function test_usd_base_conversion(): void
    {
        $amount = 10000.00;
        $converted = CurrencyService::convert($amount, 'USD');
        $this->assertEquals(10000.00, $converted);
    }

    public function test_currency_conversion_rates(): void
    {
        $amount = 1000.00;
        $eur = CurrencyService::convert($amount, 'EUR');
        $this->assertEquals(920.00, $eur);

        $jpy = CurrencyService::convert($amount, 'JPY');
        $this->assertEquals(152500.00, $jpy);

        $aed = CurrencyService::convert($amount, 'AED');
        $this->assertEquals(3670.00, $aed);
    }

    public function test_currency_formatting(): void
    {
        $amount = 50000.00;
        $formattedUsd = CurrencyService::format($amount, 'USD');
        $this->assertStringContainsString('$50,000', $formattedUsd);

        $formattedAed = CurrencyService::format($amount, 'AED');
        $this->assertStringContainsString('AED', $formattedAed);
    }

    public function test_supported_currencies_structure(): void
    {
        $currencies = CurrencyService::getSupportedCurrencies();
        $this->assertCount(7, $currencies);
        $codes = array_column($currencies, 'code');
        $this->assertContains('USD', $codes);
        $this->assertContains('EUR', $codes);
        $this->assertContains('JPY', $codes);
        $this->assertContains('AED', $codes);
        $this->assertContains('GBP', $codes);
        $this->assertContains('AUD', $codes);
        $this->assertContains('BDT', $codes);
    }
}
