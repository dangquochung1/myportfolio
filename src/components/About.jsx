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
    I'm a Software Engineering graduate from FPT University. The part I enjoy most is the translating: taking a messy real-world rule — payroll tax brackets, insurance caps, contract versioning — and turning it into something a machine gets right every single time.
  </p>
  <p>
    Most of what I know came from building, not reading. On my HRM capstone I owned the payroll and contract modules (79-table schema, ~110 endpoints, ~440 tests), built two Python AI microservices (face check-in at ~0.3 s, contract OCR cut from 83 s to 28 s), and set up the Docker stack for the team. For AI Riser Vietnam 2026 I built Duyên solo — a TypeScript + Gemini app that deduplicates event data and schedules 288 conflict-free meetings in 63 ms. I use AI coding agents (Claude Code, Google Antigravity) daily and always check their work with tests and review.
  </p>
  <p>
    Outside of code, I played traditional Vietnamese instruments in FTIC (the university's folk music club) and performed at campus shows. I'm a cat person who loves nature, speak English comfortably (IELTS 6.5), and I'm learning Korean (TOPIK II Level 3). I'm open to backend, full-stack, AI integration, QA or any role where I can build things that actually work.
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