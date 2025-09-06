import React, { useState } from 'react';
import { Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';

const Speakers = ({ speakers }) => {
  const [hoveredSpeaker, setHoveredSpeaker] = useState(null);

  const handleSocialClick = (url, e) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="speakers" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet Our Expert Speakers</h2>
          <p className="section-subtitle">
            Learn from industry leaders and AWS experts who are shaping the future of cloud computing.
          </p>
        </div>

        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              className="speaker-card"
              onMouseEnter={() => setHoveredSpeaker(speaker.id)}
              onMouseLeave={() => setHoveredSpeaker(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="speaker-image-container">
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="speaker-image"
                />
                <div className={`speaker-overlay ${hoveredSpeaker === speaker.id ? 'active' : ''}`}>
                  <div className="social-links">
                    {speaker.linkedin && (
                      <button
                        className="social-link linkedin"
                        onClick={(e) => handleSocialClick(speaker.linkedin, e)}
                        aria-label={`${speaker.name} LinkedIn`}
                      >
                        <Linkedin size={20} />
                      </button>
                    )}
                    {speaker.twitter && (
                      <button
                        className="social-link twitter"
                        onClick={(e) => handleSocialClick(speaker.twitter, e)}
                        aria-label={`${speaker.name} Twitter`}
                      >
                        <Twitter size={20} />
                      </button>
                    )}
                    {speaker.github && (
                      <button
                        className="social-link github"
                        onClick={(e) => handleSocialClick(speaker.github, e)}
                        aria-label={`${speaker.name} GitHub`}
                      >
                        <Github size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="speaker-content">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-designation">{speaker.designation}</p>
                <p className="speaker-company">{speaker.company}</p>
                <p className="speaker-bio">{speaker.bio}</p>
                
                <div className="speaker-actions">
                  <button className="btn btn-outline btn-small">
                    View Profile <ExternalLink size={16} />
                  </button>
                </div>
              </div>

              <div className="speaker-badge">
                <span>Speaker</span>
              </div>
            </div>
          ))}
        </div>

        <div className="speakers-cta">
          <h3>Want to be a Speaker?</h3>
          <p>We're always looking for passionate cloud professionals to share their expertise.</p>
          <a href="mailto:speakers@awsmadurai.com" className="btn btn-secondary">
            Apply to Speak
          </a>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .speakers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 80px;
        }

        .speaker-card {
          background: var(--background-primary);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          transition: var(--transition);
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .speaker-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        .speaker-image-container {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .speaker-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .speaker-card:hover .speaker-image {
          transform: scale(1.05);
        }

        .speaker-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 153, 0, 0.9), 
            rgba(35, 47, 62, 0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }

        .speaker-overlay.active {
          opacity: 1;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }

        .social-link.linkedin:hover {
          background: #0077b5;
          border-color: #0077b5;
        }

        .social-link.twitter:hover {
          background: #1da1f2;
          border-color: #1da1f2;
        }

        .social-link.github:hover {
          background: #333;
          border-color: #333;
        }

        .speaker-content {
          padding: 24px;
        }

        .speaker-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .speaker-designation {
          font-size: 1rem;
          font-weight: 600;
          color: var(--aws-orange);
          margin-bottom: 4px;
        }

        .speaker-company {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .speaker-bio {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .speaker-actions {
          display: flex;
          gap: 12px;
        }

        .btn-small {
          padding: 8px 16px;
          font-size: 14px;
        }

        .speaker-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--aws-orange);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .speakers-cta {
          background: var(--background-secondary);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          border: 2px dashed var(--border-color);
        }

        .speakers-cta h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .speakers-cta p {
          margin-bottom: 24px;
          color: var(--text-secondary);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .speakers-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .speaker-card {
            margin: 0 auto;
            max-width: 400px;
          }

          .speaker-image-container {
            height: 240px;
          }

          .speaker-content {
            padding: 20px;
          }

          .social-links {
            gap: 12px;
          }

          .social-link {
            width: 40px;
            height: 40px;
          }

          .speakers-cta {
            padding: 32px 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default Speakers;