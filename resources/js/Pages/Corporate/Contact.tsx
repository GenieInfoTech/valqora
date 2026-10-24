import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageSquare,
    Video,
    ShieldCheck,
    CheckCircle2,
    Building2,
    Warehouse,
    AlertCircle,
    Send,
} from 'lucide-react';

export default function Contact() {
    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        inquiry_type: 'Sales',
        preferred_contact_method: 'Email',
        industry: 'Automotive Dealership',
        fleet_size: '1–5 Units',
        purchase_intention: 'Immediate Stock Acquisition',
        vehicle_type: 'JDM Passenger / Hybrid',
        purchase_timeline: 'Within 30 Days',
        consultation_date: '',
        subject: '',
        message: '',
        consent: true,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const dept = params.get('department');
            const subj = params.get('subject');
            if (dept) setData('inquiry_type', dept);
            if (subj) setData('subject', subj);
        }
    }, []);

    const departments = [
        { name: 'Sales', email: 'sales@valqora.com', sla: '< 2 Hours', desc: 'Vehicle reservations, proforma quotations & CIF pricing' },
        { name: 'Global Trading', email: 'trading@valqora.com', sla: '< 4 Hours', desc: 'Multi-sector procurement & industrial equipment' },
        { name: 'Export Support', email: 'logistics@valqora.com', sla: '< 2 Hours', desc: 'Bills of Lading, JEVIC/JAAI certificates & customs' },
        { name: 'Dealer Relations', email: 'dealers@valqora.com', sla: '< 4 Hours', desc: 'Wholesale pricing, container booking & credit lines' },
        { name: 'Supplier Relations', email: 'suppliers@valqora.com', sla: '< 8 Hours', desc: 'Auction house, fleet & inspection partner onboarding' },
        { name: 'Corporate Office', email: 'corporate@valqora.com', sla: '< 8 Hours', desc: 'Executive partnerships, banking & investor relations' },
        { name: 'Media', email: 'press@valqora.com', sla: '< 12 Hours', desc: 'Press releases, brand assets & speaking inquiries' },
        { name: 'Careers', email: 'careers@valqora.com', sla: '< 24 Hours', desc: 'Global talent acquisition & graduate programs' },
    ];

    const offices = [
        {
            type: 'Global Headquarters',
            city: 'Tokyo, Japan',
            address: 'Marunouchi Trust Tower Main, 1-8-3 Marunouchi, Chiyoda-ku, Tokyo 100-0005',
            phone: '+81 3-6214-8800',
            hours: '09:00–18:00 JST (UTC+9)',
            ports: 'Yokohama, Chiba, Kawasaki',
        },
        {
            type: 'Middle East & Africa Hub',
            city: 'Dubai, UAE',
            address: 'Gate Village Building 04, Level 3, DIFC, P.O. Box 506680, Dubai',
            phone: '+971 4-512-9400',
            hours: '09:00–18:00 GST (UTC+4)',
            ports: 'Jebel Ali Free Zone (JAFZA)',
        },
        {
            type: 'European Operations Hub',
            city: 'Frankfurt, Germany',
            address: 'Taunusturm, Taunustor 1, 60310 Frankfurt am Main, Germany',
            phone: '+49 69-2474-8100',
            hours: '09:00–18:00 CET (UTC+1)',
            ports: 'Bremerhaven, Rotterdam, Antwerp',
        },
        {
            type: 'Asia-Pacific Treasury & Tech',
            city: 'Singapore',
            address: ' Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983',
            phone: '+65 6818-5200',
            hours: '09:00–18:00 SGT (UTC+8)',
            ports: 'Jurong, Pasir Panjang',
        },
    ];

    const warehouses = [
        { code: 'VGT-WH-YOK', name: 'Yokohama Daikoku Export Terminal & Pre-Export QC Center', capacity: '450 Vehicles • ISO 9001' },
        { code: 'VGT-WH-KOB', name: 'Kobe Rokko Island Bonded Consolidation Yard', capacity: '280 Vehicles • Container Stuffing' },
        { code: 'VGT-WH-NAG', name: 'Nagoya Tobishima Industrial & Heavy Machinery Depot', capacity: '320 Units • Flat-Rack & Ro-Ro' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enrichedMessage = `[Lead Qualification — Industry: ${data.industry} | Fleet Size: ${data.fleet_size} | Intention: ${data.purchase_intention} | Vehicle Type: ${data.vehicle_type} | Timeline: ${data.purchase_timeline} | Preferred Contact: ${data.preferred_contact_method}${data.consultation_date ? ' | Video Consultation: ' + data.consultation_date : ''}]\n\n${data.message}`;
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset('message', 'subject'),
        });
    };

    return (
        <AppLayout>
            <Head title="Contact Global Trade Desk & Lead Qualification" />

            {/* Header */}
            <section className="pt-28 pb-14 bg-[#111111] border-b border-[#2D2D2D] vq-grid-bg">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9A227] block mb-3">
                                Volume 5 Page 15 • Smart Routing & Lead Qualification
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                                Every Inquiry Deserves Confidence.
                            </h1>
                            <p className="text-lg text-[#9CA3AF]">
                                Connect directly with our 8 specialized departments across Tokyo, Dubai, Frankfurt, and Singapore. Every inquiry receives immediate confirmation and an assigned account representative.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://wa.me/81362148800"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2E8B57] text-white text-xs font-mono font-bold hover:opacity-90 transition-opacity"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Live WhatsApp Business Desk
                            </a>
                            <a
                                href="tel:+81362148800"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D] text-white text-xs font-mono hover:border-[#C9A227]"
                            >
                                <Phone className="w-4 h-4 text-[#C9A227]" />
                                +81 3-6214-8800 (24/7 Emergency)
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8 Contact Departments Selector */}
            <section className="py-12 bg-[#161616] border-b border-[#2D2D2D]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                    <h2 className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-4">
                        Select Department for Smart Routing (8 Official Desks)
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {departments.map((dept) => {
                            const active = data.inquiry_type === dept.name;
                            return (
                                <button
                                    key={dept.name}
                                    type="button"
                                    onClick={() => setData('inquiry_type', dept.name)}
                                    className={`text-left p-4 rounded-xl border transition-all ${
                                        active
                                            ? 'bg-[#C9A227]/15 border-[#C9A227] text-white'
                                            : 'bg-[#111111] border-[#2D2D2D] text-[#9CA3AF] hover:border-[#5A5F66]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm text-white">{dept.name}</span>
                                        <span className="text-[10px] font-mono text-[#C9A227]">{dept.sla}</span>
                                    </div>
                                    <p className="text-xs text-[#9CA3AF] line-clamp-1 mb-1">{dept.desc}</p>
                                    <span className="text-[11px] font-mono text-[#6B7280]">{dept.email}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Main Form + Global Offices */}
            <section className="py-16 bg-[#111111]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Enterprise Lead Qualification & Inquiry Form */}
                    <div className="lg:col-span-7 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8 md:p-10">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2D2D2D]">
                            <div>
                                <span className="text-xs font-mono text-[#C9A227] uppercase block">
                                    Routing To: {data.inquiry_type} Department
                                </span>
                                <h2 className="text-2xl font-bold text-white">
                                    Direct Procurement & Consultation Request
                                </h2>
                            </div>
                            <Video className="w-6 h-6 text-[#C9A227]" />
                        </div>

                        {wasSuccessful && (
                            <div className="mb-6 p-4 rounded-xl bg-[#2E8B57]/15 border border-[#2E8B57] text-white flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#2E8B57] shrink-0 mt-0.5" />
                                <div className="text-sm">
                                    <div className="font-bold">Inquiry Confirmed & Assigned</div>
                                    <p className="text-xs text-[#D1D5DB] mt-0.5">
                                        Your request has been routed to the {data.inquiry_type} desk. An account representative will respond within our guaranteed SLA window.
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., Marcus Vance"
                                        className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-[#2D2D2D] text-white text-sm focus:border-[#C9A227] focus:outline-none"
                                    />
                                    {errors.name && <p className="text-xs text-[#C62828] mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
                                        Company / Organization
                                    </label>
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        placeholder="e.g., Pacific Prestige Imports Pty Ltd"
                                        className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-[#2D2D2D] text-white text-sm focus:border-[#C9A227] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
                                        Corporate Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-[#2D2D2D] text-white text-sm focus:border-[#C9A227] focus:outline-none"
                                    />
                                    {errors.email && <p className="text-xs text-[#C62828] mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
                                        Phone / WhatsApp *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+61 400 000 000"
                                        className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-[#2D2D2D] text-white text-sm focus:border-[#C9A227] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
                                        Destination Country *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        placeholder="e.g., Australia, UAE, UK"
                                        className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-[#2D2D2D] text-white text-sm focus:border-[#C9A227] focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Lead Qualification Block (Vol 5 p. 252) */}
                            <div className="p-5 rounded-xl bg-[#111111] border border-[#2D2D2D] space-y-4">
                                <div className="text-xs font-mono uppercase tracking-wider text-[#C9A227]">
                                    Lead Qualification & Procurement Profile
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                                            Industry Sector
                                        </label>
                                        <select
                                            value={data.industry}
                                            onChange={(e) => setData('industry', e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D] text-white text-xs"
                                        >
                                            <option>Automotive Dealership</option>
                                            <option>Commercial Fleet Operator</option>
                                            <option>Import Distributor</option>
                                            <option>Construction / Industrial</option>
                                            <option>Government / Diplomatic</option>
                                            <option>Private Executive Buyer</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                                            Expected Fleet / Order Volume
                                        </label>
                                        <select
                                            value={data.fleet_size}
                                            onChange={(e) => setData('fleet_size', e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D] text-white text-xs"
                                        >
                                            <option>1–5 Units</option>
                                            <option>6–20 Units (Container Load)</option>
                                            <option>21–50 Units (Fleet Allocation)</option>
                                            <option>50+ Units (Institutional Contract)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                                            Purchase Timeline
                                        </label>
                                        <select
                                            value={data.purchase_timeline}
                                            onChange={(e) => setData('purchase_timeline', e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D] text-white text-xs"
                                        >
                                            <option>Immediate (Within 14 Days)</option>
                                            <option>Within 30 Days</option>
                                            <option>1–3 Months (Quarterly Pipeline)</option>
                                            <option>Long-Term Partnership Inquiry</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                                            Vehicle / Product Category
                                        </label>
                                        <select
                                            value={data.vehicle_type}
                                            onChange={(e) => setData('vehicle_type', e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D] text-white text-xs"
                                        >
                                            <option>JDM Passenger / Hybrid</option>
                                            <option>European Luxury / Executive</option>
                                            <option>Commercial Vans & Trucks</option>
                                            <option>SUV & 4WD Off-Road</option>
                                            <option>Heavy Industrial Machinery</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                                            Preferred Contact Method
                                        </label>
                                        <select
                                            value={data.preferred_contact_method}
                                            onChange={(e) => setData('preferred_contact_method', e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D] text-white text-xs"
                                        >
                                            <option>Email</option>
                                            <option>WhatsApp Business</option>
                                            <option>Direct Phone Call</option>
                                            <option>Video Consultation (Zoom/Teams)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-[#9CA3AF] mb-1">
                                            Optional Video Call Date
                                        </label>
                                        <input
                                            type="date"
                                            value={data.consultation_date}
                                            onChange={(e) => setData('consultation_date', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#2D2D2D] text-white text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
                                    Subject / Reference (Stock No., VIN, or Tender ID)
                                </label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="e.g., CIF Quotation for 4x Toyota Land Cruiser 300 to Brisbane"
                                    className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-[#2D2D2D] text-white text-sm focus:border-[#C9A227] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-1.5">
                                    Detailed Requirements & Specifications *
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Specify target models, model years, auction grade requirements (e.g., Grade 4.5+), Incoterms (FOB/CIF), and port of discharge..."
                                    className="w-full px-4 py-3 rounded-lg bg-[#111111] border border-[#2D2D2D] text-white text-sm focus:border-[#C9A227] focus:outline-none"
                                />
                                {errors.message && <p className="text-xs text-[#C62828] mt-1">{errors.message}</p>}
                            </div>

                            <label className="flex items-start gap-3 text-xs text-[#9CA3AF] cursor-pointer">
                                <input
                                    type="checkbox"
                                    required
                                    checked={data.consent}
                                    onChange={(e) => setData('consent', e.target.checked)}
                                    className="mt-0.5 rounded border-[#2D2D2D] bg-[#111111] text-[#C9A227] focus:ring-[#C9A227]"
                                />
                                <span>
                                    I consent to Valqora Global Trading processing my corporate contact details in accordance with its GDPR & international privacy standards.
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-[#C9A227] text-[#111111] font-bold text-sm rounded-lg hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                {processing ? 'Routing Inquiry...' : `Submit to ${data.inquiry_type} Desk`}
                            </button>
                        </form>
                    </div>

                    {/* Right: Global Offices, Warehouses & Emergency Contacts */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-[#C9A227]" />
                                Global Corporate Offices
                            </h3>
                            <div className="space-y-5">
                                {offices.map((off) => (
                                    <div key={off.city} className="pb-4 border-b border-[#2D2D2D] last:border-none last:pb-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-white text-sm">{off.city}</span>
                                            <span className="text-[10px] font-mono text-[#C9A227] uppercase">{off.type}</span>
                                        </div>
                                        <p className="text-xs text-[#9CA3AF] mb-2">{off.address}</p>
                                        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#D1D5DB] gap-2">
                                            <span>{off.phone}</span>
                                            <span className="text-[#6B7280]">{off.hours}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-7">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Warehouse className="w-5 h-5 text-[#C9A227]" />
                                Bonded Export Warehouses & Yards
                            </h3>
                            <div className="space-y-3">
                                {warehouses.map((wh) => (
                                    <div key={wh.code} className="p-3.5 rounded-xl bg-[#111111] border border-[#2D2D2D]">
                                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                                            <span className="text-[#C9A227] font-bold">{wh.code}</span>
                                            <span className="text-[#2E8B57]">{wh.capacity}</span>
                                        </div>
                                        <div className="text-xs text-white font-medium">{wh.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1A1A1A] border border-[#C9A227]/40 rounded-2xl p-6">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C9A227] mb-2">
                                <AlertCircle className="w-4 h-4" />
                                24/7 Port & Customs Emergency Desk
                            </div>
                            <p className="text-xs text-[#9CA3AF] leading-relaxed mb-3">
                                For active shipments requiring urgent Bill of Lading amendments, container seal verification, or port terminal release authorization:
                            </p>
                            <div className="text-sm font-mono font-bold text-white">
                                Hotline: +81 3-6214-8899 • controltower@valqora.com
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
