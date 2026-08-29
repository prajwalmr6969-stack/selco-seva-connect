import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  QrCode, 
  Scan, 
  Camera, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Wrench, 
  Zap, 
  BatteryCharging, 
  Activity, 
  Star, 
  AlertTriangle, 
  ArrowRight, 
  User, 
  MapPin, 
  Clock,
  ChevronRight
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const QRLookupPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { solarAssets } = useData();

  const initialQr = searchParams.get('id') || 'SELCO-BLG-8821';
  const [activeQr, setActiveQr] = useState(initialQr);
  const [isScanning, setIsScanning] = useState(false);
  const [manualInput, setManualInput] = useState(initialQr);

  useEffect(() => {
    if (searchParams.get('id')) {
      setActiveQr(searchParams.get('id'));
      setManualInput(searchParams.get('id'));
    }
  }, [searchParams]);

  const currentAsset = solarAssets.find(a => a.qrCode.toLowerCase() === activeQr.trim().toLowerCase()) || solarAssets[0];

  const handleSelectPreset = (qr) => {
    setActiveQr(qr);
    setManualInput(qr);
    setSearchParams({ id: qr });
    setIsScanning(false);
  };

  const handleManualLookup = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setActiveQr(manualInput.trim());
      setSearchParams({ id: manualInput.trim() });
    }
  };

  const simulateCameraScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Pick random asset from available
      const randomAsset = solarAssets[Math.floor(Math.random() * solarAssets.length)];
      handleSelectPreset(randomAsset.qrCode);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Smart Asset Registry & Digital Log
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Solar Asset QR Scanner & Maintenance History
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Scan physical QR code plate attached to any SELCO solar installation in Belgaum to access real-time health telemetry and service history.
          </p>
        </div>

        {/* Scanner Simulation & Preset Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Camera Viewfinder Simulator */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-xs aspect-square rounded-2xl bg-slate-900 border-4 border-amber-400 overflow-hidden flex flex-col items-center justify-center p-4 shadow-lg group">
                {/* Corner markers */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400" />

                {isScanning ? (
                  <div className="text-center space-y-3">
                    {/* Laser scanning line */}
                    <div className="absolute inset-x-0 h-1 bg-amber-400 shadow-[0_0_15px_#F59E0B] animate-bounce" />
                    <Scan className="w-12 h-12 text-amber-400 animate-spin mx-auto opacity-75" />
                    <p className="text-xs text-amber-300 font-mono font-bold">Scanning QR Plate...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <QrCode className="w-20 h-20 text-white/80 mx-auto" />
                    <button
                      onClick={simulateCameraScan}
                      className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 text-slate-950 text-xs font-black rounded-xl shadow transition-transform transform active:scale-95"
                    >
                      Simulate Camera Scan
                    </button>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center">
                Point mobile camera at SELCO QR plate on inverter box
              </p>
            </div>

            {/* Right: Manual Search & Preset Chips */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Lookup by System QR Tag ID
                </label>
                <form onSubmit={handleManualLookup} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. SELCO-BLG-8821"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-solar-teal-800 hover:bg-solar-teal-900 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Lookup
                  </button>
                </form>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">
                  Select Belgaum Demo Installations:
                </span>
                <div className="flex flex-col gap-2">
                  {solarAssets.map((asset) => (
                    <button
                      key={asset.qrCode}
                      onClick={() => handleSelectPreset(asset.qrCode)}
                      className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between text-xs ${
                        activeQr.toLowerCase() === asset.qrCode.toLowerCase()
                          ? 'bg-amber-50 border-amber-500 font-bold text-amber-900 ring-1 ring-amber-300'
                          : 'bg-[#FDFBF7] border-slate-200 text-slate-700 hover:bg-amber-50/50'
                      }`}
                    >
                      <div>
                        <div className="font-mono text-amber-800 font-bold">{asset.qrCode}</div>
                        <div className="text-slate-600">{asset.systemName}</div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Health: {asset.healthScore}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Asset Details & Health Card */}
        {currentAsset && (
          <div className="space-y-8">
            
            {/* 1. Asset Overview & Health Metrics */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xl space-y-6">
              
              {/* Top Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-amber-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-lg border border-amber-200">
                      QR: {currentAsset.qrCode}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                      {currentAsset.warrantyExpiry}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                    {currentAsset.systemName}
                  </h2>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentAsset.village} • {currentAsset.cluster}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/report?qr=${currentAsset.qrCode}&type=${encodeURIComponent(currentAsset.systemType)}`}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-solar flex items-center gap-1.5 transition-colors"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Report Fault for this Unit</span>
                  </Link>
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-amber-100">
                  <span className="text-slate-500 block mb-1">Beneficiary Owner:</span>
                  <div className="font-bold text-slate-900 text-sm">{currentAsset.ownerName}</div>
                  <div className="text-slate-500 mt-0.5">{currentAsset.ownerPhone}</div>
                </div>

                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-amber-100">
                  <span className="text-slate-500 block mb-1">System Specs:</span>
                  <div className="font-bold text-slate-900">{currentAsset.systemType}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{currentAsset.capacity}</div>
                </div>

                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-amber-100">
                  <span className="text-slate-500 block mb-1">Commissioned On:</span>
                  <div className="font-bold text-slate-900 text-sm">{currentAsset.installationDate}</div>
                  <div className="text-solar-teal-800 font-semibold mt-0.5">By {currentAsset.installer}</div>
                </div>

                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-amber-100">
                  <span className="text-slate-500 block mb-1">Preventative Maintenance:</span>
                  <div className="font-bold text-emerald-700 text-sm">Last: {currentAsset.lastServiceDate}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Next: {currentAsset.nextScheduledPM}</div>
                </div>
              </div>

              {/* Health Telemetry Gauges */}
              <div className="pt-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                  Live Asset Health Scores
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                      <span className="font-bold text-emerald-900">Overall System Health</span>
                      <Activity className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-800">{currentAsset.healthScore}%</div>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${currentAsset.healthScore}%` }} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                      <span className="font-bold text-amber-900">Battery Bank Health</span>
                      <BatteryCharging className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-3xl font-extrabold text-amber-800">{currentAsset.batteryHealth}%</div>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${currentAsset.batteryHealth}%` }} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-solar-teal-50 to-white border border-solar-teal-200">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                      <span className="font-bold text-solar-teal-950">PV Generation Efficiency</span>
                      <Zap className="w-4 h-4 text-solar-teal-700" />
                    </div>
                    <div className="text-3xl font-extrabold text-solar-teal-900">{currentAsset.pvEfficiency}</div>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-solar-teal-600 h-full rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* 2. Chronological Maintenance Log History */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-md space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-solar-teal-800" />
                  <span>Verified Service & Maintenance History Log</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Every past ticket, spare part replaced, and technician diagnosis timestamped permanently.
                </p>
              </div>

              <div className="space-y-4">
                {currentAsset.serviceHistory.map((log) => (
                  <div
                    key={log.id}
                    className="p-5 rounded-2xl bg-[#FDFBF7] border border-amber-100 shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded">
                          {log.id}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">{log.type}</h4>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>Date: <strong>{log.date}</strong></span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          {log.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Diagnosis:</strong> {log.diagnosis}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
                      <span className="text-slate-600">
                        Parts Replaced: <strong className="text-slate-800">{log.partsReplaced}</strong>
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Serviced by: <strong className="text-solar-teal-900">{log.technicianName}</strong></span>
                        <div className="flex items-center text-amber-500">
                          {[...Array(log.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default QRLookupPage;
