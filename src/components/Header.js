import React from 'react';
import './Header.css';
import headerLogo from '../assets/logos/header_title.png';

const Header = () => {
  return (
    <header className="header">
      <img src={headerLogo} alt="Alifi" className="logo" />
    </header>
  );
};

export default Header;
