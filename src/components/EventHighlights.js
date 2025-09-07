import React from 'react';

const EventHighlights = ({ highlights }) => {
  return (
    <section id="highlights" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Attend AWS User Route?</h2>
          <p className="section-subtitle">
            Discover cutting-edge cloud technologies, network with industry experts, 
            and accelerate your cloud journey with hands-on learning experiences.
          </p>
        </div>

        <div className="highlights-grid">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="highlight-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="highlight-icon">
                <span className="icon-emoji">{highlight.icon}</span>
              </div>
              <h3 className="highlight-title">{highlight.title}</h3>
              <p className="highlight-description">{highlight.description}</p>
              <div className="highlight-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M7 17L17 7M17 7H7M17 7V17" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="highlights-cta">
          <div className="cta-content">
            <h3>Ready to Transform Your Cloud Skills?</h3>
            <p>Join 200+ cloud professionals for a day of intensive learning and networking.</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Secure Your Spot
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 80px;
        }

        .highlight-card {
          background: var(--background-primary);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .highlight-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--aws-orange), var(--aws-orange-dark));
          transform: scaleX(0);
          transition: var(--transition);
        }

        .highlight-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        .highlight-card:hover::before {
          transform: scaleX(1);
        }

        .highlight-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, var(--aws-orange), var(--aws-orange-dark));
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .icon-emoji {
          font-size: 2.5rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .highlight-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .highlight-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .highlight-arrow {
          position: absolute;
          top: 24px;
          right: 24px;
          color: var(--aws-orange);
          opacity: 0;
          transform: translate(10px, -10px);
          transition: var(--transition);
        }

        .highlight-card:hover .highlight-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        .highlights-cta {
          background: linear-gradient(135deg, var(--aws-orange), var(--aws-orange-dark));
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .highlights-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-content h3 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: white;
        }

        .cta-content p {
          font-size: 1.1rem;
          margin-bottom: 32px;
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-content .btn {
          background: white;
          color: var(--aws-orange);
          border: none;
        }

        .cta-content .btn:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .highlights-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .highlight-card {
            padding: 24px;
          }

          .highlight-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 20px;
          }

          .icon-emoji {
            font-size: 2rem;
          }

          .highlight-title {
            font-size: 1.3rem;
          }

          .highlights-cta {
            padding: 40px 24px;
          }

          .cta-content h3 {
            font-size: 1.5rem;
          }

          .btn-large {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default EventHighlights;