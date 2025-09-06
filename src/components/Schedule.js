import React, { useState } from 'react';
import { Clock, User, Calendar, Plus, ChevronDown, ChevronUp } from 'lucide-react';

const Schedule = ({ schedule }) => {
  const [expandedSession, setExpandedSession] = useState(null);

  const getSessionTypeColor = (type) => {
    const colors = {
      keynote: 'var(--aws-orange)',
      technical: '#2196F3',
      panel: '#9C27B0',
      break: '#4CAF50',
      closing: '#FF5722'
    };
    return colors[type] || 'var(--text-secondary)';
  };

  const getSessionTypeIcon = (type) => {
    const icons = {
      keynote: '🎯',
      technical: '⚡',
      panel: '💬',
      break: '☕',
      closing: '🎉'
    };
    return icons[type] || '📋';
  };

  const addToCalendar = (session) => {
    const eventDate = '2024-04-15';
    const startTime = session.time.split(' - ')[0];
    const endTime = session.time.split(' - ')[1];
    
    const startDateTime = `${eventDate}T${convertTo24Hour(startTime)}:00`;
    const endDateTime = `${eventDate}T${convertTo24Hour(endTime)}:00`;
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(session.title)}&dates=${startDateTime.replace(/[-:]/g, '')}/${endDateTime.replace(/[-:]/g, '')}&details=${encodeURIComponent(session.description)}&location=${encodeURIComponent('The Gateway Hotel Pasumalai, Madurai')}&sf=true&output=xml`;
    
    window.open(calendarUrl, '_blank');
  };

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  return (
    <section id="schedule" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Event Schedule</h2>
          <p className="section-subtitle">
            A full day of learning, networking, and hands-on experiences with AWS technologies.
          </p>
        </div>

        <div className="schedule-container">
          <div className="schedule-timeline">
            {schedule.map((session, index) => (
              <div
                key={session.id}
                className={`schedule-item ${session.type}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="schedule-time">
                  <div className="time-indicator" style={{ backgroundColor: getSessionTypeColor(session.type) }}>
                    <span className="time-icon">{getSessionTypeIcon(session.type)}</span>
                  </div>
                  <div className="time-details">
                    <span className="time-text">{session.time}</span>
                    <span className="time-duration">
                      {session.type === 'break' ? 'Break' : '45 min'}
                    </span>
                  </div>
                </div>

                <div className="schedule-content">
                  <div className="session-header">
                    <h3 className="session-title">{session.title}</h3>
                    <div className="session-meta">
                      {session.speaker && (
                        <div className="session-speaker">
                          <User size={16} />
                          <span>{session.speaker}</span>
                        </div>
                      )}
                      <div className="session-type" style={{ color: getSessionTypeColor(session.type) }}>
                        {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                      </div>
                    </div>
                  </div>

                  <p className="session-description">{session.description}</p>

                  <div className="session-actions">
                    <button
                      className="btn btn-outline btn-small"
                      onClick={() => addToCalendar(session)}
                    >
                      <Calendar size={16} />
                      Add to Calendar
                    </button>
                    
                    {session.type !== 'break' && (
                      <button
                        className="btn btn-secondary btn-small"
                        onClick={() => setExpandedSession(
                          expandedSession === session.id ? null : session.id
                        )}
                      >
                        {expandedSession === session.id ? (
                          <>Less Info <ChevronUp size={16} /></>
                        ) : (
                          <>More Info <ChevronDown size={16} /></>
                        )}
                      </button>
                    )}
                  </div>

                  {expandedSession === session.id && session.type !== 'break' && (
                    <div className="session-expanded">
                      <div className="expanded-content">
                        <h4>What You'll Learn:</h4>
                        <ul>
                          <li>Key concepts and best practices</li>
                          <li>Real-world implementation examples</li>
                          <li>Hands-on demonstrations</li>
                          <li>Q&A with the expert</li>
                        </ul>
                        
                        <div className="session-tags">
                          <span className="tag">AWS</span>
                          <span className="tag">Cloud</span>
                          <span className="tag">Best Practices</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {index < schedule.length - 1 && <div className="timeline-connector"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="schedule-cta">
          <div className="cta-content">
            <Clock size={48} className="cta-icon" />
            <h3>Don't Miss Out!</h3>
            <p>Register now to secure your spot and receive calendar invites for all sessions.</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .schedule-container {
          max-width: 800px;
          margin: 0 auto 80px;
        }

        .schedule-timeline {
          position: relative;
        }

        .schedule-item {
          display: flex;
          gap: 32px;
          margin-bottom: 40px;
          position: relative;
          opacity: 0;
          transform: translateX(-30px);
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .schedule-item:nth-child(even) {
          transform: translateX(30px);
          animation: slideInRight 0.6s ease-out forwards;
        }

        .schedule-time {
          flex-shrink: 0;
          width: 140px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .time-indicator {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          box-shadow: var(--shadow);
        }

        .time-icon {
          font-size: 1.2rem;
        }

        .time-details {
          display: flex;
          flex-direction: column;
        }

        .time-text {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .time-duration {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .schedule-content {
          flex: 1;
          background: var(--background-primary);
          border-radius: 16px;
          padding: 24px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          transition: var(--transition);
        }

        .schedule-content:hover {
          box-shadow: var(--shadow-hover);
        }

        .session-header {
          margin-bottom: 16px;
        }

        .session-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .session-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .session-speaker {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .session-type {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .session-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .session-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-small {
          padding: 8px 16px;
          font-size: 14px;
        }

        .session-expanded {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          animation: expandDown 0.3s ease-out;
        }

        .expanded-content h4 {
          font-size: 1rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .expanded-content ul {
          margin-bottom: 16px;
          padding-left: 20px;
        }

        .expanded-content li {
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .session-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          background: var(--aws-orange);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .timeline-connector {
          position: absolute;
          left: 23px;
          top: 48px;
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, var(--border-color), transparent);
        }

        .schedule-cta {
          background: linear-gradient(135deg, var(--background-primary), var(--background-secondary));
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          border: 2px solid var(--border-color);
        }

        .cta-icon {
          color: var(--aws-orange);
          margin-bottom: 20px;
        }

        .cta-content h3 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .cta-content p {
          font-size: 1.1rem;
          margin-bottom: 32px;
          color: var(--text-secondary);
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expandDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 200px;
          }
        }

        @media (max-width: 768px) {
          .schedule-item {
            flex-direction: column;
            gap: 16px;
          }

          .schedule-time {
            width: auto;
            align-items: center;
          }

          .time-details {
            align-items: flex-start;
          }

          .schedule-content {
            padding: 20px;
          }

          .session-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .session-actions {
            flex-direction: column;
          }

          .btn-small {
            width: 100%;
          }

          .schedule-cta {
            padding: 40px 24px;
          }

          .cta-content h3 {
            font-size: 1.5rem;
          }

          .timeline-connector {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Schedule;