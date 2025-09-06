import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ config }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.nav}>
          <h1 style={styles.logo}>{config.name}</h1>
          
          <button 
            style={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav style={{...styles.navMenu, ...(isMenuOpen ? styles.navMenuOpen : {})}}>
            {config.sections.map(section => (
              <button
                key={section}
                style={styles.navLink}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div style={styles.hero}>
          <h2 style={styles.heroTitle}>{config.name}</h2>
          <p style={styles.heroSubtitle}>{config.description}</p>
          <p style={styles.heroDate}>{config.date} • {config.city}</p>
          {config.callToAction && (
            <a href={config.callToAction.link} className="btn" style={styles.cta}>
              {config.callToAction.text}
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: 'linear-gradient(135deg, #232F3E 0%, #FF9900 100%)',
    color: 'white',
    minHeight: '100vh',
    position: 'relative',
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  navMenu: {
    display: 'flex',
    gap: '30px',
    '@media (max-width: 768px)': {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: '#232F3E',
      flexDirection: 'column',
      padding: '20px',
      transform: 'translateY(-100%)',
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 0.3s ease',
    },
  },
  navMenuOpen: {
    transform: 'translateY(0)',
    opacity: 1,
    visibility: 'visible',
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '10px 0',
    transition: 'color 0.3s ease',
  },
  hero: {
    textAlign: 'center',
    padding: '100px 0',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    marginBottom: '10px',
    opacity: 0.9,
  },
  heroDate: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    marginBottom: '40px',
    opacity: 0.8,
  },
  cta: {
    fontSize: '18px',
    padding: '15px 30px',
  },
};

// Add responsive styles
const mediaQuery = window.matchMedia('(max-width: 768px)');
if (mediaQuery.matches) {
  styles.menuButton.display = 'block';
  Object.assign(styles.navMenu, {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: '#232F3E',
    flexDirection: 'column',
    padding: '20px',
    transform: 'translateY(-100%)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
  });
}

export default Header;