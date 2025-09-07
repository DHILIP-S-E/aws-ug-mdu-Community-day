import React, { useState } from 'react';
import { User, Mail, Building, CheckCircle } from 'lucide-react';

const SimpleRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="registration" className="section">
        <div className="container">
          <div className="success-message">
            <CheckCircle size={64} color="#4CAF50" />
            <h2>Registration Successful!</h2>
            <p>Thank you for registering! You'll receive a confirmation email shortly.</p>
            <div className="event-info">
              <p><strong>Event:</strong> AWS User Group Madurai - Cloud Community Day</p>
              <p><strong>Date:</strong> October 25, 2024</p>
              <p><strong>Time:</strong> 9:00 AM - 6:00 PM</p>
              <p><strong>Venue:</strong> PSNA College, Dindigul</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .success-message {
            text-align: center;
            max-width: 500px;
            margin: 0 auto;
            padding: 60px 20px;
          }

          .success-message h2 {
            margin: 24px 0 16px;
            color: var(--gray-900);
          }

          .success-message p {
            margin-bottom: 32px;
          }

          .event-info {
            background: var(--gray-50);
            padding: 24px;
            border-radius: var(--radius);
            text-align: left;
          }

          .event-info p {
            margin-bottom: 8px;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section id="registration" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Register Now - It's Free!</h2>
          <p className="section-subtitle">
            Secure your spot at Madurai's premier cloud computing event.
          </p>
        </div>

        <div className="registration-container">
          <div className="registration-info">
            <h3>What's Included</h3>
            <ul>
              <li>✅ Full day access to all sessions</li>
              <li>✅ Breakfast, lunch & networking</li>
              <li>✅ AWS swag bag</li>
              <li>✅ Digital certificates</li>
              <li>✅ Recorded sessions access</li>
            </ul>

            <div className="event-details">
              <h4>Event Details</h4>
              <p><strong>Date:</strong> October 25, 2024</p>
              <p><strong>Time:</strong> 9:00 AM - 6:00 PM</p>
              <p><strong>Venue:</strong> PSNA College, Dindigul</p>
              <p><strong>Capacity:</strong> 200 attendees</p>
            </div>
          </div>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <User size={20} />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>
                <Mail size={20} />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label>
                <Building size={20} />
                Organization *
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                placeholder="Your company or university"
              />
            </div>

            <div className="form-group">
              <label>Your Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select your role</option>
                <option value="developer">Developer</option>
                <option value="devops">DevOps Engineer</option>
                <option value="architect">Solutions Architect</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={isSubmitting}
              style={{ width: '100%' }}
            >
              {isSubmitting ? 'Registering...' : 'Register Now - Free!'}
            </button>

            <p className="form-note">
              * Required fields. By registering, you agree to receive event updates.
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .registration-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .registration-info {
          background: white;
          padding: 32px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          height: fit-content;
        }

        .registration-info h3 {
          margin-bottom: 20px;
        }

        .registration-info ul {
          list-style: none;
          margin-bottom: 32px;
        }

        .registration-info li {
          padding: 8px 0;
          color: var(--gray-600);
        }

        .event-details {
          background: var(--gray-50);
          padding: 20px;
          border-radius: var(--radius);
        }

        .event-details h4 {
          margin-bottom: 16px;
        }

        .event-details p {
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .registration-form {
          background: white;
          padding: 32px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--gray-900);
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--gray-200);
          border-radius: var(--radius);
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--aws-orange);
        }

        .form-note {
          font-size: 0.9rem;
          color: var(--gray-600);
          text-align: center;
          margin-top: 16px;
        }

        @media (max-width: 768px) {
          .registration-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .registration-info,
          .registration-form {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default SimpleRegistration;