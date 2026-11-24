import './Roles.css';
import SectionHead from './SectionHead';
import { CATEGORY_GLYPHS } from './glyphMap';
import { QuarterDisc, HalfDisc, Checker, Sparkle } from './Glyphs';

const ROLES = [
  {
    glyph: "backend",
    title: "Backend & Enterprise Systems",
    roleType: "Java / Python Developer",
    desc: "Tackling intricate business rules (statutory payroll, progressive tax, data versioning), designing 70+ table PostgreSQL schemas, and writing hundreds of unit tests to ensure high data integrity.",
    skills: ["Java 17", "Spring Boot 3", "PostgreSQL", "FastAPI", "RESTful APIs", "Clean Architecture"]
  },
  {
    glyph: "frontend",
    title: "Full-stack Web & Mobile",
    roleType: "Full-stack Engineer",
    desc: "Connecting robust back-end APIs with intuitive React & Ant Design web interfaces and React Native (Expo) mobile apps. Shipping end-to-end features from schema to UI.",
    skills: ["React", "TypeScript", "Ant Design", "React Native (Expo)", "HTML5/CSS3"]
  },
  {
    glyph: "ai",
    title: "AI Integration & Practical LLMs",
    roleType: "AI Solutions & Modern Dev",
    desc: "Building pragmatic AI pipelines: local ONNX models for face verification (~0.3s), OCR document processors, Gemini-powered deduplication (Top 50 AI Riser), and daily use of AI coding agents.",
    skills: ["Gemini API", "FastAPI", "InsightFace (ONNX)", "PaddleOCR / VietOCR", "Claude Code & AGY"]
  },
  {
    glyph: "qa",
    title: "Software QA & System Testing",
    roleType: "QA Engineer / ERP Tester",
    desc: "Analytical, detail-oriented testing: analyzing SRS specs, designing boundary test cases, executing API suites in Postman, verifying SQL state changes, and tracing Jira bugs to their root causes.",
    skills: ["Test Case Design", "JUnit 5 & Mockito", "Postman", "Jira", "SQL Auditing"]
  },
  {
    glyph: "languages",
    title: "Global & Bilingual Collaboration",
    roleType: "International Teams",
    desc: "Comfortable communicating in English (IELTS 6.5, exempted from preparatory English year) and Korean (TOPIK II Level 3). Ready for international standups, specs reading, and cross-border teamwork.",
    skills: ["English IELTS 6.5", "Korean TOPIK II Lv 3", "Technical Writing", "Cross-cultural"]
  }
];

const Roles = () => {
  return (
    <section className="roles-section" id="roles">
      <div className="deco-layer" aria-hidden="true">
        <QuarterDisc size={190} color="var(--red)" className="roles-deco-quarter" />
      </div>

      <div className="container">
        <SectionHead index="03" title="Roles I'm excited to take on" meta={`${ROLES.length} roles · open`}>
          While my foundations are rooted in scalable software engineering,
          I'm versatile, curious, and <span className="highlight-text">ready to deliver value across multiple disciplines</span>.
        </SectionHead>

        <div className="roles-grid">
          {ROLES.map((role, idx) => {
            const { Glyph, color } = CATEGORY_GLYPHS[role.glyph];
            return (
              <article key={role.title} className="role-card" style={{ '--role-color': color }}>
                <div className="role-card-top">
                  <span className="label role-code">R/{String(idx + 1).padStart(2, '0')}</span>
                  <span className="role-badge">{role.roleType}</span>
                </div>
                <Glyph size={34} color={color} className="role-icon" />
                <h3 className="role-card-title">{role.title}</h3>
                <p className="role-card-desc">{role.desc}</p>
                <ul className="role-skills">
                  {role.skills.map((skill) => (
                    <li key={skill} className="role-skill-pill">{skill}</li>
                  ))}
                </ul>
              </article>
            );
          })}

          {/* Ô thứ 6 lấp lưới bằng một bố cục hình khối của poster */}
          <div className="role-card role-card--composition">
            <HalfDisc size={120} color="var(--blue)" className="comp-half" />
            <QuarterDisc size={92} color="var(--orange)" rotate={180} className="comp-quarter" />
            <Checker size={46} color="var(--ink)" className="comp-checker" />
            <Sparkle size={18} color="var(--red)" className="comp-sparkle" />
            <p className="label comp-label">
              <span className="comp-code">R/06</span>
              …or any role where I can build things that actually work
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roles;
