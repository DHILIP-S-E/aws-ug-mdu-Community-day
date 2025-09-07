import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Mail, Building, CheckCircle, Menu, X, Linkedin, Github, Twitter, ChevronDown, ChevronUp, MessageSquare, Sun, Moon } from 'lucide-react';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', type: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [hoveredSpeaker, setHoveredSpeaker] = useState(null);

  // Event Data
  const eventData = {
    name: "AWS User Group Madurai",
    subtitle: "Cloud Community Day",
    date: "2025-10-25",
    time: "09:00 AM - 06:00 PM",
    venue: "PSNA College of Engineering and Technology",
    address: "Kothandaraman Nagar, Dindigul, Tamil Nadu 624622",
    city: "Dindigul",
    hashtag: "#AWSCommunityMadurai",
    
    speakers: [
      {
        id: 1,
        name: "Priya Sharma",
        designation: "Senior Solutions Architect",
        company: "AWS",
        bio: "Cloud architecture expert with 8+ years of experience in designing scalable solutions.",
        photo: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
        linkedin: "https://linkedin.com/in/priyasharma",
        twitter: "https://twitter.com/priyasharma",
        github: "https://github.com/priyasharma"
      },
      {
        id: 2,
        name: "Rajesh Kumar",
        designation: "DevOps Engineer",
        company: "TechCorp",
        bio: "DevOps specialist focusing on CI/CD pipelines and infrastructure automation.",
        photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
        linkedin: "https://linkedin.com/in/rajeshkumar",
        twitter: "https://twitter.com/rajeshkumar",
        github: "https://github.com/rajeshkumar"
      },
      {
        id: 3,
        name: "Anitha Raman",
        designation: "Data Scientist",
        company: "DataTech Solutions",
        bio: "ML engineer specializing in AWS AI/ML services and data pipeline optimization.",
        photo: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
        linkedin: "https://linkedin.com/in/anitharaman",
        twitter: "https://twitter.com/anitharaman",
        github: "https://github.com/anitharaman"
      },
      {
        id: 4,
        name: "Vikram Patel",
        designation: "Cloud Security Architect",
        company: "SecureCloud Inc",
        bio: "Security expert with deep knowledge of AWS security services and compliance.",
        photo: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
        linkedin: "https://linkedin.com/in/vikrampatel",
        twitter: "https://twitter.com/vikrampatel",
        github: "https://github.com/vikrampatel"
      }
    ],

    schedule: [
      { id: 1, time: "09:00 - 09:30", title: "Registration & Welcome Coffee", speaker: "Organizing Team", type: "break" },
      { id: 2, time: "09:30 - 10:15", title: "Opening Keynote: The Future of Cloud Computing", speaker: "Priya Sharma", type: "keynote" },
      { id: 3, time: "10:15 - 11:00", title: "Building Scalable Serverless Applications", speaker: "Rajesh Kumar", type: "technical" },
      { id: 4, time: "11:00 - 11:15", title: "Coffee Break", speaker: "", type: "break" },
      { id: 5, time: "11:15 - 12:00", title: "AI/ML on AWS: From Concept to Production", speaker: "Anitha Raman", type: "technical" },
      { id: 6, time: "12:00 - 13:00", title: "Lunch & Networking", speaker: "", type: "break" },
      { id: 7, time: "13:00 - 13:45", title: "AWS Security Best Practices", speaker: "Vikram Patel", type: "technical" },
      { id: 8, time: "13:45 - 14:30", title: "Panel Discussion: Cloud Transformation Stories", speaker: "All Speakers", type: "panel" },
      { id: 9, time: "14:30 - 15:00", title: "Closing Remarks & Prize Distribution", speaker: "Organizing Team", type: "closing" }
    ],

    sponsors: [
      { name: "AWS", logo: "/img/aws_logo_smile.png", url: "https://aws.amazon.com", tier: "title" }
    ],

    faqs: [
      { question: "What is the event format?", answer: "This is a full-day in-person event featuring keynotes, technical sessions, panel discussions, and networking opportunities." },
      { question: "Is there a registration fee?", answer: "No, this event is completely free for all attendees. However, registration is mandatory due to limited seating." },
      { question: "What should I bring?", answer: "Bring your laptop, business cards, and enthusiasm to learn! We'll provide all materials, refreshments, and lunch." },
      { question: "Will sessions be recorded?", answer: "Yes, all technical sessions will be recorded and made available to registered attendees within 48 hours." }
    ]
  };

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const eventDate = new Date('2025-10-25T09:00:00');
      const now = new Date();
      const difference = eventDate - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60))
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Dark Mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
  };

  const addToCalendar = (session) => {
    const startTime = session.time.split(' - ')[0];
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(session.title)}&dates=20251025T${startTime.replace(':', '')}00/20251025T${startTime.replace(':', '')}00&details=${encodeURIComponent('AWS Community Day Session')}&location=${encodeURIComponent('PSNA College, Dindigul')}`;
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src="/img/aws_logo_smile.png" alt="AWS" />
            <span>AWS User Group Madurai</span>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#hero" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#highlights" onClick={() => setIsMenuOpen(false)}>Why Attend</a>
            <a href="#speakers" onClick={() => setIsMenuOpen(false)}>Speakers</a>
            <a href="#schedule" onClick={() => setIsMenuOpen(false)}>Schedule</a>
            <a href="#location" onClick={() => setIsMenuOpen(false)}>Location</a>
            <a href="#registration" onClick={() => setIsMenuOpen(false)}>Register</a>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <div className="badge">🚀 FREE EVENT</div>
            <h1>{eventData.name}</h1>
            <h2>{eventData.subtitle}</h2>
            <p>Join us for a day of learning, networking, and hands-on experiences with AWS technologies at PSNA College, Dindigul.</p>
            
            <div className="event-details">
              <div><Calendar size={20} /> October 25, 2025</div>
              <div><Clock size={20} /> {eventData.time}</div>
              <div><MapPin size={20} /> {eventData.city}</div>
              <div><Users size={20} /> 200+ Attendees</div>
            </div>

            <div className="countdown">
              <h3>Event Starts In</h3>
              <div className="countdown-timer">
                <div className="time-unit">
                  <span>{String(timeLeft.days || 0).padStart(2, '0')}</span>
                  <label>Days</label>
                </div>
                <div className="time-unit">
                  <span>{String(timeLeft.hours || 0).padStart(2, '0')}</span>
                  <label>Hours</label>
                </div>
                <div className="time-unit">
                  <span>{String(timeLeft.minutes || 0).padStart(2, '0')}</span>
                  <label>Minutes</label>
                </div>
                <div className="time-unit">
                  <span>{String(timeLeft.seconds || 0).padStart(2, '0')}</span>
                  <label>Seconds</label>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#registration" className="btn btn-primary">Register Now - Free!</a>
              <button onClick={() => addToCalendar({title: 'AWS Community Day', time: '09:00'})} className="btn btn-outline">Add to Calendar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="section">
        <div className="container">
          <h2>Why Attend?</h2>
          <p className="section-subtitle">Discover cutting-edge AWS technologies and connect with industry experts</p>
          <div className="grid">
            <div className="card">
              <div className="icon">☁️</div>
              <h3>Cloud Architecture</h3>
              <p>Learn modern cloud architecture patterns and best practices from AWS experts</p>
            </div>
            <div className="card">
              <div className="icon">🚀</div>
              <h3>Serverless Computing</h3>
              <p>Dive deep into AWS Lambda, API Gateway, and serverless application patterns</p>
            </div>
            <div className="card">
              <div className="icon">🤖</div>
              <h3>AI/ML Services</h3>
              <p>Explore AWS AI/ML services and real-world machine learning implementations</p>
            </div>
            <div className="card">
              <div className="icon">🔒</div>
              <h3>Security & Compliance</h3>
              <p>Master AWS security best practices and compliance frameworks</p>
            </div>
            <div className="card">
              <div className="icon">📊</div>
              <h3>Data Analytics</h3>
              <p>Harness the power of AWS data analytics and visualization tools</p>
            </div>
            <div className="card">
              <div className="icon">🌐</div>
              <h3>Networking</h3>
              <p>Connect with cloud professionals and industry leaders in Tamil Nadu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="section section-alt">
        <div className="container">
          <h2>Meet Our Expert Speakers</h2>
          <p className="section-subtitle">Learn from industry leaders and AWS experts</p>
          <div className="speakers-grid">
            {eventData.speakers.map((speaker) => (
              <div 
                key={speaker.id} 
                className="speaker-card"
                onMouseEnter={() => setHoveredSpeaker(speaker.id)}
                onMouseLeave={() => setHoveredSpeaker(null)}
              >
                <div className="speaker-image">
                  <img src={speaker.photo} alt={speaker.name} />
                  <div className={`speaker-overlay ${hoveredSpeaker === speaker.id ? 'visible' : ''}`}>
                    <div className="social-links">
                      <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={20} />
                      </a>
                      <a href={speaker.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter size={20} />
                      </a>
                      <a href={speaker.github} target="_blank" rel="noopener noreferrer">
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="speaker-info">
                  <h3>{speaker.name}</h3>
                  <p className="designation">{speaker.designation}</p>
                  <p className="company">{speaker.company}</p>
                  <p className="bio">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="section">
        <div className="container">
          <h2>Event Schedule</h2>
          <p className="section-subtitle">A full day of learning and networking</p>
          <div className="schedule">
            {eventData.schedule.map((session) => (
              <div key={session.id} className={`schedule-item ${session.type}`}>
                <div className="time">{session.time}</div>
                <div className="content">
                  <h3>{session.title}</h3>
                  {session.speaker && <p className="speaker">Speaker: {session.speaker}</p>}
                  {session.type !== 'break' && (
                    <button 
                      className="btn btn-small btn-outline"
                      onClick={() => addToCalendar(session)}
                    >
                      Add to Calendar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="section section-alt">
        <div className="container">
          <h2>Event Location</h2>
          <div className="location-container">
            <div className="location-info">
              <h3>{eventData.venue}</h3>
              <p>{eventData.address}</p>
              <div className="location-details">
                <div className="detail">
                  <strong>Parking:</strong> Free parking available on campus
                </div>
                <div className="detail">
                  <strong>Public Transport:</strong> Bus stop 200m from venue
                </div>
                <div className="detail">
                  <strong>Accessibility:</strong> Wheelchair accessible venue
                </div>
              </div>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(eventData.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Get Directions
              </a>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0!2d77.9803!3d10.3673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDIyJzAyLjMiTiA3N8KwNTgnNDkuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{border: 0, borderRadius: '12px'}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="registration" className="section">
        <div className="container">
          <h2>Register Now - It's Free!</h2>
          <p className="section-subtitle">Secure your spot at Tamil Nadu's premier cloud computing event</p>
          
          {isSubmitted ? (
            <div className="success">
              <CheckCircle size={64} color="#4CAF50" />
              <h3>Registration Successful!</h3>
              <p>Thank you for registering! You'll receive a confirmation email with your QR code entry ticket shortly.</p>
              <div className="event-info">
                <p><strong>Event:</strong> {eventData.name} - {eventData.subtitle}</p>
                <p><strong>Date:</strong> October 25, 2025</p>
                <p><strong>Time:</strong> {eventData.time}</p>
                <p><strong>Venue:</strong> {eventData.venue}</p>
              </div>
            </div>
          ) : (
            <div className="registration-container">
              <div className="registration-info">
                <h3>What's Included</h3>
                <ul>
                  <li>✅ Full day access to all sessions</li>
                  <li>✅ Welcome breakfast & networking lunch</li>
                  <li>✅ AWS swag bag and certificates</li>
                  <li>✅ Access to recorded sessions</li>
                  <li>✅ Networking opportunities with experts</li>
                  <li>✅ Digital badge for LinkedIn</li>
                </ul>
                
                <div className="event-stats">
                  <div className="stat">
                    <span className="number">200+</span>
                    <span className="label">Expected Attendees</span>
                  </div>
                  <div className="stat">
                    <span className="number">4</span>
                    <span className="label">Expert Speakers</span>
                  </div>
                  <div className="stat">
                    <span className="number">8</span>
                    <span className="label">Technical Sessions</span>
                  </div>
                </div>
              </div>

              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label><Users size={20} /> Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label><Mail size={20} /> Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label><Building size={20} /> Organization *</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    required
                    placeholder="Your company or university"
                  />
                </div>

                <div className="form-group">
                  <label>Attendee Type *</label>
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="developer">Developer</option>
                    <option value="devops">DevOps Engineer</option>
                    <option value="architect">Solutions Architect</option>
                    <option value="data-scientist">Data Scientist</option>
                    <option value="student">Student</option>
                    <option value="startup">Startup Founder</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Register Now - Get QR Code!
                </button>
                
                <p className="form-note">
                  * Required fields. By registering, you agree to receive event updates and a QR code for entry.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Sponsors */}
      <section className="section section-alt">
        <div className="container">
          <h2>Our Sponsors & Partners</h2>
          <div className="sponsors-grid">
            {eventData.sponsors.map((sponsor, index) => (
              <a 
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-card"
              >
                <img src={sponsor.logo} alt={sponsor.name} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            {eventData.faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {expandedFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>AWS User Group Madurai</h3>
              <p>Building the cloud community in Tamil Nadu</p>
              <div className="social-links">
                <a href="#" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@awsmadurai.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Hashtag: {eventData.hashtag}</p>
            </div>
            <div className="footer-section">
              <h4>Event Details</h4>
              <p>Date: October 25, 2025</p>
              <p>Time: {eventData.time}</p>
              <p>Venue: PSNA College, Dindigul</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AWS User Group Madurai. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fab">
        <a href="#registration" className="fab-button">
          <Calendar size={24} />
        </a>
      </div>
    </div>
  );
};

export default App;