import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const InteractiveFAQ = ({ faqs }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m here to help you with any questions about AWS User Route - Madurai Cloud Community Day. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickQuestions = [
    'Is the event free?',
    'What should I bring?',
    'Will sessions be recorded?',
    'Is parking available?',
    'What time does it start?'
  ];

  const botResponses = {
    'is the event free': 'Yes! This event is completely free for all attendees. However, registration is mandatory due to limited seating.',
    'what should i bring': 'Bring your laptop, business cards, and enthusiasm to learn! We\'ll provide all materials, refreshments, and lunch.',
    'will sessions be recorded': 'Yes, all technical sessions will be recorded and made available to registered attendees within 48 hours.',
    'is parking available': 'Yes, the venue provides complimentary parking for all attendees. Additional street parking is also available.',
    'what time does it start': 'The event starts at 9:00 AM with registration and welcome coffee. The first session begins at 9:30 AM.',
    'default': 'I\'m not sure about that specific question, but you can contact our organizing team at info@awsmadurai.com or check our detailed FAQ section above.'
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFAQToggle = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(newMessage),
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setNewMessage(question);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="faq" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Get instant answers to your questions or chat with our AI assistant.
          </p>
        </div>

        <div className="faq-container">
          <div className="faq-tabs">
            <button
              className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
              onClick={() => setActiveTab('faq')}
            >
              <HelpCircle size={20} />
              FAQ
            </button>
            <button
              className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageCircle size={20} />
              Ask AI Assistant
            </button>
          </div>

          {activeTab === 'faq' ? (
            <div className="faq-content">
              <div className="search-container">
                <div className="search-input-wrapper">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              <div className="faq-list">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => handleFAQToggle(index)}
                    >
                      <span>{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="faq-icon" />
                      ) : (
                        <ChevronDown className="faq-icon" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="no-results">
                  <HelpCircle size={48} />
                  <h3>No FAQs found</h3>
                  <p>Try searching with different keywords or ask our AI assistant.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveTab('chat')}
                  >
                    Ask AI Assistant
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="chat-content">
              <div className="chat-messages">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`message ${message.type}`}>
                    <div className="message-avatar">
                      {message.type === 'bot' ? (
                        <Bot size={20} />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div className="message-content">
                      <p>{message.message}</p>
                      <span className="message-time">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message bot typing">
                    <div className="message-avatar">
                      <Bot size={20} />
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="quick-questions">
                <p>Quick questions:</p>
                <div className="quick-buttons">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="quick-button"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="chat-input-container">
                <div className="chat-input-wrapper">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="chat-input"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="send-button"
                    disabled={!newMessage.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
          background: var(--background-primary);
          border-radius: 20px;
          box-shadow: var(--shadow-large);
          overflow: hidden;
        }

        .faq-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-color);
        }

        .tab-button {
          flex: 1;
          padding: 20px;
          border: none;
          background: var(--background-secondary);
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .tab-button.active {
          background: var(--background-primary);
          color: var(--aws-orange);
          border-bottom: 3px solid var(--aws-orange);
        }

        .tab-button:hover:not(.active) {
          background: var(--background-primary);
          color: var(--text-primary);
        }

        .faq-content {
          padding: 32px;
        }

        .search-container {
          margin-bottom: 32px;
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 48px;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          font-size: 16px;
          background: var(--background-secondary);
          color: var(--text-primary);
          transition: var(--transition);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--aws-orange);
          background: var(--background-primary);
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          transition: var(--transition);
        }

        .faq-item:hover {
          box-shadow: var(--shadow);
        }

        .faq-question {
          width: 100%;
          padding: 20px;
          border: none;
          background: var(--background-primary);
          color: var(--text-primary);
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: var(--transition);
        }

        .faq-question:hover {
          background: var(--background-secondary);
        }

        .faq-icon {
          color: var(--aws-orange);
          flex-shrink: 0;
        }

        .faq-answer {
          padding: 0 20px 20px;
          background: var(--background-secondary);
          animation: slideDown 0.3s ease-out;
        }

        .faq-answer p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .no-results h3 {
          margin: 16px 0 8px;
          color: var(--text-primary);
        }

        .chat-content {
          height: 600px;
          display: flex;
          flex-direction: column;
        }

        .chat-messages {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message {
          display: flex;
          gap: 12px;
          max-width: 80%;
        }

        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message.bot .message-avatar {
          background: var(--aws-orange);
          color: white;
        }

        .message.user .message-avatar {
          background: var(--aws-blue);
          color: white;
        }

        .message-content {
          background: var(--background-secondary);
          padding: 12px 16px;
          border-radius: 16px;
          position: relative;
        }

        .message.user .message-content {
          background: var(--aws-orange);
          color: white;
        }

        .message-content p {
          margin: 0;
          line-height: 1.4;
        }

        .message-time {
          font-size: 0.75rem;
          opacity: 0.7;
          display: block;
          margin-top: 4px;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-secondary);
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .quick-questions {
          padding: 16px 24px;
          border-top: 1px solid var(--border-color);
          background: var(--background-secondary);
        }

        .quick-questions p {
          margin: 0 0 12px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .quick-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .quick-button {
          padding: 6px 12px;
          border: 1px solid var(--border-color);
          border-radius: 16px;
          background: var(--background-primary);
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .quick-button:hover {
          background: var(--aws-orange);
          color: white;
          border-color: var(--aws-orange);
        }

        .chat-input-container {
          padding: 24px;
          border-top: 1px solid var(--border-color);
        }

        .chat-input-wrapper {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid var(--border-color);
          border-radius: 24px;
          font-size: 16px;
          background: var(--background-secondary);
          color: var(--text-primary);
          transition: var(--transition);
        }

        .chat-input:focus {
          outline: none;
          border-color: var(--aws-orange);
          background: var(--background-primary);
        }

        .send-button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: var(--aws-orange);
          color: white;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-button:hover:not(:disabled) {
          background: var(--aws-orange-dark);
          transform: scale(1.05);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 768px) {
          .faq-container {
            margin: 0 -20px;
            border-radius: 0;
          }

          .faq-content {
            padding: 24px;
          }

          .chat-content {
            height: 500px;
          }

          .message {
            max-width: 90%;
          }

          .quick-buttons {
            flex-direction: column;
          }

          .quick-button {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};

export default InteractiveFAQ;