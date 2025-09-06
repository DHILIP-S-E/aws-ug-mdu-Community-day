import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const Speakers = ({ speakers }) => {
  return (
    <section id="speakers" style={styles.section}>
      <div className="container">
        <h2 style={styles.title}>Speakers</h2>
        <div style={styles.grid}>
          {speakers.map((speaker, index) => (
            <div key={index} style={styles.card}>
              <img 
                src={speaker.photo} 
                alt={speaker.name}
                style={styles.photo}
              />
              <h3 style={styles.name}>{speaker.name}</h3>
              <div style={styles.social}>
                {speaker.linkedin && (
                  <a href={speaker.linkedin} style={styles.socialLink}>
                    <Linkedin size={20} />
                  </a>
                )}
                {speaker.twitter && (
                  <a href={`https://twitter.com/${speaker.twitter}`} style={styles.socialLink}>
                    <Twitter size={20} />
                  </a>
                )}
                {speaker.git && (
                  <a href={speaker.git} style={styles.socialLink}>
                    <Github size={20} />
                  </a>
                )}
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
    background: '#f8f9fa',
  },
  title: {
    textAlign: 'center',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '60px',
    color: '#232F3E',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  photo: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '4px solid #FF9900',
  },
  name: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#232F3E',
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  socialLink: {
    color: '#FF9900',
    transition: 'color 0.3s ease',
    textDecoration: 'none',
  },
};

export default Speakers;