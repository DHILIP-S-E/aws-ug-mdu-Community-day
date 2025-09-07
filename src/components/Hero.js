import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import LiveCountdown from './LiveCountdown';

const Hero = ({ eventData }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const calculateTimeLeft = () => {
      const eventDate = new Date(eventData.date + 'T09:00:00');
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return {};
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventData.date]);

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-gradient"></div>
      </div>
      
      <div className="container">
        <div className={`hero-content ${isLoaded ? 'animate-fade-in-up' : ''}`}>
          <div className="hero-badge">
            <span className="badge-text">🚀 Free Event</span>
          </div>
          
          <h1 className="hero-title">
            {eventData.name}
            <span className="hero-subtitle">{eventData.subtitle}</span>
          </h1>
          
          <p className="hero-description">
            {eventData.description}
          </p>

          <div className="hero-details">
            <div className="detail-item">
              <Calendar className="detail-icon" />
              <span>October 25, 2024</span>
            </div>
            <div className="detail-item">
              <Clock className="detail-icon" />
              <span>{eventData.time}</span>
            </div>
            <div className="detail-item">
              <MapPin className="detail-icon" />
              <span>{eventData.city}</span>
            </div>
            <div className="detail-item">
              <Users className="detail-icon" />
              <span>200+ Attendees</span>
            </div>
          </div>

          <LiveCountdown 
            eventDate={eventData.date}
            eventTime={eventData.time}
            venue={eventData.venue}
          />

          <div className="hero-actions">
            <button onClick={scrollToRegistration} className="btn btn-primary btn-large">
              Register Now <ArrowRight size={20} />
            </button>
            <a 
              href="#highlights" 
              className="btn btn-secondary btn-large"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Expert Speakers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Technical Sessions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Hours of Learning</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(255, 153, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(35, 47, 62, 0.1) 0%, transparent 50%);
        }

        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 153, 0, 0.05) 0%, 
            rgba(35, 47, 62, 0.05) 100%);
        }

        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .hero-content.animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-badge {
          display: inline-block;
          margin-bottom: 24px;
        }

        .badge-text {
          background: linear-gradient(135deg, var(--aws-orange), var(--aws-orange-dark));
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          animation: pulse 2s infinite;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          margin-bottom: 16px;
          background: linear-gradient(135deg, var(--text-primary), var(--aws-orange));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .hero-subtitle {
          display: block;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 600;
          margin-top: 8px;
          color: var(--aws-orange);
        }

        .hero-description {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-details {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 40px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .detail-icon {
          color: var(--aws-orange);
        }

        .countdown {
          margin-bottom: 40px;
        }

        .countdown-title {
          font-size: 1.2rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .countdown-item {
          background: var(--background-primary);
          border: 2px solid var(--border-color);
          border-radius: 12px;
          padding: 16px;
          min-width: 80px;
          text-align: center;
          box-shadow: var(--shadow);
        }

        .countdown-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--aws-orange);
        }

        .countdown-label {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-transform: capitalize;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .btn-large {
          padding: 16px 32px;
          font-size: 18px;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--aws-orange);
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .hero {
            padding-top: 100px;
            min-height: 90vh;
          }

          .hero-details {
            gap: 16px;
          }

          .detail-item {
            font-size: 14px;
          }

          .countdown-timer {
            gap: 12px;
          }

          .countdown-item {
            padding: 12px;
            min-width: 70px;
          }

          .countdown-value {
            font-size: 1.5rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn-large {
            width: 100%;
            max-width: 280px;
          }

          .hero-stats {
            gap: 24px;
          }

          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;