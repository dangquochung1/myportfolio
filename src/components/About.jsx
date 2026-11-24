import './About.css';
import SectionHead from './SectionHead';
import { HalfDisc, Block, CatGlyph } from './Glyphs';
import natureImg from '../assets/natureAbout.avif';
import humanImg from '../assets/humanAbout.webp';
import catImg from '../assets/catAbout.avif';

// Bù phần thông tin mà nút Resume trước đây cung cấp (mới nhất lên đầu)
const TIMELINE = [
  { when: '09/2026 — now', what: 'KAGEBI', note: 'Pixel-art roguelite, in development' },
  { when: '08 — 09/2026', what: 'Duyên', note: 'Top 50 AI Riser Vietnam 2026, solo' },
  { when: '04 — 09/2026', what: 'HRM System for THT Solution', note: 'Capstone, backend developer, team of 5' },
  { when: '2026', what: 'TOPIK II Level 3', note: 'Korean' },
  { when: '05 — 08/2025', what: 'FPT Software', note: 'On-the-Job Training: Java Web (MySQL, Servlet, Hibernate)' },
  { when: '2023 — 2024', what: 'FTIC', note: "FPT University's traditional music club, performed at campus shows" },
  { when: '2023', what: 'IELTS Academic 6.5', note: 'Exempted from the 1-year English preparatory program' },
  { when: '09/2023 — 09/2026', what: 'FPT University, Hanoi', note: 'B.Sc. Software Engineering, 30% tuition scholarship' },
];

const About = () => {
  return (
    <div className="about-wrapper">
      <section className="about-section" id="about">
        {/* 3D Grid background */}
        <div className="about-grid-bg" aria-hidden="true"></div>
        <div className="deco-layer" aria-hidden="true">
          <HalfDisc size={200} color="var(--blue)" rotate={180} className="about-deco-half" />
          <Block size={64} color="var(--orange)" className="about-deco-block" />
        </div>

        <div className="about-content">
          <SectionHead
            index="04"
            title="Something about me"
            meta="About · Index"
            className="section-head--dark"
            glyph={<CatGlyph size={46} color="var(--orange)" eye="var(--ink)" />}
          />

          <div className="about-columns">
            <div className="about-desc">
              <p>
                I'm a Software Engineering graduate from FPT University. The part I enjoy most is the translating: taking a messy real-world rule — payroll tax brackets, insurance caps, contract versioning — and turning it into something a machine gets right every single time.
              </p>
              <p>
                Most of what I know came from building, not reading. On my HRM capstone I owned the payroll and contract modules (79-table schema, ~110 endpoints, ~440 tests), built two Python AI microservices (face check-in at ~0.3 s, contract OCR cut from 83 s to 28 s), and set up the Docker stack for the team. For AI Riser Vietnam 2026 I built Duyên solo — a TypeScript + Gemini app that deduplicates event data and schedules 288 conflict-free meetings in 63 ms. I use AI coding agents (Claude Code, Google Antigravity) daily and always check their work with tests and review. Lately I've been building KAGEBI, a pixel-art roguelite in Java + libGDX — still loading.
              </p>
              <p>
                Outside of code, I played traditional Vietnamese instruments in FTIC (the university's folk music club) and performed at campus shows. I'm a cat person who loves nature, speak English comfortably (IELTS 6.5), and I'm learning Korean (TOPIK II Level 3). I'm open to backend, full-stack, AI integration, QA or any role where I can build things that actually work.
              </p>
            </div>

            <aside className="about-index" aria-labelledby="about-index-title">
              <h3 id="about-index-title" className="label about-index__title">Index · 2023 — now</h3>
              <ol className="timeline">
                {TIMELINE.map((item) => (
                  <li key={item.what} className="timeline__row">
                    <span className="timeline__when">{item.when}</span>
                    <span className="timeline__what">{item.what}</span>
                    <span className="timeline__note">{item.note}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>

        <div className="about-images">
          <div className="image-wrapper img-left">
            <div className="tooltip">Love Nature</div>
            <img src={natureImg} alt="Nature" className="about-img" loading="lazy" decoding="async" />
          </div>
          <div className="image-wrapper img-center">
            <div className="tooltip">Hi, it's me :)</div>
            <img src={humanImg} alt="Human" className="about-img" loading="lazy" decoding="async" />
          </div>
          <div className="image-wrapper img-right">
            <div className="tooltip">A cat person</div>
            <img src={catImg} alt="Cat" className="about-img" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
