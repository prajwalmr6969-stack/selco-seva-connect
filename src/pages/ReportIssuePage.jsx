import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Wrench, 
  Camera, 
  Mic, 
  Square, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  User, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Upload, 
  X, 
  Info,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const ReportIssuePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillQr = searchParams.get('qr') || '';
  const prefillType = searchParams.get('type') || '';

  const { clusters, systemTypes, issueCategories, createTicket } = useData();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [cluster, setCluster] = useState(clusters[0].name);
  const [village, setVillage] = useState('');
  const [systemType, setSystemType] = useState(prefillType || systemTypes[0].label);
  const [qrCode, setQrCode] = useState(prefillQr);
  const [issueCategory, setIssueCategory] = useState(issueCategories[0].label);
  const [urgency, setUrgency] = useState('Medium');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  
  // Voice recording simulation
  const [isRecording, setIsRecording] = useState(false);
  const [voiceDuration, setVoiceDuration] = useState('');
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Submission confirmation state
  const [createdTicket, setCreatedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preset sample photos for easy realistic demo testing
  const samplePhotos = [
    { label: 'Inverter Error Code E-02', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&auto=format&fit=crop&q=80' },
    { label: 'MC4 DC Connector Spark', url: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=500&auto=format&fit=crop&q=80' },
    { label: 'Rooftop Panel Damage', url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&auto=format&fit=crop&q=80' }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    const interval = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 12) {
          clearInterval(interval);
          setIsRecording(false);
          setHasVoiceNote(true);
          setVoiceDuration('0:12');
          return 12;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasVoiceNote(true);
    setVoiceDuration(`0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds || 8}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ticket = createTicket({
        customerName,
        phone,
        cluster,
        village: village || `${cluster.split(' ')[0]} Rural Panchayat`,
        systemType,
        qrCode: qrCode || null,
        issueCategory,
        urgency,
        description: description || `${issueCategory} reported on ${systemType}.`,
        photoUrl: photoUrl || null,
        hasVoiceNote,
        voiceDuration: voiceDuration || null
      });

      setIsSubmitting(false);
      setCreatedTicket(ticket);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Fast Rural Solar Dispatch</span>
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Report a Solar System Issue
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Our Belgaum coordinator team routes your ticket directly to the nearest certified technician within minutes.
          </p>
        </div>

        {/* Confirmation State View */}
        {createdTicket ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl text-center space-y-6 relative z-10 my-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Ticket Registered & Dispatched
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Ticket #{createdTicket.id}
              </h2>
              <p className="text-slate-600 text-sm">
                Expected Turnaround: <strong className="text-emerald-700">{createdTicket.expectedSla}</strong>
              </p>
            </div>

            {/* Quick Details Box */}
            <div className="bg-[#FDFBF7] rounded-2xl p-5 border border-amber-100 text-left text-sm space-y-2.5 max-w-lg mx-auto">
              <div className="flex justify-between pb-2 border-b border-amber-100">
                <span className="text-slate-500">Beneficiary:</span>
                <span className="font-bold text-slate-800">{createdTicket.customerName} ({createdTicket.phone})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-amber-100">
                <span className="text-slate-500">Cluster Hub:</span>
                <span className="font-semibold text-slate-800">{createdTicket.cluster}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-amber-100">
                <span className="text-slate-500">System Type:</span>
                <span className="font-semibold text-slate-800">{createdTicket.systemType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Urgency:</span>
                <span className="font-bold text-amber-700">{createdTicket.urgency}</span>
              </div>
            </div>

            {/* Simulated SMS Alert Notification */}
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs max-w-lg mx-auto text-left flex items-start gap-3 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0 animate-pulse" />
              <div>
                <p className="font-bold text-white">📱 SMS Sent to {createdTicket.phone}:</p>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  "SELCO SevaConnect: Your ticket #{createdTicket.id} is registered. Our nearest technician in {createdTicket.cluster.split(' ')[0]} has been alerted. Track live at sevaconnect.selco.org/track"
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to={`/track?id=${createdTicket.id}`}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-solar-teal-800 hover:bg-solar-teal-900 text-white font-bold text-sm shadow-teal transition-all flex items-center justify-center gap-2"
              >
                <span>Track This Ticket Live</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  setCreatedTicket(null);
                  setCustomerName('');
                  setPhone('');
                  setDescription('');
                  setPhotoUrl('');
                  setHasVoiceNote(false);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Report Another Issue
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-xl space-y-8">
            
            {/* 1. Beneficiary Information */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-amber-100 pb-2">
                <User className="w-5 h-5 text-amber-600" />
                <span>1. Beneficiary & Location Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Basavaraj Gani / ರೇಣುಕಾ ಪಾಟೀಲ"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Belgaum Service Cluster *
                  </label>
                  <select
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm bg-white outline-none font-medium"
                  >
                    {clusters.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Village / Gram Panchayat
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Konnur Gram, Gokak Taluk"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 2. Solar System Info */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-amber-100 pb-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>2. Solar System Details</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  System Type *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {systemTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSystemType(type.label)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        systemType === type.label
                          ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-300/40 text-amber-900 font-semibold'
                          : 'border-slate-200 hover:border-amber-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg text-xs mt-0.5 ${
                        systemType === type.label ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        ⚡
                      </div>
                      <div className="text-xs">
                        <div className="font-bold">{type.label}</div>
                        <div className="text-slate-500 font-normal text-[11px] mt-0.5">{type.typicalIssue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code Input (Optional) */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center justify-between">
                  <span>System QR Code / Tag ID (Optional)</span>
                  <Link to="/qr-lookup" className="text-amber-700 lowercase hover:underline text-[11px] font-semibold">
                    Scan via camera instead →
                  </Link>
                </label>
                <input
                  type="text"
                  placeholder="e.g. SELCO-BLG-8821"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none font-mono"
                />
              </div>
            </div>

            {/* 3. Issue Category & Urgency */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-amber-100 pb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>3. Problem Category & Urgency</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Primary Symptom / Issue *
                  </label>
                  <select
                    value={issueCategory}
                    onChange={(e) => setIssueCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm bg-white outline-none font-medium"
                  >
                    {issueCategories.map((c) => (
                      <option key={c.id} value={c.label}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Urgency Level *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'Emergency', label: 'Emergency', sub: '4h SLA' },
                      { key: 'High', label: 'High', sub: '12h SLA' },
                      { key: 'Medium', label: 'Medium', sub: '24h SLA' }
                    ].map((u) => (
                      <button
                        type="button"
                        key={u.key}
                        onClick={() => setUrgency(u.key)}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          urgency === u.key
                            ? u.key === 'Emergency'
                              ? 'bg-rose-500 text-white border-rose-600 shadow-md font-bold'
                              : 'bg-amber-500 text-white border-amber-600 shadow-md font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div className="text-xs">{u.label}</div>
                        <div className="text-[10px] opacity-80">{u.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Describe what happened (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Inverter beeping with red warning light. Chiller compressor stopped working."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none"
                />
              </div>
            </div>

            {/* 4. Voice Note & Photo Upload Simulators */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-amber-100 pb-2">
                <Mic className="w-5 h-5 text-amber-600" />
                <span>4. Voice Note & Photo (Quick Rural Submission)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Voice Recorder Simulator */}
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Mic className="w-4 h-4 text-amber-600" />
                      <span>Audio Voice Note (ಧ್ವನಿ ಸಂದೇಶ)</span>
                    </span>
                    {hasVoiceNote && (
                      <span className="text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        Recorded ({voiceDuration})
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[11px] text-slate-600">
                    Speak your problem in Kannada, Marathi, or Hindi if typing is difficult.
                  </p>

                  <div className="flex items-center gap-3">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={handleStartRecording}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-colors"
                      >
                        <Mic className="w-4 h-4" />
                        <span>{hasVoiceNote ? 'Re-record Voice' : 'Tap to Record'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStopRecording}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow flex items-center gap-1.5 animate-pulse"
                      >
                        <Square className="w-4 h-4" />
                        <span>Stop Recording ({recordingSeconds}s)</span>
                      </button>
                    )}

                    {hasVoiceNote && !isRecording && (
                      <div className="flex items-center gap-2 text-xs text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm">
                        <Play className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                        <span>Audio attached</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo Upload Simulator */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-slate-600" />
                      <span>Attach Photo of Error / Damage</span>
                    </span>
                    {photoUrl && (
                      <button
                        type="button"
                        onClick={() => setPhotoUrl('')}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {photoUrl ? (
                    <div className="relative rounded-xl overflow-hidden h-24 border border-amber-300">
                      <img src={photoUrl} alt="Fault preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-2 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded font-mono">
                        Photo Attached
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[11px] text-slate-500 mb-2">
                        Choose a demo fault snapshot:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {samplePhotos.map((p, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setPhotoUrl(p.url)}
                            className="text-[10px] bg-white hover:bg-amber-100 text-slate-700 border border-slate-200 px-2 py-1 rounded-lg font-medium transition-colors"
                          >
                            + {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero charge registration • SLA backed turnaround</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm sm:text-base shadow-solar transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Dispatching Ticket...</span>
                ) : (
                  <>
                    <span>Submit & Dispatch Ticket</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default ReportIssuePage;
