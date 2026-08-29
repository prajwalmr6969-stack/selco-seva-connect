import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Wrench, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  QrCode, 
  Menu, 
  X, 
  PhoneCall, 
  RotateCcw,
  AlertCircle,
  Users
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resetToSampleData } = useData();

  const navLinks = [
    { path: '/', label: 'Home', icon: Sun },
    { path: '/report', label: 'Report Issue', icon: AlertCircle, highlight: true },
    { path: '/track', label: 'Track Ticket', icon: Search },
    { path: '/technician', label: 'Tech Portal', icon: Wrench },
    { path: '/coordinator', label: 'Admin Dashboard', icon: ShieldCheck },
    { path: '/women-technicians', label: 'Urja Sakhi Program', icon: Sparkles, badge: 'Empowerment' },
    { path: '/qr-lookup', label: 'QR Scan / History', icon: QrCode },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      {/* Top Belgaum Helpline & Emergency Bar */}
      <div className="bg-gradient-to-r from-solar-teal-900 via-solar-teal-800 to-solar-teal-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-100">Belgaum Cluster Live Dispatch Active</span>
            <span className="hidden md:inline text-solar-teal-200">|</span>
            <span className="hidden md:inline text-solar-teal-200">38 Village Panchayats Covered</span>
          </div>
          <div className="flex items-center gap-4 text-solar-teal-100">
            <a href="tel:18004257352" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Toll-Free Helpline: <strong>1800-425-SELCO</strong></span>
            </a>
            <button 
              onClick={resetToSampleData}
              title="Reset mock data to initial Belgaum sample state"
              className="text-xs text-solar-teal-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-solar shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 md:w-7 md:h-7 animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-slate-900">
                  SELCO <span className="text-amber-600">SevaConnect</span>
                </span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Belgaum
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                Decentralized Solar Service & Women Technician Grid
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'text-solar-teal-900 bg-solar-teal-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-solar-teal-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] bg-amber-500/10 text-amber-700 font-bold px-1.5 py-0.2 rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-solar-teal-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md hover:shadow-solar transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Report Fault</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/report"
              className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-semibold"
            >
              Report
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-100 bg-white px-4 pt-2 pb-6 space-y-1 shadow-xl">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-solar-teal-50 text-solar-teal-900 font-bold'
                    : 'text-slate-700 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-5 h-5 ${active ? 'text-solar-teal-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-amber-500 text-white font-semibold text-sm shadow"
            >
              Report Solar Issue
            </Link>
            <button
              onClick={() => {
                resetToSampleData();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100"
            >
              Reset Demo Mock Data
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
