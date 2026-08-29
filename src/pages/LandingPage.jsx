import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Mic, 
  Camera, 
  QrCode, 
  PhoneCall, 
  MapPin, 
  Users, 
  Zap, 
  HeartHandshake,
  Star,
  Activity,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { IMPACT_METRICS, TESTIMONIALS } from '../data/mockData';

export const LandingPage = () => {
  const { clusters, tickets, technicians } = useData();
  const [selectedClusterTab, setSelectedClusterTab] = useState(clusters[0].id);

  const openTicketsCount = tickets.filter(t => t.status !== 'Resolved').length;
  const womenTechs = technicians.filter(t => t.isUrjaSakhi);
  const womenPercentage = Math.round((womenTechs.length / technicians.length) * 100);

  const activeCluster = clusters.find(c => c.id === selectedClusterTab) || clusters[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-amber-100 bg-gradient-to-b from-amber-50/70 via-cream-100 to-[#FDFBF7]">
        {/* Subtle Background Solar Graphics */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-solar-teal-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs md:text-sm font-semibold shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>SELCO Foundation Rural Energy Service Network</span>
                <span className="text-amber-400">|</span>
                <span className="text-amber-800 font-bold">Belgaum Cluster Pilot</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                One-Stop Digital Platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Solar Service</span> — Empowering Local Technicians, <span className="text-solar-teal-900 underline decoration-amber-400 decoration-4 underline-offset-4">Especially Women</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Guaranteed SLA repairs for decentralized rural solar — dairy chillers, flour mills, agri pumps, and home systems across Belgaum district within <strong>4 to 24 hours</strong>.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/report"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base shadow-solar shadow-amber-500/25 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Wrench className="w-5 h-5" />
                  <span>Report a Solar Issue</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/track"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50/60 text-slate-800 font-semibold text-base border border-amber-200 shadow-sm hover:shadow transition-all"
                >
                  <span>Track Ticket Status</span>
                </Link>

                <Link
                  to="/women-technicians"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-solar-teal-50 hover:bg-solar-teal-100 text-solar-teal-900 font-bold text-sm border border-solar-teal-200 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Join as Urja Sakhi</span>
                </Link>
              </div>

              {/* Quick Feature Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Kannada & Marathi Voice Reporting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>48% Certified Women Technicians</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>QR Code Verified Service Log</span>
                </div>
              </div>

            </div>

            {/* Right Hero: Live Interactive Cluster Mockup Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100/90 relative">
                
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Belgaum Dispatch Grid</h3>
                      <p className="text-[11px] text-slate-500">Live SLA Cluster Monitor</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    99.2% District Uptime
                  </span>
                </div>

                {/* Live Ticket Snapshot */}
                <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/60 mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1.5">
                    <span>LATEST ACTIVE DISPATCH</span>
                    <span className="text-amber-700">Ticket #BLG-8492</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      2kW
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Gokak Milk Dairy Chiller</h4>
                      <p className="text-xs text-slate-600">Priya Naik (Urja Sakhi) assigned • Multimeter diagnosis in progress</p>
                    </div>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="mt-3 pt-3 border-t border-amber-200/50 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="font-medium text-emerald-700">● On-Site at Konnur Gram</span>
                    <span className="font-bold text-slate-700">SLA: 4h Emergency</span>
                  </div>
                </div>

                {/* Quick 3-Stat Grid inside Mockup */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-base font-extrabold text-slate-900">18.2h</div>
                    <div className="text-[10px] text-slate-500 font-medium">Avg Fix Time</div>
                  </div>
                  <div className="p-2.5 bg-solar-teal-50 rounded-xl border border-solar-teal-100">
                    <div className="text-base font-extrabold text-solar-teal-900">48.4%</div>
                    <div className="text-[10px] text-solar-teal-700 font-medium">Women Techs</div>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="text-base font-extrabold text-emerald-800">98.4%</div>
                    <div className="text-[10px] text-emerald-700 font-medium">1st-Time Fix</div>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link to="/coordinator" className="text-xs font-bold text-solar-teal-800 hover:text-solar-teal-900 flex items-center gap-1">
                    <span>View Coordinator Dashboard</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/qr-lookup" className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Scan Demo QR</span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (3-STEP VISUAL PIPELINE) */}
      <section className="py-16 md:py-20 bg-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
              Decentralized Rural Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              From Solar Fault to Verified Fix in 3 Steps
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Designed for zero-friction rural reporting — no complex forms required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-[#FDFBF7] rounded-2xl p-7 border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-xl mb-5 shadow-sm group-hover:scale-105 transition-transform">
                01
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Mic className="w-4 h-4 text-amber-600" />
                <Camera className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-lg text-slate-900">Report via Voice or Photo</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Beneficiary speaks their issue in Kannada, Marathi, or English, or snaps a photo of the blinking inverter LED. Instant Ticket ID generated with SLA clock.
              </p>
                <div className="mt-4 pt-4 border-t border-amber-200/50 flex items-center justify-between text-xs text-amber-800 font-semibold">
                  <span>⏱️ Under 1 Min to Log</span>
                  <Link to="/report" className="hover:underline flex items-center">Try Form →</Link>
                </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FDFBF7] rounded-2xl p-7 border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="w-14 h-14 rounded-2xl bg-solar-teal-100 text-solar-teal-900 flex items-center justify-center font-extrabold text-xl mb-5 shadow-sm group-hover:scale-105 transition-transform">
                02
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-solar-teal-700" />
                <h3 className="font-bold text-lg text-slate-900">Local Urja Sakhi Dispatched</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automated geo-routing assigns the nearest certified solar technician within 8 km. Beneficiary receives technician name, photo, and direct WhatsApp contact.
              </p>
              <div className="mt-4 pt-4 border-t border-amber-200/50 flex items-center justify-between text-xs text-solar-teal-800 font-semibold">
                <span>⚡ Avg Dispatch: 18 Mins</span>
                <Link to="/technician" className="hover:underline flex items-center">Tech View →</Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FDFBF7] rounded-2xl p-7 border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-extrabold text-xl mb-5 shadow-sm group-hover:scale-105 transition-transform">
                03
              </div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-lg text-slate-900">Verified Fix & QR Health Log</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Technician replaces genuine spare parts, logs root cause, and verifies solar generation with customer sign-off. Asset QR code updated permanently.
              </p>
              <div className="mt-4 pt-4 border-t border-amber-200/50 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                <span>🛡️ 98.4% 1st-Time Fix</span>
                <Link to="/qr-lookup" className="hover:underline flex items-center">QR Logs →</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. IMPACT STATISTICS SECTION */}
      <section className="py-16 bg-[#FDFBF7] border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Measurable Rural Clean Energy Impact
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Real-time figures from the Belgaum district solar service network.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {IMPACT_METRICS.map((metric, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm text-center flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 mx-auto rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">
                    {metric.label}
                  </div>
                </div>
                {metric.change && (
                  <div className="text-[11px] text-emerald-600 font-bold mt-2 bg-emerald-50 py-0.5 rounded-md">
                    {metric.change}
                  </div>
                )}
                {metric.sublabel && !metric.change && (
                  <div className="text-[10px] text-slate-400 mt-2">
                    {metric.sublabel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BELGAUM CLUSTER COVERAGE INTERACTIVE PREVIEW */}
      <section className="py-16 md:py-20 bg-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-solar-teal-800 uppercase tracking-widest bg-solar-teal-100 px-3 py-1 rounded-full">
                Regional Hubs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Belgaum District Service Clusters
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Explore local panchayat solar systems and active technician fleets.
              </p>
            </div>
            <Link
              to="/coordinator"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-solar-teal-800 hover:text-solar-teal-900"
            >
              <span>View full cluster analytics in Admin</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cluster Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {clusters.map((cluster) => (
              <button
                key={cluster.id}
                onClick={() => setSelectedClusterTab(cluster.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedClusterTab === cluster.id
                    ? 'bg-solar-teal-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-amber-100/60'
                }`}
              >
                {cluster.name}
              </button>
            ))}
          </div>

          {/* Active Cluster Card */}
          <div className="bg-gradient-to-r from-solar-teal-950 via-solar-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-300 text-sm font-bold uppercase tracking-wider">Taluk: {activeCluster.taluk}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeCluster.name}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                  Centralized solar service hub maintaining rural dairy milk chillers, community water purification plants, panchayat street lights, and household off-grid solar kits with dedicated Urja Sakhis on e-scooters.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-solar-teal-800/80 max-w-lg">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-amber-400">{activeCluster.activeSystems}</div>
                    <div className="text-xs text-slate-300">Active Systems</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-400">{activeCluster.activeTechs} Techs</div>
                    <div className="text-xs text-slate-300">Field Engineers</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{activeCluster.uptime}</div>
                    <div className="text-xs text-slate-300">Solar Uptime</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
                <h4 className="font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Lead Technician Spotlight</span>
                </h4>
                <div className="flex items-center gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                    alt="Priya Naik"
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow"
                  />
                  <div>
                    <h5 className="font-bold text-base text-white">Priya Naik</h5>
                    <p className="text-xs text-amber-200">Certified Lead Urja Sakhi • Gokak</p>
                    <div className="flex items-center gap-1 text-xs text-emerald-400 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-white">4.94</span>
                      <span className="text-slate-300">(142 Jobs Completed)</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 italic">
                  "Specialized in off-grid solar inverters, lithium BMS diagnostics, and milk dairy cooling automation."
                </p>
                <div className="pt-2">
                  <Link
                    to="/technician"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow transition-colors"
                  >
                    <span>View Technician Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS & FIELD VOICES */}
      <section className="py-16 md:py-20 bg-[#FDFBF7] border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
              Voices from the Ground
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Trusted by Rural Entrepreneurs & Technicians
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-amber-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover border border-amber-200"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{item.author}</h4>
                    <p className="text-xs text-slate-500">{item.role}</p>
                    <p className="text-[11px] text-amber-700 font-medium">{item.cluster}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-solar-teal-800 rounded-3xl p-8 sm:p-12 text-white shadow-solar flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Experience the Future of Rural Solar Service
              </h3>
              <p className="text-amber-100 text-sm sm:text-base">
                Report a system fault now or register your village for the 2026 Urja Sakhi Women Technician cohort.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                to="/report"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm text-center shadow-lg transition-colors"
              >
                Report Solar Fault Now
              </Link>
              <Link
                to="/women-technicians"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-slate-900 font-bold text-sm text-center shadow-md transition-colors"
              >
                Urja Sakhi Program
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
