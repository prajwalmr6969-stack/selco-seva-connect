import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Heart, Phone, Mail, MapPin, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Branding & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-lg">
                <Sun className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                SELCO <span className="text-amber-400">SevaConnect</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              A decentralized solar energy service & maintenance digital infrastructure for rural India. Empowering local certified technicians — especially women (<em>Urja Sakhis</em>) — to deliver fast, reliable, SLA-guaranteed service for critical livelihood and domestic solar systems.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-2 rounded-lg max-w-md">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Certified under SELCO Foundation Rural Energy Livelihoods Initiative</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Quick Access</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/report" className="hover:text-amber-400 transition-colors">Report Solar Fault</Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-amber-400 transition-colors">Track Service Ticket</Link>
              </li>
              <li>
                <Link to="/qr-lookup" className="hover:text-amber-400 transition-colors">Scan Solar System QR</Link>
              </li>
              <li>
                <Link to="/technician" className="hover:text-amber-400 transition-colors">Technician Field App</Link>
              </li>
              <li>
                <Link to="/coordinator" className="hover:text-amber-400 transition-colors">Admin & SLA Dispatch</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Women Program */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase flex items-center gap-1.5">
              <span>Urja Sakhi Grid</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/women-technicians" className="hover:text-amber-400 transition-colors">Program Overview</Link>
              </li>
              <li>
                <Link to="/women-technicians#pipeline" className="hover:text-amber-400 transition-colors">Training to Earning Pipeline</Link>
              </li>
              <li>
                <Link to="/women-technicians#apply" className="text-amber-400 hover:underline font-medium">Apply for Next Cohort 2026</Link>
              </li>
              <li>
                <span className="text-xs text-slate-400 block pt-1">
                  Belgaum Innovation Hub • 48% Women Tech Ratio
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Belgaum Cluster Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Belgaum District Office</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <span>SELCO Solar Center, Club Road, Belagavi, Karnataka 590001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:18004257352" className="hover:text-white">1800-425-SELCO (Toll-Free)</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>sevaconnect@selcofoundation.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SELCO SevaConnect. Open Rural Clean Energy Tech Platform.</p>
          <div className="flex items-center gap-6">
            <span>Built for decentralized rural resilience</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Rural India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
