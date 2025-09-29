import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import mainLogo from '../assets/logos/logo_cropped.png';
import headerLogo from '../assets/logos/header_title.png';
import alifiOrangeLogo from '../assets/logos/alifiorange.jpeg';
import googlePlayButton from '../assets/logos/google-play-button.317b0f82.svg';
import appStoreButton from '../assets/logos/button-app@2x.eb284c14.svg';
import featuresImage from '../assets/images/features.jpg';
import featuresPhoneImage from '../assets/images/featuresphone.jpg';
import adoptionImage from '../assets/images/adoption.jpg';
import mapImage from '../assets/images/map.jpg';
import petprofilesImage from '../assets/images/petprofiles.jpg';
import storeImage from '../assets/images/store.jpg';
import vetImage from '../assets/images/vet.jpg';
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
  const [showFourthText, setShowFourthText] = useState(false);
  const [fourthTextOpacity, setFourthTextOpacity] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [carouselOpacity, setCarouselOpacity] = useState(0);
  const [carouselScroll, setCarouselScroll] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragCurrent, setDragCurrent] = useState(0);
  const [isCarouselActive, setIsCarouselActive] = useState(false);
  const [carouselVerticalPosition, setCarouselVerticalPosition] = useState(0);
  const [showLogoButtons, setShowLogoButtons] = useState(false);
  const [logoButtonsOpacity, setLogoButtonsOpacity] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [footerOpacity, setFooterOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [featuresImageLoaded, setFeaturesImageLoaded] = useState(false);

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

  const handleLinkClick = (href) => {
    setIsMenuOpen(false);
    setShouldShowMenu(false);
    
    if (href === '/features') {
      // Scroll to carousel section - move further down to account for fade-in animation
      const viewportHeight = window.innerHeight;
      const carouselPeak = viewportHeight * 5.0; // Peak opacity point where carousel is fully visible
      window.scrollTo({
        top: carouselPeak,
        behavior: 'smooth'
      });
      return true; // Prevent default navigation
    }
    
    if (href === '/') {
      // Scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return true; // Prevent default navigation
    }
    
    if (href === '/download') {
      // Scroll to download buttons section
      const viewportHeight = window.innerHeight;
      const downloadSection = viewportHeight * 5.5; // Where logo/buttons appear
      window.scrollTo({
        top: downloadSection,
        behavior: 'smooth'
      });
      return true; // Prevent default navigation
    }
    
    return false; // Allow default navigation for other links
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowDownloadDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDownloadDialog(false);
  };


  const scrollCarousel = (direction) => {
    const scrollAmount = 320; // Width of carousel item + gap
    const maxScroll = -960; // 3 items * 320px (5 items total, so 3 scrolls to show last item properly)
    
    if (direction === 'left') {
      const newScroll = Math.min(0, carouselScroll + scrollAmount);
      setCarouselScroll(newScroll);
    } else {
      const newScroll = Math.max(maxScroll, carouselScroll - scrollAmount);
      setCarouselScroll(newScroll);
    }
  };

  const updateCarouselArrows = () => {
    setCanScrollLeft(carouselScroll < 0);
    setCanScrollRight(carouselScroll > -960);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    setDragStart(clientX);
    setDragCurrent(clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    setDragCurrent(clientX);
    
    const dragDistance = clientX - dragStart;
    const sensitivity = 0.5; // Reduce sensitivity
    const newScroll = carouselScroll + (dragDistance * sensitivity);
    const maxScroll = -260;
    
    // Update scroll position during drag
    setCarouselScroll(Math.max(maxScroll, Math.min(0, newScroll)));
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const dragDistance = dragCurrent - dragStart;
    const sensitivity = 0.5; // Same sensitivity as drag move
    const adjustedDistance = dragDistance * sensitivity;
    const scrollAmount = 320; // Width of carousel item + gap
    
    // Snap to nearest item with adjusted threshold
    if (Math.abs(adjustedDistance) > 30) {
      if (adjustedDistance > 0) {
        // Dragged right, go to previous item
        scrollCarousel('left');
      } else {
        // Dragged left, go to next item
        scrollCarousel('right');
      }
    }
    
    setDragStart(0);
    setDragCurrent(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the viewport height (white background area)
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // When scrolled past the background image (100vh), we're over white background
      setIsOverWhite(scrollY > viewportHeight * 0.8);
      
      // Preload features image when we're halfway to the features section
      const featuresStart = viewportHeight * 3.2;
      const preloadTrigger = featuresStart * 0.5; // Start preloading at 50% of the way to features
      
      if (scrollY >= preloadTrigger && !featuresImageLoaded) {
        setFeaturesImageLoaded(true);
      }
      
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
      
      // Fourth text animation (appears after third text fades out)
      const fourthTextStart = viewportHeight * 3.2; // Start after third text ends
      const fourthTextPeak = viewportHeight * 3.5; // Peak opacity at this point
      const fourthTextEnd = viewportHeight * 4.5; // Text disappears at this point (extended)
      
      if (scrollY >= fourthTextStart && scrollY <= fourthTextEnd) {
        setShowFourthText(true);
        
        let opacity = 0;
        if (scrollY <= fourthTextPeak) {
          // Fade in phase: from fourthTextStart to fourthTextPeak
          const fadeInProgress = (scrollY - fourthTextStart) / (fourthTextPeak - fourthTextStart);
          opacity = fadeInProgress;
        } else {
          // Fade out phase: from fourthTextPeak to fourthTextEnd (extended range)
          const fadeOutProgress = (scrollY - fourthTextPeak) / (fourthTextEnd - fourthTextPeak);
          opacity = 1 - fadeOutProgress;
        }
        
        setFourthTextOpacity(Math.max(0, Math.min(1, opacity)));
      } else {
        setShowFourthText(false);
        setFourthTextOpacity(0);
      }
      
      // Carousel animation (appears after fourth text fades out)
      const carouselStart = viewportHeight * 4.6; // Start after fourth text ends
      const carouselPeak = viewportHeight * 5.0; // Peak opacity at this point
      const carouselEnd = viewportHeight * 5.5; // Carousel stays visible
      
      if (scrollY >= carouselStart && scrollY <= carouselEnd) {
        setShowCarousel(true);
        setIsCarouselActive(true);
        
        let opacity = 0;
        if (scrollY <= carouselPeak) {
          // Fade in phase: from carouselStart to carouselPeak
          const fadeInProgress = (scrollY - carouselStart) / (carouselPeak - carouselStart);
          opacity = fadeInProgress;
        } else {
          // Fade out phase: from carouselPeak to carouselEnd
          const fadeOutProgress = (scrollY - carouselPeak) / (carouselEnd - carouselPeak);
          opacity = 1 - fadeOutProgress;
        }
        
        setCarouselOpacity(Math.max(0, Math.min(1, opacity)));
        
        // Calculate vertical position based on scroll
        const verticalRange = carouselEnd - carouselPeak;
        const verticalProgress = Math.max(0, (scrollY - carouselPeak) / verticalRange);
        const maxVerticalMove = 600; // Increased to move carousel further up
        setCarouselVerticalPosition(-verticalProgress * maxVerticalMove);
        
      } else if (scrollY > carouselEnd) {
        // Hide carousel after end point
        setShowCarousel(false);
        setCarouselOpacity(0);
        setIsCarouselActive(false);
        setCarouselVerticalPosition(-600); // Fully moved up
        
        // Keep logo/buttons visible
        setShowLogoButtons(true);
        setLogoButtonsOpacity(1);
      } else {
        setShowCarousel(false);
        setCarouselOpacity(0);
        setIsCarouselActive(false);
        setCarouselVerticalPosition(0);
        setShowLogoButtons(false);
        setLogoButtonsOpacity(0);
      }
      
      // Logo/buttons animation (appears when carousel starts fading out)
      const logoButtonsStart = viewportHeight * 5.2; // Start when carousel begins fading out
      const logoButtonsPeak = viewportHeight * 5.5; // Peak opacity
      
      if (scrollY >= logoButtonsStart) {
        setShowLogoButtons(true);
        let logoOpacity = 0;
        if (scrollY <= logoButtonsPeak) {
          const fadeInProgress = (scrollY - logoButtonsStart) / (logoButtonsPeak - logoButtonsStart);
          logoOpacity = fadeInProgress;
        } else {
          logoOpacity = 1; // Stay visible after peak
        }
        setLogoButtonsOpacity(Math.max(0, Math.min(1, logoOpacity)));
      } else {
        setShowLogoButtons(false);
        setLogoButtonsOpacity(0);
      }
      
      // Footer animation (appears at the same time as logo/buttons)
      const footerStart = viewportHeight * 5.2; // Same as logo/buttons
      const footerPeak = viewportHeight * 5.5; // Same as logo/buttons
      
      if (scrollY >= footerStart) {
        setShowFooter(true);
        let footerOpacityValue = 0;
        if (scrollY <= footerPeak) {
          const fadeInProgress = (scrollY - footerStart) / (footerPeak - footerStart);
          footerOpacityValue = fadeInProgress;
        } else {
          footerOpacityValue = 1; // Stay visible after peak
        }
        setFooterOpacity(Math.max(0, Math.min(1, footerOpacityValue)));
      } else {
        setShowFooter(false);
        setFooterOpacity(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    updateCarouselArrows();
  }, [carouselScroll]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, dragStart, dragCurrent]);

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
      label: 'Download',
      href: '/download',
      ariaLabel: 'Download',
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
          onLinkClick={handleLinkClick}
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
      
      {/* Hidden preload image */}
      {featuresImageLoaded && (
        <img 
          src={isMobile ? featuresPhoneImage : featuresImage} 
          alt="" 
          style={{ 
            position: 'absolute', 
            left: '-9999px', 
            top: '-9999px', 
            width: '1px', 
            height: '1px',
            opacity: 0,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Fourth Scroll Text */}
      {showFourthText && (
        <>
          <div 
            className="scroll-text features-text"
            style={{ opacity: fourthTextOpacity }}
          >
            <div style={{ fontWeight: '700', marginBottom: '1rem' }}>With alifi, you can:</div>
            <div style={{ fontWeight: '400' }}>
              <div>• Vet booking</div>
              <div>• Reminders: feeding, walks, meds, grooming</div>
              <div>• Interactive Map & local finder</div>
              <div>• Trusted services with groomers, walkers, trainers</div>
              <div>• Marketplace buy food, meds, toys</div>
              <div>• Community & support, ask other users, share tips</div>
            </div>
          </div>
          <img 
            src={isMobile ? featuresPhoneImage : featuresImage} 
            alt="Alifi Features" 
            className="features-image"
            style={{ opacity: fourthTextOpacity }}
            onLoad={() => setFeaturesImageLoaded(true)}
          />
        </>
      )}
      
      {/* Carousel */}
      {showCarousel && (
        <div 
          className="carousel-container"
          style={{ 
            opacity: carouselOpacity,
            transform: `translate(-50%, calc(-50% + ${carouselVerticalPosition}px))`
          }}
        >
          <div className="carousel-title">Explore Our Features</div>
          <div className="carousel-navigation">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button 
                className="carousel-arrow carousel-arrow-left"
                onClick={() => scrollCarousel('left')}
              >
                ‹
              </button>
            )}
            
            <div className="carousel-wrapper">
              <div 
                className="carousel-track" 
                style={{ transform: `translateX(${carouselScroll}px)` }}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
              >
                <div className="carousel-item">
                  <img src={adoptionImage} alt="Adoption Center" />
                  <div className="carousel-label">Adoption Center</div>
                </div>
                <div className="carousel-item">
                  <img src={mapImage} alt="Interactive Map" />
                  <div className="carousel-label">Interactive Map</div>
                </div>
                <div className="carousel-item">
                  <img src={petprofilesImage} alt="Pet Profiles" />
                  <div className="carousel-label">Pet Profiles</div>
                </div>
                <div className="carousel-item">
                  <img src={storeImage} alt="Marketplace" />
                  <div className="carousel-label">Marketplace</div>
                </div>
                <div className="carousel-item">
                  <img src={vetImage} alt="Vet Booking" />
                  <div className="carousel-label">Vet Booking</div>
                </div>
              </div>
            </div>
            
            {/* Right Arrow */}
            {canScrollRight && (
              <button 
                className="carousel-arrow carousel-arrow-right"
                onClick={() => scrollCarousel('right')}
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Logo and App Store Buttons */}
      {showLogoButtons && (
        <div 
          className="logo-buttons-container"
          style={{ 
            opacity: logoButtonsOpacity,
            transform: `translate(-50%, calc(-50% + ${carouselVerticalPosition + 600}px))`
          }}
        >
          <img src={alifiOrangeLogo} alt="Alifi" className="alifi-orange-logo" />
          <div className="app-buttons">
            <img 
              src={googlePlayButton} 
              alt="Get it on Google Play" 
              className="app-button" 
              onClick={handleDownloadClick}
            />
            <img 
              src={appStoreButton} 
              alt="Download on the App Store" 
              className="app-button" 
              onClick={handleDownloadClick}
            />
          </div>
        </div>
      )}
      
      {/* Footer */}
      {showFooter && (
        <footer 
          className="footer"
          style={{ opacity: footerOpacity }}
        >
        <div className="footer-content">
          <div className="footer-text">
            Copyright © 2025 Alifi All rights reserved.
          </div>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Use</Link>
            <Link to="/account-deletion" className="footer-link">
              Request Account Deletion
            </Link>
          </div>
        </div>
      </footer>
      )}
      
      {/* Download Dialog */}
      {showDownloadDialog && (
        <div className="download-dialog-overlay" onClick={handleCloseDialog}>
          <div className="download-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="download-dialog-content">
              <h3>App Coming Soon!</h3>
              <p>The app is still in development. Thank you for your interest!</p>
              <button className="download-dialog-button" onClick={handleCloseDialog}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Header;
