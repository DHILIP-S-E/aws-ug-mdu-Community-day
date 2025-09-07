import React, { useState } from 'react';
import { MapPin, Navigation, Car, Phone, Globe, Clock } from 'lucide-react';

const Location = ({ eventData }) => {
  const [activeTab, setActiveTab] = useState('map');

  const openDirections = () => {
    const address = encodeURIComponent(eventData.address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(url, '_blank');
  };

  const openInMaps = () => {
    const { lat, lng } = eventData.coordinates;
    const url = `https://www.google.com/maps/@${lat},${lng},17z`;
    window.open(url, '_blank');
  };

  return (
    <section id="location" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Event Location</h2>
          <p className="section-subtitle">
            Join us at the prestigious Gateway Hotel Pasumalai in the heart of Madurai.
          </p>
        </div>

        <div className="location-content">
          <div className="location-info">
            <div className="venue-card">
              <div className="venue-header">
                <h3 className="venue-name">{eventData.venue}</h3>
                <div className="venue-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">5-Star Hotel</span>
                </div>
              </div>
              
              <div className="venue-details">
                <div className="detail-item">
                  <MapPin className="detail-icon" />
                  <div>
                    <strong>Address</strong>
                    <p>{eventData.address}</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Clock className="detail-icon" />
                  <div>
                    <strong>Event Hours</strong>
                    <p>{eventData.time}</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Car className="detail-icon" />
                  <div>
                    <strong>Parking</strong>
                    <p>Complimentary valet parking available</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Phone className="detail-icon" />
                  <div>
                    <strong>Contact</strong>
                    <p>+91 452 371 8888</p>
                  </div>
                </div>
              </div>

              <div className="venue-actions">
                <button className="btn btn-primary" onClick={openDirections}>
                  <Navigation size={16} />
                  Get Directions
                </button>
                <button className="btn btn-outline" onClick={openInMaps}>
                  <Globe size={16} />
                  View on Maps
                </button>
              </div>
            </div>

            <div className="location-tabs">
              <div className="tab-buttons">
                <button
                  className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
                  onClick={() => setActiveTab('map')}
                >
                  Map View
                </button>
                <button
                  className={`tab-button ${activeTab === 'transport' ? 'active' : ''}`}
                  onClick={() => setActiveTab('transport')}
                >
                  Transportation
                </button>
                <button
                  className={`tab-button ${activeTab === 'amenities' ? 'active' : ''}`}
                  onClick={() => setActiveTab('amenities')}
                >
                  Amenities
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'map' && (
                  <div className="tab-panel">
                    <div className="map-container">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9999999999995!2d${eventData.coordinates.lng}!3d${eventData.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTUnMzAuNyJOIDc4wrAwNycxMS4xIkU!5e0!3m2!1sen!2sin!4v1234567890123`}
                        width="100%"
                        height="300"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Event Location Map"
                      ></iframe>
                    </div>
                  </div>
                )}

                {activeTab === 'transport' && (
                  <div className="tab-panel">
                    <div className="transport-options">
                      <div className="transport-item">
                        <div className="transport-icon">🚗</div>
                        <div>
                          <h4>By Car</h4>
                          <p>Free valet parking available. The hotel is easily accessible via T.P.K. Road.</p>
                        </div>
                      </div>
                      <div className="transport-item">
                        <div className="transport-icon">🚕</div>
                        <div>
                          <h4>Taxi/Uber</h4>
                          <p>Convenient pickup and drop-off at the main entrance. Estimated cost: ₹150-300 from city center.</p>
                        </div>
                      </div>
                      <div className="transport-item">
                        <div className="transport-icon">🚌</div>
                        <div>
                          <h4>Public Transport</h4>
                          <p>City bus routes 5, 12, and 18 stop near the hotel. Auto-rickshaws readily available.</p>
                        </div>
                      </div>
                      <div className="transport-item">
                        <div className="transport-icon">✈️</div>
                        <div>
                          <h4>From Airport</h4>
                          <p>Madurai Airport is 12 km away. Complimentary shuttle service available (advance booking required).</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div className="tab-panel">
                    <div className="amenities-grid">
                      <div className="amenity-item">
                        <span className="amenity-icon">📶</span>
                        <span>High-Speed WiFi</span>
                      </div>
                      <div className="amenity-item">
                        <span className="amenity-icon">🍽️</span>
                        <span>Restaurant & Café</span>
                      </div>
                      <div className="amenity-item">
                        <span className="amenity-icon">❄️</span>
                        <span>Air Conditioning</span>
                      </div>
                      <div className="amenity-item">
                        <span className="amenity-icon">🚗</span>
                        <span>Valet Parking</span>
                      </div>
                      <div className="amenity-item">
                        <span className="amenity-icon">♿</span>
                        <span>Wheelchair Access</span>
                      </div>
                      <div className="amenity-item">
                        <span className="amenity-icon">🔒</span>
                        <span>24/7 Security</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .location-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .location-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .venue-card {
          background: var(--background-primary);
          border-radius: 20px;
          padding: 32px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          height: fit-content;
        }

        .venue-header {
          margin-bottom: 24px;
        }

        .venue-name {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .venue-rating {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stars {
          color: #FFD700;
          font-size: 1.1rem;
        }

        .rating-text {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .venue-details {
          margin-bottom: 32px;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .detail-item:last-child {
          margin-bottom: 0;
        }

        .detail-icon {
          color: var(--aws-orange);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .detail-item strong {
          display: block;
          color: var(--text-primary);
          margin-bottom: 4px;
          font-weight: 600;
        }

        .detail-item p {
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .venue-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .venue-actions .btn {
          flex: 1;
          min-width: 140px;
        }

        .location-tabs {
          background: var(--background-primary);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
        }

        .tab-buttons {
          display: flex;
          background: var(--background-secondary);
        }

        .tab-button {
          flex: 1;
          padding: 16px 20px;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          border-bottom: 3px solid transparent;
        }

        .tab-button.active {
          color: var(--aws-orange);
          background: var(--background-primary);
          border-bottom-color: var(--aws-orange);
        }

        .tab-button:hover:not(.active) {
          color: var(--text-primary);
          background: rgba(255, 153, 0, 0.05);
        }

        .tab-content {
          padding: 32px;
        }

        .tab-panel {
          animation: fadeIn 0.3s ease-out;
        }

        .map-container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .transport-options {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .transport-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          background: var(--background-secondary);
          border-radius: 12px;
        }

        .transport-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .transport-item h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .transport-item p {
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--background-secondary);
          border-radius: 12px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .amenity-icon {
          font-size: 1.2rem;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .location-info {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .venue-card {
            padding: 24px;
          }

          .venue-actions {
            flex-direction: column;
          }

          .venue-actions .btn {
            width: 100%;
          }

          .tab-buttons {
            flex-direction: column;
          }

          .tab-content {
            padding: 24px;
          }

          .transport-item {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .amenities-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Location;