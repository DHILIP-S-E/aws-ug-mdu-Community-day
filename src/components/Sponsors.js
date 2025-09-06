import React from 'react';

const Sponsors = ({ sponsors }) => {
  return (
    <section id="sponsors" style={styles.section}>
      <div className="container">
        <h2 style={styles.title}>Sponsors</h2>
        <div style={styles.grid}>
          {sponsors.map((sponsor, index) => (
            <a 
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.sponsorLink}
            >
              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                style={styles.logo}
              />
            </a>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    alignItems: 'center',
  },
  sponsorLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textDecoration: 'none',
  },
  logo: {
    maxWidth: '150px',
    maxHeight: '80px',
    objectFit: 'contain',
    filter: 'grayscale(100%)',
    transition: 'filter 0.3s ease',
  },
};

export default Sponsors;