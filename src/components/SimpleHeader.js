import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const SimpleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'highlights', label: 'Why Attend' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'location', label: 'Location' },
    { id: 'registration', label: 'Register' }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/img/aws_logo_smile.png" alt="AWS" />
            <span>AWS User Group Madurai</span>
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
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('registration')}
            >
              Register Free
            </button>
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          background: white;
          box-shadow: var(--shadow);
          z-index: 1000;
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
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--gray-900);
        }

        .logo img {
          height: 32px;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--gray-600);
          font-weight: 500;
          cursor: pointer;
          padding: 8px 0;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: var(--aws-orange);
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-600);
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
            background: white;
            flex-direction: column;
            padding: 20px;
            gap: 16px;
            box-shadow: var(--shadow);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
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
          }
        }
      `}</style>
    </header>
  );
};

export default SimpleHeader;