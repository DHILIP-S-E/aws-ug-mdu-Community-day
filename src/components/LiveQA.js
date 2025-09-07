import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, Filter, TrendingUp, Clock, User } from 'lucide-react';

const LiveQA = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What are the best practices for serverless architecture on AWS?",
      author: "Anonymous",
      timestamp: new Date(Date.now() - 300000),
      votes: 15,
      session: "Serverless Computing",
      status: "pending",
      hasVoted: false
    },
    {
      id: 2,
      question: "How do you handle cold starts in Lambda functions?",
      author: "DevOps Engineer",
      timestamp: new Date(Date.now() - 180000),
      votes: 8,
      session: "Serverless Computing",
      status: "answered",
      hasVoted: true
    },
    {
      id: 3,
      question: "What's the difference between SageMaker and other ML services?",
      author: "Data Scientist",
      timestamp: new Date(Date.now() - 120000),
      votes: 12,
      session: "AI/ML on AWS",
      status: "pending",
      hasVoted: false
    }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [selectedSession, setSelectedSession] = useState('all');
  const [sortBy, setSortBy] = useState('votes');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sessions = [
    'All Sessions',
    'Opening Keynote',
    'Serverless Computing',
    'AI/ML on AWS',
    'Security Best Practices',
    'Panel Discussion'
  ];

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim()) return;

    setIsSubmitting(true);
    
    const question = {
      id: Date.now(),
      question: newQuestion,
      author: "You",
      timestamp: new Date(),
      votes: 0,
      session: selectedSession === 'all' ? 'General' : selectedSession,
      status: "pending",
      hasVoted: false
    };

    // Simulate API call
    setTimeout(() => {
      setQuestions(prev => [question, ...prev]);
      setNewQuestion('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleVote = (questionId) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          votes: q.hasVoted ? q.votes - 1 : q.votes + 1,
          hasVoted: !q.hasVoted
        };
      }
      return q;
    }));
  };

  const filteredQuestions = questions
    .filter(q => selectedSession === 'all' || q.session.toLowerCase().includes(selectedSession.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;
      if (sortBy === 'recent') return b.timestamp - a.timestamp;
      return 0;
    });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="live-qa-container">
      <div className="qa-header">
        <div className="header-content">
          <MessageSquare className="header-icon" />
          <div>
            <h3>Live Q&A</h3>
            <p>Ask questions and vote for the ones you want answered</p>
          </div>
        </div>
        <div className="qa-stats">
          <div className="stat">
            <span className="stat-number">{questions.length}</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat">
            <span className="stat-number">{questions.filter(q => q.status === 'answered').length}</span>
            <span className="stat-label">Answered</span>
          </div>
        </div>
      </div>

      <div className="qa-submit">
        <div className="submit-form">
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask your question about the current session..."
            className="question-input"
            rows="3"
          />
          <div className="submit-actions">
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="session-select"
            >
              {sessions.map(session => (
                <option key={session} value={session.toLowerCase()}>
                  {session}
                </option>
              ))}
            </select>
            <button
              onClick={handleSubmitQuestion}
              disabled={!newQuestion.trim() || isSubmitting}
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  <Send size={16} />
                  Submit
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="qa-filters">
        <div className="filter-group">
          <Filter size={16} />
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Sessions</option>
            {sessions.slice(1).map(session => (
              <option key={session} value={session.toLowerCase()}>
                {session}
              </option>
            ))}
          </select>
        </div>
        
        <div className="sort-group">
          <TrendingUp size={16} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="votes">Most Voted</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>

      <div className="questions-list">
        {filteredQuestions.map((question) => (
          <div key={question.id} className={`question-card ${question.status}`}>
            <div className="question-vote">
              <button
                onClick={() => handleVote(question.id)}
                className={`vote-button ${question.hasVoted ? 'voted' : ''}`}
              >
                <ThumbsUp size={16} />
                <span>{question.votes}</span>
              </button>
            </div>
            
            <div className="question-content">
              <div className="question-text">
                {question.question}
              </div>
              
              <div className="question-meta">
                <div className="meta-left">
                  <span className="author">
                    <User size={14} />
                    {question.author}
                  </span>
                  <span className="session-tag">{question.session}</span>
                </div>
                <div className="meta-right">
                  <span className="timestamp">
                    <Clock size={14} />
                    {getTimeAgo(question.timestamp)}
                  </span>
                  <span className={`status-badge ${question.status}`}>
                    {question.status === 'answered' ? 'Answered' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredQuestions.length === 0 && (
          <div className="no-questions">
            <MessageSquare size={48} />
            <h4>No questions yet</h4>
            <p>Be the first to ask a question about the current session!</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .live-qa-container {
          background: var(--background-primary);
          border-radius: 16px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .qa-header {
          background: var(--background-secondary);
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          color: var(--aws-orange);
          background: rgba(255, 153, 0, 0.1);
          padding: 12px;
          border-radius: 12px;
          width: 48px;
          height: 48px;
        }

        .header-content h3 {
          margin: 0;
          color: var(--text-primary);
          font-size: 1.3rem;
        }

        .header-content p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .qa-stats {
          display: flex;
          gap: 24px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--aws-orange);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .qa-submit {
          padding: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .submit-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .question-input {
          width: 100%;
          padding: 16px;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          font-size: 16px;
          font-family: inherit;
          background: var(--background-secondary);
          color: var(--text-primary);
          resize: vertical;
          min-height: 80px;
          transition: var(--transition);
        }

        .question-input:focus {
          outline: none;
          border-color: var(--aws-orange);
          background: var(--background-primary);
        }

        .submit-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .session-select {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--background-primary);
          color: var(--text-primary);
          font-size: 14px;
        }

        .qa-filters {
          padding: 16px 24px;
          background: var(--background-secondary);
          display: flex;
          gap: 24px;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-group,
        .sort-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-select,
        .sort-select {
          padding: 8px 12px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--background-primary);
          color: var(--text-primary);
          font-size: 14px;
        }

        .questions-list {
          max-height: 500px;
          overflow-y: auto;
        }

        .question-card {
          display: flex;
          gap: 16px;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
          transition: var(--transition);
        }

        .question-card:hover {
          background: var(--background-secondary);
        }

        .question-card.answered {
          background: rgba(76, 175, 80, 0.05);
          border-left: 4px solid #4CAF50;
        }

        .question-vote {
          flex-shrink: 0;
        }

        .vote-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--background-primary);
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition);
          min-width: 60px;
        }

        .vote-button:hover {
          border-color: var(--aws-orange);
          color: var(--aws-orange);
        }

        .vote-button.voted {
          background: var(--aws-orange);
          border-color: var(--aws-orange);
          color: white;
        }

        .vote-button span {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .question-content {
          flex: 1;
        }

        .question-text {
          font-size: 1rem;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .question-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .meta-left,
        .meta-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .author {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .session-tag {
          background: var(--aws-orange);
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .timestamp {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .status-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badge.pending {
          background: rgba(255, 193, 7, 0.2);
          color: #FF6F00;
        }

        .status-badge.answered {
          background: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
        }

        .no-questions {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .no-questions h4 {
          margin: 16px 0 8px;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .qa-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .qa-stats {
            justify-content: center;
          }

          .submit-actions {
            flex-direction: column;
          }

          .session-select {
            width: 100%;
          }

          .qa-filters {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .filter-group,
          .sort-group {
            justify-content: center;
          }

          .question-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .meta-left,
          .meta-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveQA;