import { useState } from 'react';
import './Skills.css';
import midImg from '../assets/mid.png';

const CATEGORIES = [
  { id: 'all', label: 'All Cards 🃏' },
  { id: 'backend', label: 'Backend & Systems ⚙️' },
  { id: 'ai', label: 'AI & Tools 🤖' },
  { id: 'frontend', label: 'Frontend & Mobile 💻' },
  { id: 'qa', label: 'QA, Testing & Ops 🧪' },
  { id: 'languages', label: 'Languages 🌐' },
];

const SKILLS = [
  // Backend & Systems
  { name: "Java 17 & Spring Boot 3", cat: "backend", badge: "Core", top: "3%", left: "10%", rotate: "-6deg" },
  { name: "Spring Security & JPA", cat: "backend", badge: "Auth & ORM", top: "18%", left: "3%", rotate: "3deg" },
  { name: "PostgreSQL (79 Tables)", cat: "backend", badge: "Schema", top: "34%", left: "1%", rotate: "-4deg" },
  { name: "Payroll & Business Logic", cat: "backend", badge: "Enterprise", top: "50%", left: "3%", rotate: "5deg" },

  // AI & Intelligent Tools
  { name: "Gemini API & LLM Apps", cat: "ai", badge: "Top 50 Duyên", top: "1%", left: "50%", translateX: "-50%", rotate: "1deg" },
  { name: "Python & FastAPI", cat: "ai", badge: "Microservices", top: "3%", right: "10%", rotate: "-3deg" },
  { name: "InsightFace ONNX (~0.3s)", cat: "ai", badge: "Biometrics", top: "18%", right: "3%", rotate: "5deg" },
  { name: "PaddleOCR & VietOCR", cat: "ai", badge: "Document AI", top: "34%", right: "1%", rotate: "-4deg" },
  { name: "AI Coding Agents (Claude/AGY)", cat: "ai", badge: "Workflows", top: "50%", right: "3%", rotate: "3deg" },

  // QA, Testing & Ops
  { name: "Docker & Docker Compose", cat: "qa", badge: "DevOps", top: "67%", left: "6%", rotate: "-3deg" },
  { name: "JUnit 5 & Mockito (440+ tests)", cat: "qa", badge: "Testing", top: "83%", left: "14%", rotate: "4deg" },
  { name: "Postman & Jira Root-Cause", cat: "qa", badge: "QA / Defect", bottom: "1%", left: "33%", rotate: "-2deg" },

  // Frontend & Mobile
  { name: "React & Ant Design", cat: "frontend", badge: "Web UI", top: "67%", right: "6%", rotate: "4deg" },
  { name: "React Native (Expo)", cat: "frontend", badge: "Mobile App", top: "83%", right: "14%", rotate: "-5deg" },

  // Languages & Global
  { name: "IELTS 6.5 · TOPIK II Lv 3", cat: "languages", badge: "Multilingual", bottom: "1%", right: "33%", rotate: "3deg" },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <section className="skills-section" id="skills">
      <div className="skills-wrapper">
        
        {/* Category Filter Tabs */}
        <div className="skills-filter-container">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="skills-container">
          {/* Floating Pills */}
          {SKILLS.map((skill, index) => {
            const isMatch = activeCategory === 'all' || skill.cat === activeCategory;
            return (
              <div
                key={index}
                className={`skill-pill ${isMatch ? 'pill-active' : 'pill-dimmed'} cat-${skill.cat}`}
                style={{
                  top: skill.top,
                  left: skill.left,
                  right: skill.right,
                  bottom: skill.bottom,
                  transform: `translateX(${skill.translateX || '0'}) rotate(${skill.rotate})`
                }}
              >
                <span className="skill-name">{skill.name}</span>
                {skill.badge && <span className="skill-tag-badge">{skill.badge}</span>}
              </div>
            );
          })}

          {/* Center Content */}
          <div className="skills-center">
            <img src={midImg} alt="Crying at laptop" className="skills-image" />
            <h2 className="skills-title">WHAT I BRING TO THE TABLE</h2>
            <p className="skills-subtitle">
              Collecting skills like Pokémon cards so your project <br /> 
              doesn't need <span className="highlight-text">five different people</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;