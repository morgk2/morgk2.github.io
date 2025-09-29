import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AppFeatures from './pages/AppFeatures';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AccountDeletion from './pages/AccountDeletion';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isAccountDeletion = location.pathname === '/account-deletion';
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  
  useEffect(() => {
    if (isHomepage) {
      // Preload the background image
      const isMobile = window.innerWidth <= 768;
      const imageUrl = isMobile 
        ? './src/assets/images/landing.jpeg' 
        : './src/assets/images/landingpage.jpeg';
      
      const img = new Image();
      img.onload = () => {
        setBackgroundLoaded(true);
      };
      img.src = imageUrl;
    }
  }, [isHomepage]);
  
  // Render account deletion page standalone
  if (isAccountDeletion) {
    return <AccountDeletion />;
  }
  
  return (
    <div className={`App ${isHomepage ? 'homepage' : ''} ${backgroundLoaded ? 'loaded' : ''}`}>
      <div className="content-layer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<AppFeatures />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
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
