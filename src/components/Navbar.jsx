import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Chỉ hiện menu khi ở đầu trang (cuộn chưa quá 50px)
      if (currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isVisible ? '' : 'navbar-hidden'}`}>
      <div className="navbar-logo">
        <img src={logoImg} alt="hungface" className="navbar-avatar" />
      </div>
      <ul className="navbar-links">
        <li><a href="#work" className="menu-item">work</a></li>
        <li><a href="#about" className="menu-item">about</a></li>
        <li><a href="#connect" className="menu-item">connect</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
