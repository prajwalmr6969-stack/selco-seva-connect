import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  GraduationCap, 
  Wrench, 
  TrendingUp, 
  HeartHandshake, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Phone, 
  MapPin, 
  Users, 
  ArrowRight, 
  Zap,
  Play,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import { WOMEN_PROGRAM_STEPS } from '../data/mockData';
import Modal from '../components/common/Modal';

export const WomenTechnicianPage = () => {
  const { technicians, clusters, submitTrainingApplication, applications } = useData();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Application Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('24');
  const [cluster, setCluster] = useState(clusters[0].name);
  const [village, setVillage] = useState('');
  const [education, setEducation] = useState('12th Standard (PUC)');
  const [shgGroup, setShgGroup] = useState('Shri Renuka Devi SHG');
  const [hasTwoWheeler, setHasTwoWheeler] = useState(true);
  const [submittedApp, setSubmittedApp] = useState(null);

  const womenTechs = technicians.filter(t => t.isUrjaSakhi);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    const app = submitTrainingApplication({
      fullName,
      phone,
      age: parseInt(age) || 24,
      cluster,
      village: village || `${cluster.split(' ')[0]} Gram Panchayat`,
      education,
      shgGroup,
      hasTwoWheeler
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSubmittedApp(app);
  };

  const closeAndResetModal = () => {
    setIsApplyModalOpen(false);
    setSubmittedApp(null);
    setFullName('');
    setPhone('');
    setVillage('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. HERO SECTION */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-solar-teal-950 via-solar-teal-900 to-slate-900 text-white p-8 sm:p-14 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs sm:text-sm font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>SELCO Foundation Women in Clean Energy Initiative</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Urja Sakhi Grid</span> — Women Leading Rural Solar Service
            </h1>

            <p className="text-slate-300 text-sm sm:text-base sm:leading-relaxed">
              Transforming rural women from self-help group members into certified, equipped solar field engineers. Operating across 38 Belgaum village clusters with guaranteed livelihood income, digital toolkits, and electric two-wheeler support.
            </p>

            {/* Quick Hero Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-solar-teal-800 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">48.4%</div>
                <div className="text-xs text-slate-300">Belgaum Women Fleet</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹22,400</div>
                <div className="text-xs text-slate-300">Avg Monthly Earnings</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.1%</div>
                <div className="text-xs text-slate-300">First-Time Fix Rate</div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-solar transition-all transform hover:-translate-y-0.5"
              >
                Apply for Cohort 2026 Training
              </button>

              <a
                href="#pipeline"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
              >
                View 5-Step Pipeline ↓
              </a>
            </div>
          </div>
        </div>

        {/* 2. FIVE-STEP TRAINING TO EARNING PIPELINE */}
        <section id="pipeline" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
              Empowerment Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              From Mobilization to Micro-Entrepreneurship
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Structured 5-stage pipeline ensuring zero dropout and high earning potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {WOMEN_PROGRAM_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-solar-teal-800 text-white flex items-center justify-center font-bold text-xs">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1">
                  {step.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. URJA SAKHI FIELD PROFILES SPOTLIGHT */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-solar-teal-800 uppercase tracking-widest bg-solar-teal-100 px-3 py-1 rounded-full">
              Trailblazers on the Ground
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Meet Belgaum's Urja Sakhi Champions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {womenTechs.map((tech) => (
              <div
                key={tech.id}
                className="bg-white rounded-3xl p-6 border border-amber-100 shadow-md hover:shadow-xl transition-all space-y-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={tech.avatar}
                    alt={tech.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-lg text-slate-900">{tech.name}</h3>
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{tech.role}</p>
                    <p className="text-xs text-solar-teal-800 font-bold">{tech.cluster}</p>
                  </div>
                </div>

                <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-amber-100 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Jobs Resolved:</span>
                    <span className="font-bold text-slate-800">{tech.jobsCompleted} Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">First-Time Fix Rate:</span>
                    <span className="font-bold text-emerald-700">{tech.firstTimeFixRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly Earnings:</span>
                    <span className="font-bold text-slate-900">{tech.earningsThisMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Customer Rating:</span>
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {tech.rating}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
                    Certifications & Specialties
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md font-semibold">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. RECENT CANDIDATE APPLICATIONS LOG */}
        <section id="apply" className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-4 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Recent Cohort 2026 Applicants (Belgaum District)
              </h3>
              <p className="text-xs text-slate-500">
                Women enrolled for upcoming 45-day technical solar installer training.
              </p>
            </div>
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow transition-colors self-start sm:self-auto"
            >
              + Submit New Application
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FDFBF7] text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">App ID</th>
                  <th className="py-3 px-4">Applicant Name</th>
                  <th className="py-3 px-4">Cluster / Village</th>
                  <th className="py-3 px-4">Education</th>
                  <th className="py-3 px-4">SHG Affiliation</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{app.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{app.fullName}</td>
                    <td className="py-3 px-4 text-slate-600">{app.village}</td>
                    <td className="py-3 px-4 text-slate-600">{app.education}</td>
                    <td className="py-3 px-4 text-slate-600">{app.shgGroup}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* APPLY MODAL */}
        <Modal
          isOpen={isApplyModalOpen}
          onClose={closeAndResetModal}
          title="Apply for Urja Sakhi Solar Training (Belgaum Cohort 2026)"
          maxWidth="max-w-xl"
        >
          {submittedApp ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Application Submitted!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Application reference <strong>#{submittedApp.id}</strong> has been registered. Our Belgaum Hub coordinator will call you at <strong>{submittedApp.phone}</strong> for the orientation schedule.
              </p>
              <div className="bg-amber-50 p-4 rounded-xl text-xs text-amber-900 text-left border border-amber-200 space-y-1">
                <div><strong>Applicant:</strong> {submittedApp.fullName} (Age: {submittedApp.age})</div>
                <div><strong>Cluster:</strong> {submittedApp.cluster} ({submittedApp.village})</div>
                <div><strong>SHG:</strong> {submittedApp.shgGroup}</div>
                <div><strong>Stipend:</strong> Free 45-Day Training + ₹4,000 monthly food/travel grant</div>
              </div>
              <button
                onClick={closeAndResetModal}
                className="px-6 py-2.5 bg-solar-teal-800 text-white text-xs font-bold rounded-xl"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Geeta Hugar / ಸುಮಿತ್ರಾ ಕಾಂಬ್ಳೆ"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="45"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Belgaum Cluster / Taluk *
                  </label>
                  <select
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none"
                  >
                    {clusters.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Village / Gram Panchayat
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Konnur Gram"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Education Level
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none"
                  >
                    <option value="10th Standard (SSLC)">10th Standard (SSLC)</option>
                    <option value="12th Standard (PUC)">12th Standard (PUC)</option>
                    <option value="ITI / Diploma (Electrical/Electronics)">ITI / Diploma (Electrical)</option>
                    <option value="Graduate / BA / BCom / BSc">Graduate (BA / BCom / BSc)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Self-Help Group (SHG) / Sangha Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shri Renuka Devi SHG, Bailhongal"
                  value={shgGroup}
                  onChange={(e) => setShgGroup(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="twowheeler"
                  checked={hasTwoWheeler}
                  onChange={(e) => setHasTwoWheeler(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                />
                <label htmlFor="twowheeler" className="text-xs text-slate-700 font-medium">
                  I have or can learn to ride a two-wheeler / e-scooter for village visits
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeAndResetModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-white font-extrabold text-xs shadow-solar"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default WomenTechnicianPage;
