import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageCode = 'en' | 'ja' | 'ar' | 'de';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: string) => string;
    isRtl: boolean;
}

const translations: Record<LanguageCode, Record<string, string>> = {
    en: {
        'nav.vehicles': 'Vehicle Inventory',
        'nav.sourcing': 'Custom Sourcing',
        'nav.tracking': 'Shipment Tracking',
        'nav.insights': 'Market Intelligence',
        'nav.divisions': 'Business Divisions',
        'nav.about': 'Corporate Profile',
        'nav.contact': 'Global Trade Desks',
        'nav.portal': 'Client Portal',
        'nav.admin': 'Executive Panel',
        'nav.login': 'Client Sign In',
        'hero.tagline': 'SOVEREIGN GLOBAL COMMODITY & AUTOMOTIVE EXPORT',
        'hero.title': 'Precision International Trading for Discerning Global Markets',
        'hero.subtitle': 'Facilitating cross-border automotive acquisitions, Ro-Ro logistics, certified mechanical inspections, and institutional trade execution from Japan, Europe, and the UAE to 48+ worldwide ports.',
        'hero.cta.inventory': 'Explore Certified Inventory',
        'hero.cta.sourcing': 'Initiate Sourcing Directive',
        'badge.verified': '160-Point Verified',
        'badge.available': 'Available for Export',
        'badge.in_transit': 'Vessel in Transit',
        'filter.all_makes': 'All Manufacturers',
        'filter.all_bodies': 'All Body Types',
        'filter.all_fuels': 'All Fuel Types',
        'filter.search_placeholder': 'Search by Make, Model, Stock ID, or VIN...',
        'cta.view_details': 'Inspect Specifications',
        'cta.request_quote': 'Generate Formal Quotation',
        'cta.track_cargo': 'Track Consignment',
    },
    ja: {
        'nav.vehicles': '輸出車両在庫',
        'nav.sourcing': 'オーダー調達',
        'nav.tracking': '海上貨物追跡',
        'nav.insights': '市場分析レポート',
        'nav.divisions': '事業部門紹介',
        'nav.about': '企業情報',
        'nav.contact': '国際貿易デスク',
        'nav.portal': '会員ポータル',
        'nav.admin': '管理者統括',
        'nav.login': 'ログイン',
        'hero.tagline': '国際自動車輸出および多国間貿易総合商社',
        'hero.title': '世界48カ国を結ぶ高精度な国際貿易プラットフォーム',
        'hero.subtitle': '日本、欧州、UAEからの厳選された高級車輸出、160項目事前検査、Ro-Ro船手配、および輸出通関をワンストップで完結。',
        'hero.cta.inventory': '車両在庫一覧を見る',
        'hero.cta.sourcing': 'オーダー調達を依頼する',
        'badge.verified': '公的機関検査済',
        'badge.available': '輸出即納可能',
        'badge.in_transit': '海上輸送中',
        'filter.all_makes': '全メーカー',
        'filter.all_bodies': '全ボディタイプ',
        'filter.all_fuels': '全燃料タイプ',
        'filter.search_placeholder': '車名、モデル、在庫番号、車台番号で検索...',
        'cta.view_details': '詳細スペックを確認',
        'cta.request_quote': '見積書を即時作成',
        'cta.track_cargo': '本船動静を確認',
    },
    ar: {
        'nav.vehicles': 'مخزون السيارات المعتمدة',
        'nav.sourcing': 'طلب توريد مخصص',
        'nav.tracking': 'تتبع الشحنات البحرية',
        'nav.insights': 'تقارير السوق والتجارة',
        'nav.divisions': 'القطاعات التجارية',
        'nav.about': 'عن فالكورا',
        'nav.contact': 'مكاتبنا العالمية',
        'nav.portal': 'بوابة العملاء',
        'nav.admin': 'لوحة الإدارة',
        'nav.login': 'تسجيل الدخول',
        'hero.tagline': 'التجارة العالمية للسيارات الفاخرة والخدمات اللوجستية',
        'hero.title': 'حلول التجارة الدولية الفاخرة للأسواق العالمية المرموقة',
        'hero.subtitle': 'تسهيل صفقات تصدير السيارات الفارهة، والشحن البحري Ro-Ro، والفحص الفني المعتمد لـ 160 نقطة، من اليابان وألمانيا والإمارات إلى أكثر من 48 ميناء حول العالم.',
        'hero.cta.inventory': 'تصفح السيارات المتاحة',
        'hero.cta.sourcing': 'تقديم طلب توريد خاص',
        'badge.verified': 'معتمد ومفحوص 160 نقطة',
        'badge.available': 'جاهز للشحن الفوري',
        'badge.in_transit': 'قيد الإبحار',
        'filter.all_makes': 'كافة الشركات المصنعة',
        'filter.all_bodies': 'كافة الفئات',
        'filter.all_fuels': 'كافة أنواع الوقود',
        'filter.search_placeholder': 'ابحث بالشركة، الطراز، أو رقم الشاسيه...',
        'cta.view_details': 'عرض المواصفات الفنية',
        'cta.request_quote': 'طلب عرض أسعار رسمي',
        'cta.track_cargo': 'تتبع الشحنة البحرية',
    },
    de: {
        'nav.vehicles': 'Fahrzeugbestand',
        'nav.sourcing': 'Sonderbeschaffung',
        'nav.tracking': 'Sendungsverfolgung',
        'nav.insights': 'Marktberichte',
        'nav.divisions': 'Geschäftsbereiche',
        'nav.about': 'Über VALQORA',
        'nav.contact': 'Internationale Büros',
        'nav.portal': 'Kundenportal',
        'nav.admin': 'Verwaltung',
        'nav.login': 'Anmelden',
        'hero.tagline': 'SOUVERÄNER GLOBALER HANDEL & FAHRZEUGEXPORT',
        'hero.title': 'Präziser internationaler Handel für anspruchsvolle Märkte',
        'hero.subtitle': 'Grenzüberschreitender Fahrzeugexport, Ro-Ro-Logistik, zertifizierte 160-Punkte-Inspektionen und professionelle Zollabwicklung von Japan, Deutschland und den VAE in über 48 Häfen weltweit.',
        'hero.cta.inventory': 'Geprüften Bestand ansehen',
        'hero.cta.sourcing': 'Beschaffungsauftrag starten',
        'badge.verified': '160-Punkte Geprüft',
        'badge.available': 'Exportbereit',
        'badge.in_transit': 'Auf See',
        'filter.all_makes': 'Alle Hersteller',
        'filter.all_bodies': 'Alle Karosserieformen',
        'filter.all_fuels': 'Alle Kraftstoffarten',
        'filter.search_placeholder': 'Suche nach Marke, Modell, ID oder FIN...',
        'cta.view_details': 'Technische Daten prüfen',
        'cta.request_quote': 'Angebot erstellen',
        'cta.track_cargo': 'Fracht verfolgen',
    },
};

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    t: (key: string) => key,
    isRtl: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<LanguageCode>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('valqora_lang') as LanguageCode;
            if (saved && translations[saved]) {
                return saved;
            }
        }
        return 'en';
    });

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('valqora_lang', lang);
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = language;
        }
    }, [language]);

    const t = (key: string): string => {
        return translations[language]?.[key] || translations['en']?.[key] || key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t,
                isRtl: language === 'ar',
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
