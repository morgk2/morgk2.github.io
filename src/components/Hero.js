import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import mainLogo from '../assets/logos/logo_cropped.png';
import quoteImage from '../assets/images/Because..png';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="left-text">
          <img src={quoteImage} alt="Because every tail, paw, and soul deserves comfort" className="quote-image" />
        </div>
        
        <div className="center-logo">
          <div className="logo-container">
            <img src={mainLogo} alt="Alifi Logo" className="main-logo" />
            <button 
              className="login-button"
              onClick={() => window.open('https://alifiapp.netlify.app', '_blank')}
            >
              Login to your account
            </button>
          </div>
        </div>
        
        <div className="right-text">
          {/* Navigation buttons removed but space preserved */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
