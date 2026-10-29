import React from 'react';
import './About.css';
import natureImg from '../assets/natureAbout.avif';
import humanImg from '../assets/humanAbout.png';
import catImg from '../assets/catAbout.avif';
import resumePdf from '../assets/resume.pdf';

const About = () => {
  return (
    <div className="about-wrapper">
      <section className="about-section" id="about">
        {/* 3D Grid background */}
        <div className="about-grid-bg"></div>
          <div className="about-content">
          <h2 className="about-title">SOMETHING ABOUT ME</h2>
        <div className="about-desc">
  <p>
    I'm a Software Engineering graduate from FPT University, looking for a fresher Java backend role. The part I enjoy most is the translating: taking a messy real-world rule and turning it into something a machine gets right every single time.
  </p>
  <p>
    Most of what I know came from building, not reading. On my HRM capstone I owned the payroll and contract modules, and tested them too, which taught me more about Spring Boot, PostgreSQL and Docker than any tutorial ever did. Alongside that, I've completed 8+ months of Java Web training at FPT Software Academy. IELTS 6.5, so English standups don't scare me.
  </p>
</div>

          <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="resume-btn">
            <svg className="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            My Resume
          </a>
        </div>

        <div className="about-images">
          <div className="image-wrapper img-left">
            <div className="tooltip">Love Nature</div>
            <img src={natureImg} alt="Nature" className="about-img" />
          </div>
          <div className="image-wrapper img-center">
            <div className="tooltip">Hi, it's me :)</div>
            <img src={humanImg} alt="Human" className="about-img" />
          </div>
          <div className="image-wrapper img-right">
            <div className="tooltip">A cat person</div>
            <img src={catImg} alt="Cat" className="about-img" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
