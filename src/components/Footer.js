import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Heart } from 'lucide-react';

const Footer = ({ eventData }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Twitter,
      url: 'https://twitter.com/awsmadurai',
      label: 'Twitter'
    },
    {
      icon: Linkedin,
      url: 'https://linkedin.com/company/aws-madurai',
      label: 'LinkedIn'
    },
    {
      icon: Github,
      url: 'https://github.com/aws-madurai',
      label: 'GitHub'
    }
  ];

  const quickLinks = [
    { label: 'About Event', href: '#hero' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Location', href: '#location' },
    { label: 'Register', href: '#registration' },
    { label: 'Sponsors', href: '#sponsors' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Code of Conduct', href: '/code-of-conduct' },
    { label: 'Contact Us', href: '/contact' }
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="brand-logo">
              <img src="/img/aws_logo_smile.png" alt="AWS" className="footer-logo" />
              <span className="brand-text">User Route</span>
            </div>
            <p className="brand-description">
              Madurai's premier cloud computing event bringing together AWS enthusiasts, 
              developers, and industry experts for a day of learning and networking.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="footer-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Event Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Calendar className="contact-icon" />
                <span>April 15, 2024</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>{eventData.city}</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <a href="mailto:info@awsmadurai.com">info@awsmadurai.com</a>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Newsletter</h4>
            <p className="newsletter-text">
              Stay updated with the latest news and announcements about AWS User Route.
            </p>
            <form className="newsletter-form">
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </div>
            </form>
            <p className="newsletter-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <div className="legal-links">
              {legalLinks.map((link, index) => (
                <a key={index} href={link.href} className="legal-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-credits">
            <p>
              © {currentYear} AWS User Route - Madurai. Made with{' '}
              <Heart className="heart-icon" size={16} /> by the AWS Community.
            </p>
            <p className="hashtag">
              Follow us: <span className="highlight">{eventData.hashtag}</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, var(--aws-blue) 0%, #1a252f 100%);
          color: white;
          padding: 60px 0 20px;
          margin-top: 80px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-brand {
          max-width: 350px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .footer-logo {
          height: 40px;
          width: auto;
        }

        .brand-text {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
        }

        .brand-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: var(--transition);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .social-link:hover {
          background: var(--aws-orange);
          border-color: var(--aws-orange);
          transform: translateY(-2px);
        }

        .section-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: white;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          transition: var(--transition);
          padding: 0;
          text-align: left;
        }

        .footer-link:hover {
          color: var(--aws-orange);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
        }

        .contact-icon {
          color: var(--aws-orange);
          flex-shrink: 0;
        }

        .contact-item a {
          color: inherit;
          text-decoration: none;
          transition: var(--transition);
        }

        .contact-item a:hover {
          color: var(--aws-orange);
        }

        .newsletter-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .newsletter-form {
          margin-bottom: 12px;
        }

        .newsletter-input-wrapper {
          display: flex;
          gap: 8px;
        }

        .newsletter-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 14px;
          transition: var(--transition);
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--aws-orange);
          background: rgba(255, 255, 255, 0.15);
        }

        .newsletter-btn {
          padding: 12px 20px;
          background: var(--aws-orange);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          background: var(--aws-orange-dark);
        }

        .newsletter-note {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          line-height: 1.4;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .legal-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .legal-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 14px;
          transition: var(--transition);
        }

        .legal-link:hover {
          color: var(--aws-orange);
        }

        .footer-credits {
          text-align: right;
        }

        .footer-credits p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .heart-icon {
          color: #ff4757;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .hashtag {
          margin-top: 4px;
        }

        .highlight {
          color: var(--aws-orange);
          font-weight: 600;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 20px;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer-brand {
            max-width: none;
          }

          .newsletter-input-wrapper {
            flex-direction: column;
          }

          .newsletter-btn {
            width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .legal-links {
            justify-content: center;
          }

          .footer-credits {
            text-align: center;
          }

          .footer-credits p {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .legal-links {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;