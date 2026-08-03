import React from 'react';
import './Skills.css';
import midImg from '../assets/mid.png';

const Skills = () => {
  const skills = [
    { name: "Java", top: "15%", left: "20%", rotate: "-8deg" },
    { name: "Spring Boot", top: "5%", left: "50%", translateX: "-50%", rotate: "3deg" },
    { name: "REST API Design", top: "10%", right: "20%", rotate: "-3deg" },
    { name: "Spring Data JPA", top: "40%", left: "10%", rotate: "-5deg" },
    { name: "Spring Security", top: "35%", right: "10%", rotate: "4deg" },
    { name: "PostgreSQL", top: "75%", left: "15%", rotate: "3deg" },
    { name: "React", top: "70%", right: "15%", rotate: "-4deg" },
    { name: "Docker", bottom: "0%", left: "35%", rotate: "-2deg" },
    { name: "JUnit & Mockito", bottom: "5%", right: "30%", rotate: "5deg" },
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        {/* Floating Pills */}
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-pill"
            style={{
              top: skill.top,
              left: skill.left,
              right: skill.right,
              bottom: skill.bottom,
              transform: `translateX(${skill.translateX || '0'}) rotate(${skill.rotate})`
            }}
          >
            {skill.name}
          </div>
        ))}

        {/* Center Content */}
        <div className="skills-center">
          <img src={midImg} alt="Crying at laptop" className="skills-image" />
          <h2 className="skills-title">WHAT I BRING TO THE TABLE</h2>
          <p className="skills-subtitle">
            Collecting skills like Pokémon cards so your project <br /> doesn't need <span className="highlight-text">five different people</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
