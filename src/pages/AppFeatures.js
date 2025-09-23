import React from 'react';
import CircularGallery from '../components/CircularGallery';
import './AppFeatures.css';

const AppFeatures = () => {
  return (
    <div className="app-features-page">
      <CircularGallery 
        bend={3} 
        textColor="#ffffff" 
        borderRadius={0.05} 
        scrollEase={0.02}
      />
    </div>
  );
};

export default AppFeatures;
