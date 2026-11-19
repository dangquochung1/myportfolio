import './Roles.css';

const ROLES = [
  {
    icon: "⚙️",
    title: "Backend & Enterprise Systems",
    roleType: "Java / Python Developer",
    desc: "Tackling intricate business rules (statutory payroll, progressive tax, data versioning), designing 70+ table PostgreSQL schemas, and writing hundreds of unit tests to ensure high data integrity.",
    skills: ["Java 17", "Spring Boot 3", "PostgreSQL", "FastAPI", "RESTful APIs", "Clean Architecture"]
  },
  {
    icon: "💻",
    title: "Full-stack Web & Mobile",
    roleType: "Full-stack Engineer",
    desc: "Connecting robust back-end APIs with intuitive React & Ant Design web interfaces and React Native (Expo) mobile apps. Shipping end-to-end features from schema to UI.",
    skills: ["React", "TypeScript", "Ant Design", "React Native (Expo)", "HTML5/CSS3"]
  },
  {
    icon: "🤖",
    title: "AI Integration & Practical LLMs",
    roleType: "AI Solutions & Modern Dev",
    desc: "Building pragmatic AI pipelines: local ONNX models for face verification (~0.3s), OCR document processors, Gemini-powered deduplication (Top 50 AI Riser), and daily use of AI coding agents.",
    skills: ["Gemini API", "FastAPI", "InsightFace (ONNX)", "PaddleOCR / VietOCR", "Claude Code & AGY"]
  },
  {
    icon: "🧪",
    title: "Software QA & System Testing",
    roleType: "QA Engineer / ERP Tester",
    desc: "Analytical, detail-oriented testing: analyzing SRS specs, designing boundary test cases, executing API suites in Postman, verifying SQL state changes, and tracing Jira bugs to their root causes.",
    skills: ["Test Case Design", "JUnit 5 & Mockito", "Postman", "Jira", "SQL Auditing"]
  },
  {
    icon: "🌐",
    title: "Global & Bilingual Collaboration",
    roleType: "International Teams",
    desc: "Comfortable communicating in English (IELTS 6.5, exempted from preparatory English year) and Korean (TOPIK II Level 3). Ready for international standups, specs reading, and cross-border teamwork.",
    skills: ["English IELTS 6.5", "Korean TOPIK II Lv 3", "Technical Writing", "Cross-cultural"]
  }
];

const Roles = () => {
  return (
    <section className="roles-section" id="roles">
      <div className="roles-header">
        <h2 className="roles-title">ROLES I'M EXCITED TO TAKE ON</h2>
        <p className="roles-subtitle">
          While my foundations are rooted in scalable software engineering, <br />
          I'm versatile, curious, and <span className="highlight-text">ready to deliver value across multiple disciplines</span>.
        </p>
      </div>

      <div className="roles-grid">
        {ROLES.map((role, idx) => (
          <div key={idx} className="role-card">
            <div className="role-card-top">
              <span className="role-icon">{role.icon}</span>
              <span className="role-badge">{role.roleType}</span>
            </div>
            <h3 className="role-card-title">{role.title}</h3>
            <p className="role-card-desc">{role.desc}</p>
            <div className="role-skills">
              {role.skills.map((skill, sIdx) => (
                <span key={sIdx} className="role-skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Roles;