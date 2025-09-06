import React from 'react';
import Header from './components/Header';
import Speakers from './components/Speakers';
import Schedule from './components/Schedule';
import Location from './components/Location';
import Sponsors from './components/Sponsors';

const App = () => {
  const config = {
    name: "AWS Community Day",
    description: "Join us for an amazing day of learning and networking",
    date: "2nd April 2024",
    venue: "Victoria Warehouse",
    address: "Trafford Wharf Rd, Stretford, Manchester M17 1AB",
    city: "Manchester",
    lon: "53.4644172",
    lat: "-2.2851678",
    sections: ["speakers", "schedule", "location", "sponsors"],
    callToAction: {
      text: "Register Now!",
      link: "http://register.example.com"
    },
    speakers: [
      {
        name: "Ric Harvey",
        photo: "/img/ric.png",
        linkedin: "https://www.linkedin.com/in/richarvey/",
        twitter: "ric__harvey",
        git: "https://gitlab.com/ric_harvey"
      },
      {
        name: "Shafreen Sayyed",
        photo: "/img/shafreen.png",
        linkedin: "https://www.linkedin.com/in/shafreensayyed/",
        twitter: "ShafreenSayyed",
        git: "https://github.com/shasay"
      },
      {
        name: "Ross Barich",
        photo: "/img/ross.png",
        linkedin: "https://www.linkedin.com/in/rossbarich/",
        twitter: "rossbarich"
      }
    ],
    schedule: [
      { name: "Check-in / Breakfast", time: "9:00 AM" },
      { name: "Opening Keynote", time: "10:00 AM" },
      { name: "AWS Services Deep Dive", time: "11:00 AM" },
      { name: "Lunch & Networking", time: "12:00 PM" },
      { name: "Serverless Workshop", time: "1:00 PM" },
      { name: "Cloud Security Best Practices", time: "2:00 PM" },
      { name: "Coffee Break", time: "3:00 PM" },
      { name: "Machine Learning on AWS", time: "3:30 PM" },
      { name: "Closing & Prizes", time: "4:30 PM" }
    ],
    sponsors: [
      {
        name: "AWS",
        logo: "/img/aws_logo_smile.png",
        url: "https://aws.amazon.com"
      },
      {
        name: "Hugo",
        logo: "/img/hugo.png",
        url: "http://gohugo.io"
      }
    ]
  };

  return (
    <div className="App">
      <Header config={config} />
      <Speakers speakers={config.speakers} />
      <Schedule schedule={config.schedule} />
      <Location config={config} />
      <Sponsors sponsors={config.sponsors} />
      
      <footer style={styles.footer}>
        <div className="container">
          <p>Made with ♥ by the AWS Community</p>
          <div style={styles.footerLinks}>
            <a href="https://aws.amazon.com/codesofconduct/">Code of Conduct</a>
            <a href="https://aws.amazon.com/developer/community/">AWS Community</a>
            <a href="https://aws.amazon.com">Amazon Web Services</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  footer: {
    background: '#232F3E',
    color: 'white',
    padding: '40px 0',
    textAlign: 'center',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
};

export default App;