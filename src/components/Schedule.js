import React from 'react';
import { Clock } from 'lucide-react';

const Schedule = ({ schedule }) => {
  return (
    <section id="schedule" style={styles.section}>
      <div className="container">
        <h2 style={styles.title}>Schedule</h2>
        <div style={styles.timeline}>
          {schedule.map((item, index) => (
            <div key={index} style={styles.timelineItem}>
              <div style={styles.time}>
                <Clock size={20} />
                <span>{item.time}</span>
              </div>
              <div style={styles.event}>
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '80px 0',
    background: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '60px',
    color: '#232F3E',
  },
  timeline: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #eee',
    gap: '30px',
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '120px',
    color: '#FF9900',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  event: {
    flex: 1,
  },
};

export default Schedule;