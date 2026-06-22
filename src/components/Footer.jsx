import React from 'react';
import './Footer.css';
import signatureImg from '../assets/signature.png';
import multiImg from '../assets/multi.png';

const Footer = () => {
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" id="connect">
      <div className="footer-card">
        <div className="footer-top-section">
          <div className="footer-stamp">
            <img src={signatureImg} alt="Stamp" />
          </div>
          <div className="footer-right-content">
            <div className="footer-header">
              <h2 className="footer-title">LET'S CONNECT</h2>
              <button className="home-btn" onClick={handleHomeClick}>HOME</button>
            </div>
            
            <div className="footer-links">
              <a href="#" className="social-btn" onClick={(e) => e.preventDefault()}>
                <span className="social-bg"></span>
                <span className="social-text">
                  <span className="text-label">LINKEDIN</span>
                  <span className="arrow-wrapper"><span>↗</span></span>
                </span>
              </a>
              <a href="#" className="social-btn" onClick={(e) => e.preventDefault()}>
                <span className="social-bg"></span>
                <span className="social-text">
                  <span className="text-label">INSTAGRAM</span>
                  <span className="arrow-wrapper"><span>↗</span></span>
                </span>
              </a>
              <a href="#" className="social-btn" onClick={(e) => e.preventDefault()}>
                <span className="social-bg"></span>
                <span className="social-text">
                  <span className="text-label">BEHANCE</span>
                  <span className="arrow-wrapper"><span>↗</span></span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-illustration">
          <img src={multiImg} alt="Illustration of people" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
