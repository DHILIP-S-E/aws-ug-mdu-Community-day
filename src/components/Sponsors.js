import React from 'react';
import { ExternalLink } from 'lucide-react';

const Sponsors = ({ sponsors }) => {
  const sponsorsByTier = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {});

  const tierConfig = {
    title: {
      name: 'Title Sponsor',
      color: '#FFD700',
      size: 'large'
    },
    platinum: {
      name: 'Platinum Partners',
      color: '#E5E4E2',
      size: 'medium'
    },
    gold: {
      name: 'Gold Partners',
      color: '#FFD700',
      size: 'medium'
    },
    silver: {
      name: 'Silver Partners',
      color: '#C0C0C0',
      size: 'small'
    }
  };

  const handleSponsorClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="sponsors" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Amazing Sponsors</h2>
          <p className="section-subtitle">
            Thank you to our incredible sponsors who make this event possible and support the AWS community.
          </p>
        </div>

        <div className="sponsors-content">
          {Object.entries(sponsorsByTier).map(([tier, tierSponsors]) => (
            <div key={tier} className="sponsor-tier">
              <h3 
                className="tier-title"
                style={{ color: tierConfig[tier]?.color || 'var(--text-primary)' }}
              >
                {tierConfig[tier]?.name || tier}
              </h3>
              
              <div className={`sponsors-grid ${tierConfig[tier]?.size || 'medium'}`}>
                {tierSponsors.map((sponsor, index) => (
                  <div
                    key={sponsor.name}
                    className="sponsor-card"
                    onClick={() => handleSponsorClick(sponsor.url)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="sponsor-logo-container">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="sponsor-logo"
                      />
                      <div className="sponsor-overlay">
                        <ExternalLink className="overlay-icon" />
                        <span className="overlay-text">Visit Website</span>
                      </div>
                    </div>
                    <div className="sponsor-info">
                      <h4 className="sponsor-name">{sponsor.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sponsorship-cta">
          <div className="cta-content">
            <h3>Interested in Sponsoring?</h3>
            <p>
              Join our community of sponsors and showcase your brand to 200+ cloud professionals. 
              Multiple sponsorship packages available.
            </p>
            <div className="cta-actions">
              <a 
                href="mailto:sponsors@awsmadurai.com" 
                className="btn btn-primary"
              >
                Become a Sponsor
              </a>
              <a 
                href="/sponsorship-deck.pdf" 
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Sponsorship Deck
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .sponsors-content {
          display: flex;
          flex-direction: column;
          gap: 60px;
          margin-bottom: 80px;
        }

        .sponsor-tier {
          text-align: center;
        }

        .tier-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 40px;
          position: relative;
          display: inline-block;
        }

        .tier-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: currentColor;
          border-radius: 2px;
        }

        .sponsors-grid {
          display: grid;
          gap: 32px;
          justify-items: center;
        }

        .sponsors-grid.large {
          grid-template-columns: 1fr;
          max-width: 400px;
          margin: 0 auto;
        }

        .sponsors-grid.medium {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          max-width: 800px;
          margin: 0 auto;
        }

        .sponsors-grid.small {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          max-width: 1000px;
          margin: 0 auto;
        }

        .sponsor-card {
          background: var(--background-primary);
          border-radius: 16px;
          padding: 32px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: var(--transition);
          width: 100%;
          max-width: 300px;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .sponsor-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        .sponsor-logo-container {
          position: relative;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          overflow: hidden;
          border-radius: 8px;
        }

        .sponsor-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: grayscale(100%);
          transition: var(--transition);
        }

        .sponsor-card:hover .sponsor-logo {
          filter: grayscale(0%);
        }

        .sponsor-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 153, 0, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          transition: var(--transition);
          color: white;
        }

        .sponsor-card:hover .sponsor-overlay {
          opacity: 1;
        }

        .overlay-icon {
          width: 24px;
          height: 24px;
        }

        .overlay-text {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .sponsor-info {
          text-align: center;
        }

        .sponsor-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .sponsorship-cta {
          background: linear-gradient(135deg, 
            var(--background-primary), 
            var(--background-secondary));
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          border: 2px dashed var(--border-color);
          position: relative;
          overflow: hidden;
        }

        .sponsorship-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF9900' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E") repeat;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-content h3 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .cta-content p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .sponsors-grid.large,
          .sponsors-grid.medium,
          .sponsors-grid.small {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .sponsor-card {
            max-width: 100%;
            padding: 24px;
          }

          .sponsor-logo-container {
            height: 100px;
          }

          .tier-title {
            font-size: 1.5rem;
          }

          .sponsorship-cta {
            padding: 40px 24px;
          }

          .cta-content h3 {
            font-size: 1.5rem;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-actions .btn {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </section>
  );
};

export default Sponsors;