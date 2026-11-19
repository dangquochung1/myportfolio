import { useEffect } from 'react';
import './Work.css';
import thtImg from '../assets/tht.png';
import resultsSummaryImg from '../assets/results-summary.jpg';
import duyenImg from '../assets/duyen.png';
import duyenCert from '../assets/Certificate-hungdq1412@gmail.com.pdf';

const OTHER_WORKS_URL = "https://github.com/dangquochung1?tab=repositories";

const projects = [
  {
    id: 1,
    title: "HRM SYSTEM — THT SOLUTION",
    subtitle: "CAPSTONE PROJECT · FULL-STACK, ENTERPRISE & AI",
    desc: "Enterprise HR & Payroll platform backed by a 79-table PostgreSQL schema. I owned the Payroll, Contract and Organization modules end-to-end (~110 REST endpoints, ~440 unit tests), solved complex statutory insurance & progressive tax calculations, and built two Python FastAPI microservices (InsightFace biometric verification at ~0.3s on CPU and parallel PaddleOCR/VietOCR cutting contract processing from 82.8s to 28.4s). Created the Docker Compose stack and reproducible seed data for the 5-person team.",
    highlights: ["79-Table Schema", "~110 REST Endpoints", "~440 Tests", "InsightFace ~0.3s CPU"],
    tags: ["Java 17", "Spring Boot 3", "PostgreSQL", "Python FastAPI (AI)", "InsightFace ONNX", "PaddleOCR & VietOCR", "React & Expo", "JUnit 5 (~440 tests)", "Docker Compose"],
    image: thtImg,
    repo: "https://github.com/quannaoto17/HRM-for-THT-Solution"
  },
  {
    id: 2,
    title: "DUYÊN — EVENT INTELLIGENCE",
    subtitle: "TOP 50 AI RISER VIETNAM 2026 · SOLO DEVELOPER",
    desc: "An intelligent event intelligence platform that turns messy event spreadsheets into deduplicated attendee profiles and generates conflict-free 1:1 meeting schedules. Powered by Gemini API for column mapping and gray-zone fuzzy matching (18/18 duplicate attendees merged with 0 false merges), backed by a deterministic constraint solver scheduling 288 meetings in 63ms with 0 conflicts (0 violations across 200 stress tests).",
    highlights: ["Top 50 AI Riser 2026", "288 Meetings in 63ms", "0 Conflicts", "0 False Merges"],
    tags: ["TypeScript", "Gemini API", "Google AI Studio", "Constraint Solver", "Top 50 AI Riser"],
    image: duyenImg,
    repo: "https://github.com/dangquochung1/Duyen",
    cert: duyenCert
  },
  {
    id: 3,
    title: "FRONTEND & UI LAB",
    subtitle: "RESPONSIVE DESIGN & INTERACTIVE LAB",
    desc: "Curated collection of responsive, pixel-perfect web interfaces and interactive components built to master CSS architecture, modern layout mechanics (Flexbox/Grid), and semantic accessibility without framework dependencies.",
    highlights: ["Mobile & Desktop Adaptive", "Pure CSS Architecture", "Custom Properties & Flexbox"],
    tags: ["HTML5 / Semantic", "CSS3 / Custom Props", "Flexbox & Grid", "Responsive Design"],
    image: resultsSummaryImg,
    subProjects: [
      {
        name: "Product Preview Card",
        live: "https://dangquochung1.github.io/product-preview-card-component/",
        repo: "https://github.com/dangquochung1/product-preview-card-component"
      },
      {
        name: "Results Summary Component",
        live: "https://dangquochung1.github.io/results-summary-component/",
        repo: "https://github.com/dangquochung1/results-summary-component"
      }
    ]
  }
];

const Work = () => {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const cards = Array.from(document.querySelectorAll('.work-card'));
          const stickyTop = 40; // Khoảng cách trần

          // 1. Giai đoạn ĐỌC (Read)
          const cardData = cards.map((card, i) => {
            const nextCard = cards[i + 1];
            if (!nextCard) return { card, overlap: 0 };

            const initialDistance = nextCard.offsetTop - card.offsetTop;
            const nextDist = nextCard.getBoundingClientRect().top - stickyTop;
            let overlap = (initialDistance - Math.max(0, nextDist)) / initialDistance;
            overlap = Math.max(0, Math.min(1, overlap));

            return { card, overlap };
          });

          // 2. Giai đoạn GHI (Write)
          cardData.forEach(({ card, overlap }) => {
            const scale = 1 - overlap * 0.1;
            const translateY = 0;
            const opacity = 1 - overlap;

            card.style.setProperty('--card-scale', scale);
            card.style.setProperty('--card-translateY', `${translateY}px`);
            card.style.setProperty('--card-opacity', Math.max(0, opacity));
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="work-section" id="work">
      <h2 className="work-title">THINGS I'VE BUILT</h2>

      <div className="work-container">
        {projects.map((project) => (
          <div
            key={project.id}
            className="work-card"
          >
            <div className="work-card-content">
              <div className="work-info">
                <span className="project-subtitle">{project.subtitle}</span>
                <h3 className="project-title">{project.title}</h3>
                
                {project.highlights && (
                  <div className="project-highlights">
                    {project.highlights.map((h, i) => (
                      <span key={i} className="highlight-pill">✓ {h}</span>
                    ))}
                  </div>
                )}

                <p className="project-desc">{project.desc}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.subProjects ? (
                    <div className="sub-projects-wrapper">
                      {project.subProjects.map((sub, idx) => (
                        <div key={idx} className="sub-project-item">
                          <span className="sub-project-title">{sub.name}</span>
                          <div className="sub-project-buttons">
                            <a href={sub.live} target="_blank" rel="noopener noreferrer" className="project-link is-mini">DEMO ↗</a>
                            <a href={sub.repo} target="_blank" rel="noopener noreferrer" className="project-link is-ghost is-mini">GITHUB ↗</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">VIEW PROJECT ↗</a>}
                      {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link is-ghost">GITHUB ↗</a>}
                      {project.cert && <a href={project.cert} target="_blank" rel="noopener noreferrer" className="project-link is-cert">CERTIFICATE ↗</a>}
                    </>
                  )}
                </div>
              </div>
              <div className="work-image-container">
                <img src={project.image} alt={project.title} className="work-image" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="work-footer">
        <a href={OTHER_WORKS_URL} target="_blank" rel="noopener noreferrer" className="checkout-btn">
          CHECK OUT MY OTHER WORKS ↗
        </a>
      </div>
    </section>
  );
};

export default Work;