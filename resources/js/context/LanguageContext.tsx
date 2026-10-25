import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageCode = 'en' | 'ja' | 'ar' | 'zh' | 'ko';

export interface LanguageOption {
    code: LanguageCode;
    label: string;
    nativeLabel: string;
    dir: 'ltr' | 'rtl';
    fontFamily: string;
}

export const SUPPORTED_LANGUAGES: Record<LanguageCode, LanguageOption> = {
    en: {
        code: 'en',
        label: 'English',
        nativeLabel: 'English',
        dir: 'ltr',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    ja: {
        code: 'ja',
        label: 'Japanese',
        nativeLabel: '日本語',
        dir: 'ltr',
        fontFamily: "'Noto Sans JP', 'Inter', sans-serif",
    },
    ar: {
        code: 'ar',
        label: 'Arabic',
        nativeLabel: 'العربية',
        dir: 'rtl',
        fontFamily: "'Noto Sans Arabic', 'IBM Plex Sans Arabic', 'Inter', sans-serif",
    },
    zh: {
        code: 'zh',
        label: 'Chinese',
        nativeLabel: '中文 (简体)',
        dir: 'ltr',
        fontFamily: "'Noto Sans SC', 'Inter', sans-serif",
    },
    ko: {
        code: 'ko',
        label: 'Korean',
        nativeLabel: '한국어',
        dir: 'ltr',
        fontFamily: "'Noto Sans KR', 'Inter', sans-serif",
    },
};

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
    en: {
        'nav.home': 'Home',
        'nav.inventory': 'Inventory',
        'nav.vehicles': 'Vehicle Inventory',
        'nav.sourcing': 'Sourcing',
        'nav.tracking': 'Tracking',
        'nav.services': 'Services',
        'nav.divisions': 'Divisions',
        'nav.news': 'Insights',
        'nav.insights': 'News & Insights',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.portal': 'Portal Login',
        'nav.portal_login': 'Portal Login',
        'nav.dashboard': 'Dashboard',
        'nav.saved': 'Saved',
        'nav.compare': 'Compare',
        'nav.investor_relations': 'Investor Relations',
        'nav.esg': 'ESG',
        'nav.request_sourcing': 'Request Sourcing',
        'hero.badge': 'VALQORA GLOBAL TRADING • CORPORATE HEADQUARTERS',
        'hero.title.line1': 'Global Vehicle Sourcing.',
        'hero.title.line2': 'Trusted Worldwide.',
        'hero.subtitle': 'Connecting international buyers with premium Japanese and European vehicles through transparent sourcing, inspection, and export solutions.',
        'hero.cta.primary': 'Explore Inventory',
        'hero.cta.secondary': 'Request Vehicle Sourcing',
        'q1.title': 'WHO IS VALQORA',
        'q1.desc': 'A diversified international trading group headquartered in Japan with global export & procurement operations.',
        'q2.title': 'WHAT WE DO',
        'q2.desc': 'Institutional JDM & European vehicle sourcing, 150-point inspection, customs documentation, and Ro-Ro/container logistics.',
        'q3.title': 'WHY TRUST VALQORA',
        'q3.desc': '99.9% documentation accuracy, QR-authenticated certificates, and real-time 10-stage shipment visibility.',
    },
    ja: {
        'nav.home': 'ホーム',
        'nav.inventory': '車両在庫',
        'nav.vehicles': '車両在庫',
        'nav.sourcing': 'カスタム調達',
        'nav.tracking': '輸送追跡',
        'nav.services': 'サービス',
        'nav.divisions': '事業部門',
        'nav.news': 'インサイト',
        'nav.insights': 'ニュース・市場分析',
        'nav.about': '企業情報',
        'nav.contact': 'お問い合わせ',
        'nav.portal': 'ポータルログイン',
        'nav.portal_login': 'ポータルログイン',
        'nav.dashboard': 'ダッシュボード',
        'nav.saved': '保存済み',
        'nav.compare': '比較',
        'nav.investor_relations': '投資家情報 (IR)',
        'nav.esg': 'ESG・ガバナンス',
        'nav.request_sourcing': '車両調達を依頼',
        'hero.badge': 'VALQORA GLOBAL TRADING • グローバル本社',
        'hero.title.line1': 'グローバル車両調達。',
        'hero.title.line2': '世界が信頼する品質。',
        'hero.subtitle': '透明性の高い調達、150項目検査、輸出ソリューションを通じて、日本および欧州のプレミアム車両を世界中のバイヤーへお届けします。',
        'hero.cta.primary': '在庫を検索する',
        'hero.cta.secondary': '車両調達を依頼',
        'q1.title': 'VALQORAとは',
        'q1.desc': '日本に本社を置き、グローバルな輸出・調達事業を展開する多角的な国際商社グループです。',
        'q2.title': '事業内容',
        'q2.desc': 'JDM・欧州車の機関調達、150項目検査、通関書類作成、Ro-Ro船およびコンテナ物流。',
        'q3.title': '選ばれる理由',
        'q3.desc': '書類正確性99.9%、QR認証付き検査証明書、10段階のリアルタイム輸送追跡。',
    },
    ar: {
        'nav.home': 'الرئيسية',
        'nav.inventory': 'المخزون',
        'nav.vehicles': 'مخزون المركبات',
        'nav.sourcing': 'التوريد المخصص',
        'nav.tracking': 'تتبع الشحنات',
        'nav.services': 'الخدمات',
        'nav.divisions': 'القطاعات',
        'nav.news': 'الرؤى والأخبار',
        'nav.insights': 'الأخبار والرؤى',
        'nav.about': 'عن فالكورا',
        'nav.contact': 'اتصل بنا',
        'nav.portal': 'دخول البوابة',
        'nav.portal_login': 'دخول البوابة',
        'nav.dashboard': 'لوحة التحكم',
        'nav.saved': 'المحفوظات',
        'nav.compare': 'مقارنة',
        'nav.investor_relations': 'علاقات المستثمرين',
        'nav.esg': 'الاستدامة والحوكمة',
        'nav.request_sourcing': 'طلب توريد مركبة',
        'hero.badge': 'فالكورا للتجارة العالمية • المقر الرئيسي للمجموعة',
        'hero.title.line1': 'توريد المركبات عالمياً.',
        'hero.title.line2': 'ثقة راسخة حول العالم.',
        'hero.subtitle': 'نربط المشترين الدوليين بأفضل المركبات اليابانية والأوروبية من خلال حلول التوريد والفحص والتصدير الشفافة.',
        'hero.cta.primary': 'استكشف المخزون',
        'hero.cta.secondary': 'طلب توريد مركبة',
        'q1.title': 'من هي فالكورا',
        'q1.desc': 'مجموعة تجارية دولية متنوعة يقع مقرها في اليابان وتدير عمليات تصدير ومشتريات عالمية.',
        'q2.title': 'ماذا نقدم',
        'q2.desc': 'توريد المركبات اليابانية والأوروبية، فحص من 150 نقطة، توثيق جمركي، وخدمات شحن Ro-Ro والحاويات.',
        'q3.title': 'لماذا تثق بفالكورا',
        'q3.desc': 'دقة مستندات بنسبة 99.9%، شهادات موثقة برمز QR، وتتبع فوري للشحنات عبر 10 مراحل.',
    },
    zh: {
        'nav.home': '首页',
        'nav.inventory': '车辆库存',
        'nav.vehicles': '车辆库存',
        'nav.sourcing': '定制采购',
        'nav.tracking': '物流追踪',
        'nav.services': '核心服务',
        'nav.divisions': '业务部门',
        'nav.news': '行业洞察',
        'nav.insights': '新闻与洞察',
        'nav.about': '关于我们',
        'nav.contact': '联系我们',
        'nav.portal': '门户登录',
        'nav.portal_login': '门户登录',
        'nav.dashboard': '控制台',
        'nav.saved': '收藏夹',
        'nav.compare': '车型对比',
        'nav.investor_relations': '投资者关系',
        'nav.esg': 'ESG与治理',
        'nav.request_sourcing': '申请定制采购',
        'hero.badge': 'VALQORA 全球贸易 • 集团总部',
        'hero.title.line1': '全球车辆采购。',
        'hero.title.line2': '享誉世界的信赖。',
        'hero.subtitle': '通过透明的采购、150项严格检测和出口物流方案，为国际买家连接优质日本JDM及欧洲车型。',
        'hero.cta.primary': '浏览现车库存',
        'hero.cta.secondary': '申请定制采购',
        'q1.title': '关于 VALQORA',
        'q1.desc': '总部位于日本的多元化跨国贸易集团，业务涵盖全球汽车出口与工业采购。',
        'q2.title': '核心业务',
        'q2.desc': '日本及欧洲车辆机构采购、150项质量检测、海关单证合规及滚装船/集装箱物流。',
        'q3.title': '为何信赖我们',
        'q3.desc': '99.9%单证准确率、QR防伪认证证书以及10阶段实时海运追踪。',
    },
    ko: {
        'nav.home': '홈',
        'nav.inventory': '차량 재고',
        'nav.vehicles': '차량 재고',
        'nav.sourcing': '맞춤 소싱',
        'nav.tracking': '화물 추적',
        'nav.services': '서비스',
        'nav.divisions': '사업 부문',
        'nav.news': '인사이트',
        'nav.insights': '뉴스 및 인사이트',
        'nav.about': '회사 소개',
        'nav.contact': '문의하기',
        'nav.portal': '포털 로그인',
        'nav.portal_login': '포털 로그인',
        'nav.dashboard': '대시보드',
        'nav.saved': '저장됨',
        'nav.compare': '비교하기',
        'nav.investor_relations': '투자자 정보 (IR)',
        'nav.esg': 'ESG 및 거버넌스',
        'nav.request_sourcing': '맞춤 차량 소싱 요청',
        'hero.badge': 'VALQORA GLOBAL TRADING • 글로벌 본사',
        'hero.title.line1': '글로벌 차량 소싱.',
        'hero.title.line2': '전 세계가 신뢰하는 파트너.',
        'hero.subtitle': '투명한 소싱, 150개 항목 정밀 검수 및 수출 솔루션을 통해 일본 및 유럽 프리미엄 차량을 글로벌 바이어와 연결합니다.',
        'hero.cta.primary': '재고 차량 보기',
        'hero.cta.secondary': '맞춤 차량 소싱 요청',
        'q1.title': 'VALQORA 소개',
        'q1.desc': '일본에 본사를 두고 글로벌 수출 및 조달 운영을 수행하는 다각화된 국제 무역 그룹입니다.',
        'q2.title': '주요 사업',
        'q2.desc': 'JDM 및 유럽 차량 기관 소싱, 150개 항목 정밀 검사, 통관 문서화 및 Ro-Ro/컨테이너 물류.',
        'q3.title': '신뢰할 수 있는 이유',
        'q3.desc': '99.9% 문서 정확도, QR 인증 검사 증명서, 10단계 실시간 화물 가시성 제공.',
    },
};

interface LanguageContextType {
    language: LanguageCode;
    languageConfig: LanguageOption;
    setLanguage: (code: LanguageCode) => void;
    t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<LanguageCode>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('valqora_language') as LanguageCode;
            if (saved && SUPPORTED_LANGUAGES[saved]) {
                return saved;
            }
        }
        return 'en';
    });

    const setLanguage = (code: LanguageCode) => {
        setLanguageState(code);
        if (typeof window !== 'undefined') {
            localStorage.setItem('valqora_language', code);
            window.dispatchEvent(new CustomEvent('valqora-language-change', { detail: { code } }));
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const onLangChange = (e: Event) => {
            const customEvent = e as CustomEvent<{ code: LanguageCode }>;
            const nextCode = customEvent.detail?.code;
            if (nextCode && SUPPORTED_LANGUAGES[nextCode]) {
                setLanguageState(nextCode);
            }
        };
        window.addEventListener('valqora-language-change', onLangChange);
        return () => window.removeEventListener('valqora-language-change', onLangChange);
    }, []);

    useEffect(() => {
        const config = SUPPORTED_LANGUAGES[language];
        if (typeof document !== 'undefined') {
            document.documentElement.lang = config.code;
            document.documentElement.dir = config.dir;
            document.body.style.fontFamily = config.fontFamily;
        }
    }, [language]);

    const t = (key: string, fallback?: string): string => {
        return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || fallback || key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                languageConfig: SUPPORTED_LANGUAGES[language],
                setLanguage,
                t,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
