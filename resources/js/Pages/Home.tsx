import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { VehicleCard } from '@/Components/VehicleCard';
import { Vehicle, Article, Port } from '@/types';
import {
  ShieldCheck,
  Globe,
  Award,
  Truck,
  ArrowRight,
  CheckCircle2,
  Building2,
  Compass,
  FileCheck,
  Search,
  MessageSquare,
  FileText,
  Ship,
  PackageCheck,
  Handshake,
  Headphones,
  Quote,
  Star,
  MapPin,
} from 'lucide-react';

interface HomeProps {
  featuredVehicles: Vehicle[];
  latestArticles: Article[];
  destinations: Port[];
  stats?: { label: string; value: string; description: string }[];
}

export default function Home({
  featuredVehicles = [],
  latestArticles = [],
  destinations = [],
  stats = [],
}: HomeProps) {
  const [activeMarketTab, setActiveMarketTab] = useState<'primary' | 'secondary' | 'expansion'>('primary');

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Transparent Inspection',
      description:
        'Every vehicle undergoes a 150+ point independent mechanical, structural, and radiation inspection before export release, backed by 360° photography and auction sheet verification.',
      metric: '100% Verified Grades',
    },
    {
      icon: Globe,
      title: 'Worldwide Export',
      description:
        'Direct Ro-Ro and container shipping lanes from Yokohama, Nagoya, Kobe, and Osaka to 45+ global ports across Oceania, Europe, the Middle East, South Asia, and Africa.',
      metric: '45+ Global Ports',
    },
    {
      icon: Award,
      title: 'Verified Quality',
      description:
        'Strict adherence to Japanese JEVIC/JAAI standards, odometer authenticity certificates, and zero-tolerance pre-export quality control checklists.',
      metric: '99.9% Doc Accuracy',
    },
    {
      icon: Truck,
      title: 'End-to-End Logistics',
      description:
        'Complete inland transport, customs deregulation, marine insurance, tamper-evident bolt sealing, and real-time 10-stage shipment tracking.',
      metric: '98.6% On-Time Dispatch',
    },
  ];

  const customerJourneySteps = [
    {
      step: '01',
      title: 'Discovery',
      desc: 'Explore live stock or submit custom sourcing criteria across Japanese auctions and European fleets.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Consultation',
      desc: 'Review destination import regulations, compliance rules, and target specifications with a specialist.',
      icon: MessageSquare,
    },
    {
      step: '03',
      title: 'Quotation',
      desc: 'Receive a transparent FOB/CIF/CFR proforma invoice with itemized vehicle, freight, and insurance costs.',
      icon: FileText,
    },
    {
      step: '04',
      title: 'Procurement',
      desc: 'Dedicated bidding and direct acquisition with physical pre-purchase verification.',
      icon: CheckCircle2,
    },
    {
      step: '05',
      title: 'Documentation',
      desc: 'Export Certificate, Commercial Invoice, Packing List, and Certificate of Origin prepared with QR verification.',
      icon: FileCheck,
    },
    {
      step: '06',
      title: 'Logistics Coordination',
      desc: 'Pre-export 10-point QC, marine protection film, wheel chocking, and high-security bolt seal installation.',
      icon: Ship,
    },
    {
      step: '07',
      title: 'Delivery',
      desc: 'Ocean transit monitoring, destination port arrival alerts, and customs clearance coordination.',
      icon: PackageCheck,
    },
    {
      step: '08',
      title: 'After-Sales Support',
      desc: 'Executive Vehicle Delivery Pack, spare key dispatch, maintenance schedules, and parts support.',
      icon: Headphones,
    },
    {
      step: '09',
      title: 'Long-Term Partnership',
      desc: 'Priority fleet allocation, wholesale dealer credit lines, and quarterly market intelligence.',
      icon: Handshake,
    },
  ];

  const marketMatrix = {
    primary: [
      { country: 'Australia', ports: 'Brisbane, Melbourne, Sydney, Fremantle', compliance: 'RAWS / SEVS & Biosecurity Cleaning', transit: '14–18 Days' },
      { country: 'New Zealand', ports: 'Auckland, Lyttelton, Wellington', compliance: 'NZTA Border Inspection & MAF', transit: '16–20 Days' },
      { country: 'United Kingdom', ports: 'Southampton, Bristol, Tilbury', compliance: 'IVA / DVLA Registration Ready', transit: '35–42 Days' },
      { country: 'Ireland', ports: 'Dublin', compliance: 'NCT / VRT Export Package', transit: '36–44 Days' },
      { country: 'United Arab Emirates', ports: 'Jebel Ali (Dubai)', compliance: 'GCC / LHD & Classic Spec', transit: '20–25 Days' },
      { country: 'Saudi Arabia', ports: 'Jeddah, Dammam', compliance: 'SASO Certificate of Conformity', transit: '22–28 Days' },
      { country: 'South Africa', ports: 'Durban (Transit Hub)', compliance: 'ITAC & Microdot Inspection', transit: '24–30 Days' },
      { country: 'Bangladesh', ports: 'Chattogram, Mongla', compliance: 'JAAI / JEVIC Pre-Shipment Certificate', transit: '14–18 Days' },
      { country: 'Kenya', ports: 'Mombasa', compliance: 'KEBS / QISJ Roadworthiness (8-Yr Rule)', transit: '21–26 Days' },
      { country: 'Tanzania', ports: 'Dar es Salaam', compliance: 'TBS / EAA Pre-Export Verification', transit: '22–27 Days' },
    ],
    secondary: [
      { country: 'Malaysia', ports: 'Port Klang', compliance: 'AP Holder & MITI Documentation', transit: '8–12 Days' },
      { country: 'Singapore', ports: 'Pasir Panjang', compliance: 'LTA Euro VI & Emissions Cert', transit: '7–10 Days' },
      { country: 'Thailand', ports: 'Laem Chabang', compliance: 'Industrial & Commercial Spec', transit: '9–13 Days' },
      { country: 'Sri Lanka', ports: 'Colombo, Hambantota', compliance: 'JAAI & LC Compliant Invoicing', transit: '12–16 Days' },
      { country: 'Pakistan', ports: 'Karachi, Port Qasim', compliance: 'Baggage / Gift Scheme Verified', transit: '18–22 Days' },
      { country: 'Canada', ports: 'Vancouver (New Westminster)', compliance: '15-Year RIV Exempt & Soil-Free', transit: '12–16 Days' },
      { country: 'Chile', ports: 'Iquique', compliance: 'ZOFRI Free Zone Transit', transit: '28–34 Days' },
      { country: 'Mauritius', ports: 'Port Louis', compliance: 'JEVIC Pre-Shipment Cert', transit: '20–25 Days' },
      { country: 'Caribbean Markets', ports: 'Kingston, Port of Spain, Bridgetown', compliance: 'CARICOM & JEVIC Certified', transit: '28–36 Days' },
    ],
    expansion: [
      { country: 'North America (USA)', ports: 'Los Angeles, Tacoma, Jacksonville', compliance: '25-Year FMVSS / EPA Classic Rule', transit: '14–26 Days' },
      { country: 'Continental Europe', ports: 'Rotterdam, Bremerhaven, Antwerp', compliance: 'EU T1 Transit & Homologation', transit: '35–42 Days' },
      { country: 'Latin America', ports: 'Callao (Peru), Colon (Panama)', compliance: 'Regional Customs Harmonized Docs', transit: '26–32 Days' },
      { country: 'Central Asia', ports: 'Almaty, Tashkent (Intermodal)', compliance: 'Rail-Container Multimodal Seal', transit: '18–24 Days' },
      { country: 'Emerging African Markets', ports: 'Walvis Bay, Maputo, Tema', compliance: 'SADC / ECOWAS Corridor Ready', transit: '26–35 Days' },
    ],
  };

  const testimonials = [
    {
      quote:
        'Valqora operates with the discipline of a major Japanese trading house rather than a typical exporter. Every auction sheet, JEVIC certificate, and Bill of Lading arrives verified before the vessel even berths in Brisbane.',
      author: 'Marcus Vance',
      role: 'Managing Director, Pacific Prestige Imports',
      country: 'Australia',
      volume: '140+ Vehicles / Year',
    },
    {
      quote:
        'For our Chattogram dealership, LC documentation accuracy is everything. Valqora’s QR-verified commercial invoices and pre-shipment JAAI inspections have eliminated customs delays across 18 consecutive shipments.',
      author: 'Tariqul Islam Chowdhury',
      role: 'Chairman, Continental Motors Ltd.',
      country: 'Bangladesh',
      volume: '85+ Vehicles / Year',
    },
    {
      quote:
        'Their container loading engineering and bolt-seal tracking give us complete peace of mind when importing high-grade European and JDM performance models into the UK and Ireland.',
      author: 'Alistair Sterling',
      role: 'Head of Procurement, Sterling Fleet Group',
      country: 'United Kingdom',
      volume: '60+ Vehicles / Year',
    },
  ];

  const displayStats = stats.length > 0 ? stats : [
    { label: 'Industry Experience', value: '15+ Yrs', description: 'Disciplined Japanese & European sourcing' },
    { label: 'Countries Served', value: '45+', description: 'Active Ro-Ro & container trade corridors' },
    { label: 'Vehicles Exported', value: '12,400+', description: 'Zero-defect pre-export QC standard' },
    { label: 'Documentation Accuracy', value: '99.9%', description: 'WCO & Incoterms® 2020 compliant' },
    { label: 'Client Satisfaction', value: '4.9 / 5', description: 'Verified institutional & dealer partners' },
  ];

  return (
    <AppLayout>
      <Head title="Valqora Global Trading — Global Vehicle Sourcing. Trusted Worldwide." />

      {/* 1. Hero Section (Vol 5 p. 242–243) */}
      <section className="relative bg-[#111111] text-white overflow-hidden border-b border-[#2D2D2D]">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/60" />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#C9A227]/15 border border-[#C9A227]/40 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227]">
                VALQORA GLOBAL TRADING • CORPORATE HEADQUARTERS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Global Vehicle Sourcing.{' '}
              <span className="text-[#C9A227]">Trusted Worldwide.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed mb-10 max-w-2xl">
              Connecting international buyers with premium Japanese and European vehicles through transparent sourcing, inspection, and export solutions.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 bg-[#C9A227] hover:bg-[#b59020] text-[#111111] font-semibold px-7 py-4 rounded-[8px] transition-all duration-150 shadow-lg"
              >
                Explore Inventory
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sourcing"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-[#111111] border border-[#111111] font-semibold px-7 py-4 rounded-[8px] transition-all duration-150"
              >
                Request Vehicle Sourcing
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-[#C9A227] px-4 py-3 underline-offset-4 hover:underline transition-colors"
              >
                <Compass className="w-4 h-4 text-[#C9A227]" />
                Track Live Shipment
              </Link>
            </div>

            {/* 5-Second Executive Clarity Bar (Vol 2 p. 79 & Vol 5 p. 242) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A227] mb-1">
                  01. Who Is Valqora
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  A diversified international trading group headquartered in Japan with global export & procurement operations.
                </p>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A227] mb-1">
                  02. What We Do
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Institutional JDM & European vehicle sourcing, 150-point inspection, customs documentation, and Ro-Ro/container logistics.
                </p>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A227] mb-1">
                  03. Why Trust Valqora
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  99.9% documentation accuracy, QR-authenticated certificates, and real-time 10-stage shipment visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators Bar (Vol 5 p. 243) */}
      <section className="bg-[#111111] text-white border-b border-neutral-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            {displayStats.map((item, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4 md:pt-0 md:pl-8' : ''}>
                <div className="text-3xl font-bold text-[#C9A227] tabular-nums tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-white mt-1">{item.label}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Inventory (Vol 5 p. 243) */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
                Export-Ready Catalogue
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
                Featured Inventory
              </h2>
              <p className="text-[#5A5F66] mt-2 max-w-2xl">
                Latest arrivals, verified auction grade vehicles, and limited-availability JDM & European export stock inspected in Japan.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-4">
              <Link
                href="/vehicles?sort=featured"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] border border-[#111111] text-sm font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                View Full Catalogue
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Valqora — Four Strategic Pillars (Vol 5 p. 243) */}
      <section className="py-20 bg-white border-y border-[#E8E9EB]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
              Why Valqora Global Trading
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
              Disciplined Execution Across Every Border
            </h2>
            <p className="text-[#5A5F66] mt-3 leading-relaxed">
              Unlike transactional brokers focused solely on price, Valqora competes through engineering-grade inspection, transparent documentation, and institutional logistics control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="bg-[#FAFAFA] border border-[#E8E9EB] rounded-[16px] p-8 flex flex-col justify-between hover:border-[#C9A227] transition-all duration-180 shadow-sm"
                >
                  <div>
                    <div className="w-12 h-12 rounded-[8px] bg-[#111111] text-[#C9A227] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#111111] mb-3">{pillar.title}</h3>
                    <p className="text-sm text-[#5A5F66] leading-relaxed">{pillar.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E8E9EB] flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold">
                      {pillar.metric}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. 9-Step Global Export Process / Customer Journey (Vol 1 p. 31 & Vol 2 p. 80) */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
                Standard Operating Workflow
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                The 9-Stage Global Export Process
              </h2>
              <p className="text-neutral-400 mt-2 max-w-2xl">
                Every shipment follows a structured, auditable 9-stage customer journey from initial consultation to post-delivery ownership support.
              </p>
            </div>
            <Link
              href="/services"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] hover:underline"
            >
              Explore Export & Logistics Standards
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerJourneySteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#2D2D2D]/60 border border-neutral-800 rounded-[12px] p-6 hover:border-[#C9A227]/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#C9A227]/15 text-[#C9A227]">
                      STAGE {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Global Presence & Target Markets Matrix (Vol 1 p. 19 & Vol 5 p. 244) */}
      <section className="py-20 bg-white border-b border-[#E8E9EB]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
                Global Trade Network
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
                Global Presence & Target Markets
              </h2>
              <p className="text-[#5A5F66] mt-2 max-w-2xl">
                Direct maritime routes from Japanese and European hubs into Primary, Secondary, and Expansion destination markets with country-specific regulatory compliance.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6 lg:mt-0 bg-[#F3F4F6] p-1.5 rounded-[8px]">
              <button
                type="button"
                onClick={() => setActiveMarketTab('primary')}
                className={`px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors ${
                  activeMarketTab === 'primary'
                    ? 'bg-[#111111] text-[#C9A227]'
                    : 'text-[#5A5F66] hover:text-[#111111]'
                }`}
              >
                Primary Markets (10)
              </button>
              <button
                type="button"
                onClick={() => setActiveMarketTab('secondary')}
                className={`px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors ${
                  activeMarketTab === 'secondary'
                    ? 'bg-[#111111] text-[#C9A227]'
                    : 'text-[#5A5F66] hover:text-[#111111]'
                }`}
              >
                Secondary Markets (9)
              </button>
              <button
                type="button"
                onClick={() => setActiveMarketTab('expansion')}
                className={`px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors ${
                  activeMarketTab === 'expansion'
                    ? 'bg-[#111111] text-[#C9A227]'
                    : 'text-[#5A5F66] hover:text-[#111111]'
                }`}
              >
                Expansion Regions (5)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-[#E8E9EB] rounded-[12px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E8E9EB] text-[#111111] text-xs uppercase font-semibold tracking-wider">
                  <th className="py-3.5 px-5">Destination Market</th>
                  <th className="py-3.5 px-5">Primary Discharge Ports</th>
                  <th className="py-3.5 px-5">Regulatory & Inspection Standard</th>
                  <th className="py-3.5 px-5 text-right">Est. Ocean Transit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E9EB] text-sm">
                {marketMatrix[activeMarketTab].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-[#111111] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C9A227] shrink-0" />
                      {row.country}
                    </td>
                    <td className="py-3.5 px-5 text-[#5A5F66]">{row.ports}</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#2E8B57]/10 text-[#2E8B57] text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {row.compliance}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono text-[#111111] tabular-nums">
                      {row.transit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {destinations && destinations.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {destinations.slice(0, 6).map((port) => (
                <div key={port.id} className="p-4 rounded-[8px] bg-[#FAFAFA] border border-[#E8E9EB]">
                  <div className="text-xs font-mono text-[#C9A227] font-semibold">{port.code}</div>
                  <div className="text-sm font-bold text-[#111111] mt-0.5">{port.name}</div>
                  <div className="text-xs text-[#5A5F66]">{port.country}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. Customer Testimonials (Vol 5 p. 243–244) */}
      <section className="py-20 bg-[#FAFAFA] border-b border-[#E8E9EB]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
              Verified Client Endorsements
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">
              Trusted by International Dealers & Fleet Operators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-[#E8E9EB] rounded-[16px] p-8 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-[#C9A227]">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#C9A227]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#E8E9EB]" />
                  </div>
                  <p className="text-sm text-[#111111] leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E8E9EB] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#111111]">{t.author}</div>
                    <div className="text-xs text-[#5A5F66]">{t.role}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-[#111111] block">
                      {t.country}
                    </span>
                    <span className="text-[11px] font-mono text-[#2E8B57]">{t.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Corporate Architecture & Latest Insights (Vol 1 p. 24–25 & Vol 2 p. 80) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 bg-[#111111] text-white rounded-[16px] p-8 md:p-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A227] mb-3">
                <Building2 className="w-4 h-4" />
                Master Brand Architecture
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Built to Scale Across Global Industries
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                While Valqora Auto anchors our JDM and European vehicle export operations, the Valqora Global Trading group operates a unified corporate structure across seven specialized divisions.
              </p>
              <div className="space-y-2.5 mb-8 text-sm">
                {[
                  ['Valqora Global Trading', 'International Sourcing & Trade'],
                  ['Valqora Auto', 'JDM & European Vehicle Exports'],
                  ['Valqora Logistics', 'Ro-Ro, Container & Port Operations'],
                  ['Valqora Industrial', 'Heavy Machinery & Plant Procurement'],
                  ['Valqora Energy', 'Renewable & Power Infrastructure'],
                  ['Valqora Capital', 'Trade Finance & Strategic Investment'],
                  ['Valqora Technology', 'Digital Trade & AI Supply Chain'],
                ].map(([name, role]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between py-2 border-b border-neutral-800"
                  >
                    <span className="font-semibold text-white">{name}</span>
                    <span className="text-xs text-[#C9A227] font-mono">{role}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/divisions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] hover:underline"
              >
                Explore All 7 Business Divisions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-2">
                    Market Intelligence
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#111111]">
                    Latest Trade & Regulatory Insights
                  </h3>
                </div>
                <Link
                  href="/insights"
                  className="text-sm font-semibold text-[#111111] hover:text-[#C9A227] inline-flex items-center gap-1"
                >
                  All Insights <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {latestArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/insights/${article.slug}`}
                    className="block p-6 rounded-[12px] border border-[#E8E9EB] hover:border-[#C9A227] transition-colors bg-[#FAFAFA]"
                  >
                    <div className="flex items-center gap-3 text-xs font-mono text-[#5A5F66] mb-2">
                      <span className="text-[#C9A227] font-semibold uppercase">
                        {article.category}
                      </span>
                      <span>•</span>
                      <span>{article.published_at}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#111111] mb-1">{article.title}</h4>
                    <p className="text-sm text-[#5A5F66] line-clamp-2">{article.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final Contact CTA (Vol 5 p. 244: "Let's Build Your Next Shipment") */}
      <section className="bg-[#111111] text-white py-20 border-t border-neutral-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227] block mb-3">
            Start Your Procurement
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Let's Build Your Next Shipment
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-base md:text-lg">
            Connect with our Tokyo, Dubai, London, or Dhaka trade desks for custom auction sourcing, multi-vehicle container optimization, or landed CIF quotations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sourcing"
              className="bg-[#C9A227] hover:bg-[#b59020] text-[#111111] font-semibold px-8 py-4 rounded-[8px] transition-colors"
            >
              Request Vehicle Sourcing
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white font-semibold px-8 py-4 rounded-[8px] transition-colors"
            >
              Speak With an Export Specialist
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
