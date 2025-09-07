import React, { useState } from 'react';
import { User, Mail, Building, Users, CheckCircle, AlertCircle } from 'lucide-react';

const Registration = ({ eventData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    attendeeType: '',
    phone: '',
    experience: '',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const attendeeTypes = [
    'Developer',
    'DevOps Engineer',
    'Solutions Architect',
    'Data Scientist',
    'Product Manager',
    'Student',
    'Other'
  ];

  const interests = [
    'Serverless Computing',
    'Machine Learning',
    'Cloud Security',
    'Data Analytics',
    'DevOps & CI/CD',
    'Microservices',
    'Cost Optimization',
    'Migration Strategies'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        organization: '',
        attendeeType: '',
        phone: '',
        experience: '',
        interests: []
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.organization && formData.attendeeType;

  return (
    <section id="registration" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Register for AWS User Route</h2>
          <p className="section-subtitle">
            Secure your spot at Madurai's premier cloud computing event. Registration is free but seats are limited!
          </p>
        </div>

        <div className="registration-content">
          <div className="registration-info">
            <div className="info-card">
              <h3>What's Included</h3>
              <ul className="benefits-list">
                <li>
                  <CheckCircle className="benefit-icon" />
                  <span>Full day access to all sessions</span>
                </li>
                <li>
                  <CheckCircle className="benefit-icon" />
                  <span>Welcome breakfast & networking lunch</span>
                </li>
                <li>
                  <CheckCircle className="benefit-icon" />
                  <span>AWS swag bag and certificates</span>
                </li>
                <li>
                  <CheckCircle className="benefit-icon" />
                  <span>Access to recorded sessions</span>
                </li>
                <li>
                  <CheckCircle className="benefit-icon" />
                  <span>Networking opportunities</span>
                </li>
                <li>
                  <CheckCircle className="benefit-icon" />
                  <span>Digital badge for LinkedIn</span>
                </li>
              </ul>
            </div>

            <div className="event-stats">
              <div className="stat-card">
                <div className="stat-number">200+</div>
                <div className="stat-label">Expected Attendees</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4</div>
                <div className="stat-label">Expert Speakers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">8</div>
                <div className="stat-label">Technical Sessions</div>
              </div>
            </div>
          </div>

          <div className="registration-form-container">
            {submitStatus === 'success' ? (
              <div className="success-message">
                <CheckCircle className="success-icon" />
                <h3>Registration Successful!</h3>
                <p>Thank you for registering! You'll receive a confirmation email with your QR code and event details shortly.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSubmitStatus(null)}
                >
                  Register Another Person
                </button>
              </div>
            ) : (
              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <div className="input-wrapper">
                    <User className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="organization">Organization *</label>
                    <div className="input-wrapper">
                      <Building className="input-icon" />
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Company/University name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="attendeeType">Role/Position *</label>
                  <div className="input-wrapper">
                    <Users className="input-icon" />
                    <select
                      id="attendeeType"
                      name="attendeeType"
                      value={formData.attendeeType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your role</option>
                      {attendeeTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="experience">AWS Experience Level</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Areas of Interest (Select all that apply)</label>
                  <div className="interests-grid">
                    {interests.map(interest => (
                      <label key={interest} className="interest-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                        />
                        <span className="checkmark"></span>
                        <span className="interest-label">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="error-message">
                    <AlertCircle className="error-icon" />
                    <span>Registration failed. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`btn btn-primary btn-large submit-btn ${isSubmitting ? 'loading' : ''}`}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register Now'}
                </button>

                <p className="form-note">
                  By registering, you agree to receive event updates and communications. 
                  Your information will be kept secure and not shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .registration-content {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .registration-info {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .info-card {
          background: var(--background-primary);
          border-radius: 16px;
          padding: 32px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
        }

        .info-card h3 {
          font-size: 1.5rem;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .benefits-list {
          list-style: none;
          padding: 0;
        }

        .benefits-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: var(--text-secondary);
        }

        .benefit-icon {
          color: #4CAF50;
          flex-shrink: 0;
        }

        .event-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-card {
          background: var(--background-primary);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--aws-orange);
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .registration-form-container {
          background: var(--background-primary);
          border-radius: 20px;
          padding: 40px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
        }

        .registration-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          z-index: 1;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 16px;
          background: var(--background-primary);
          color: var(--text-primary);
          transition: var(--transition);
        }

        .input-wrapper input {
          padding-left: 44px;
        }

        .input-wrapper select {
          padding-left: 44px;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--aws-orange);
          box-shadow: 0 0 0 3px rgba(255, 153, 0, 0.1);
        }

        .interests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-top: 8px;
        }

        .interest-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: var(--transition);
        }

        .interest-checkbox:hover {
          background: var(--background-secondary);
        }

        .interest-checkbox input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid var(--border-color);
          border-radius: 4px;
          position: relative;
          transition: var(--transition);
        }

        .interest-checkbox input[type="checkbox"]:checked + .checkmark {
          background: var(--aws-orange);
          border-color: var(--aws-orange);
        }

        .interest-checkbox input[type="checkbox"]:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .interest-label {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .submit-btn {
          width: 100%;
          margin-top: 16px;
          position: relative;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-btn.loading::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 20px;
          width: 16px;
          height: 16px;
          margin-top: -8px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .form-note {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-align: center;
          margin-top: 16px;
          line-height: 1.4;
        }

        .success-message {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          color: #4CAF50;
          width: 64px;
          height: 64px;
          margin-bottom: 24px;
        }

        .success-message h3 {
          font-size: 1.8rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .success-message p {
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f44336;
          font-size: 0.9rem;
          padding: 12px;
          background: rgba(244, 67, 54, 0.1);
          border-radius: 6px;
          border: 1px solid rgba(244, 67, 54, 0.2);
        }

        .error-icon {
          flex-shrink: 0;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .registration-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .event-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .registration-form-container {
            padding: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .interests-grid {
            grid-template-columns: 1fr;
          }

          .event-stats {
            grid-template-columns: 1fr;
          }

          .info-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default Registration;