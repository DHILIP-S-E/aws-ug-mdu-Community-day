import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const SimpleHero = ({ eventData }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
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
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀 FREE EVENT</span>
          </div>
          
          <h1>{eventData.name}</h1>
          <h2 className="hero-subtitle">{eventData.subtitle}</h2>
          
          <p className="hero-description">
            Join us for a day of learning, networking, and hands-on experiences with AWS technologies.
          </p>

          <div className="event-details">
            <div className="detail">
              <Calendar size={20} />
              <span>October 25, 2024</span>
            </div>
            <div className="detail">
              <Clock size={20} />
              <span>{eventData.time}</span>
            </div>
            <div className="detail">
              <MapPin size={20} />
              <span>{eventData.city}</span>
            </div>
            <div className="detail">
              <Users size={20} />
              <span>200+ Attendees</span>
            </div>
          </div>

          {Object.keys(timeLeft).length > 0 && (
            <div className="countdown">
              <h3>Event Starts In</h3>
              <div className="countdown-timer">
                <div className="time-unit">
                  <span className="time-value">{timeLeft.days || 0}</span>
                  <span className="time-label">Days</span>
                </div>
                <div className="time-unit">
                  <span className="time-value">{timeLeft.hours || 0}</span>
                  <span className="time-label">Hours</span>
                </div>
                <div className="time-unit">
                  <span className="time-value">{timeLeft.minutes || 0}</span>
                  <span className="time-label">Minutes</span>
                </div>
                <div className="time-unit">
                  <span className="time-value">{timeLeft.seconds || 0}</span>
                  <span className="time-label">Seconds</span>
                </div>
              </div>
            </div>
          )}

          <div className="hero-actions">
            <button onClick={scrollToRegistration} className="btn btn-primary btn-large">
              Register Now - It's Free!
            </button>
            <a href="#highlights" className="btn btn-outline btn-large">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #FF9900 0%, #E88900 100%);
          color: white;
          padding: 120px 0 80px;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 24px;
          font-weight: 600;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 8px;
        }

        .hero-subtitle {
          font-size: 2rem;
          font-weight: 400;
          margin-bottom: 24px;
          opacity: 0.9;
        }

        .hero-description {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .event-details {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .detail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .countdown {
          margin-bottom: 40px;
        }

        .countdown h3 {
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .time-unit {
          background: rgba(255, 255, 255, 0.15);
          padding: 20px;
          border-radius: 12px;
          min-width: 80px;
        }

        .time-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .time-label {
          display: block;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 100px 0 60px;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.5rem;
          }

          .event-details {
            gap: 16px;
          }

          .countdown-timer {
            gap: 12px;
          }

          .time-unit {
            min-width: 70px;
            padding: 16px;
          }

          .time-value {
            font-size: 2rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default SimpleHero;