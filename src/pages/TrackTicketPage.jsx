import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  UserCheck, 
  Wrench, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  MapPin, 
  AlertCircle, 
  Calendar, 
  FileText, 
  Sparkles, 
  Star,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Stepper from '../components/common/Stepper';
import StatusBadge from '../components/common/StatusBadge';
import UrgencyBadge from '../components/common/UrgencyBadge';

export const TrackTicketPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || 'BLG-8492';
  
  const { tickets, technicians } = useData();
  const [searchQuery, setSearchQuery] = useState(initialId);
  const [activeTicketId, setActiveTicketId] = useState(initialId);

  useEffect(() => {
    if (searchParams.get('id')) {
      setActiveTicketId(searchParams.get('id'));
      setSearchQuery(searchParams.get('id'));
    }
  }, [searchParams]);

  const currentTicket = tickets.find(t => t.id.toLowerCase() === activeTicketId.trim().toLowerCase()) || tickets[0];
  const assignedTech = technicians.find(t => t.id === currentTicket?.assignedTechId);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTicketId(searchQuery.trim());
      setSearchParams({ id: searchQuery.trim() });
    }
  };

  const selectSampleTicket = (id) => {
    setSearchQuery(id);
    setActiveTicketId(id);
    setSearchParams({ id });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header & Search Bar */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-solar-teal-800 uppercase tracking-widest bg-solar-teal-100 px-3 py-1 rounded-full">
            Live Ticket Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Track Solar Service Request
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Enter your Ticket Reference ID to view live technician dispatch and service history.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto pt-3">
            <div className="relative flex items-center shadow-md rounded-2xl bg-white border border-amber-200">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g. BLG-8492)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-28 py-3 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Track
              </button>
            </div>
          </form>

          {/* Sample Ticket Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs text-slate-500">
            <span className="text-slate-400 font-medium">Quick Demo Samples:</span>
            {tickets.slice(0, 4).map((t) => (
              <button
                key={t.id}
                onClick={() => selectSampleTicket(t.id)}
                className={`px-2.5 py-1 rounded-lg border font-mono text-xs transition-all ${
                  activeTicketId === t.id
                    ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                }`}
              >
                #{t.id} ({t.status})
              </button>
            ))}
          </div>
        </div>

        {/* Main Ticket Tracking Card */}
        {currentTicket ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-xl space-y-8">
            
            {/* Top Bar: Ticket ID, Status, SLA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-amber-100 gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-extrabold text-slate-900 font-mono">
                    #{currentTicket.id}
                  </h2>
                  <StatusBadge status={currentTicket.status} size="lg" />
                  <UrgencyBadge urgency={currentTicket.urgency} size="sm" />
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reported on {new Date(currentTicket.createdAt).toLocaleDateString()} at {new Date(currentTicket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span>•</span>
                  <span>Cluster: <strong>{currentTicket.cluster}</strong></span>
                </p>
              </div>

              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl px-4 py-2 text-right self-start md:self-auto">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  Service Level Commitment
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-900">
                  {currentTicket.expectedSla}
                </span>
              </div>
            </div>

            {/* Stepper Component */}
            <div className="bg-[#FDFBF7] rounded-2xl p-4 sm:p-6 border border-amber-100">
              <Stepper currentStatus={currentTicket.status} timeline={currentTicket.timeline} />
            </div>

            {/* 2-Column Info: Left = Issue Details, Right = Technician / Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column: Beneficiary & Issue Details */}
              <div className="md:col-span-7 space-y-5">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Issue & System Details</span>
                </h3>

                <div className="bg-slate-50 rounded-2xl p-4 space-y-3 text-sm border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Beneficiary:</span>
                    <span className="font-bold text-slate-800">{currentTicket.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <span className="font-semibold text-slate-800">{currentTicket.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Village / Panchayat:</span>
                    <span className="font-semibold text-slate-800">{currentTicket.village}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">System Type:</span>
                    <span className="font-bold text-slate-800 text-amber-800">{currentTicket.systemType}</span>
                  </div>
                  {currentTicket.qrCode && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Linked QR Code:</span>
                      <Link
                        to={`/qr-lookup?id=${currentTicket.qrCode}`}
                        className="text-xs font-mono font-bold text-amber-700 hover:underline flex items-center gap-1 bg-amber-100/60 px-2 py-0.5 rounded"
                      >
                        <span>{currentTicket.qrCode}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Issue Description</span>
                    <p className="text-slate-700 text-xs sm:text-sm bg-white p-3 rounded-xl border border-slate-200">
                      {currentTicket.description}
                    </p>
                  </div>

                  {currentTicket.photoUrl && (
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Attached Fault Photo</span>
                      <div className="rounded-xl overflow-hidden border border-amber-200 bg-amber-50/50">
                        <img
                          src={currentTicket.photoUrl}
                          alt="Fault evidence"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23FEF3C7"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23B45309" font-family="sans-serif" font-size="14" font-weight="bold">📸 Field Fault Snapshot Captured</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="%2378350F" font-family="sans-serif" font-size="11">Inverter / Wiring Diagnostic Telemetry Attached</text></svg>';
                          }}
                          className="w-full h-44 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Assigned Technician or Resolution Card */}
              <div className="md:col-span-5 space-y-5">
                
                {/* If Resolved, show full resolution details */}
                {currentTicket.status === 'Resolved' && currentTicket.resolutionReport ? (
                  <div className="bg-emerald-50/80 rounded-2xl p-5 border border-emerald-200 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Resolution Report</span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-700">
                      <div>
                        <span className="text-slate-500 block">Resolved By:</span>
                        <span className="font-bold text-emerald-900">{currentTicket.resolutionReport.resolvedBy}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Diagnosis & Action:</span>
                        <p className="font-medium bg-white p-2.5 rounded-lg border border-emerald-200 mt-0.5">
                          {currentTicket.resolutionReport.actionTaken}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Parts Replaced:</span>
                        <span className="font-semibold text-slate-800">{currentTicket.resolutionReport.partsReplaced}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
                        <span className="text-slate-500">Customer Verified:</span>
                        <div className="flex items-center text-amber-500">
                          {[...Array(currentTicket.resolutionReport.customerSatisfaction || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : assignedTech ? (
                  /* Assigned Technician Card */
                  <div className="bg-white rounded-2xl p-5 border border-solar-teal-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-solar-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Assigned Technician</span>
                      </span>
                      {assignedTech.isUrjaSakhi && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                          Urja Sakhi
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3.5">
                      <img
                        src={assignedTech.avatar}
                        alt={assignedTech.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-solar-teal-600 shadow"
                      />
                      <div>
                        <h4 className="font-bold text-base text-slate-900">{assignedTech.name}</h4>
                        <p className="text-xs text-slate-500">{assignedTech.role}</p>
                        <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-800">{assignedTech.rating}</span>
                          <span className="text-slate-400">({assignedTech.jobsCompleted} fixes)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                      <div className="flex justify-between">
                        <span>Toolkit ID:</span>
                        <span className="font-mono font-semibold text-slate-800">{assignedTech.toolkitSerialNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cluster:</span>
                        <span className="font-medium text-slate-800">{assignedTech.cluster}</span>
                      </div>
                    </div>

                    {/* Contact Buttons Simulator */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`tel:${assignedTech.phone}`}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-solar-teal-800 hover:bg-solar-teal-900 text-white text-xs font-bold shadow-sm transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Tech</span>
                      </a>
                      <a
                        href={`https://wa.me/${assignedTech.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Waiting for Dispatch Assignment */
                  <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center mx-auto animate-pulse">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">Awaiting Cluster Assignment</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Belgaum coordinator is matching ticket to the nearest field technician with matching component inventory.
                    </p>
                    <Link
                      to="/coordinator"
                      className="inline-flex items-center gap-1 text-xs font-bold text-solar-teal-800 hover:underline"
                    >
                      <span>Assign in Admin Portal →</span>
                    </Link>
                  </div>
                )}

                {/* Service Timeline Log */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    Activity & Audit Trail
                  </h4>
                  <div className="space-y-2">
                    {currentTicket.timeline.map((item, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs flex items-start gap-2.5 text-xs">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{item.status}</span>
                            <span className="text-[10px] text-slate-400">{item.time}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] mt-0.5">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 space-y-4">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">No Ticket Found</h3>
            <p className="text-sm text-slate-600">
              We couldn't find a ticket matching "{searchQuery}". Please check the ID or report a new fault.
            </p>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-white rounded-xl font-bold text-sm shadow"
            >
              Report New Fault
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackTicketPage;
