import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/" className="nav-button">
              <span className="nav-link">App</span>
              <span className="nav-link">features</span>
            </Link>
            <Link to="/terms" className="nav-button">
              <span className="nav-link">Terms of</span>
              <span className="nav-link">use</span>
            </Link>
            <Link to="/privacy" className="nav-button">
              <span className="nav-link">Privacy</span>
              <span className="nav-link">Policy</span>
            </Link>
            <Link to="/" className="nav-button">
              <span className="nav-link">FAQ</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Hero;
