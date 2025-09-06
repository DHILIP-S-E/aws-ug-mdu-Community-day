import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EventHighlights from './components/EventHighlights';
import Speakers from './components/Speakers';
import Schedule from './components/Schedule';
import Location from './components/Location';
import Registration from './components/Registration';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const eventData = {
    name: "AWS User Route",
    subtitle: "Madurai Cloud Community Day",
    date: "2024-04-15",
    time: "09:00 AM - 06:00 PM",
    venue: "The Gateway Hotel Pasumalai",
    address: "T.P.K. Road, Pasumalai Hills, Madurai, Tamil Nadu 625004",
    city: "Madurai",
    coordinates: { lat: 9.9252, lng: 78.1198 },
    description: "Join us for an immersive day of cloud computing, AWS technologies, and networking with industry experts.",
    hashtag: "#AWSMadurai2024",
    registrationLink: "https://register.awsmadurai.com",
    
    highlights: [
      {
        icon: "☁️",
        title: "Cloud Architecture",
        description: "Learn modern cloud architecture patterns and best practices"
      },
      {
        icon: "🚀",
        title: "Serverless Computing",
        description: "Dive deep into AWS Lambda, API Gateway, and serverless patterns"
      },
      {
        icon: "🤖",
        title: "AI/ML Services",
        description: "Explore AWS AI/ML services and real-world implementations"
      },
      {
        icon: "🔒",
        title: "Security & Compliance",
        description: "Master AWS security best practices and compliance frameworks"
      },
      {
        icon: "📊",
        title: "Data Analytics",
        description: "Harness the power of AWS data analytics and visualization tools"
      },
      {
        icon: "🌐",
        title: "Networking",
        description: "Connect with cloud professionals and industry leaders"
      }
    ],

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
      {
        id: 1,
        time: "09:00 - 09:30",
        title: "Registration & Welcome Coffee",
        speaker: "Organizing Team",
        description: "Check-in, networking, and welcome refreshments",
        type: "break"
      },
      {
        id: 2,
        time: "09:30 - 10:15",
        title: "Opening Keynote: The Future of Cloud Computing",
        speaker: "Priya Sharma",
        description: "Exploring emerging trends and innovations in cloud technology",
        type: "keynote"
      },
      {
        id: 3,
        time: "10:15 - 11:00",
        title: "Building Scalable Serverless Applications",
        speaker: "Rajesh Kumar",
        description: "Deep dive into AWS Lambda, API Gateway, and serverless patterns",
        type: "technical"
      },
      {
        id: 4,
        time: "11:00 - 11:15",
        title: "Coffee Break",
        speaker: "",
        description: "Networking and refreshments",
        type: "break"
      },
      {
        id: 5,
        time: "11:15 - 12:00",
        title: "AI/ML on AWS: From Concept to Production",
        speaker: "Anitha Raman",
        description: "Practical guide to implementing ML solutions using AWS services",
        type: "technical"
      },
      {
        id: 6,
        time: "12:00 - 13:00",
        title: "Lunch & Networking",
        speaker: "",
        description: "Enjoy lunch while networking with fellow attendees",
        type: "break"
      },
      {
        id: 7,
        time: "13:00 - 13:45",
        title: "AWS Security Best Practices",
        speaker: "Vikram Patel",
        description: "Comprehensive security strategies for cloud environments",
        type: "technical"
      },
      {
        id: 8,
        time: "13:45 - 14:30",
        title: "Panel Discussion: Cloud Transformation Stories",
        speaker: "All Speakers",
        description: "Real-world experiences and lessons learned from cloud migrations",
        type: "panel"
      },
      {
        id: 9,
        time: "14:30 - 15:00",
        title: "Closing Remarks & Prize Distribution",
        speaker: "Organizing Team",
        description: "Event wrap-up, prizes, and next steps",
        type: "closing"
      }
    ],

    sponsors: [
      {
        name: "AWS",
        logo: "/img/aws_logo_smile.png",
        url: "https://aws.amazon.com",
        tier: "title"
      },
      {
        name: "Microsoft Azure",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/150px-Microsoft_Azure.svg.png",
        url: "https://azure.microsoft.com",
        tier: "platinum"
      },
      {
        name: "Google Cloud",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/150px-Google_Cloud_logo.svg.png",
        url: "https://cloud.google.com",
        tier: "gold"
      },
      {
        name: "Docker",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/150px-Docker_%28container_engine%29_logo.svg.png",
        url: "https://docker.com",
        tier: "silver"
      }
    ],

    faqs: [
      {
        question: "What is the event format?",
        answer: "This is a full-day in-person event featuring keynotes, technical sessions, panel discussions, and networking opportunities."
      },
      {
        question: "Is there a registration fee?",
        answer: "No, this event is completely free for all attendees. However, registration is mandatory due to limited seating."
      },
      {
        question: "What should I bring?",
        answer: "Bring your laptop, business cards, and enthusiasm to learn! We'll provide all materials, refreshments, and lunch."
      },
      {
        question: "Will sessions be recorded?",
        answer: "Yes, all technical sessions will be recorded and made available to registered attendees within 48 hours."
      },
      {
        question: "Is there parking available?",
        answer: "Yes, the venue provides complimentary parking for all attendees. Additional street parking is also available."
      }
    ]
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header eventData={eventData} />
      <Hero eventData={eventData} />
      <EventHighlights highlights={eventData.highlights} />
      <Speakers speakers={eventData.speakers} />
      <Schedule schedule={eventData.schedule} />
      <Location eventData={eventData} />
      <Registration eventData={eventData} />
      <Sponsors sponsors={eventData.sponsors} />
      <FAQ faqs={eventData.faqs} />
      <Footer eventData={eventData} />
    </div>
  );
};

export default App;