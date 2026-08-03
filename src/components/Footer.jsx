import React from 'react';
import './Footer.css';
import signatureImg from '../assets/signature.png';
import multiImg from '../assets/multi.png';

const socials = [
  {
    label: 'LINKEDIN',
    // Slug có dấu tiếng Việt nên encode sẵn để mọi trình duyệt đều mở đúng
    href: 'https://www.linkedin.com/in/h%C6%B0ng-%C4%91%E1%BA%B7ng-791251244',
    external: true
  },
  // Hai tài khoản này chưa public -> dẫn sang trang "private-life" cho vui
  { label: 'INSTAGRAM', href: '/private-life.html?from=instagram' },
  { label: 'FACEBOOK', href: '/private-life.html?from=facebook' }
];

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
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-btn"
                  {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="social-bg"></span>
                  <span className="social-text">
                    <span className="text-label">{social.label}</span>
                    <span className="arrow-wrapper"><span>↗</span></span>
                  </span>
                </a>
              ))}
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
