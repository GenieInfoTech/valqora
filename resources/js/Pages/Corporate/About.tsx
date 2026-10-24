import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Shield,
    Award,
    Handshake,
    Cpu,
    CheckCircle2,
    TrendingUp,
    Globe,
    Scale,
    Leaf,
    Briefcase,
    FileText,
    Lock,
    Building2,
    Users,
    Download,
    ArrowRight,
    AlertTriangle,
    Compass,
} from 'lucide-react';

type AboutTab = 'overview' | 'governance' | 'risk' | 'esg' | 'investors' | 'careers' | 'compliance';

export default function About() {
    const [activeTab, setActiveTab] = useState<AboutTab>('overview');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tab = params.get('tab') as AboutTab | null;
            if (tab && ['overview', 'governance', 'risk', 'esg', 'investors', 'careers', 'compliance'].includes(tab)) {
                setActiveTab(tab);
            }
        }
    }, []);

    const handleTabChange = (tab: AboutTab) => {
        setActiveTab(tab);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('tab', tab);
            window.history.replaceState({}, '', url.toString());
        }
    };

    const coreValues = [
        {
            icon: Shield,
            title: 'Integrity',
            description: 'We conduct every transaction with honesty, transparency, and full documentary accountability.',
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'We continuously refine our 160-point engineering and logistics standards to exceed institutional expectations.',
        },
        {
            icon: Handshake,
            title: 'Partnership',
            description: 'Trust compounds faster than profit. We build enduring multi-decade alliances rather than one-off deals.',
        },
        {
            icon: Cpu,
            title: 'Innovation',
            description: 'We embrace cryptographic document verification, real-time telemetry, and data-driven market intelligence.',
        },
        {
            icon: CheckCircle2,
            title: 'Reliability',
            description: 'Customers never question our commitment to inspection accuracy, container security, or schedule fidelity.',
        },
        {
            icon: Leaf,
            title: 'Responsibility',
            description: 'We conduct business ethically while respecting local communities, trade regulations, and the environment.',
        },
    ];

    const timeline = [
        {
            year: 'Phase 1 • Foundation',
            title: 'Japanese Sourcing & Engineering Core',
            description: 'Established direct auction terminal access in Tokyo, Yokohama, Osaka, and Nagoya with standardized 160-point pre-export engineering inspections.',
        },
        {
            year: 'Phase 2 • Market Entry',
            title: 'European Hub & Multi-Continent Corridors',
            description: 'Opened European procurement operations in Frankfurt and Rotterdam, connecting RHD and LHD buyers across Oceania, the UK, East Africa, South Asia, and the GCC.',
        },
        {
            year: 'Phase 3 • Digital Trade Platform',
            title: 'Integrated Customer, Dealer & Supplier Ecosystem',
            description: 'Launched the Valqora Digital Document Vault, QR-verifiable certificates, 10-stage ocean tracking, and wholesale container optimization tools.',
        },
        {
            year: 'Phase 4 • 2030 Long-Term Vision',
            title: 'Diversified Multinational Trading Group',
            description: 'Scaling across 7 specialized divisions—Global Trading, Auto, Logistics, Industrial, Energy, Capital, and Technology—serving 50+ global markets.',
        },
    ];

    const riskCategories = [
        {
            category: 'Supplier Risk',
            level: 'Low • Controlled',
            protocol: 'Mandatory vendor certification, auction house verification, and 24-month supplier audit cycles.',
            owner: 'Procurement Oversight Committee',
        },
        {
            category: 'Logistics & Port Congestion Risk',
            level: 'Medium • Active Monitoring',
            protocol: 'Multi-carrier Ro-Ro & container agreements (NYK, MOL, K-Line, Maersk) and alternate port routing.',
            owner: 'Global Logistics Control Tower',
        },
        {
            category: 'Currency & FX Risk',
            level: 'Low • Hedged',
            protocol: 'Multi-currency settlement accounts (USD, JPY, EUR, GBP, AUD, AED, BDT) and locked proforma validity windows.',
            owner: 'Valqora Capital Treasury',
        },
        {
            category: 'Regulatory & Customs Risk',
            level: 'Low • Pre-Verified',
            protocol: 'Automated WCO HS-code validation, JEVIC/JAAI/QISJ pre-shipment certification, and destination age-rule checks.',
            owner: 'Global Trade Compliance Office',
        },
        {
            category: 'Market & Demand Risk',
            level: 'Low • Diversified',
            protocol: 'Balanced exposure across 30+ countries and 7 business divisions to prevent single-market dependency.',
            owner: 'Executive Strategy Board',
        },
        {
            category: 'Political & Sanctions Risk',
            level: 'Zero Tolerance',
            protocol: 'Real-time OFAC, UN, EU, and METI restricted-party and sanctions screening prior to quotation issuance.',
            owner: 'Legal & AML/KYC Directorate',
        },
        {
            category: 'Cybersecurity & Data Risk',
            level: 'Low • Encrypted',
            protocol: 'TLS 1.3 encryption, MFA-enforced portals, SHA-256 document hashing, and <4h RTO / <15m RPO cloud backups.',
            owner: 'Valqora Technology Security',
        },
        {
            category: 'Reputational & Quality Risk',
            level: 'Zero-Defect Target',
            protocol: '10-point Pre-Export Quality Control sign-off before any vehicle or container leaves a Valqora facility.',
            owner: 'Chief Quality Officer',
        },
    ];

    const openRoles = [
        {
            id: 'VGT-TOK-01',
            title: 'Senior JDM Auction & Procurement Specialist',
            department: 'Valqora Auto',
            location: 'Tokyo / Yokohama, Japan',
            type: 'Full-Time • On-Site',
            experience: '5+ Years USS/TAA Auction Bidding',
        },
        {
            id: 'VGT-DXB-02',
            title: 'Regional Director — Middle East & Africa Fleet Sales',
            department: 'Valqora Global Trading',
            location: 'Dubai, UAE (DIFC)',
            type: 'Full-Time • Hybrid',
            experience: '8+ Years B2B Automotive / Heavy Machinery',
        },
        {
            id: 'VGT-FRA-03',
            title: 'European Export Compliance & Customs Manager',
            department: 'Valqora Logistics',
            location: 'Frankfurt, Germany',
            type: 'Full-Time • Hybrid',
            experience: '6+ Years WCO / Incoterms® / EU Customs',
        },
        {
            id: 'VGT-SGP-04',
            title: 'Principal Trade Platform Engineer (Laravel / React)',
            department: 'Valqora Technology',
            location: 'Singapore / Remote Global',
            type: 'Full-Time • Remote',
            experience: '6+ Years Enterprise ERP & Supply Chain Systems',
        },
    ];

    return (
        <AppLayout>
            <Head title="Corporate Profile, Governance, ESG & Investor Relations" />

            {/* Hero Header */}
            <section className="pt-28 pb-16 bg-[#111111] border-b border-[#2D2D2D] vq-grid-bg">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-3xl">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-3">
                            Valqora Global Trading • Institutional Profile
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                            Building Trust Across Borders.
                        </h1>
                        <p className="text-lg text-[#D1D5DB] leading-relaxed">
                            Valqora Global Trading is a multinational trading and investment group established to connect manufacturers, suppliers, distributors, dealers, and institutional buyers through disciplined sourcing, transparent documentation, and world-class logistics.
                        </p>
                    </div>

                    {/* Interactive Section Tabs */}
                    <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[#2D2D2D]">
                        {([
                            { id: 'overview', label: 'Company Overview', icon: Building2 },
                            { id: 'governance', label: 'Corporate Governance', icon: Scale },
                            { id: 'risk', label: 'Risk Management', icon: AlertTriangle },
                            { id: 'esg', label: 'ESG & Sustainability', icon: Leaf },
                            { id: 'investors', label: 'Investor Relations', icon: TrendingUp },
                            { id: 'careers', label: 'Careers & Talent', icon: Briefcase },
                            { id: 'compliance', label: 'Legal & AML/KYC', icon: Lock },
                        ] as const).map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-[#C9A227] text-[#111111]'
                                            : 'bg-[#1A1A1A] text-[#9CA3AF] border border-[#2D2D2D] hover:text-white hover:border-[#C9A227]/40'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
                <div className="py-16 bg-[#111111] space-y-20">
                    {/* Vision, Mission, Purpose & Philosophy */}
                    <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8">
                                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
                                    01 • Vision Statement
                                </span>
                                <h2 className="text-xl font-bold text-white mb-3">Global Benchmark in Trade</h2>
                                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                                    To become one of the world's most trusted international trading companies by connecting businesses across borders through integrity, innovation, and operational excellence.
                                </p>
                            </div>
                            <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8">
                                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
                                    02 • Mission Statement
                                </span>
                                <h2 className="text-xl font-bold text-white mb-3">Disciplined Procurement</h2>
                                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                                    To provide businesses worldwide with dependable sourcing, procurement, and trading solutions through disciplined processes, trusted partnerships, and exceptional customer service.
                                </p>
                            </div>
                            <div className="bg-[#1A1A1A] border border-[#C9A227]/40 rounded-2xl p-8">
                                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
                                    03 • Corporate Philosophy
                                </span>
                                <h2 className="text-xl font-bold text-white mb-3">Trust Compounds Faster Than Profit</h2>
                                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                                    Profit follows value. Value follows trust. Trust follows consistent execution. Every decision is evaluated against four questions: Does it benefit the customer, strengthen the partnership, protect the brand, and create long-term value?
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Six Core Values */}
                    <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                        <div className="mb-10">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-2">
                                Brand DNA • The Ruler & The Sage Archetypes
                            </span>
                            <h2 className="text-3xl font-bold text-white">Six Core Values</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coreValues.map((val) => {
                                const Icon = val.icon;
                                return (
                                    <div key={val.title} className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                                        <div className="w-11 h-11 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center mb-5">
                                            <Icon className="w-5 h-5 text-[#C9A227]" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                                        <p className="text-sm text-[#9CA3AF] leading-relaxed">{val.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Corporate Timeline & Implementation Roadmap */}
                    <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                        <div className="mb-10">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-2">
                                Strategic Trajectory • Corporate Timeline
                            </span>
                            <h2 className="text-3xl font-bold text-white">From Japanese Sourcing to Global Enterprise</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {timeline.map((item, idx) => (
                                <div key={idx} className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7 relative">
                                    <span className="text-xs font-mono font-bold text-[#C9A227] block mb-2">
                                        {item.year}
                                    </span>
                                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Brand Manifesto */}
                    <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#141414] border border-[#C9A227]/30 rounded-3xl p-10 md:p-14">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-4">
                                The Valqora Manifesto • Our Standard
                            </span>
                            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed space-y-3 max-w-4xl">
                                <p>"We believe trust is earned through consistent action.</p>
                                <p>We believe international trade should build opportunity rather than barriers.</p>
                                <p>We believe partnerships are stronger than transactions, and precision reflects respect.</p>
                                <p className="text-[#C9A227] font-bold">We believe every shipment carries our reputation."</p>
                            </blockquote>
                        </div>
                    </section>
                </div>
            )}

            {/* Tab 2: Corporate Governance */}
            {activeTab === 'governance' && (
                <div className="py-16 bg-[#111111] max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
                    <div className="max-w-3xl">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-2">
                            Volume 1 Page 22 • Institutional Oversight
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-4">Corporate Governance Framework</h2>
                        <p className="text-[#9CA3AF] leading-relaxed">
                            Strong governance creates sustainable organizations. Valqora maintains disciplined decision-making, clear executive accountability, and multi-jurisdictional regulatory compliance across all global offices.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Board of Directors & Audit Committee',
                                desc: 'Independent oversight of financial reporting, capital allocation, internal audit logs, and annual vendor certifications.',
                                badge: 'Quarterly Audit Cycle',
                            },
                            {
                                title: 'Global Brand & Quality Custody',
                                desc: 'Zero-tolerance enforcement of visual, documentary, and 160-point engineering inspection standards across all regional hubs.',
                                badge: 'ISO 9001 Aligned',
                            },
                            {
                                title: 'Stakeholder Commitment Charter',
                                desc: 'Balanced value creation for Customers, Suppliers, Employees, Investors, and Host Communities in 30+ countries.',
                                badge: '5 Stakeholder Pillars',
                            },
                        ].map((card) => (
                            <div key={card.title} className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                                <span className="text-[11px] font-mono text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-1 rounded inline-block mb-4">
                                    {card.badge}
                                </span>
                                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                                <p className="text-sm text-[#9CA3AF] leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Executive Decision Framework */}
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6">
                            The 4-Gate Executive Decision Protocol
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { gate: 'Gate 01', q: 'Does it benefit the customer?', detail: 'Every operational change must improve transparency, speed, or landed value.' },
                                { gate: 'Gate 02', q: 'Does it strengthen the partnership?', detail: 'We prioritize repeatable mutual success over one-sided margins.' },
                                { gate: 'Gate 03', q: 'Does it protect the brand?', detail: 'No shortcut is permitted if it compromises documentary or mechanical integrity.' },
                                { gate: 'Gate 04', q: 'Does it create long-term value?', detail: 'If any gate is answered No, the transaction or policy is reconsidered.' },
                            ].map((g) => (
                                <div key={g.gate} className="bg-[#111111] border border-[#2D2D2D] rounded-xl p-5">
                                    <span className="text-xs font-mono text-[#C9A227] block mb-1">{g.gate}</span>
                                    <div className="font-bold text-white text-sm mb-2">{g.q}</div>
                                    <p className="text-xs text-[#9CA3AF] leading-relaxed">{g.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 3: Risk Management Framework (Vol 1 p. 29 & Vol 7 p. 415) */}
            {activeTab === 'risk' && (
                <div className="py-16 bg-[#111111] max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-2">
                                Volume 1 Page 23 & Volume 7 Page 27 • Enterprise Resilience
                            </span>
                            <h2 className="text-3xl font-bold text-white mb-3">
                                Risk Management & Business Continuity Framework
                            </h2>
                            <p className="text-[#9CA3AF]">
                                International trade involves uncertainty. Our responsibility is to Identify, Assess, Mitigate, Monitor, and Improve across all 8 risk categories before disruptions impact customers or partners.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-xs">
                            <span className="px-3 py-1.5 rounded bg-[#2E8B57]/15 border border-[#2E8B57]/40 text-[#2E8B57]">
                                RTO &lt; 4 Hours
                            </span>
                            <span className="px-3 py-1.5 rounded bg-[#0057B8]/15 border border-[#0057B8]/40 text-[#60A5FA]">
                                RPO &lt; 15 Minutes
                            </span>
                        </div>
                    </div>

                    {/* 5-Step Process Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {['1. Identify', '2. Assess', '3. Mitigate', '4. Monitor', '5. Improve'].map((step) => (
                            <div key={step} className="bg-[#1A1A1A] border border-[#C9A227]/30 rounded-xl p-4 text-center">
                                <span className="text-sm font-mono font-bold text-[#C9A227]">{step}</span>
                            </div>
                        ))}
                    </div>

                    {/* 8 Risk Categories Table */}
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#161616] text-[11px] font-mono uppercase text-[#9CA3AF] border-b border-[#2D2D2D]">
                                        <th className="py-4 px-6">Risk Category</th>
                                        <th className="py-4 px-6">Status / Exposure</th>
                                        <th className="py-4 px-6">Mitigation Protocol & Controls</th>
                                        <th className="py-4 px-6">Governance Owner</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2D2D2D] text-sm">
                                    {riskCategories.map((item) => (
                                        <tr key={item.category} className="hover:bg-[#111111]/60">
                                            <td className="py-4 px-6 font-bold text-white">{item.category}</td>
                                            <td className="py-4 px-6 font-mono text-xs text-[#2E8B57]">{item.level}</td>
                                            <td className="py-4 px-6 text-[#D1D5DB] text-xs leading-relaxed">{item.protocol}</td>
                                            <td className="py-4 px-6 font-mono text-xs text-[#9CA3AF]">{item.owner}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 4: ESG & Sustainability (Vol 1 p. 27, Vol 7 p. 417) */}
            {activeTab === 'esg' && (
                <div className="py-16 bg-[#111111] max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
                    <div className="max-w-3xl">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2E8B57] block mb-2">
                            Environmental, Social & Governance • Responsible Global Trade
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            ESG & Green Logistics Commitment
                        </h2>
                        <p className="text-[#9CA3AF] leading-relaxed">
                            Long-term business success is inseparable from responsible operations. Valqora integrates carbon reduction, paperless trade documentation, and ethical supply chain standards across every corridor.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { metric: '68%', label: 'EV & Hybrid Export Share', sub: 'Prioritizing low-emission JDM & European inventory' },
                            { metric: '99.4%', label: 'Digital Document Adoption', sub: 'Eliminating paper waste across customs & banking' },
                            { metric: '100%', label: 'ISPM-15 & FSC Packaging', sub: 'Recyclable export cartons & sustainable dunnage' },
                            { metric: 'ISO 14001', label: 'Green Port Partners', sub: 'Preferred carriers with IMO decarbonization targets' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-[#1A1A1A] border border-[#2E8B57]/30 rounded-2xl p-6">
                                <div className="text-3xl font-bold text-[#2E8B57] font-mono tabular-nums mb-2">
                                    {stat.metric}
                                </div>
                                <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
                                <div className="text-xs text-[#9CA3AF]">{stat.sub}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                            <h3 className="text-lg font-bold text-white mb-4">Environmental Pillar</h3>
                            <ul className="space-y-2.5 text-sm text-[#9CA3AF]">
                                <li>• Route & container utilization optimization (&gt;92% fill rate) to minimize per-unit CO₂ emissions.</li>
                                <li>• 100% digital approval workflows and QR-verified e-documentation.</li>
                                <li>• LED warehouse illumination and electric material-handling forklifts in Yokohama & Dubai.</li>
                            </ul>
                        </div>
                        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                            <h3 className="text-lg font-bold text-white mb-4">Social & CSR Pillar</h3>
                            <ul className="space-y-2.5 text-sm text-[#9CA3AF]">
                                <li>• Strict occupational safety compliance across all container loading and port terminal yards.</li>
                                <li>• Road safety education and technical mechanic training initiatives in emerging import markets.</li>
                                <li>• Equal opportunity, multilingual workforce across Tokyo, Dubai, Frankfurt, and Singapore.</li>
                            </ul>
                        </div>
                        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                            <h3 className="text-lg font-bold text-white mb-4">Governance Pillar</h3>
                            <ul className="space-y-2.5 text-sm text-[#9CA3AF]">
                                <li>• Zero-tolerance anti-bribery, anti-corruption, and AML/KYC screening on every shipment.</li>
                                <li>• GDPR-compliant customer and dealer data protection architecture.</li>
                                <li>• Annual independent audit of financial, quality, and environmental KPIs.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 5: Investor Relations (Vol 8 p. 478 & Vol 9 p. 556) */}
            {activeTab === 'investors' && (
                <div className="py-16 bg-[#111111] max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-2">
                                Investor Relations • Capital Discipline & Growth
                            </span>
                            <h2 className="text-3xl font-bold text-white mb-3">
                                Institutional Financial Highlights & Capital Allocation
                            </h2>
                            <p className="text-[#9CA3AF]">
                                Valqora operates an asset-disciplined, high-velocity international trading model backed by verified inventory turnover, multi-currency treasury management, and expanding B2B recurring dealer accounts.
                            </p>
                        </div>
                        <Link
                            href="/contact?department=Corporate+Office"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-[#C9A227] text-[#111111] font-bold text-xs font-mono uppercase rounded-lg"
                        >
                            Contact Investor Relations
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Annualized GMV Run-Rate', value: 'USD 148.5M', delta: '+34.2% YoY' },
                            { label: 'EBITDA Margin', value: '14.8%', delta: '+180 bps YoY' },
                            { label: 'Institutional Repeat Rate', value: '86.4%', delta: 'Dealer & Fleet Retention' },
                            { label: 'Working Capital Cycle', value: '21 Days', delta: 'High-Velocity Inventory Turn' },
                        ].map((kpi) => (
                            <div key={kpi.label} className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                                <span className="text-xs font-mono text-[#9CA3AF] block mb-2">{kpi.label}</span>
                                <div className="text-3xl font-bold text-white font-mono tabular-nums mb-2">{kpi.value}</div>
                                <span className="text-xs font-mono text-[#2E8B57]">{kpi.delta}</span>
                            </div>
                        ))}
                    </div>

                    {/* Downloadable Investor & Corporate Publications */}
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6">
                            Official Corporate & Investor Publications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: 'Valqora Annual Corporate Report 2026', code: 'VGT-IR-2026-AR', size: 'PDF • 4.2 MB' },
                                { title: 'ESG & Green Logistics Impact Summary', code: 'VGT-ESG-2026-SR', size: 'PDF • 2.8 MB' },
                                { title: 'Multinational Brand & Governance Manual v1.0', code: 'VGT-GOV-2026-BM', size: 'PDF • 10 Volumes' },
                            ].map((doc) => (
                                <div
                                    key={doc.code}
                                    className="bg-[#111111] border border-[#2D2D2D] rounded-xl p-5 flex items-center justify-between"
                                >
                                    <div>
                                        <span className="text-[11px] font-mono text-[#C9A227] block mb-1">{doc.code}</span>
                                        <div className="text-sm font-bold text-white mb-1">{doc.title}</div>
                                        <span className="text-xs font-mono text-[#6B7280]">{doc.size}</span>
                                    </div>
                                    <Link
                                        href="/portal/documents"
                                        className="p-2.5 rounded-lg bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] hover:bg-[#C9A227] hover:text-[#111111] transition-colors"
                                        title="View in Document Center"
                                    >
                                        <Download className="w-4 h-4" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 6: Careers & Talent Marketing (Vol 8 pp. 492–494) */}
            {activeTab === 'careers' && (
                <div className="py-16 bg-[#111111] max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
                    <div className="max-w-3xl">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-2">
                            Volume 8 Page 28 • Employer Branding & Talent
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-3">
                            Build a Global Career at Valqora
                        </h2>
                        <p className="text-[#9CA3AF]">
                            We attract disciplined professionals seeking long-term international careers across engineering inspection, global logistics, institutional finance, and enterprise software.
                        </p>
                    </div>

                    {/* 6-Stage Candidate Journey */}
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                        <h3 className="text-sm font-mono uppercase tracking-wider text-[#C9A227] mb-4">
                            Standardized 6-Stage Candidate Experience
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                            {['1. Application', '2. Screening', '3. Interview', '4. Assessment', '5. Offer', '6. Onboarding'].map((stage) => (
                                <div key={stage} className="bg-[#111111] border border-[#2D2D2D] rounded-xl p-3.5 text-center text-xs font-mono text-white">
                                    {stage}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Open Positions */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Open Global Positions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {openRoles.map((role) => (
                                <div key={role.id} className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-[#C9A227]">{role.id} • {role.department}</span>
                                            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#2D2D2D] text-white">
                                                {role.type}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{role.title}</h4>
                                        <p className="text-xs text-[#9CA3AF] mb-4">
                                            Location: <span className="text-white">{role.location}</span> • Requirement: <span className="text-white">{role.experience}</span>
                                        </p>
                                    </div>
                                    <Link
                                        href={`/contact?department=Careers&subject=${encodeURIComponent('Application: ' + role.title + ' (' + role.id + ')')}`}
                                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C9A227] hover:underline"
                                    >
                                        Apply via Careers Desk →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 7: Legal, Compliance & AML/KYC (Vol 7 p. 414) */}
            {activeTab === 'compliance' && (
                <div className="py-16 bg-[#111111] max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
                    <div className="max-w-3xl">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-2">
                            Volume 7 Page 26 • Regulatory & Legal Standards
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-3">
                            Trade Compliance, AML/KYC & Legal Framework
                        </h2>
                        <p className="text-[#9CA3AF]">
                            Every Valqora transaction is governed by strict international trade compliance, World Customs Organization (WCO) nomenclature, and Incoterms® 2020 commercial rules.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                            <h3 className="text-lg font-bold text-white mb-3">AML / KYC & Sanctions Screening</h3>
                            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                                Prior to issuing formal proforma invoices or accepting letters of credit, Valqora conducts automated Know Your Customer (KYC), Anti-Money Laundering (AML), and Restricted Party Screening against METI (Japan), OFAC, EU, and UN sanctions lists.
                            </p>
                            <div className="text-xs font-mono text-[#2E8B57]">✓ 100% Pre-Shipment Verification Mandatory</div>
                        </div>
                        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                            <h3 className="text-lg font-bold text-white mb-3">Data Privacy & Intellectual Property</h3>
                            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                                Customer, dealer, and supplier records are protected under GDPR-ready data minimization, role-based access controls, and TLS encryption. VALQORA® and the interlocking VQ Monogram are protected corporate trademarks.
                            </p>
                            <div className="text-xs font-mono text-[#C9A227]">✓ Cryptographic QR Document Authentication</div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
