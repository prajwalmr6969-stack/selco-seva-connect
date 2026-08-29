import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Sparkles, 
  Navigation, 
  Check, 
  X, 
  Play, 
  ShieldCheck, 
  DollarSign, 
  Award,
  ChevronRight,
  Filter,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import StatusBadge from '../components/common/StatusBadge';
import UrgencyBadge from '../components/common/UrgencyBadge';
import Modal from '../components/common/Modal';

export const TechnicianDashboardPage = () => {
  const { 
    technicians, 
    tickets, 
    currentTechId, 
    setCurrentTechId, 
    currentTechnician, 
    assignTicket, 
    updateTicketStatus, 
    resolveTicket 
  } = useData();

  const [activeTab, setActiveTab] = useState('assigned'); // 'assigned', 'nearby', 'completed'
  const [selectedTicketForResolution, setSelectedTicketForResolution] = useState(null);

  // Resolution Form State
  const [rootCause, setRootCause] = useState('Inverter DC input fuse blown due to grid voltage surge');
  const [actionTaken, setActionTaken] = useState('Replaced 32A DC fuse cartridge, cleaned battery terminals with anti-corrosion grease, and verified solar input current (14.2A).');
  const [selectedParts, setSelectedParts] = useState(['32A 600V DC Fast-Blow Fuse', 'Terminal Anti-corrosion Grease']);
  const [customerRating, setCustomerRating] = useState(5);
  const [technicianNotes, setTechnicianNotes] = useState('System generation fully restored. Advised dairy operator on routine dust cleaning.');
  const [isSubmittingResolution, setIsSubmittingResolution] = useState(false);

  // Filter tickets
  const myAssignedTickets = tickets.filter(t => t.assignedTechId === currentTechId && t.status !== 'Resolved');
  const availableNearbyTickets = tickets.filter(t => !t.assignedTechId && t.status !== 'Resolved');
  const completedTickets = tickets.filter(t => t.assignedTechId === currentTechId && t.status === 'Resolved');

  const displayedTickets = activeTab === 'assigned' 
    ? myAssignedTickets 
    : activeTab === 'nearby' 
    ? availableNearbyTickets 
    : completedTickets;

  const handleAcceptTicket = (ticketId) => {
    assignTicket(ticketId, currentTechId, `Accepted by ${currentTechnician.name}`);
    setActiveTab('assigned');
  };

  const handleStartJob = (ticketId) => {
    updateTicketStatus(ticketId, 'In Progress', `${currentTechnician.name} arrived on site and started diagnostic tests`);
  };

  const handleOpenResolveModal = (ticket) => {
    setSelectedTicketForResolution(ticket);
    setRootCause(`Root cause diagnosed on ${ticket.systemType}`);
    setActionTaken(`Inspected ${ticket.issueCategory}, calibrated connections and verified power flow.`);
  };

  const handleConfirmResolution = (e) => {
    e.preventDefault();
    if (!selectedTicketForResolution) return;

    setIsSubmittingResolution(true);
    setTimeout(() => {
      resolveTicket(selectedTicketForResolution.id, {
        techId: currentTechId,
        rootCause,
        actionTaken,
        partsReplaced: selectedParts.length > 0 ? selectedParts.join(', ') : 'No parts replaced (Diagnostic & calibration only)',
        rating: customerRating,
        notes: technicianNotes
      });

      // Confetti Delight
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmittingResolution(false);
      setSelectedTicketForResolution(null);
      setActiveTab('completed');
    }, 600);
  };

  const togglePart = (part) => {
    setSelectedParts(prev => 
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const commonSpareParts = [
    '32A 600V DC Fast-Blow Fuse',
    'Surge Protection Cartridge (SPD)',
    'MC4 Solar Connector Pair',
    'Deionized Distilled Water (4L)',
    'Terminal Anti-corrosion Grease',
    '16A Single-Pole DC MCB',
    'IP67 Dusk-to-Dawn Optical Sensor',
    'VFD Cooling Fan Unit'
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Switcher & Mode Header */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-100 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-solar-teal-800 text-white flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Technician Field Console
                </h1>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online & Dispatched
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Switch technician profile to simulate field service experience.
              </p>
            </div>
          </div>

          {/* Technician Persona Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-bold text-slate-500">Persona:</span>
            <select
              value={currentTechId}
              onChange={(e) => setCurrentTechId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 text-slate-900 text-xs font-bold outline-none cursor-pointer hover:bg-amber-100/70"
            >
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} {t.isUrjaSakhi ? '(Urja Sakhi Lead)' : `(${t.role})`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Technician Profile Card */}
        <div className="bg-gradient-to-r from-solar-teal-950 via-solar-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Avatar & Info */}
            <div className="lg:col-span-6 flex items-start gap-4">
              <img
                src={currentTechnician.avatar}
                alt={currentTechnician.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentTechnician.name}
                  </h2>
                  {currentTechnician.isUrjaSakhi && (
                    <span className="text-[10px] bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      URJA SAKHI
                    </span>
                  )}
                  <span className="text-[11px] text-amber-300 font-semibold bg-white/10 px-2 py-0.5 rounded-md">
                    {currentTechnician.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  {currentTechnician.role} • {currentTechnician.cluster}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-amber-200">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <strong>{currentTechnician.rating}</strong> ({currentTechnician.ratingCount} reviews)
                  </span>
                  <span>•</span>
                  <span>Toolkit: <strong className="font-mono text-white">{currentTechnician.toolkitSerialNumber}</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Key Stats */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-3 border-t lg:border-t-0 lg:border-l border-solar-teal-800 pt-4 lg:pt-0 lg:pl-6 text-center">
              <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-amber-400">{currentTechnician.jobsCompleted}</div>
                <div className="text-[11px] text-slate-300 font-medium">Jobs Resolved</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">{currentTechnician.firstTimeFixRate}</div>
                <div className="text-[11px] text-slate-300 font-medium">1st-Time Fix</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-white">{currentTechnician.earningsThisMonth}</div>
                <div className="text-[11px] text-slate-300 font-medium">Earned (Aug)</div>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200/80 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('assigned')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'assigned'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Assigned to Me</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'assigned' ? 'bg-white text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                {myAssignedTickets.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('nearby')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'nearby'
                  ? 'bg-solar-teal-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>Available Nearby</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'nearby' ? 'bg-white text-solar-teal-900' : 'bg-slate-100 text-slate-700'}`}>
                {availableNearbyTickets.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'completed'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed Log</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'completed' ? 'bg-white text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                {completedTickets.length}
              </span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Active Cluster: <strong>{currentTechnician.cluster}</strong>
          </span>
        </div>

        {/* Ticket List Grid */}
        <div className="space-y-4">
          {displayedTickets.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">
                {activeTab === 'assigned' ? 'No Pending Assigned Jobs' : activeTab === 'nearby' ? 'No Unassigned Tickets in Cluster' : 'No Completed Tickets Yet'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                {activeTab === 'assigned' 
                  ? 'You are all caught up! Check the "Available Nearby" tab to claim new service tickets in your cluster.' 
                  : 'All rural systems in this radius are operating at peak efficiency.'}
              </p>
            </div>
          ) : (
            displayedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-100 shadow-md hover:shadow-lg transition-all space-y-4"
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-base text-slate-900">
                      #{ticket.id}
                    </span>
                    <StatusBadge status={ticket.status} size="sm" />
                    <UrgencyBadge urgency={ticket.urgency} size="sm" />
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      <span>{ticket.village} (Approx 3.4 km)</span>
                    </span>
                  </div>

                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 self-start sm:self-auto">
                    SLA: {ticket.expectedSla}
                  </span>
                </div>

                {/* Main Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Details */}
                  <div className="lg:col-span-8 space-y-2.5">
                    <h3 className="font-extrabold text-base text-slate-900">
                      {ticket.systemType}
                    </h3>
                    <p className="text-xs font-bold text-amber-800">
                      Symptom: {ticket.issueCategory}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{ticket.description}"
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                      <span>Customer: <strong>{ticket.customerName}</strong></span>
                      <a href={`tel:${ticket.phone}`} className="text-solar-teal-800 font-bold hover:underline flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{ticket.phone}</span>
                      </a>
                      {ticket.hasVoiceNote && (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 border border-emerald-200">
                          <Play className="w-3 h-3 fill-emerald-600" />
                          <span>Voice Note Attached ({ticket.voiceDuration || '0:22'})</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Photo Preview if any */}
                  <div className="lg:col-span-4">
                    {ticket.photoUrl ? (
                      <div className="relative rounded-xl overflow-hidden h-28 border border-amber-200 bg-amber-50">
                        <img 
                          src={ticket.photoUrl} 
                          alt="Fault" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"><rect width="300" height="150" fill="%23FEF3C7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23B45309" font-family="sans-serif" font-size="12" font-weight="bold">📸 Field Fault Snapshot</text></svg>';
                          }}
                          className="w-full h-full object-cover" 
                        />
                        <span className="absolute bottom-1 right-2 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded">
                          Beneficiary Photo
                        </span>
                      </div>
                    ) : (
                      <div className="h-28 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 text-xs p-2 text-center">
                        <FileCheck className="w-6 h-6 mb-1 text-slate-300" />
                        <span>Standard System Diagnostic</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  
                  {activeTab === 'nearby' && (
                    <div className="w-full flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleAcceptTicket(ticket.id)}
                        className="px-5 py-2 rounded-xl bg-solar-teal-800 hover:bg-solar-teal-900 text-white font-bold text-xs shadow transition-colors flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept & Claim Ticket</span>
                      </button>
                    </div>
                  )}

                  {activeTab === 'assigned' && (
                    <div className="w-full flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        Status: <strong className="text-slate-800">{ticket.status}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        {ticket.status === 'Assigned' && (
                          <button
                            onClick={() => handleStartJob(ticket.id)}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow transition-colors flex items-center gap-1.5"
                          >
                            <Navigation className="w-4 h-4" />
                            <span>Start Job / On The Way</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleOpenResolveModal(ticket)}
                          className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-teal transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark Resolved & Submit Report</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'completed' && ticket.resolutionReport && (
                    <div className="w-full bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong>Resolved:</strong> {ticket.resolutionReport.actionTaken}
                      </div>
                      <span className="font-semibold text-emerald-800 flex-shrink-0">
                        Parts: {ticket.resolutionReport.partsReplaced}
                      </span>
                    </div>
                  )}

                </div>

              </div>
            ))
          )}
        </div>

        {/* Resolution Modal */}
        <Modal
          isOpen={Boolean(selectedTicketForResolution)}
          onClose={() => setSelectedTicketForResolution(null)}
          title={`Resolve Service Ticket #${selectedTicketForResolution?.id}`}
          maxWidth="max-w-2xl"
        >
          {selectedTicketForResolution && (
            <form onSubmit={handleConfirmResolution} className="space-y-5">
              
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>System:</strong> {selectedTicketForResolution.systemType} ({selectedTicketForResolution.village})
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Diagnosed Root Cause *
                </label>
                <input
                  type="text"
                  required
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Corrective Action Taken & Verification *
                </label>
                <textarea
                  rows={2}
                  required
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-300 outline-none"
                />
              </div>

              {/* Spare Parts Checklist */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Spare Parts Consumed / Installed
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {commonSpareParts.map((part, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => togglePart(part)}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        selectedParts.includes(part)
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{part}</span>
                      {selectedParts.includes(part) && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Satisfaction Score */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Customer Sign-off & Satisfaction Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setCustomerRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= customerRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {customerRating} / 5 Stars (Verified on Field Tablet)
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTicketForResolution(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingResolution}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-teal transition-all flex items-center gap-1.5"
                >
                  {isSubmittingResolution ? (
                    <span>Submitting Report...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Job & Close Ticket</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default TechnicianDashboardPage;
