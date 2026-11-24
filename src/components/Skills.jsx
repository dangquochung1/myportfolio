import { useState } from 'react';
import './Skills.css';
import SectionHead from './SectionHead';
import { CATEGORY_GLYPHS } from './glyphMap';
import { PixelStairs } from './Glyphs';

const CATEGORIES = [
  { id: 'all', label: 'All cards' },
  { id: 'backend', label: 'Backend & Systems' },
  { id: 'ai', label: 'AI & Tools' },
  { id: 'frontend', label: 'Frontend & Mobile' },
  { id: 'qa', label: 'QA, Testing & Ops' },
  { id: 'languages', label: 'Languages' },
];

const SKILLS = [
  // Backend & Systems
  { name: "Java 17 & Spring Boot 3", cat: "backend", badge: "Core" },
  { name: "Spring Security & JPA", cat: "backend", badge: "Auth & ORM" },
  { name: "PostgreSQL (79 Tables)", cat: "backend", badge: "Schema" },
  { name: "Payroll & Business Logic", cat: "backend", badge: "Enterprise" },

  // AI & Intelligent Tools
  { name: "Gemini API & LLM Apps", cat: "ai", badge: "Top 50 Duyên" },
  { name: "Python & FastAPI", cat: "ai", badge: "Microservices" },
  { name: "InsightFace ONNX (~0.3s)", cat: "ai", badge: "Biometrics" },
  { name: "PaddleOCR & VietOCR", cat: "ai", badge: "Document AI" },
  { name: "AI Coding Agents (Claude/AGY)", cat: "ai", badge: "Workflows" },

  // Frontend & Mobile
  { name: "React & Ant Design", cat: "frontend", badge: "Web UI" },
  { name: "React Native (Expo)", cat: "frontend", badge: "Mobile App" },

  // QA, Testing & Ops
  { name: "Docker & Docker Compose", cat: "qa", badge: "DevOps" },
  { name: "JUnit 5 & Mockito (440+ tests)", cat: "qa", badge: "Testing" },
  { name: "Postman & Jira Root-Cause", cat: "qa", badge: "QA / Defect" },

  // Languages & Global
  { name: "IELTS 6.5 · TOPIK II Lv 3", cat: "languages", badge: "Multilingual" },
];

const DECKS = CATEGORIES.filter((c) => c.id !== 'all');

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <section className="skills-section" id="skills">
      <div className="deco-layer" aria-hidden="true">
        <PixelStairs size={52} className="skills-deco-stairs" />
      </div>

      <div className="container">
        <SectionHead
          index="01"
          title="What I bring to the table"
          meta={`${SKILLS.length} cards · ${DECKS.length} decks`}
        >
          Collecting skills like Pokémon cards so your project
          doesn't need <span className="highlight-text">five different people</span>
        </SectionHead>

        {/* Category Filter Tabs */}
        <div className="skills-filter-container" role="group" aria-label="Filter skills by category">
          {CATEGORIES.map((cat) => {
            const glyph = CATEGORY_GLYPHS[cat.id];
            return (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                aria-pressed={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {glyph && <glyph.Glyph size={11} color="currentColor" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Mỗi nhóm là một "bộ bài" — bấm tab thì bộ đó nổi lên, các bộ khác mờ đi */}
        <div className="skills-decks">
          {DECKS.map((deck, deckIdx) => {
            const { Glyph, color } = CATEGORY_GLYPHS[deck.id];
            const cards = SKILLS.filter((s) => s.cat === deck.id);
            const state =
              activeCategory === 'all' ? '' : activeCategory === deck.id ? 'is-active' : 'is-dimmed';
            return (
              <article key={deck.id} className={`skill-deck ${state}`} style={{ '--deck-color': color }}>
                <header className="skill-deck__head">
                  <Glyph size={30} color={color} />
                  <span className="label skill-deck__count">
                    {String(deckIdx + 1).padStart(2, '0')} / {String(DECKS.length).padStart(2, '0')}
                  </span>
                </header>
                <h3 className="skill-deck__title">{deck.label}</h3>
                <ul className="skill-deck__list">
                  {cards.map((skill) => (
                    <li key={skill.name} className="skill-row">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-tag-badge">{skill.badge}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
