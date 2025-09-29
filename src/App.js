import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AppFeatures from './pages/AppFeatures';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AccountDeletion from './pages/AccountDeletion';
import NotFound from './pages/NotFound';

// Import background images
import landingPageImage from './assets/images/landingpage.jpeg';
import landingImage from './assets/images/landing.jpeg';

function AppContent() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isAccountDeletion = location.pathname === '/account-deletion';
  const [backgroundImagesLoaded, setBackgroundImagesLoaded] = useState(false);
  
  // Preload background images
  useEffect(() => {
    const preloadImages = () => {
      const images = [landingPageImage, landingImage];
      let loadedCount = 0;
      
      images.forEach((imageSrc) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setBackgroundImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setBackgroundImagesLoaded(true);
          }
        };
        img.src = imageSrc;
      });
    };
    
    preloadImages();
  }, []);
  
  // Render account deletion page standalone
  if (isAccountDeletion) {
    return <AccountDeletion />;
  }
  
  return (
    <>
      {/* Loading indicator */}
      {isHomepage && !backgroundImagesLoaded && (
        <div className="background-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <div className={`App ${isHomepage ? 'homepage' : ''} ${backgroundImagesLoaded ? 'images-loaded' : ''}`}>
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
    </>
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
