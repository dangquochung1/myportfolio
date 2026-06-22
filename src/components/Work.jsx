import React, { useEffect } from 'react';
import './Work.css';
import img1 from '../assets/work.png';
import img2 from '../assets/cat1.avif';
import img3 from '../assets/cat2.avif';
import img4 from '../assets/cat3.avif';

const projects = [
  {
    id: 1,
    title: "JUSPAY GENIUS",
    subtitle: "PROJECT 1",
    desc: "AI assistant that transforms payment and business data into actionable insights through conversational analytics.",
    tags: ["Logo Design", "Branding"],
    image: img1
  },
  {
    id: 2,
    title: "BREEZE BUDDY",
    subtitle: "PROJECT 2",
    desc: "AI voice agent that automates customer communication, helping merchants save time and reduce returns.",
    tags: ["Web Design", "SAAS"],
    image: img2
  },
  {
    id: 3,
    title: "HACKTOBER FEST",
    subtitle: "PROJECT 3",
    desc: "Designed a retro-tech inspired merch collection that brings developer culture and open-source spirit to life.",
    tags: ["Merch Design", "Performance AD"],
    image: img3
  },
  {
    id: 4,
    title: "NORD VPN",
    subtitle: "PROJECT 4",
    desc: "A college graduation project featuring a brand refresh and advertising campaign focused on digital privacy and security.",
    tags: ["Ad Campaign", "Rebranding"],
    image: img4
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
      <h2 className="work-title">DESIGN IN ACTION</h2>

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
                <a href="#work" className="view-project">VIEW PROJECT</a>
              </div>
              <div className="work-image-container">
                <img src={project.image} alt={project.title} className="work-image" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="work-footer">
        <button className="checkout-btn">CHECK OUT MY OTHER WORKS ↗</button>
      </div>
    </section>
  );
};

export default Work;