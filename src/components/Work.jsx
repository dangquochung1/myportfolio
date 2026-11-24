import { useEffect, useRef, useState } from 'react';
import './Work.css';
import SectionHead from './SectionHead';
import { HalfDisc, QuarterDisc, Dots } from './Glyphs';
import thtImg from '../assets/tht.png';
import resultsSummaryImg from '../assets/results-summary.jpg';
import duyenImg from '../assets/duyen.png';
import duyenCert from '../assets/Certificate-hungdq1412@gmail.com.pdf';
import kagebiIsland from '../assets/kagebi/island.webp';
import kagebiWinter from '../assets/kagebi/winter.webp';
import kagebiAutumn from '../assets/kagebi/autumn.webp';
import kagebiCombat from '../assets/kagebi/combat.webp';

const OTHER_WORKS_URL = "https://github.com/dangquochung1?tab=repositories";

const projects = [
  {
    id: 1,
    title: "HRM SYSTEM — THT SOLUTION",
    subtitle: "CAPSTONE PROJECT · FULL-STACK, ENTERPRISE & AI",
    period: "04 — 09/2026",
    desc: "Enterprise HR & Payroll platform backed by a 79-table PostgreSQL schema. I owned the Payroll, Contract and Organization modules end-to-end (~110 REST endpoints, ~440 unit tests), solved complex statutory insurance & progressive tax calculations, and built two Python FastAPI microservices (InsightFace biometric verification at ~0.3s on CPU and parallel PaddleOCR/VietOCR cutting contract processing from 82.8s to 28.4s). Created the Docker Compose stack and reproducible seed data for the 5-person team.",
    highlights: ["79-Table Schema", "~110 REST Endpoints", "~440 Tests", "InsightFace ~0.3s CPU"],
    tags: ["Java 17", "Spring Boot 3", "PostgreSQL", "Python FastAPI (AI)", "InsightFace ONNX", "PaddleOCR & VietOCR", "React & Expo", "JUnit 5 (~440 tests)", "Docker Compose"],
    image: thtImg,
    imageBlend: true, // logo nền trắng -> hoà vào giấy
    repo: "https://github.com/quannaoto17/HRM-for-THT-Solution"
  },
  {
    id: 2,
    title: "DUYÊN — EVENT INTELLIGENCE",
    subtitle: "TOP 50 AI RISER VIETNAM 2026 · SOLO DEVELOPER",
    period: "08 — 09/2026",
    desc: "An intelligent event intelligence platform that turns messy event spreadsheets into deduplicated attendee profiles and generates conflict-free 1:1 meeting schedules. Powered by Gemini API for column mapping and gray-zone fuzzy matching (18/18 duplicate attendees merged with 0 false merges), backed by a deterministic constraint solver scheduling 288 meetings in 63ms with 0 conflicts (0 violations across 200 stress tests).",
    highlights: ["Top 50 AI Riser 2026", "288 Meetings in 63ms", "0 Conflicts", "0 False Merges"],
    tags: ["TypeScript", "Gemini API", "Google AI Studio", "Constraint Solver", "Top 50 AI Riser"],
    image: duyenImg,
    repo: "https://github.com/dangquochung1/Duyen",
    cert: duyenCert
  },
  {
    id: 3,
    title: "KAGEBI — PIXEL ROGUELITE",
    titleNote: "影火",
    subtitle: "PERSONAL PROJECT · SOLO · GAME DEV",
    period: "09/2026 — NOW",
    desc: "A top-down pixel-art roguelite I'm building in Java 21 + libGDX. Seven young ninjas chase a stolen flame through five stages beneath an island village that farms, fishes and cooks for them on its own clock between runs. Plays in Vietnamese and English.",
    highlights: ["v0.8 · In progress", "1,600+ Automated Tests", "VI / EN"],
    tags: ["Java 21", "libGDX", "Maven", "JUnit 5", "Python + Pillow tools", "Tiled"],
    // Đang làm: hiện thanh "loading" thay cho link, repo private nên không có link git
    build: { version: "0.8", progress: 80 },
    privateNote: "PRIVATE REPO · NO PUBLIC BUILD YET",
    credit: "Pixel art: third-party asset packs, credited in-game.",
    gallery: [
      { src: kagebiIsland, caption: "Sunnyside, the whole island" },
      { src: kagebiWinter, caption: "Christmas snow at the Guild Hall" },
      { src: kagebiAutumn, caption: "The village in autumn" },
      { src: kagebiCombat, caption: "The Old Well, first stage" }
    ]
  },
  {
    id: 4,
    title: "FRONTEND & UI LAB",
    subtitle: "RESPONSIVE DESIGN & INTERACTIVE LAB",
    period: "SIDE LAB",
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

const pad2 = (n) => String(n).padStart(2, '0');

// Thanh "LOADING" kiểu pixel: chạy tới đúng % phiên bản (v0.8 -> 80%) rồi ô kế tiếp nhấp nháy
const BuildStatus = ({ version, progress }) => {
  const filled = Math.round(progress / 10);
  return (
    <div className="build-status">
      <span className="label build-status__label">
        Loading<span className="build-status__dots" aria-hidden="true">...</span>
      </span>
      <span
        className="build-status__bar"
        role="progressbar"
        aria-label={`In development, version ${version}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        style={{ '--filled': filled }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={`build-status__cell ${i === filled ? 'is-next' : ''}`} />
        ))}
        <span className="build-status__fill" />
      </span>
      <span className="label build-status__pct">v{version} · {progress}%</span>
    </div>
  );
};

// Gallery ảnh game: ảnh lớn + thumbnail, bấm ảnh lớn để xem to trong <dialog>
const ProjectGallery = ({ items, title, figNo }) => {
  const [active, setActive] = useState(0);
  const dialogRef = useRef(null);
  const current = items[active];

  const step = (delta) => setActive((i) => (i + delta + items.length) % items.length);
  const close = () => dialogRef.current?.close();

  return (
    <figure className="gallery">
      <button
        type="button"
        className="gallery__main"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Enlarge screenshot: ${current.caption}`}
      >
        <img src={current.src} alt={`${title}: ${current.caption}`} width="1280" height="720" />
        <span className="gallery__zoom label" aria-hidden="true">⤢ View</span>
      </button>

      <div className="gallery__thumbs">
        {items.map((item, i) => (
          <button
            key={item.caption}
            type="button"
            className={`gallery__thumb ${i === active ? 'is-active' : ''}`}
            aria-label={`Show screenshot ${i + 1}: ${item.caption}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => setActive(i)}
          >
            <img src={item.src} alt="" width="1280" height="720" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      <figcaption className="fig-caption">
        <span className="label">FIG. {figNo} — {current.caption}</span>
        <span className="label">{pad2(active + 1)} / {pad2(items.length)}</span>
      </figcaption>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={`${title} screenshots`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close(); // bấm ra ngoài ảnh để đóng
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
      >
        <div className="lightbox__inner">
          <img src={current.src} alt={`${title}: ${current.caption}`} className="lightbox__img" width="1280" height="720" />
          <div className="lightbox__bar">
            <span className="label lightbox__caption">
              {pad2(active + 1)} / {pad2(items.length)} — {current.caption}
            </span>
            <div className="lightbox__controls">
              <button type="button" className="btn btn--ink btn--sm" onClick={() => step(-1)} aria-label="Previous screenshot">←</button>
              <button type="button" className="btn btn--ink btn--sm" onClick={() => step(1)} aria-label="Next screenshot">→</button>
              <button type="button" className="btn btn--sm" onClick={close}>Close ✕</button>
            </div>
          </div>
        </div>
      </dialog>
    </figure>
  );
};

const Work = () => {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const cards = Array.from(document.querySelectorAll('.work-card'));
          if (cards.length === 0) {
            ticking = false;
            return;
          }
          const stickyTop = 32; // Khoảng cách trần (khớp với top của .work-card)
          const gap = parseFloat(getComputedStyle(cards[0].parentElement).rowGap) || 0;

          // 1. Giai đoạn ĐỌC (Read)
          const cardData = cards.map((card, i) => {
            const nextCard = cards[i + 1];
            if (!nextCard) return { card, overlap: 0 };

            // Khoảng cách "gốc" giữa 2 thẻ = chiều cao thẻ + gap.
            // (Không dùng offsetTop: khi thẻ đang dính, offsetTop bị cộng thêm phần dính
            //  nên hiệu số luôn bằng nextDist -> overlap luôn = 0, hiệu ứng không chạy.)
            const initialDistance = card.offsetHeight + gap;
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
      {/* Khối hình lớn từ poster, ló ra ở lề sau các thẻ */}
      <div className="deco-layer" aria-hidden="true">
        <HalfDisc size={300} color="var(--blue)" rotate={-90} className="work-deco-capsule" />
        <QuarterDisc size={150} color="var(--red)" rotate={90} className="work-deco-quarter" />
        <Dots size={26} className="work-deco-dots" />
      </div>

      <div className="container">
        <SectionHead index="02" title="Things I've built" meta={`${projects.length} projects · selected`} />

        <div className="work-container">
          {projects.map((project, idx) => {
            const figNo = pad2(idx + 2); // FIG. 01 là poster ở hero
            return (
              <article key={project.id} className={`work-card ${project.build ? 'is-wip' : ''}`}>
                <header className="work-card__bar">
                  <span className="label work-card__code">P/{pad2(idx + 1)}</span>
                  <span className="work-card__rule" aria-hidden="true" />
                  <span className="label">{project.period}</span>
                </header>

                <div className="work-card-content">
                  <div className="work-info">
                    <span className="label project-subtitle">{project.subtitle}</span>
                    <h3 className="project-title">
                      {project.title}
                      {project.titleNote && <span className="project-title-note" lang="ja">{project.titleNote}</span>}
                    </h3>

                    {project.build && <BuildStatus {...project.build} />}

                    {project.highlights && (
                      <ul className="project-highlights">
                        {project.highlights.map((h) => (
                          <li key={h} className="chip highlight-pill">
                            <span className="highlight-pill__check" aria-hidden="true">✓</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="project-desc">{project.desc}</p>

                    <ul className="project-tags" aria-label="Tech stack">
                      {project.tags.map((tag) => (
                        <li key={tag} className="project-tag">{tag}</li>
                      ))}
                    </ul>

                    <div className="project-actions">
                      {project.subProjects ? (
                        <div className="sub-projects-wrapper">
                          {project.subProjects.map((sub) => (
                            <div key={sub.name} className="sub-project-item">
                              <span className="sub-project-title">{sub.name}</span>
                              <div className="sub-project-buttons">
                                <a href={sub.live} target="_blank" rel="noopener noreferrer" className="btn btn--sm">Demo ↗</a>
                                <a href={sub.repo} target="_blank" rel="noopener noreferrer" className="btn btn--ink btn--sm">GitHub ↗</a>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn">View project ↗</a>}
                          {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn--ink">GitHub ↗</a>}
                          {project.cert && <a href={project.cert} target="_blank" rel="noopener noreferrer" className="btn btn--blue">Certificate ↗</a>}
                          {project.privateNote && <span className="project-private">{project.privateNote}</span>}
                        </>
                      )}
                    </div>

                    {project.credit && <p className="project-credit">{project.credit}</p>}
                  </div>

                  <div className="work-figure">
                    {project.gallery ? (
                      <ProjectGallery items={project.gallery} title={project.title} figNo={figNo} />
                    ) : (
                      <figure className="work-image-container">
                        <div className="work-image-frame">
                          <img
                            src={project.image}
                            alt={project.title}
                            className={`work-image ${project.imageBlend ? 'is-blend' : ''}`}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <figcaption className="fig-caption">
                          <span className="label">FIG. {figNo} — {project.title}</span>
                        </figcaption>
                      </figure>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="work-footer">
          <a href={OTHER_WORKS_URL} target="_blank" rel="noopener noreferrer" className="btn checkout-btn">
            Check out my other works ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
