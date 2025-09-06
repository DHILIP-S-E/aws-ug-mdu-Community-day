import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin } from 'lucide-react';

const Location = ({ config }) => {
  const position = [parseFloat(config.lon), parseFloat(config.lat)];

  return (
    <section id="location" style={styles.section}>
      <div className="container">
        <h2 style={styles.title}>Location</h2>
        <div style={styles.content}>
          <div style={styles.info}>
            <div style={styles.venue}>
              <MapPin size={24} color="#FF9900" />
              <div>
                <h3 style={styles.venueName}>{config.venue}</h3>
                <p style={styles.address}>{config.address}</p>
                <p style={styles.city}>{config.city}</p>
              </div>
            </div>
          </div>
          <div style={styles.mapContainer}>
            <MapContainer 
              center={position} 
              zoom={15} 
              style={styles.map}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  <strong>{config.venue}</strong><br />
                  {config.address}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
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
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  info: {
    padding: '20px',
  },
  venue: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
  },
  venueName: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#232F3E',
  },
  address: {
    fontSize: '1.1rem',
    marginBottom: '5px',
    color: '#666',
  },
  city: {
    fontSize: '1.1rem',
    color: '#666',
  },
  mapContainer: {
    height: '400px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  map: {
    height: '100%',
    width: '100%',
  },
};

export default Location;