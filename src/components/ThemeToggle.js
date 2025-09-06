import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      
      <style jsx>{`
        .theme-toggle {
          position: fixed;
          top: 100px;
          right: 20px;
          z-index: 1001;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--background-primary);
          border: 2px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          box-shadow: var(--shadow);
        }

        .theme-toggle:hover {
          background: var(--aws-orange);
          color: white;
          border-color: var(--aws-orange);
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .theme-toggle {
            top: 80px;
            right: 16px;
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </button>
  );
};

export default ThemeToggle;