import React, { useState, useEffect } from 'react';
import { Clock, Calendar, MapPin } from 'lucide-react';

const LiveCountdown = ({ eventDate, eventTime, venue }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isEventStarted, setIsEventStarted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDateTime = new Date(`${eventDate}T09:00:00`);
      const now = new Date();
      const difference = eventDateTime - now;

      return {
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60))
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [eventDate]);

  // Always show countdown, never show "Event is Live"

  return (
    <div className="countdown-container">
      <div className="countdown-header">
        <Clock className="countdown-icon" />
        <div>
          <h3>Event Starts In</h3>
          <p>Don't miss out on this amazing opportunity!</p>
        </div>
      </div>
      
      <div className="countdown-timer">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="countdown-unit">
            <div className="countdown-value">{value.toString().padStart(2, '0')}</div>
            <div className="countdown-label">{unit}</div>
          </div>
        ))}
      </div>

      <div className="event-info">
        <div className="info-item">
          <Calendar size={16} />
          <span>October 25, 2024</span>
        </div>
        <div className="info-item">
          <Clock size={16} />
          <span>{eventTime}</span>
        </div>
        <div className="info-item">
          <MapPin size={16} />
          <span>{venue}</span>
        </div>
      </div>

      <style jsx>{`
        .countdown-container {
          background: linear-gradient(135deg, var(--aws-orange), var(--aws-orange-dark));
          color: white;
          padding: 32px;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(255, 153, 0, 0.3);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .countdown-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
          z-index: 0;
        }

        .countdown-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .countdown-icon {
          background: rgba(255, 255, 255, 0.2);
          padding: 12px;
          border-radius: 50%;
          width: 48px;
          height: 48px;
        }

        .countdown-header h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .countdown-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .countdown-unit {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 20px 16px;
          min-width: 80px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .countdown-unit:hover {
          transform: translateY(-4px);
        }

        .countdown-value {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .countdown-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.9;
          font-weight: 600;
        }

        .event-info {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @media (max-width: 768px) {
          .countdown-container {
            padding: 24px;
          }

          .countdown-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .countdown-timer {
            gap: 12px;
          }

          .countdown-unit {
            padding: 16px 12px;
            min-width: 70px;
          }

          .countdown-value {
            font-size: 2rem;
          }

          .event-info {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .countdown-timer {
            grid-template-columns: repeat(2, 1fr);
            display: grid;
          }

          .countdown-unit {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveCountdown;