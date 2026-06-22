import React, { useState, useEffect } from 'react';
import './Hero.css';
import workImg from '../assets/work.png';
import cat1 from '../assets/cat1.avif';
import cat2 from '../assets/cat2.avif';
import cat3 from '../assets/cat3.avif';

const Hero = () => {
  const [showHand, setShowHand] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHand((prev) => !prev);
    }, 2000); // Đổi mỗi 2 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Phần chữ bên trái */}
        <div className="text-content">
          <p className="greeting">
            <span className="hi-badge-container">
              <span className={`hi-badge-slider ${showHand ? 'show-hand' : ''}`}>
                <span className="slide-item text-hi">Hi</span>
                <span className="slide-item icon-hand">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="waving-hand-icon">
                    {/* Motion lines fading in and out */}
                    <g className="motion-lines">
                      {/* Left lines */}
                      <path d="M 8 18 Q 4 20.5 8 23" />
                      <path d="M 5 16 Q 0 20.5 5 25" />
                      {/* Right lines */}
                      <path d="M 28 15 Q 32 17.5 28 20" />
                      <path d="M 31 13 Q 36 17.5 31 22" />
                    </g>
                    {/* The waving hand */}
                    <g className="hand-wave-group" style={{ transformOrigin: '18px 26px' }}>
                      <g transform="translate(6, 6)">
                        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0"></path>
                        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"></path>
                        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"></path>
                        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                      </g>
                    </g>
                  </svg>
                </span>
              </span>
            </span>
            there, I am <span className="highlight-text">Dang Quoc Hung</span>
          </p>
          <h1 className="title">SOFTWARE ENGINEER</h1>
          <p className="subtitle">who can <span className="highlight-text">build websites !</span></p>
        </div>

        {/* Phần ảnh bên phải */}
        <div className="image-content">
          {/* Ảnh chính (Cô gái đang vẽ) */}
          <div className="main-image-placeholder">
            <img src={workImg} alt="workImg" className="workImg" />
          </div>
        </div>

        {/* Các ảnh vẽ tay doodle xung quanh (layer nổi phía trên) */}
        <img src={cat1} alt="Mèo 1" className="floating-image cat-top-left" />
        <img src={cat2} alt="Mèo 2" className="floating-image idea-top-right" />
        <img src={cat3} alt="Mèo 3" className="floating-image cat-bottom" />
      </div>
    </section>
  );
};

export default Hero;
