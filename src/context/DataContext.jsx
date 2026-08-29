import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_TICKETS,
  INITIAL_TECHNICIANS,
  INITIAL_SOLAR_ASSETS,
  BELGAUM_CLUSTERS,
  SYSTEM_TYPES,
  ISSUE_CATEGORIES
} from '../data/mockData';

const DataContext = createContext();

const STORAGE_KEYS = {
  TICKETS: 'selco_sevaconnect_tickets_v1',
  TECHNICIANS: 'selco_sevaconnect_technicians_v1',
  ASSETS: 'selco_sevaconnect_assets_v1',
  APPLICATIONS: 'selco_sevaconnect_applications_v1',
  CURRENT_TECH: 'selco_sevaconnect_current_tech_v1'
};

export const DataProvider = ({ children }) => {
  // Load state from localStorage or fallback to defaults
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  const [technicians, setTechnicians] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TECHNICIANS);
      return saved ? JSON.parse(saved) : INITIAL_TECHNICIANS;
    } catch {
      return INITIAL_TECHNICIANS;
    }
  });

  const [solarAssets, setSolarAssets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ASSETS);
      return saved ? JSON.parse(saved) : INITIAL_SOLAR_ASSETS;
    } catch {
      return INITIAL_SOLAR_ASSETS;
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'APP-1021',
          fullName: 'Geeta Hugar',
          phone: '+91 98450 77123',
          age: 26,
          cluster: 'Gokak Dairy & Agri Cluster',
          village: 'Ankalgi, Gokak',
          education: '12th Standard (PUC Science)',
          shgGroup: 'Shri Mahalakshmi SHG',
          appliedAt: '2026-08-28T10:30:00Z',
          status: 'Interview Scheduled'
        }
      ];
    } catch {
      return [];
    }
  });

  const [currentTechId, setCurrentTechId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_TECH);
      return saved || 'tech-01'; // Default: Priya Naik (Lead Urja Sakhi)
    } catch {
      return 'tech-01';
    }
  });

  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    } catch (e) {
      console.error(e);
    }
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TECHNICIANS, JSON.stringify(technicians));
    } catch (e) {
      console.error(e);
    }
  }, [technicians]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(solarAssets));
    } catch (e) {
      console.error(e);
    }
  }, [solarAssets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_TECH, currentTechId);
    } catch (e) {
      console.error(e);
    }
  }, [currentTechId]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Ticket Operations
  const createTicket = (ticketData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `BLG-${randomNum}`;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today';

    const newTicket = {
      id: newId,
      customerName: ticketData.customerName,
      phone: ticketData.phone,
      cluster: ticketData.cluster || 'Belgaum Central Hub',
      village: ticketData.village || 'Belgaum Cluster Area',
      systemType: ticketData.systemType,
      qrCode: ticketData.qrCode || null,
      issueCategory: ticketData.issueCategory,
      urgency: ticketData.urgency || 'Medium',
      description: ticketData.description || 'Solar system service request reported.',
      hasPhoto: Boolean(ticketData.photoUrl),
      hasVoiceNote: Boolean(ticketData.hasVoiceNote),
      photoUrl: ticketData.photoUrl || null,
      voiceDuration: ticketData.voiceDuration || null,
      status: 'Reported',
      assignedTechId: null,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      expectedSla: ticketData.urgency === 'Emergency' ? 'Within 4 Hours (Emergency SLA)' : (ticketData.urgency === 'High' ? 'Within 12 Hours' : 'Within 24 Hours'),
      timeline: [
        { status: 'Reported', time: formattedTime, note: 'Service ticket registered on SevaConnect platform' }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);
    showToast(`Ticket #${newId} registered successfully! Dispatched to cluster.`);
    return newTicket;
  };

  const assignTicket = (ticketId, techId, note = null) => {
    const tech = technicians.find(t => t.id === techId);
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today';

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Assigned',
          assignedTechId: techId,
          updatedAt: now.toISOString(),
          timeline: [
            ...t.timeline,
            {
              status: 'Assigned',
              time: formattedTime,
              note: note || `Assigned to ${tech ? tech.name : 'Field Technician'}`
            }
          ]
        };
      }
      return t;
    }));

    showToast(`Ticket #${ticketId} assigned to ${tech ? tech.name : 'Technician'}`);
  };

  const updateTicketStatus = (ticketId, nextStatus, note = '') => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today';

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: nextStatus,
          updatedAt: now.toISOString(),
          timeline: [
            ...t.timeline,
            {
              status: nextStatus,
              time: formattedTime,
              note: note || `Status updated to ${nextStatus}`
            }
          ]
        };
      }
      return t;
    }));

    showToast(`Ticket #${ticketId} status updated to "${nextStatus}"`);
  };

  const resolveTicket = (ticketId, reportData) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today';
    const tech = technicians.find(t => t.id === (reportData.techId || currentTechId));

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Resolved',
          updatedAt: now.toISOString(),
          resolutionReport: {
            resolvedBy: tech ? `${tech.name} ${tech.isUrjaSakhi ? '(Urja Sakhi)' : ''}` : 'Certified Solar Technician',
            resolvedAt: formattedTime,
            rootCause: reportData.rootCause || 'Component diagnostic completed and verified',
            actionTaken: reportData.actionTaken || 'Solar system components inspected, repaired, and tested',
            partsReplaced: reportData.partsReplaced || 'None (Standard calibration & servicing)',
            customerSatisfaction: reportData.rating || 5
          },
          timeline: [
            ...t.timeline,
            {
              status: 'Resolved',
              time: formattedTime,
              note: `Service completed by ${tech ? tech.name : 'Technician'}. Customer verified solar generation.`
            }
          ]
        };
      }
      return t;
    }));

    // Increment technician completed jobs count
    if (tech) {
      setTechnicians(prev => prev.map(item => {
        if (item.id === tech.id) {
          return {
            ...item,
            jobsCompleted: item.jobsCompleted + 1,
            ratingCount: item.ratingCount + 1
          };
        }
        return item;
      }));
    }

    // Update solar asset maintenance history if qrCode matches
    const targetTicket = tickets.find(t => t.id === ticketId);
    if (targetTicket && targetTicket.qrCode) {
      setSolarAssets(prev => prev.map(asset => {
        if (asset.qrCode === targetTicket.qrCode) {
          return {
            ...asset,
            lastServiceDate: 'Today',
            healthScore: Math.min(99, asset.healthScore + 8),
            serviceHistory: [
              {
                id: `HIST-${Math.floor(100 + Math.random() * 900)}`,
                date: 'Today',
                technicianName: tech ? tech.name : 'Certified Technician',
                type: reportData.rootCause ? reportData.rootCause.slice(0, 30) : 'Corrective Repair',
                diagnosis: reportData.actionTaken || 'System fault diagnosed and rectified',
                partsReplaced: reportData.partsReplaced || 'Serviced',
                status: 'Completed',
                rating: 5
              },
              ...asset.serviceHistory
            ]
          };
        }
        return asset;
      }));
    }

    showToast(`Ticket #${ticketId} marked as Resolved! Service report saved.`);
  };

  const submitTrainingApplication = (appData) => {
    const randomId = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      id: randomId,
      fullName: appData.fullName,
      phone: appData.phone,
      age: appData.age,
      cluster: appData.cluster,
      village: appData.village,
      education: appData.education,
      shgGroup: appData.shgGroup || 'Independent Rural Applicant',
      hasTwoWheeler: appData.hasTwoWheeler,
      appliedAt: new Date().toISOString(),
      status: 'Application Received'
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Urja Sakhi application submitted! Application ID: ${randomId}`);
    return newApp;
  };

  const resetToSampleData = () => {
    setTickets(INITIAL_TICKETS);
    setTechnicians(INITIAL_TECHNICIANS);
    setSolarAssets(INITIAL_SOLAR_ASSETS);
    localStorage.clear();
    showToast('Platform data reset to initial Belgaum sample state.', 'info');
  };

  const currentTechnician = technicians.find(t => t.id === currentTechId) || technicians[0];

  return (
    <DataContext.Provider
      value={{
        tickets,
        technicians,
        solarAssets,
        applications,
        clusters: BELGAUM_CLUSTERS,
        systemTypes: SYSTEM_TYPES,
        issueCategories: ISSUE_CATEGORIES,
        currentTechId,
        setCurrentTechId,
        currentTechnician,
        createTicket,
        assignTicket,
        updateTicketStatus,
        resolveTicket,
        submitTrainingApplication,
        resetToSampleData,
        toast,
        showToast
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
