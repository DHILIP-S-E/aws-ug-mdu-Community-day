import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare, Share2, ChevronUp, X } from 'lucide-react';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
    setIsExpanded(false);
  };

  const scrollToQA = () => {
    document.getElementById('live-qa')?.scrollIntoView({ behavior: 'smooth' });
    setIsExpanded(false);
  };

  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AWS User Group Madurai - Cloud Community Day',
          text: 'Join me at the AWS Community Day in Dindigul! Free event with expert speakers and hands-on sessions.',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `Join me at AWS User Group Madurai - Cloud Community Day! Free event with expert speakers and hands-on sessions. Register at: ${window.location.href}`;
      navigator.clipboard.writeText(text);
      alert('Event link copied to clipboard!');
    }
    setIsExpanded(false);
  };

  const actions = [
    {
      id: 'register',
      icon: Calendar,
      label: 'Register',
      color: '#FF9900',
      onClick: scrollToRegistration
    },
    {
      id: 'qa',
      icon: MessageSquare,
      label: 'Ask Question',
      color: '#2196F3',
      onClick: scrollToQA
    },
    {
      id: 'share',
      icon: Share2,
      label: 'Share Event',
      color: '#4CAF50',
      onClick: shareEvent
    }
  ];

  return (
    <>
      {/* Main FAB */}
      <div className={`fab-container ${isExpanded ? 'expanded' : ''}`}>
        <div className="fab-actions">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                className="fab-action"
                onClick={action.onClick}
                style={{
                  backgroundColor: action.color,
                  animationDelay: `${index * 0.1}s`
                }}
                title={action.label}
              >
                <IconComponent size={20} />
                <span className="fab-label">{action.label}</span>
              </button>
            );
          })}
        </div>
        
        <button
          className="fab-main"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Quick actions"
        >
          {isExpanded ? <X size={24} /> : <Calendar size={24} />}
        </button>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <style jsx>{`
        .fab-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .fab-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .fab-container.expanded .fab-actions {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .fab-action {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          opacity: 0;
          transform: scale(0.8);
          animation: fabActionIn 0.3s ease-out forwards;
        }

        .fab-action:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .fab-label {
          position: absolute;
          right: 70px;
          background: var(--text-primary);
          color: var(--background-primary);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.2s ease;
          pointer-events: none;
        }

        .fab-label::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: var(--text-primary);
        }

        .fab-action:hover .fab-label {
          opacity: 1;
          transform: translateX(0);
        }

        .fab-main {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, var(--aws-orange), var(--aws-orange-dark));
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(255, 153, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .fab-main:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(255, 153, 0, 0.4);
        }

        .fab-main:active {
          transform: scale(0.95);
        }

        .fab-container.expanded .fab-main {
          transform: rotate(45deg);
        }

        .fab-container.expanded .fab-main:hover {
          transform: rotate(45deg) scale(1.1);
        }

        .scroll-top-btn {
          position: fixed;
          bottom: 30px;
          left: 30px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: var(--background-primary);
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-large);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          border: 2px solid var(--border-color);
          animation: slideInLeft 0.3s ease-out;
        }

        .scroll-top-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          background: var(--aws-orange);
          color: white;
          border-color: var(--aws-orange);
        }

        /* Backdrop for expanded FAB */
        .fab-container.expanded::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          z-index: -1;
          opacity: 0;
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes fabActionIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .fab-container {
            bottom: 20px;
            right: 20px;
          }

          .scroll-top-btn {
            bottom: 20px;
            left: 20px;
            width: 48px;
            height: 48px;
          }

          .fab-main {
            width: 56px;
            height: 56px;
          }

          .fab-action {
            width: 48px;
            height: 48px;
          }

          .fab-label {
            display: none;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .fab-container,
          .fab-actions,
          .fab-action,
          .fab-main,
          .scroll-top-btn {
            transition: none;
            animation: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .fab-main {
            border: 2px solid white;
          }

          .fab-action {
            border: 2px solid white;
          }

          .scroll-top-btn {
            border: 2px solid var(--text-primary);\n          }
        }
      `}</style>
    </>
  );
};

export default FloatingActionButton;