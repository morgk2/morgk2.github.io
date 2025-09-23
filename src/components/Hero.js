import React from 'react';
import './Hero.css';
import mainLogo from '../assets/logos/logo_cropped.png';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="left-text">
          <h2 className="hero-title">
            Taking<br />
            care of<br />
            your pets<br />
            should<br />
            be as<br />
            easy as<br />
            loving<br />
            them
          </h2>
        </div>
        
        <div className="center-logo">
          <div className="logo-container">
            <img src={mainLogo} alt="Alifi Logo" className="main-logo" />
          </div>
        </div>
        
        <div className="right-text">
          <nav className="navigation-links">
            <a href="#features" className="nav-button">
              <span className="nav-link">App</span>
              <span className="nav-link">features</span>
            </a>
            <a href="#terms" className="nav-button">
              <span className="nav-link">Terms of</span>
              <span className="nav-link">use</span>
            </a>
            <a href="#privacy" className="nav-button">
              <span className="nav-link">Privacy</span>
              <span className="nav-link">Policy</span>
            </a>
            <a href="#faq" className="nav-button">
              <span className="nav-link">FAQ</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Hero;
