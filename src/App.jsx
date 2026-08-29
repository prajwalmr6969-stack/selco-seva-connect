import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import LandingPage from './pages/LandingPage';
import ReportIssuePage from './pages/ReportIssuePage';
import TrackTicketPage from './pages/TrackTicketPage';
import TechnicianDashboardPage from './pages/TechnicianDashboardPage';
import CoordinatorDashboardPage from './pages/CoordinatorDashboardPage';
import WomenTechnicianPage from './pages/WomenTechnicianPage';
import QRLookupPage from './pages/QRLookupPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-amber-200 selection:text-amber-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/track" element={<TrackTicketPage />} />
          <Route path="/technician" element={<TechnicianDashboardPage />} />
          <Route path="/coordinator" element={<CoordinatorDashboardPage />} />
          <Route path="/women-technicians" element={<WomenTechnicianPage />} />
          <Route path="/qr-lookup" element={<QRLookupPage />} />
          {/* Fallback route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}

export default App;
