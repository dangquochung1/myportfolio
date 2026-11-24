import './Footer.css';
import SectionHead from './SectionHead';
import { Checker, Dots, Sparkle } from './Glyphs';
import signatureImg from '../assets/signature.webp';
import multiImg from '../assets/multi.webp';

const EMAIL = 'hungdq1412@gmail.com';

const socials = [
  {
    label: 'LinkedIn',
    // Slug có dấu tiếng Việt nên encode sẵn để mọi trình duyệt đều mở đúng
    href: 'https://www.linkedin.com/in/h%C6%B0ng-%C4%91%E1%BA%B7ng-791251244',
    handle: 'in/hưng-đặng-791251244',
    external: true
  },
  {
    label: 'GitHub',
    href: 'https://github.com/dangquochung1',
    handle: 'github.com/dangquochung1',
    external: true
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    handle: EMAIL
  },
  // Hai tài khoản này chưa public -> dẫn sang trang "private-life" cho vui
  { label: 'Instagram', href: '/private-life.html?from=instagram', handle: 'not public yet' },
  { label: 'Facebook', href: '/private-life.html?from=facebook', handle: 'under lockdown' }
];

const Footer = () => {
  const handleHomeClick = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer-section" id="connect">
      <div className="deco-layer" aria-hidden="true">
        <Checker size={48} className="footer-deco-checker" />
      </div>

      <div className="container footer-inner">
        <SectionHead index="05" title="Let's connect" meta="Hanoi, VN · GMT+7" glyph={<Dots size={30} />} />

        <div className="footer-top-section">
          <ul className="footer-links">
            {socials.map((social, i) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="social-row"
                  {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="label social-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="social-label">{social.label}</span>
                  <span className="social-handle">{social.handle}</span>
                  <span className="social-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="footer-stamp">
            <img src={signatureImg} alt="Signature of Dang Quoc Hung" width="560" height="377" />
            <span className="label">— Hưng</span>
          </div>
        </div>

        <figure className="footer-illustration">
          <img src={multiImg} alt="Sketches of me in four moods" loading="lazy" decoding="async" width="1631" height="964" />
          <figcaption className="fig-caption">
            <span className="label">FIG. 06 — Many moods, one engineer</span>
            <span className="label footer-sparkle"><Sparkle size={10} /></span>
          </figcaption>
        </figure>

        <div className="footer-bottom">
          <span className="label knockout">© {new Date().getFullYear()} Dang Quoc Hung · Hanoi, Vietnam</span>
          <button type="button" className="btn btn--ink home-btn" onClick={handleHomeClick}>↑ Back to top</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
