import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ eventData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'highlights', label: 'Why Attend' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'location', label: 'Location' },
    { id: 'registration', label: 'Register' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'social-feed', label: 'Social' },
    { id: 'live-qa', label: 'Live Q&A' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/img/aws_logo_smile.png" alt="AWS" className="logo-img" />
            <span className="logo-text">User Group Madurai</span>
          </div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
            <a
              href={eventData.registrationLink}
              className="btn btn-primary nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          transition: var(--transition);
          border-bottom: 1px solid transparent;
        }

        .header-scrolled {
          background: rgba(255, 255, 255, 0.98);
          border-bottom-color: var(--border-color);
          box-shadow: var(--shadow);
        }

        .dark-mode .header {
          background: rgba(26, 26, 26, 0.95);
        }

        .dark-mode .header-scrolled {
          background: rgba(26, 26, 26, 0.98);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-img {
          height: 32px;
          width: auto;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          padding: 8px 0;
          position: relative;
        }

        .nav-link:hover {
          color: var(--aws-orange);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--aws-orange);
          transition: var(--transition);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-cta {
          margin-left: 16px;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 8px;
        }

        @media (max-width: 1024px) {
          .nav {
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--background-primary);
            flex-direction: column;
            padding: 24px;
            gap: 16px;
            border-top: 1px solid var(--border-color);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
          }

          .nav-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .nav-link {
            width: 100%;
            text-align: left;
            padding: 12px 0;
            border-bottom: 1px solid var(--border-color);
          }

          .nav-link:last-of-type {
            border-bottom: none;
          }

          .nav-cta {
            margin-left: 0;
            margin-top: 16px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;