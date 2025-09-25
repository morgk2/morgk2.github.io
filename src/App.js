import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AppFeatures from './pages/AppFeatures';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';

function AppContent() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  
  return (
    <div className={`App ${isHomepage ? 'homepage' : ''}`}>
      <div className="content-layer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<AppFeatures />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
