import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import logoLight from '../assets/logo.png';
import logoDark from '../assets/logo-dark.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled enough to apply mini-style
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDark(currentTheme === 'dark');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.setAttribute('data-theme', nextDark ? 'dark' : 'light');
  };

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/blog', label: 'Blog' },
    { to: '/services', label: 'Services' },
    { to: '/content', label: 'Social' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', width: '100%' }}>
          {/* Logo */}
          <div className="logo" style={{ flexShrink: 1, minWidth: 0 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={isDark ? logoDark : logoLight} 
                alt="uxprasa" 
                className="logo-img"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="actions" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
            <button className="icon-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search"><Search size={20} /></button>
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="https://whatsapp.com/channel/0029Vb8JBr06LwHec2lewr43"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whatsapp-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2l-2.6 7.4Z" />
              </svg>
              <span className="whatsapp-text">Join WhatsApp Channel</span>
            </a>
            {/* Hamburger — mobile only */}
            <button
              className="icon-btn hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              style={{ display: 'none' }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-screen Menu */}
      {menuOpen && (
        <div className="mobile-nav-overlay">
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
          >
            <X size={28} />
          </button>
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <a
            href="https://whatsapp.com/channel/0029Vb8JBr06LwHec2lewr43"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: '2rem' }}
            onClick={() => setMenuOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2l-2.6 7.4Z" />
            </svg>
            Join WhatsApp Channel
          </a>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <style>{`
        .header {
          position: fixed;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1300px;
          height: 76px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 24px;
          z-index: 1000;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
          padding: 0 1.5rem;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
        }
        [data-theme='dark'] .header {
          background: rgba(30, 41, 59, 0.7);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        .header.scrolled {
          top: 0;
          height: 70px;
          width: 100%;
          max-width: 100%;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        [data-theme='dark'] .header.scrolled {
          background: rgba(15, 23, 42, 0.9);
          border-color: rgba(255, 255, 255, 0.05);
        }
        .logo-img {
          height: 35px;
          object-fit: contain;
          transition: height 0.3s ease;
        }
        .nav-link {
          font-weight: 500;
          color: var(--text-main);
          font-size: 0.95rem;
        }
        .nav-link:hover { color: var(--primary); }
        .nav-link.active { color: var(--primary); font-weight: 700; }
        .icon-btn {
          background: none;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .icon-btn:hover { color: var(--primary); transform: translateY(-2px); }

        /* Mobile overlay menu */
        .mobile-nav-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg-card);
          z-index: 998;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          animation: fadeIn 0.2s ease;
        }
        .mobile-nav-link {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .whatsapp-text { display: none; }
          .whatsapp-btn { padding: 10px 12px !important; border-radius: 50px !important; }
          .desktop-nav { gap: 1rem !important; }
          .logo-img { height: 28px; }
          .header {
            width: 96%;
            padding: 0 1rem;
          }
          .header.scrolled {
            padding: 0 1rem !important;
          }
          .nav-link { font-size: 0.85rem; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .actions { gap: 0.5rem !important; }
          .whatsapp-btn { padding: 9px 12px !important; }
          .whatsapp-text { display: none; }
          .hamburger-btn { display: flex !important; }
          .logo-img { height: 24px; }
          .header {
            top: 0;
            left: 0;
            right: 0;
            width: 100% !important;
            transform: none !important;
            height: 65px;
            padding: 0 10px;
            border-radius: 0;
            border-top: none;
            border-left: none;
            border-right: none;
          }
          .header.scrolled {
            top: 0 !important;
            height: 65px !important;
            border-radius: 0 !important;
            padding: 0 10px !important;
          }
          .header.hidden {
            transform: translateY(-100%) !important;
          }
          .icon-btn { width: 34px; height: 34px; }
          .icon-btn svg { width: 18px; height: 18px; }
        }

        @media (max-width: 420px) {
          .actions { gap: 0.4rem !important; }
          .header { padding: 0 0.6rem; }
          .header.scrolled { padding: 0 0.6rem !important; }
          .logo-img { height: 22px; }
          .whatsapp-btn { padding: 8px 10px !important; }
        }

        @media (max-width: 360px) {
          .actions { gap: 0.3rem !important; }
          .logo-img { height: 20px; }
          .icon-btn { width: 30px; height: 30px; }
        }
      `}</style>
    </>
  );
};

export default Header;



