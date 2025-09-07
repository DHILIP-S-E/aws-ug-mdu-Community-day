import React, { useState } from 'react';
import { Linkedin, Twitter, Github, ExternalLink, MapPin, Award, Users } from 'lucide-react';

const SpeakersEnhanced = ({ speakers }) => {
  const [hoveredSpeaker, setHoveredSpeaker] = useState(null);


  const openSocialLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="speakers" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet Our Expert Speakers</h2>
          <p className="section-subtitle">
            Learn from industry leaders and AWS experts who will share their knowledge and real-world experiences.
          </p>
        </div>

        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              className={`speaker-card ${hoveredSpeaker === speaker.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredSpeaker(speaker.id)}
              onMouseLeave={() => setHoveredSpeaker(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="speaker-image-container">
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="speaker-image"
                  loading="lazy"
                />
                <div className="speaker-overlay">
                  <div className="social-links">
                    {speaker.linkedin && (
                      <button
                        className="social-link linkedin"
                        onClick={() => openSocialLink(speaker.linkedin)}
                        aria-label={`${speaker.name} LinkedIn`}
                      >
                        <Linkedin size={20} />
                      </button>
                    )}
                    {speaker.twitter && (
                      <button
                        className="social-link twitter"
                        onClick={() => openSocialLink(speaker.twitter)}
                        aria-label={`${speaker.name} Twitter`}
                      >
                        <Twitter size={20} />
                      </button>
                    )}
                    {speaker.github && (
                      <button
                        className="social-link github"
                        onClick={() => openSocialLink(speaker.github)}
                        aria-label={`${speaker.name} GitHub`}
                      >
                        <Github size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="speaker-badge">
                  <Award size={16} />
                  <span>Expert</span>
                </div>
              </div>

              <div className="speaker-content">
                <h3 className="speaker-name">{speaker.name}</h3>
                <div className="speaker-title">
                  <span className="designation">{speaker.designation}</span>
                  <span className="company">@ {speaker.company}</span>
                </div>
                
                <p className="speaker-bio">{speaker.bio}</p>

                <div className="speaker-stats">
                  <div className="stat">
                    <Users size={16} />
                    <span>8+ Years Experience</span>
                  </div>
                  <div className="stat">
                    <MapPin size={16} />
                    <span>Industry Expert</span>
                  </div>
                </div>

                <div className="speaker-topics">
                  <h4>Speaking About:</h4>
                  <div className="topics-list">
                    <span className="topic">Cloud Architecture</span>
                    <span className="topic">Best Practices</span>
                    <span className="topic">Real-world Cases</span>
                  </div>
                </div>
              </div>

              <div className="speaker-actions">
                <button className="btn btn-outline btn-small">
                  View Sessions
                </button>
                <button 
                  className="btn btn-secondary btn-small"
                  onClick={() => {
                    if (speaker.linkedin) {
                      openSocialLink(speaker.linkedin);
                    }
                  }}
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="speakers-cta">
          <div className="cta-content">
            <h3>Want to Connect with Our Speakers?</h3>
            <p>Join our networking sessions and get direct access to industry experts.</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Register to Network
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .speakers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
          opacity: 0;
          transform: translateY(30px);
          animation: slideInUp 0.6s ease-out forwards;
          position: relative;
        }

        .speaker-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-large);
        }

        .speaker-card.hovered .speaker-overlay {
          opacity: 1;
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
          background: linear-gradient(
            135deg,
            rgba(35, 47, 62, 0.8),
            rgba(255, 153, 0, 0.8)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid white;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: white;
          color: var(--aws-blue);
          transform: scale(1.1);
        }

        .social-link.linkedin:hover {
          background: #0077B5;
          color: white;
        }

        .social-link.twitter:hover {
          background: #1DA1F2;
          color: white;
        }

        .social-link.github:hover {
          background: #333;
          color: white;
        }

        .speaker-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--aws-orange);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .speaker-content {
          padding: 24px;
        }

        .speaker-name {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .speaker-title {
          margin-bottom: 16px;
        }

        .designation {
          font-weight: 600;
          color: var(--aws-orange);
          display: block;
        }

        .company {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .speaker-bio {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .speaker-stats {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .speaker-topics h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .topics-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .topic {
          background: var(--background-secondary);
          color: var(--text-secondary);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .speaker-actions {
          padding: 0 24px 24px;
          display: flex;
          gap: 12px;
        }

        .speaker-actions .btn {
          flex: 1;
        }

        .speakers-cta {
          background: var(--background-secondary);
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          border: 2px dashed var(--aws-orange);
        }

        .cta-content h3 {
          font-size: 1.8rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .cta-content p {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 1.1rem;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
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

          .speaker-actions {
            padding: 0 20px 20px;
            flex-direction: column;
          }

          .speakers-cta {
            padding: 40px 24px;
          }

          .cta-content h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SpeakersEnhanced;