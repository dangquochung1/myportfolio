import React, { useEffect } from 'react';
import './Work.css';
import thtImg from '../assets/tht.png';
import productPreviewImg from '../assets/product-preview-card.jpg';
import resultsSummaryImg from '../assets/results-summary.jpg';

const OTHER_WORKS_URL = "https://github.com/dangquochung1?tab=repositories";

const projects = [
  {
    id: 1,
    title: "HRM SYSTEM — THT SOLUTION",
    subtitle: "CAPSTONE PROJECT · BACKEND",
    desc: "Backend for an HR platform covering employee records, contracts, attendance and payroll. I owned the Payroll module end to end — Vietnamese statutory insurance, progressive income tax, monthly runs with preview / approve / lock, and Excel payslips.",
    tags: ["Java 17", "Spring Boot 3", "PostgreSQL", "Apache POI"],
    image: thtImg,
    // Repo của khách hàng nên không public được -> chỉ hiện nhãn, không bấm được
    isPrivate: true
  },
  {
    id: 2,
    title: "PRODUCT PREVIEW CARD",
    subtitle: "FRONTEND MENTOR CHALLENGE",
    desc: "A product card built with hand-written HTML and CSS that swaps its artwork and layout between mobile and desktop — no framework, no build step.",
    tags: ["HTML", "CSS", "Responsive"],
    image: productPreviewImg,
    live: "https://dangquochung1.github.io/product-preview-card-component/",
    repo: "https://github.com/dangquochung1/product-preview-card-component"
  },
  {
    id: 3,
    title: "RESULTS SUMMARY",
    subtitle: "FRONTEND MENTOR CHALLENGE",
    desc: "A results summary card with a gradient score panel and colour-coded category rows, put together with Flexbox and CSS custom properties.",
    tags: ["HTML", "CSS", "Flexbox"],
    image: resultsSummaryImg,
    live: "https://dangquochung1.github.io/results-summary-component/",
    repo: "https://github.com/dangquochung1/results-summary-component"
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

          // 1. Giai đoạn ĐỌC (Read): Lấy tất cả thông số trước để tránh layout thrashing
          const cardData = cards.map((card, i) => {
            const nextCard = cards[i + 1];

            // Thẻ cuối cùng không có thẻ nào đè lên
            if (!nextCard) return { card, overlap: 0 };

            // Khoảng cách ban đầu giữa 2 thẻ (khi chưa cuộn)
            const initialDistance = nextCard.offsetTop - card.offsetTop;

            // Khoảng cách hiện tại của thẻ tiếp theo so với "trần" (stickyTop)
            const nextDist = nextCard.getBoundingClientRect().top - stickyTop;

            // Chỉ bắt đầu tính overlap khi thẻ hiện tại ĐÃ CHẠM TRẦN
            // Tức là khi nextDist < initialDistance
            let overlap = (initialDistance - Math.max(0, nextDist)) / initialDistance;

            // Giới hạn overlap từ 0 (chưa đè) đến 1 (đè hoàn toàn)
            overlap = Math.max(0, Math.min(1, overlap));

            return { card, overlap };
          });

          // 2. Giai đoạn GHI (Write): Áp dụng CSS
          cardData.forEach(({ card, overlap }) => {
            // Thẻ đứng im ở tường, thu nhỏ rõ hơn một chút và mờ dần
            const scale = 1 - overlap * 0.1; // Thu nhỏ 10% (để thấy rõ hiệu ứng nhỏ dần)
            const translateY = 0; // KHÔNG dịch chuyển lên trên nữa
            const opacity = 1 - overlap; // Mờ từ từ (khi overlap = 1 thì mới mờ hẳn)

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
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.isPrivate ? (
                    <span className="project-link is-private">PRIVATE REPO</span>
                  ) : (
                    <>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">VIEW PROJECT ↗</a>
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link is-ghost">GITHUB ↗</a>
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