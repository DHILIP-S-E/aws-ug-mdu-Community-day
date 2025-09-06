import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Send } from 'lucide-react';

const FAQ = ({ faqs }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      message: 'Hi! I\'m here to help answer your questions about AWS User Route. What would you like to know?'
    }
  ]);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;

    // Add user message
    const userMessage = { type: 'user', message: chatQuestion };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(chatQuestion);
      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 1000);

    setChatQuestion('');
  };

  const getBotResponse = (question) => {
    const responses = {
      'registration': 'Registration is completely free! Just fill out the form on this page and you\'ll receive a confirmation email with your QR code.',
      'parking': 'Yes, the venue provides complimentary valet parking for all attendees. Additional street parking is also available nearby.',
      'food': 'We\'ll provide welcome breakfast, networking lunch, and coffee breaks throughout the day. Dietary restrictions can be accommodated.',
      'recording': 'Yes, all technical sessions will be recorded and made available to registered attendees within 48 hours of the event.',
      'certificate': 'All attendees will receive a digital certificate of participation and a LinkedIn badge to showcase their attendance.',
      'default': 'That\'s a great question! For specific inquiries, please contact us at info@awsmadurai.com or check our FAQ section above.'
    };

    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('register') || lowerQuestion.includes('sign up')) {
      return responses.registration;
    } else if (lowerQuestion.includes('park') || lowerQuestion.includes('car')) {
      return responses.parking;
    } else if (lowerQuestion.includes('food') || lowerQuestion.includes('lunch') || lowerQuestion.includes('breakfast')) {
      return responses.food;
    } else if (lowerQuestion.includes('record') || lowerQuestion.includes('video')) {
      return responses.recording;
    } else if (lowerQuestion.includes('certificate') || lowerQuestion.includes('badge')) {
      return responses.certificate;
    } else {
      return responses.default;
    }
  };

  return (
    <section id="faq" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Got questions? We've got answers! Can't find what you're looking for? Try our AI chatbot below.
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={expandedFaq === index}
                >
                  <span className="question-text">{faq.question}</span>
                  <span className="question-icon">
                    {expandedFaq === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>
                
                <div className={`faq-answer ${expandedFaq === index ? 'expanded' : ''}`}>
                  <div className="answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="chatbot-container">
            <div className="chatbot-header">
              <MessageCircle className="chat-icon" />
              <div>
                <h3>Ask Our AI Assistant</h3>
                <p>Get instant answers to your questions</p>
              </div>
            </div>

            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type}`}>
                  <div className="message-content">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <form className="chat-input-form" onSubmit={handleChatSubmit}>
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  placeholder="Ask a question about the event..."
                  className="chat-input"
                />
                <button
                  type="submit"
                  className="chat-send-btn"
                  disabled={!chatQuestion.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="contact-cta">
          <h3>Still Have Questions?</h3>
          <p>Our team is here to help! Reach out to us directly.</p>
          <div className="contact-actions">
            <a href="mailto:info@awsmadurai.com" className="btn btn-primary">
              Email Us
            </a>
            <a href="tel:+919876543210" className="btn btn-outline">
              Call Us
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          background: var(--background-primary);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .faq-question {
          width: 100%;
          padding: 20px 24px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: var(--transition);
          color: var(--text-primary);
        }

        .faq-question:hover {
          background: var(--background-secondary);
        }

        .question-text {
          font-size: 1.1rem;
          font-weight: 600;
          flex: 1;
        }

        .question-icon {
          color: var(--aws-orange);
          transition: var(--transition);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .faq-answer.expanded {
          max-height: 200px;
        }

        .answer-content {
          padding: 0 24px 20px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .chatbot-container {
          background: var(--background-primary);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .chatbot-header {
          padding: 24px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .chat-icon {
          color: var(--aws-orange);
          flex-shrink: 0;
        }

        .chatbot-header h3 {
          font-size: 1.2rem;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .chatbot-header p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .chat-messages {
          padding: 20px;
          max-height: 300px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-message {
          display: flex;
        }

        .chat-message.user {
          justify-content: flex-end;
        }

        .chat-message.bot {
          justify-content: flex-start;
        }

        .message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .chat-message.user .message-content {
          background: var(--aws-orange);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .chat-message.bot .message-content {
          background: var(--background-secondary);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }

        .chat-input-form {
          padding: 20px;
          border-top: 1px solid var(--border-color);
        }

        .chat-input-wrapper {
          display: flex;
          gap: 8px;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 14px;
          background: var(--background-primary);
          color: var(--text-primary);
          transition: var(--transition);
        }

        .chat-input:focus {
          outline: none;
          border-color: var(--aws-orange);
        }

        .chat-send-btn {
          padding: 12px;
          background: var(--aws-orange);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-send-btn:hover:not(:disabled) {
          background: var(--aws-orange-dark);
        }

        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .contact-cta {
          background: var(--background-primary);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          border: 1px solid var(--border-color);
        }

        .contact-cta h3 {
          font-size: 1.8rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .contact-cta p {
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .contact-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .faq-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .chatbot-container {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .faq-question {
            padding: 16px 20px;
          }

          .question-text {
            font-size: 1rem;
          }

          .answer-content {
            padding: 0 20px 16px;
          }

          .chatbot-header {
            padding: 20px;
          }

          .chat-messages {
            padding: 16px;
            max-height: 250px;
          }

          .chat-input-form {
            padding: 16px;
          }

          .contact-cta {
            padding: 32px 24px;
          }

          .contact-actions {
            flex-direction: column;
            align-items: center;
          }

          .contact-actions .btn {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQ;