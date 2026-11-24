import { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import { Sparkle } from './Glyphs';
import './Navbar.css';

const LINKS = ['skills', 'work', 'roles', 'about', 'connect'];

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Chỉ hiện menu khi ở đầu trang (cuộn chưa quá 50px)
      if (currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isVisible ? '' : 'navbar-hidden'}`} aria-label="Main">
      <div className="navbar__inner">
        <a href="#top" className="navbar-logo" aria-label="Dang Quoc Hung, back to top">
          <img src={logoImg} alt="" className="navbar-avatar" />
          <span className="navbar-mark label">
            DQH <Sparkle size={9} />
          </span>
        </a>
        <ul className="navbar-links">
          {LINKS.map((id, i) => (
            <li key={id}>
              <a href={`#${id}`} className="menu-item">
                <span className="menu-index">{String(i + 1).padStart(2, '0')}</span>
                {id}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
