import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import sleepingCat from '../assets/images/Gemini_Generated_Image_7d8rhk7d8rhk7d8r.png';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <img src={sleepingCat} alt="Sleeping Cat" className="sleeping-cat" />
          <h1>404</h1>
          <h2>Oops! Page Not Found</h2>
          <p>It looks like this page is taking a cat nap. The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="back-home-button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
