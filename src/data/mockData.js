export const BELGAUM_CLUSTERS = [
  { id: 'belgaum-hub', name: 'Belgaum Central Hub', taluk: 'Belagavi', activeSystems: 1420, activeTechs: 18, uptime: '99.4%' },
  { id: 'gokak', name: 'Gokak Dairy & Agri Cluster', taluk: 'Gokak', activeSystems: 980, activeTechs: 12, uptime: '98.8%' },
  { id: 'chikodi', name: 'Chikodi Rural Enterprise Cluster', taluk: 'Chikodi', activeSystems: 1150, activeTechs: 14, uptime: '99.1%' },
  { id: 'bailhongal', name: 'Bailhongal Agro-Processing Cluster', taluk: 'Bailhongal', activeSystems: 840, activeTechs: 10, uptime: '98.9%' },
  { id: 'khanapur', name: 'Khanapur Forest Fringe Cluster', taluk: 'Khanapur', activeSystems: 720, activeTechs: 9, uptime: '97.9%' },
  { id: 'saundatti', name: 'Saundatti High-Mast & Microgrid Hub', taluk: 'Saundatti', activeSystems: 650, activeTechs: 8, uptime: '99.0%' },
];

export const SYSTEM_TYPES = [
  { id: 'home-solar', label: 'Home Lighting & Inverter (300W - 1kW)', icon: 'Home', typicalIssue: 'Battery backup drop or inverter beeping' },
  { id: 'micro-cold-storage', label: 'Solar Micro-Cold Storage (2kW - 5kW)', icon: 'Snowflake', typicalIssue: 'Compressor tripping or temperature rise' },
  { id: 'solar-mill', label: 'Solar Flour / Spice Mill (3kW - 5kW)', icon: 'Factory', typicalIssue: 'Motor torque drop or VFD error code' },
  { id: 'agri-pump', label: 'Solar Agri Irrigation Pump (3HP - 5HP)', icon: 'Droplets', typicalIssue: 'Controller E-04 error or dry run lock' },
  { id: 'street-light', label: 'Panchayat Street Lights / Community Center', icon: 'SunMedium', typicalIssue: 'Dusk-to-dawn sensor or LED driver failure' },
  { id: 'health-clinic', label: 'Primary Health Center (PHC) Vaccine Cooler', icon: 'Activity', typicalIssue: 'Critical power alert or battery imbalance' },
];

export const ISSUE_CATEGORIES = [
  { id: 'inverter-fault', label: 'Inverter Beeping / No AC Power Output', severity: 'High' },
  { id: 'battery-drain', label: 'Battery Draining Fast / Low Backup Hours', severity: 'Medium' },
  { id: 'charge-controller', label: 'Charge Controller Red LED / E-Codes', severity: 'High' },
  { id: 'wiring-spark', label: 'Loose Wiring / MC4 Connector Sparks / MCB Trip', severity: 'Emergency' },
  { id: 'panel-physical', label: 'PV Panel Glass Crack / Dust Degradation', severity: 'Low' },
  { id: 'pump-motor', label: 'Pump Controller Not Starting in Sunlight', severity: 'High' },
  { id: 'scheduled-pm', label: 'Periodic Preventative Maintenance & Cleaning', severity: 'Low' },
];

export const INITIAL_TECHNICIANS = [
  {
    id: 'tech-01',
    name: 'Priya Naik',
    phone: '+91 98450 12841',
    role: 'Lead Urja Sakhi Technician',
    isUrjaSakhi: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    cluster: 'Gokak Dairy & Agri Cluster',
    rating: 4.94,
    ratingCount: 142,
    jobsCompleted: 142,
    firstTimeFixRate: '98.6%',
    responseTimeAvg: '2.4 hrs',
    status: 'Available',
    earningsThisMonth: '₹22,400',
    joinedDate: 'March 2024',
    certifications: ['Govt SCGJ Level 4 Solar PV Installer', 'SELCO Master Urja Sakhi Fellow', 'Lithium & Lead Acid Battery Diagnostic'],
    specialties: ['Solar Cold Storage', 'Off-grid Inverter Repair', 'Panchayat Microgrids'],
    toolkitSerialNumber: 'SELCO-KIT-BLG-089',
    badge: 'Cluster Champion 🏆'
  },
  {
    id: 'tech-02',
    name: 'Ramesh Patil',
    phone: '+91 94481 67290',
    role: 'Senior Field Solar Engineer',
    isUrjaSakhi: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    cluster: 'Belgaum Central Hub',
    rating: 4.88,
    ratingCount: 198,
    jobsCompleted: 198,
    firstTimeFixRate: '97.2%',
    responseTimeAvg: '3.1 hrs',
    status: 'On Job',
    earningsThisMonth: '₹26,800',
    joinedDate: 'January 2023',
    certifications: ['National Solar Rooftop Grid Tie Level 3', 'High-Voltage Agri Pump Specialist'],
    specialties: ['Solar Agri Irrigation Pumps', 'VFD Calibration', 'Heavy 3-Phase Inverters'],
    toolkitSerialNumber: 'SELCO-KIT-BLG-014',
    badge: 'Veteran Field Tech ⚡'
  },
  {
    id: 'tech-03',
    name: 'Sunita Kulkarni',
    phone: '+91 97412 88419',
    role: 'Urja Sakhi Solar Specialist',
    isUrjaSakhi: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    cluster: 'Bailhongal Agro-Processing Cluster',
    rating: 4.91,
    ratingCount: 86,
    jobsCompleted: 86,
    firstTimeFixRate: '99.0%',
    responseTimeAvg: '2.1 hrs',
    status: 'Available',
    earningsThisMonth: '₹18,900',
    joinedDate: 'August 2024',
    certifications: ['SELCO Certified Rural Solar Entrepreneur', 'SCGJ Rooftop PV Technician'],
    specialties: ['Solar Flour Mills', 'Domestic Inverter Retrofit', 'Preventative Care'],
    toolkitSerialNumber: 'SELCO-KIT-BLG-112',
    badge: 'Urja Sakhi Star ⭐'
  },
  {
    id: 'tech-04',
    name: 'Anand Deshmukh',
    phone: '+91 99002 33418',
    role: 'Cluster Field Technician',
    isUrjaSakhi: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    cluster: 'Chikodi Rural Enterprise Cluster',
    rating: 4.79,
    ratingCount: 114,
    jobsCompleted: 114,
    firstTimeFixRate: '96.5%',
    responseTimeAvg: '3.8 hrs',
    status: 'Available',
    earningsThisMonth: '₹21,500',
    joinedDate: 'May 2023',
    certifications: ['Govt Certified Solar Wireman', 'Battery Reconditioning Specialist'],
    specialties: ['Enterprise Solar', 'Street Light Networks', 'Solar Battery Diagnostics'],
    toolkitSerialNumber: 'SELCO-KIT-BLG-052',
    badge: 'Rapid Responder 🚀'
  },
  {
    id: 'tech-05',
    name: 'Lakshmi Doddmani',
    phone: '+91 96118 76543',
    role: 'Urja Sakhi Diagnostic Specialist',
    isUrjaSakhi: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    cluster: 'Khanapur Forest Fringe Cluster',
    rating: 4.95,
    ratingCount: 65,
    jobsCompleted: 65,
    firstTimeFixRate: '100%',
    responseTimeAvg: '1.9 hrs',
    status: 'Available',
    earningsThisMonth: '₹16,700',
    joinedDate: 'October 2024',
    certifications: ['SELCO Women in Solar Fellow', 'Off-grid Energy Auditor'],
    specialties: ['Tribal & Forest Fringe Microgrids', 'PHC Solar Clinic Systems'],
    toolkitSerialNumber: 'SELCO-KIT-BLG-145',
    badge: 'Zero-Recall Award 🎖️'
  }
];

export const INITIAL_SOLAR_ASSETS = [
  {
    qrCode: 'SELCO-BLG-8821',
    systemName: 'Gokak Milk Union 2.5kW Solar Chiller',
    ownerName: 'Basavaraj Shivappa Gani',
    ownerPhone: '+91 98442 11980',
    cluster: 'Gokak Dairy & Agri Cluster',
    village: 'Konnur Gram Panchayat, Gokak',
    systemType: 'Solar Micro-Cold Storage (2kW - 5kW)',
    capacity: '2.5 kWp Solar PV + 48V 300Ah Tubular Gel Battery Bank',
    installationDate: '14 Nov 2023',
    installer: 'SELCO Belgaum Hub / Priya Naik',
    warrantyExpiry: '14 Nov 2028 (Active Warranty)',
    healthScore: 94,
    batteryHealth: 92,
    inverterHealth: 96,
    pvEfficiency: '97.2%',
    lastServiceDate: '12 Jan 2026',
    nextScheduledPM: '12 Jul 2026',
    serviceHistory: [
      {
        id: 'HIST-101',
        date: '12 Jan 2026',
        technicianName: 'Priya Naik (Urja Sakhi)',
        type: 'Routine Preventative Care',
        diagnosis: 'Tubular electrolyte level inspected and topped with deionized water; PV dust layer cleaned.',
        partsReplaced: 'Distilled Water (4L), Terminal Anti-corrosion Grease',
        status: 'Completed',
        rating: 5
      },
      {
        id: 'HIST-088',
        date: '04 Aug 2025',
        technicianName: 'Priya Naik (Urja Sakhi)',
        type: 'Inverter Fuse Replacement',
        diagnosis: 'Grid surge caused DC input fuse trip on the hybrid inverter during monsoon thunder.',
        partsReplaced: '32A 600V DC Fast-Blow Fuse, Surge Protection Cartridge',
        status: 'Completed',
        rating: 5
      }
    ]
  },
  {
    qrCode: 'SELCO-BLG-4412',
    systemName: 'Mahalakshmi Solar Flour Mill & Grinder',
    ownerName: 'Renuka Mallappa Patil',
    ownerPhone: '+91 97311 44520',
    cluster: 'Bailhongal Agro-Processing Cluster',
    village: 'Sampgaon Cross, Bailhongal',
    systemType: 'Solar Flour / Spice Mill (3kW - 5kW)',
    capacity: '4.0 kWp Mono PERC + 5HP VFD Variable Frequency Drive',
    installationDate: '22 Feb 2024',
    installer: 'SELCO Hub / Sunita Kulkarni',
    warrantyExpiry: '22 Feb 2029 (Active Warranty)',
    healthScore: 89,
    batteryHealth: 100, // Direct drive solar
    inverterHealth: 88,
    pvEfficiency: '94.8%',
    lastServiceDate: '02 Feb 2026',
    nextScheduledPM: '02 Aug 2026',
    serviceHistory: [
      {
        id: 'HIST-094',
        date: '02 Feb 2026',
        technicianName: 'Sunita Kulkarni (Urja Sakhi)',
        type: 'VFD Parameter Tuning',
        diagnosis: 'Adjusted motor acceleration ramp-up time to optimize starting torque during peak flour milling load.',
        partsReplaced: 'VFD Cooling Fan Cleaning & Thermal Paste',
        status: 'Completed',
        rating: 5
      }
    ]
  },
  {
    qrCode: 'SELCO-BLG-1090',
    systemName: 'Gundre Gram PHC Solar Vaccine Storage',
    ownerName: 'Dr. Savitri Patil (Medical Officer)',
    ownerPhone: '+91 94808 66219',
    cluster: 'Khanapur Forest Fringe Cluster',
    village: 'Gundre PHC, Khanapur Taluk',
    systemType: 'Primary Health Center (PHC) Vaccine Cooler',
    capacity: '1.2 kWp Solar PV + 24V 200Ah Lithium LiFePO4 Smart Battery',
    installationDate: '05 Sep 2024',
    installer: 'SELCO Urja Sakhi Cluster Team',
    warrantyExpiry: '05 Sep 2029 (Active Warranty)',
    healthScore: 98,
    batteryHealth: 99,
    inverterHealth: 98,
    pvEfficiency: '98.5%',
    lastServiceDate: '18 Dec 2025',
    nextScheduledPM: '18 Jun 2026',
    serviceHistory: [
      {
        id: 'HIST-076',
        date: '18 Dec 2025',
        technicianName: 'Lakshmi Doddmani (Urja Sakhi)',
        type: 'Critical Health Facility Audit',
        diagnosis: 'BMS telemetry check, cold chain temperature data logger sync, wiring tightening.',
        partsReplaced: 'None (System 100% Operational)',
        status: 'Completed',
        rating: 5
      }
    ]
  },
  {
    qrCode: 'SELCO-BLG-7734',
    systemName: 'Chikodi 3HP Solar Drip Irrigation Unit',
    ownerName: 'Annasaheb Khot',
    ownerPhone: '+91 99801 88723',
    cluster: 'Chikodi Rural Enterprise Cluster',
    village: 'Kabbur Village, Chikodi',
    systemType: 'Solar Agri Irrigation Pump (3HP - 5HP)',
    capacity: '3.0 kWp Array + 3HP Submersible AC Pump Controller',
    installationDate: '10 Jan 2024',
    installer: 'SELCO Field Unit / Ramesh Patil',
    warrantyExpiry: '10 Jan 2029 (Active Warranty)',
    healthScore: 84,
    batteryHealth: 100, // Direct drive
    inverterHealth: 83,
    pvEfficiency: '91.0%',
    lastServiceDate: '14 Nov 2025',
    nextScheduledPM: '14 May 2026',
    serviceHistory: [
      {
        id: 'HIST-062',
        date: '14 Nov 2025',
        technicianName: 'Ramesh Patil',
        type: 'Pump Cable Splice Repair',
        diagnosis: 'Rodent damage repaired on submersible drop cable using waterproof vulcanizing tape.',
        partsReplaced: '3M Waterproof Splice Kit, MC4 Connectors (Pair)',
        status: 'Completed',
        rating: 5
      }
    ]
  },
  {
    qrCode: 'SELCO-BLG-3205',
    systemName: 'Saundatti High-Mast Solar Street Light Cluster',
    ownerName: 'Saundatti Gram Panchayat (Secretary)',
    ownerPhone: '+91 94498 32110',
    cluster: 'Saundatti High-Mast & Microgrid Hub',
    village: 'Yellamma Temple Junction, Saundatti',
    systemType: 'Panchayat Street Lights / Community Center',
    capacity: '1.5 kWp Solar PV + 4x 12V 150Ah Tubular Batteries',
    installationDate: '19 May 2023',
    installer: 'SELCO Community Energy Team',
    warrantyExpiry: '19 May 2028 (Active Warranty)',
    healthScore: 78,
    batteryHealth: 76,
    inverterHealth: 82,
    pvEfficiency: '89.2%',
    lastServiceDate: '08 Jan 2026',
    nextScheduledPM: '08 Jul 2026',
    serviceHistory: [
      {
        id: 'HIST-081',
        date: '08 Jan 2026',
        technicianName: 'Anand Deshmukh',
        type: 'Dusk-to-Dawn Sensor Replacement',
        diagnosis: 'Defective photo-resistor sensor replaced; auto timer re-calibrated for 6:30 PM turn on.',
        partsReplaced: 'IP67 Dusk-Dawn Optical Sensor, 16A DC MCB',
        status: 'Completed',
        rating: 4
      }
    ]
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'BLG-8492',
    customerName: 'Shankarappa Hukkeri',
    phone: '+91 98451 90234',
    cluster: 'Gokak Dairy & Agri Cluster',
    village: 'Lolsur Village, Gokak',
    systemType: 'Solar Micro-Cold Storage (2kW - 5kW)',
    qrCode: 'SELCO-BLG-8821',
    issueCategory: 'Inverter Beeping / No AC Power Output',
    urgency: 'Emergency',
    description: 'Milk chilling unit inverter is beeping continuously with Error code E-02. 350 liters of evening milk stored inside, compressor not cooling.',
    hasPhoto: true,
    hasVoiceNote: true,
    photoUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80',
    voiceDuration: '0:34',
    status: 'In Progress',
    assignedTechId: 'tech-01',
    createdAt: '2026-08-29T17:40:00Z',
    updatedAt: '2026-08-29T18:20:00Z',
    expectedSla: 'Within 4 Hours (Emergency SLA)',
    timeline: [
      { status: 'Reported', time: '5:40 PM, Today', note: 'Issue raised via SevaConnect voice note + photo' },
      { status: 'Assigned', time: '5:48 PM, Today', note: 'Assigned to Lead Urja Sakhi Priya Naik (3.2 km away)' },
      { status: 'In Progress', time: '6:20 PM, Today', note: 'Priya arrived at dairy site. Performing multimeter voltage diagnostics on inverter input.' }
    ]
  },
  {
    id: 'BLG-8488',
    customerName: 'Kavita Suresh Patil',
    phone: '+91 97405 66782',
    cluster: 'Bailhongal Agro-Processing Cluster',
    village: 'Nesargi Cross, Bailhongal',
    systemType: 'Solar Flour / Spice Mill (3kW - 5kW)',
    qrCode: 'SELCO-BLG-4412',
    issueCategory: 'Charge Controller Red LED / E-Codes',
    urgency: 'High',
    description: 'Solar flour mill motor turns very slowly when grain hopper is filled. Charge controller shows blinking amber & red indicator.',
    hasPhoto: true,
    hasVoiceNote: false,
    photoUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&auto=format&fit=crop&q=80',
    status: 'Assigned',
    assignedTechId: 'tech-03',
    createdAt: '2026-08-29T16:15:00Z',
    updatedAt: '2026-08-29T16:30:00Z',
    expectedSla: 'Within 12 Hours',
    timeline: [
      { status: 'Reported', time: '4:15 PM, Today', note: 'Ticket logged with photo of charge controller LED' },
      { status: 'Assigned', time: '4:30 PM, Today', note: 'Assigned to Sunita Kulkarni. Scheduled for first morning slot.' }
    ]
  },
  {
    id: 'BLG-8481',
    customerName: 'Mallikarjun Angadi',
    phone: '+91 94488 22319',
    cluster: 'Chikodi Rural Enterprise Cluster',
    village: 'Examba, Chikodi Taluk',
    systemType: 'Solar Agri Irrigation Pump (3HP - 5HP)',
    qrCode: 'SELCO-BLG-7734',
    issueCategory: 'Wiring / MC4 Connector Sparks / MCB Trip',
    urgency: 'High',
    description: 'Main DC junction box tripped suddenly at noon. Smelled burnt plastic near the array connection box.',
    hasPhoto: true,
    hasVoiceNote: true,
    photoUrl: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=400&auto=format&fit=crop&q=80',
    voiceDuration: '0:22',
    status: 'Reported',
    assignedTechId: null,
    createdAt: '2026-08-29T19:10:00Z',
    updatedAt: '2026-08-29T19:10:00Z',
    expectedSla: 'Within 8 Hours',
    timeline: [
      { status: 'Reported', time: '7:10 PM, Today', note: 'Awaiting coordinator auto-dispatch to Chikodi field unit' }
    ]
  },
  {
    id: 'BLG-8475',
    customerName: 'Gundre Primary Health Centre',
    phone: '+91 94808 66219',
    cluster: 'Khanapur Forest Fringe Cluster',
    village: 'Gundre PHC, Khanapur',
    systemType: 'Primary Health Center (PHC) Vaccine Cooler',
    qrCode: 'SELCO-BLG-1090',
    issueCategory: 'Battery Draining Fast / Low Backup Hours',
    urgency: 'Emergency',
    description: 'Routine quarterly check + battery backup duration testing before polio vaccination drive on Monday.',
    hasPhoto: false,
    hasVoiceNote: false,
    status: 'Resolved',
    assignedTechId: 'tech-05',
    createdAt: '2026-08-28T09:00:00Z',
    updatedAt: '2026-08-28T14:30:00Z',
    expectedSla: 'Completed in 5.5 Hours',
    resolutionReport: {
      resolvedBy: 'Lakshmi Doddmani (Urja Sakhi)',
      resolvedAt: '28 Aug 2026, 2:30 PM',
      rootCause: 'BMS cell balance calibration drift after 14 months of continuous cycle.',
      actionTaken: 'Equalization charge applied via digital field console, battery health restored to 99%. All vaccine alarms tested normal.',
      partsReplaced: 'None (Calibration and terminal cleaning)',
      customerSatisfaction: 5
    },
    timeline: [
      { status: 'Reported', time: '9:00 AM, 28 Aug', note: 'PHC administrator raised high-priority maintenance check' },
      { status: 'Assigned', time: '9:12 AM, 28 Aug', note: 'Assigned to Urja Sakhi Lakshmi Doddmani' },
      { status: 'In Progress', time: '11:00 AM, 28 Aug', note: 'Arrived at PHC, initiated BMS diagnostic logging' },
      { status: 'Resolved', time: '2:30 PM, 28 Aug', note: 'Battery calibrated, health verified at 99%, doctor sign-off received.' }
    ]
  },
  {
    id: 'BLG-8462',
    customerName: 'Ningappa Belavi',
    phone: '+91 99723 10945',
    cluster: 'Belgaum Central Hub',
    village: 'Peeranwadi, Belagavi',
    systemType: 'Home Lighting & Inverter (300W - 1kW)',
    qrCode: null,
    issueCategory: 'Panel Glass Crack / Dust Degradation',
    urgency: 'Medium',
    description: 'Tree branch fell during windstorm and cracked one 330W solar panel glass on terrace roof.',
    hasPhoto: true,
    hasVoiceNote: false,
    status: 'Resolved',
    assignedTechId: 'tech-02',
    createdAt: '2026-08-27T11:20:00Z',
    updatedAt: '2026-08-27T16:45:00Z',
    expectedSla: 'Completed in 5.4 Hours',
    resolutionReport: {
      resolvedBy: 'Ramesh Patil',
      resolvedAt: '27 Aug 2026, 4:45 PM',
      rootCause: 'Physical mechanical impact on Module #2.',
      actionTaken: 'Cracked 330W panel replaced with new SELCO certified Mono PERC module under warranty insurance claim. Array rewired and sealed.',
      partsReplaced: '330W Solar PV Module, MC4 Connector Pair, Aluminium Clamp',
      customerSatisfaction: 5
    },
    timeline: [
      { status: 'Reported', time: '11:20 AM, 27 Aug', note: 'Beneficiary uploaded damage photo' },
      { status: 'Assigned', time: '11:35 AM, 27 Aug', note: 'Assigned to Senior Tech Ramesh Patil' },
      { status: 'In Progress', time: '1:45 PM, 27 Aug', note: 'Replacement panel fetched from Belgaum central warehouse' },
      { status: 'Resolved', time: '4:45 PM, 27 Aug', note: 'New panel installed, generation verified at 1.8kWh/day' }
    ]
  }
];

export const IMPACT_METRICS = [
  { label: 'Rural Solar Systems Serviced', value: '14,850+', change: '+18% this quarter', icon: 'Sun' },
  { label: 'Certified Field Technicians', value: '186', sublabel: 'Across 38 Village Clusters', icon: 'Wrench' },
  { label: 'Women Technicians (Urja Sakhis)', value: '48.4%', sublabel: 'Leading Rural Clean Tech', icon: 'Sparkles' },
  { label: 'Average Resolution Turnaround', value: '18.2 Hrs', change: '84% faster than industry standard', icon: 'Clock' },
  { label: 'First-Time Resolution Rate', value: '98.4%', sublabel: 'Backed by Digital Toolkits', icon: 'CheckCircle2' },
  { label: 'Beneficiary Livelihood Protected', value: '₹3.4 Cr', sublabel: 'Prevented spoilage & downtime', icon: 'ShieldCheck' }
];

export const TESTIMONIALS = [
  {
    quote: "When our dairy chiller's inverter tripped with 350 liters of milk inside, Priya from SevaConnect arrived in 40 minutes on her e-scooter with the exact fuse and diagnostic tester. She saved ₹18,000 worth of milk from spoiling.",
    author: "Basavaraj Shivappa Gani",
    role: "Secretary, Konnur Milk Dairy Cooperative",
    cluster: "Gokak Cluster, Belgaum",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80'
  },
  {
    quote: "Joining the Urja Sakhi program changed my life. I went from being a homemaker to the lead solar engineer in Bailhongal. Today I earn ₹22,000+ monthly and farmers trust me to fix their livelihood solar mills.",
    author: "Priya Naik",
    role: "Lead Certified Urja Sakhi Technician",
    cluster: "Gokak & Bailhongal",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
  },
  {
    quote: "Previously, waiting for a technician from Bangalore took 10 to 15 days. With SevaConnect and the QR code on our flour mill, our ticket was accepted within 15 minutes and repaired by Sunita that same afternoon.",
    author: "Renuka Mallappa Patil",
    role: "Solar Flour Mill Entrepreneur",
    cluster: "Sampgaon, Bailhongal",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80'
  }
];

export const WOMEN_PROGRAM_STEPS = [
  {
    step: '01',
    title: 'Mobilize & Select',
    duration: 'Week 1–2',
    description: 'Partnership with rural Self-Help Groups (SHGs) and Gram Panchayats to identify motivated women with basic numeracy and community leadership skills.',
    details: ['Village-level awareness melas', 'Basic electrical aptitude assessment', 'Zero upfront enrollment cost']
  },
  {
    step: '02',
    title: '45-Day Hands-on Training',
    duration: 'Week 3–8',
    description: 'Comprehensive practical training at the SELCO Belgaum Innovation Center covering solar PV strings, inverters, VFD drives, lithium battery BMS, and digital safety tools.',
    details: ['70% practical rooftop lab work', 'Kannada & Marathi bilingual curriculum', 'Digital multimeter & diagnostic mastery']
  },
  {
    step: '03',
    title: 'Govt & SELCO Certification',
    duration: 'Week 9',
    description: 'National Skill Development Council (SCGJ) Level 4 Solar PV Installer certification plus SELCO Urja Sakhi Master Technician Accreditation.',
    details: ['Govt recognized diploma', 'Digital badge verifiable by QR', 'Safety & PPE certified']
  },
  {
    step: '04',
    title: 'Toolkit & EV Deployment',
    duration: 'Week 10',
    description: 'Every graduate is equipped with a digital toolbag (Clamp meter, insulation tester, crimping set, spare fuses) and subsidized electric scooter financing.',
    details: ['Subsidized ₹35,000 professional toolkit', 'SevaConnect Tech App preloaded', 'Local cluster warehouse spare parts access']
  },
  {
    step: '05',
    title: 'Smart Dispatch & Earning',
    duration: 'Ongoing',
    description: 'Automated ticket routing within 8km radius ensures safe, high-earning local service calls with transparent per-job payouts (₹350 - ₹1,200 per service).',
    details: ['Average monthly income: ₹18,000 - ₹28,000', 'Annual refresher training', 'Mentorship and peer support network']
  }
];
