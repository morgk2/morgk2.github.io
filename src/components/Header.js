import React, { useState, useEffect } from 'react';
import './Header.css';
import mainLogo from '../assets/logos/logo_cropped.png';
import headerLogo from '../assets/logos/header_title.png';
import GlassSurface from './GlassSurface';
import BubbleMenu from './BubbleMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldShowMenu, setShouldShowMenu] = useState(false);
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [showScrollText, setShowScrollText] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);
  const [showSecondText, setShowSecondText] = useState(false);
  const [secondTextOpacity, setSecondTextOpacity] = useState(0);
  const [showThirdText, setShowThirdText] = useState(false);
  const [thirdTextOpacity, setThirdTextOpacity] = useState(0);

  const handleMenuClick = (isOpen) => {
    if (isOpen) {
      setIsMenuOpen(true);
      setShouldShowMenu(true);
    } else {
      setIsMenuOpen(false);
      // Don't immediately hide, let the animation complete
    }
  };

  const handleHamburgerClick = () => {
    if (!isMenuOpen) {
      // Opening the menu
      setIsMenuOpen(true);
      setShouldShowMenu(true);
    } else {
      // Closing the menu
      setIsMenuOpen(false);
      // Don't immediately hide, let the animation complete
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setShouldShowMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the viewport height (white background area)
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // When scrolled past the background image (100vh), we're over white background
      setIsOverWhite(scrollY > viewportHeight * 0.8);
      
      // First text animation based on scroll position
      const whiteStart = viewportHeight * 0.8;
      const textPeak = viewportHeight * 1.1; // Peak opacity at this point
      const textEnd = viewportHeight * 1.4; // Text disappears at this point
      
      if (scrollY >= whiteStart && scrollY <= textEnd) {
        setShowScrollText(true);
        
        let opacity = 0;
        if (scrollY <= textPeak) {
          // Fade in phase: from whiteStart to textPeak
          const fadeInProgress = (scrollY - whiteStart) / (textPeak - whiteStart);
          opacity = fadeInProgress;
        } else {
          // Fade out phase: from textPeak to textEnd
          const fadeOutProgress = (scrollY - textPeak) / (textEnd - textPeak);
          opacity = 1 - fadeOutProgress;
        }
        
        setTextOpacity(Math.max(0, Math.min(1, opacity)));
      } else {
        setShowScrollText(false);
        setTextOpacity(0);
      }
      
      // Second text animation (appears after first text fades out)
      const secondTextStart = viewportHeight * 1.6; // Start after first text ends
      const secondTextPeak = viewportHeight * 1.9; // Peak opacity at this point
      const secondTextEnd = viewportHeight * 2.2; // Text disappears at this point
      
      if (scrollY >= secondTextStart && scrollY <= secondTextEnd) {
        setShowSecondText(true);
        
        let opacity = 0;
        if (scrollY <= secondTextPeak) {
          // Fade in phase: from secondTextStart to secondTextPeak
          const fadeInProgress = (scrollY - secondTextStart) / (secondTextPeak - secondTextStart);
          opacity = fadeInProgress;
        } else {
          // Fade out phase: from secondTextPeak to secondTextEnd
          const fadeOutProgress = (scrollY - secondTextPeak) / (secondTextEnd - secondTextPeak);
          opacity = 1 - fadeOutProgress;
        }
        
        setSecondTextOpacity(Math.max(0, Math.min(1, opacity)));
      } else {
        setShowSecondText(false);
        setSecondTextOpacity(0);
      }
      
      // Third text animation (appears after second text fades out)
      const thirdTextStart = viewportHeight * 2.4; // Start after second text ends
      const thirdTextPeak = viewportHeight * 2.7; // Peak opacity at this point
      const thirdTextEnd = viewportHeight * 3.0; // Text disappears at this point
      
      if (scrollY >= thirdTextStart && scrollY <= thirdTextEnd) {
        setShowThirdText(true);
        
        let opacity = 0;
        if (scrollY <= thirdTextPeak) {
          // Fade in phase: from thirdTextStart to thirdTextPeak
          const fadeInProgress = (scrollY - thirdTextStart) / (thirdTextPeak - thirdTextStart);
          opacity = fadeInProgress;
        } else {
          // Fade out phase: from thirdTextPeak to thirdTextEnd
          const fadeOutProgress = (scrollY - thirdTextPeak) / (thirdTextEnd - thirdTextPeak);
          opacity = 1 - fadeOutProgress;
        }
        
        setThirdTextOpacity(Math.max(0, Math.min(1, opacity)));
      } else {
        setShowThirdText(false);
        setThirdTextOpacity(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    {
      label: 'Home',
      href: '/',
      ariaLabel: 'Home',
      rotation: -8,
      hoverStyles: { bgColor: '#e69e02', textColor: '#ffffff' }
    },
    {
      label: 'App Features',
      href: '/features',
      ariaLabel: 'App Features',
      rotation: 8,
      hoverStyles: { bgColor: '#e69e02', textColor: '#ffffff' }
    },
    {
      label: 'Terms of Use',
      href: '/terms',
      ariaLabel: 'Terms of Use',
      rotation: 8,
      hoverStyles: { bgColor: '#e69e02', textColor: '#ffffff' }
    },
    {
      label: 'Privacy Policy',
      href: '/privacy',
      ariaLabel: 'Privacy Policy',
      rotation: 8,
      hoverStyles: { bgColor: '#e69e02', textColor: '#ffffff' }
    },
    {
      label: 'FAQ',
      href: '/',
      ariaLabel: 'FAQ',
      rotation: -8,
      hoverStyles: { bgColor: '#e69e02', textColor: '#ffffff' }
    }
  ];

  return (
    <>
      <header className={`header ${isOverWhite ? 'over-white' : ''}`}>
        <GlassSurface 
          width="100%"
          height={60}
          borderRadius={30}
          displace={2}
          distortionScale={-120}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          brightness={50}
          opacity={0.93}
          blur={11}
          borderWidth={0.06}
          saturation={1}
          backgroundOpacity={0.1}
          mixBlendMode="screen"
          className="header-glass"
        >
          <img src={mainLogo} alt="Alifi" className="logo" />
          <img src={headerLogo} alt="Alifi" className="header-logo" />
          <button 
            className={`hamburger-button ${isMenuOpen ? 'open' : ''}`}
            onClick={handleHamburgerClick}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </GlassSurface>
      </header>
      
      {shouldShowMenu && (
        <BubbleMenu
          logo={<span style={{ fontWeight: 700 }}>Alifi</span>}
          items={menuItems}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
          onMenuClick={handleMenuClick}
          isMenuOpen={isMenuOpen}
          onAnimationComplete={() => setShouldShowMenu(false)}
        />
      )}
      
      {/* First Scroll Text */}
      {showScrollText && (
        <div 
          className="scroll-text"
          style={{ opacity: textOpacity }}
        >
          Pet care should be as easy as loving them
        </div>
      )}
      
      {/* Second Scroll Text */}
      {showSecondText && (
        <div 
          className="scroll-text"
          style={{ opacity: secondTextOpacity }}
        >
          And this is why we created Alifi.
        </div>
      )}
      
      {/* Third Scroll Text */}
      {showThirdText && (
        <div 
          className="scroll-text"
          style={{ opacity: thirdTextOpacity }}
        >
          an app designed specifically for your pets needs
        </div>
      )}
    </>
  );
};

export default Header;
