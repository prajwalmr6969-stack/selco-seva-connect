import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  Users, 
  Sparkles, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  ExternalLink,
  ChevronDown,
  UserPlus,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { useData } from '../context/DataContext';
import StatusBadge from '../components/common/StatusBadge';
import UrgencyBadge from '../components/common/UrgencyBadge';
import Modal from '../components/common/Modal';

export const CoordinatorDashboardPage = () => {
  const { 
    tickets, 
    technicians, 
    clusters, 
    assignTicket, 
    updateTicketStatus 
  } = useData();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [clusterFilter, setClusterFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');

  // Assign Modal
  const [assigningTicket, setAssigningTicket] = useState(null);
  const [selectedTechForAssign, setSelectedTechForAssign] = useState(technicians[0].id);

  // Computed KPIs
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status !== 'Resolved').length;
  const emergencyTickets = tickets.filter(t => t.urgency === 'Emergency' && t.status !== 'Resolved').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
  const womenTechs = technicians.filter(t => t.isUrjaSakhi);
  const womenPercentage = Math.round((womenTechs.length / technicians.length) * 100);

  // Filtered Tickets
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.systemType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.village.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesCluster = clusterFilter === 'All' || t.cluster === clusterFilter;
    const matchesUrgency = urgencyFilter === 'All' || t.urgency === urgencyFilter;

    return matchesSearch && matchesStatus && matchesCluster && matchesUrgency;
  });

  // Chart Data 1: Ticket Volume & Resolution Trends (Last 7 days mock)
  const trendData = [
    { day: 'Mon', reported: 12, resolved: 11 },
    { day: 'Tue', reported: 15, resolved: 14 },
    { day: 'Wed', reported: 18, resolved: 16 },
    { day: 'Thu', reported: 14, resolved: 15 },
    { day: 'Fri', reported: 22, resolved: 20 },
    { day: 'Sat', reported: 19, resolved: 18 },
    { day: 'Sun', reported: 16, resolved: 17 },
  ];

  // Chart Data 2: Cluster Performance & Uptime
  const clusterChartData = clusters.map(c => ({
    name: c.name.split(' ')[0], // short name
    systems: c.activeSystems,
    techs: c.activeTechs,
    uptimeNum: parseFloat(c.uptime)
  }));

  // Chart Data 3: Issue Breakdown
  const issueDistribution = [
    { name: 'Inverter/VFD', value: 38, color: '#F59E0B' },
    { name: 'Battery Bank', value: 26, color: '#1C6E5B' },
    { name: 'Wiring & MC4', value: 18, color: '#D97706' },
    { name: 'PV Panel Crack', value: 10, color: '#0F4C3A' },
    { name: 'Sensors / PM', value: 8, color: '#475569' },
  ];

  const handleOpenAssign = (ticket) => {
    setAssigningTicket(ticket);
    setSelectedTechForAssign(technicians[0].id);
  };

  const handleConfirmAssign = (e) => {
    e.preventDefault();
    if (!assigningTicket) return;
    assignTicket(assigningTicket.id, selectedTechForAssign, 'Assigned by Belgaum District Coordinator');
    setAssigningTicket(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-solar-teal-800 uppercase tracking-widest bg-solar-teal-100 px-3 py-1 rounded-full">
                Belgaum District Control Room
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Dispatch
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Coordinator & Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Real-time SLA monitoring, cluster ticket dispatch, and Urja Sakhi performance management.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/report"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow transition-colors"
            >
              + Create Service Ticket
            </Link>
            <Link
              to="/women-technicians"
              className="px-4 py-2.5 rounded-xl bg-solar-teal-800 hover:bg-solar-teal-900 text-white font-bold text-xs shadow transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Urja Sakhi Grid</span>
            </Link>
          </div>
        </div>

        {/* 1. KEY PERFORMANCE METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Open Tickets</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{openTickets}</div>
            <div className="text-[11px] text-amber-700 font-semibold mt-1">
              {emergencyTickets} Emergency Priority
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Avg Resolution Time</span>
              <Clock className="w-4 h-4 text-solar-teal-600" />
            </div>
            <div className="text-3xl font-extrabold text-solar-teal-900">18.2h</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              ✓ Within 24h SLA Target
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Technicians</span>
              <Users className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{technicians.length}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Across 6 Belgaum Taluks
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-solar-teal-200 shadow-sm bg-gradient-to-br from-white to-solar-teal-50/50">
            <div className="flex items-center justify-between text-solar-teal-800 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Women Techs (Urja Sakhi)</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-solar-teal-900">{womenPercentage}%</div>
            <div className="text-[11px] text-solar-teal-700 font-bold mt-1">
              {womenTechs.length} Certified Women Fellows
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Resolved Rate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-700">98.4%</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              1st-Time Fix Success
            </div>
          </div>

        </div>

        {/* 2. RECHARTS ANALYTICS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart 1: Daily Ticket Inflow vs Resolution Flow */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Ticket Inflow & Resolution Velocity (Belgaum)</span>
                </h3>
                <p className="text-xs text-slate-500">Weekly comparison of reported vs completed service calls</p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                Last 7 Days
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1C6E5B" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#1C6E5B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #FEF3C7', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="reported" name="Reported Tickets" stroke="#F59E0B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReported)" />
                  <Area type="monotone" dataKey="resolved" name="Resolved Fixes" stroke="#1C6E5B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorResolved)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Solar Failure Cause Distribution */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-solar-teal-700" />
                <span>Issue Category Share</span>
              </h3>
              <p className="text-xs text-slate-500">Root cause breakdown across Belgaum assets</p>
            </div>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {issueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              {issueDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 3. TICKET MANAGEMENT DATA TABLE WITH RICH FILTERS */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden space-y-4 p-6">
          
          {/* Table Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Service Tickets Master Log
              </h3>
              <p className="text-xs text-slate-500">
                Showing {filteredTickets.length} of {totalTickets} total tickets registered
              </p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search ticket, name, village..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-200 outline-none w-48 sm:w-56"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Reported">Reported</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              {/* Cluster Filter */}
              <select
                value={clusterFilter}
                onChange={(e) => setClusterFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium outline-none"
              >
                <option value="All">All Clusters</option>
                {clusters.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              {/* Urgency Filter */}
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium outline-none"
              >
                <option value="All">All Urgency</option>
                <option value="Emergency">Emergency</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FDFBF7] text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Ticket ID</th>
                  <th className="py-3.5 px-4">Beneficiary & Village</th>
                  <th className="py-3.5 px-4">Solar System & Fault</th>
                  <th className="py-3.5 px-4">Cluster Hub</th>
                  <th className="py-3.5 px-4">Urgency</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Assigned Tech</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No matching tickets found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => {
                    const tech = technicians.find(t => t.id === ticket.assignedTechId);
                    return (
                      <tr key={ticket.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          <Link to={`/track?id=${ticket.id}`} className="hover:text-amber-600 hover:underline">
                            #{ticket.id}
                          </Link>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{ticket.customerName}</div>
                          <div className="text-[11px] text-slate-500">{ticket.village}</div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-semibold text-slate-800 truncate">{ticket.systemType}</div>
                          <div className="text-[11px] text-amber-800 truncate">{ticket.issueCategory}</div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600">
                          {ticket.cluster.split(' ')[0]}
                        </td>

                        <td className="py-3.5 px-4">
                          <UrgencyBadge urgency={ticket.urgency} size="sm" />
                        </td>

                        <td className="py-3.5 px-4">
                          <StatusBadge status={ticket.status} size="sm" />
                        </td>

                        <td className="py-3.5 px-4">
                          {tech ? (
                            <div className="flex items-center gap-1.5">
                              <img src={tech.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                              <span className="font-bold text-slate-800">{tech.name}</span>
                              {tech.isUrjaSakhi && (
                                <span className="text-[9px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold">
                                  Urja
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-amber-600 italic font-semibold">Unassigned</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {ticket.status !== 'Resolved' && (
                              <button
                                onClick={() => handleOpenAssign(ticket)}
                                className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-lg text-[11px] transition-colors"
                              >
                                {ticket.assignedTechId ? 'Reassign' : 'Assign Tech'}
                              </button>
                            )}
                            <Link
                              to={`/track?id=${ticket.id}`}
                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                              title="View Tracking Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* 4. TECHNICIAN DIRECTORY & URJA SAKHI PERFORMANCE LEADERBOARD */}
        <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Field Technician & Urja Sakhi Performance Grid</span>
              </h3>
              <p className="text-xs text-slate-500">
                Ranked by first-time fix rate, verified reviews, and turnaround efficiency.
              </p>
            </div>
            <Link
              to="/women-technicians"
              className="text-xs font-bold text-solar-teal-800 hover:underline flex items-center gap-1"
            >
              <span>Explore Urja Sakhi Pipeline →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicians.map((tech, idx) => (
              <div
                key={tech.id}
                className="bg-[#FDFBF7] rounded-2xl p-4 border border-amber-100 hover:border-amber-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={tech.avatar}
                    alt={tech.name}
                    className="w-12 h-12 rounded-xl object-cover border border-amber-300 shadow-sm"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">{tech.name}</h4>
                      {tech.isUrjaSakhi && (
                        <span className="text-[9px] bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full">
                          Urja Sakhi
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">{tech.role}</p>
                    <p className="text-[10px] text-solar-teal-800 font-semibold">{tech.cluster}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center bg-white p-2 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{tech.jobsCompleted}</div>
                    <div className="text-[10px] text-slate-400">Jobs</div>
                  </div>
                  <div>
                    <div className="font-bold text-emerald-700">{tech.firstTimeFixRate}</div>
                    <div className="text-[10px] text-slate-400">Fix Rate</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-600">★ {tech.rating}</div>
                    <div className="text-[10px] text-slate-400">Rating</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500">Kit: <strong className="font-mono text-slate-700">{tech.toolkitSerialNumber}</strong></span>
                  <span className="font-bold text-emerald-700">{tech.earningsThisMonth} this mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assign Modal */}
        <Modal
          isOpen={Boolean(assigningTicket)}
          onClose={() => setAssigningTicket(null)}
          title={`Dispatch Technician to Ticket #${assigningTicket?.id}`}
          maxWidth="max-w-lg"
        >
          {assigningTicket && (
            <form onSubmit={handleConfirmAssign} className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div><strong>Beneficiary:</strong> {assigningTicket.customerName} ({assigningTicket.phone})</div>
                <div><strong>Location:</strong> {assigningTicket.village} ({assigningTicket.cluster})</div>
                <div><strong>System & Fault:</strong> {assigningTicket.systemType} — {assigningTicket.issueCategory}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Select Certified Technician to Dispatch *
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {technicians.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTechForAssign(t.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedTechForAssign === t.id
                          ? 'border-solar-teal-600 bg-solar-teal-50/80 ring-2 ring-solar-teal-200'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={t.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{t.name}</span>
                            {t.isUrjaSakhi && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                                Urja Sakhi
                              </span>
                            )}
                          </div>
                          <div className="text-slate-500">{t.cluster} • ★ {t.rating}</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700">{t.firstTimeFixRate} Fix</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAssigningTicket(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-solar-teal-800 hover:bg-solar-teal-900 text-white font-bold text-xs shadow-teal transition-all"
                >
                  Confirm & Dispatch Technician
                </button>
              </div>
            </form>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default CoordinatorDashboardPage;
