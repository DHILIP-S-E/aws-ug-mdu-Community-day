import React, { useState } from 'react';
import { Trophy, Star, Target, Award, Gift, Users, MessageSquare, Calendar } from 'lucide-react';

const Gamification = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'TechEnthusiast', points: 850, level: 5, avatar: '🚀' },
    { id: 2, name: 'CloudMaster', points: 720, level: 4, avatar: '☁️' },
    { id: 3, name: 'DevOpsGuru', points: 680, level: 4, avatar: '⚡' },
    { id: 4, name: 'You', points: userPoints, level: userLevel, avatar: '👤' },
    { id: 5, name: 'DataScientist', points: 520, level: 3, avatar: '📊' }
  ]);

  const pointsToNextLevel = (userLevel * 200) - userPoints;
  const progressPercentage = (userPoints % 200) / 200 * 100;

  const availableActions = [
    {
      id: 'register',
      title: 'Complete Registration',
      description: 'Fill out the registration form',
      points: 50,
      icon: Calendar,
      completed: false
    },
    {
      id: 'social_share',
      title: 'Share on Social Media',
      description: 'Share the event on Twitter or LinkedIn',
      points: 30,
      icon: MessageSquare,
      completed: false
    },
    {
      id: 'ask_question',
      title: 'Ask a Question',
      description: 'Submit a question in Live Q&A',
      points: 25,
      icon: MessageSquare,
      completed: false
    },
    {
      id: 'vote_question',
      title: 'Vote for Questions',
      description: 'Vote for 5 questions in Live Q&A',
      points: 15,
      icon: Target,
      completed: false
    },
    {
      id: 'network',
      title: 'Connect with Speakers',
      description: 'Visit speaker social profiles',
      points: 20,
      icon: Users,
      completed: false
    }
  ];

  const achievementsList = [
    {
      id: 'early_bird',
      title: 'Early Bird',
      description: 'Registered within first 24 hours',
      icon: '🐦',
      points: 100,
      unlocked: false
    },
    {
      id: 'social_butterfly',
      title: 'Social Butterfly',
      description: 'Shared event on 3 social platforms',
      icon: '🦋',
      points: 75,
      unlocked: false
    },
    {
      id: 'curious_mind',
      title: 'Curious Mind',
      description: 'Asked 5 questions in Live Q&A',
      icon: '🤔',
      points: 125,
      unlocked: false
    },
    {
      id: 'community_helper',
      title: 'Community Helper',
      description: 'Voted for 20 questions',
      icon: '🤝',
      points: 100,
      unlocked: false
    },
    {
      id: 'networking_pro',
      title: 'Networking Pro',
      description: 'Connected with all speakers',
      icon: '🌟',
      points: 150,
      unlocked: false
    }
  ];

  const handleActionComplete = (actionId, points) => {
    setUserPoints(prev => prev + points);
    
    // Check for level up
    const newLevel = Math.floor((userPoints + points) / 200) + 1;
    if (newLevel > userLevel) {
      setUserLevel(newLevel);
      // Show level up notification
      showNotification(`🎉 Level Up! You're now Level ${newLevel}!`);
    }

    // Update leaderboard
    setLeaderboard(prev => 
      prev.map(user => 
        user.name === 'You' 
          ? { ...user, points: userPoints + points, level: newLevel }
          : user
      ).sort((a, b) => b.points - a.points)
    );

    showNotification(`+${points} points earned!`);
  };

  const showNotification = (message) => {
    // Simple notification - in a real app, you'd use a proper notification system
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--aws-orange);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const getRankSuffix = (rank) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  const userRank = leaderboard.findIndex(user => user.name === 'You') + 1;

  return (
    <div className="gamification-container">
      <div className="gamification-header">
        <div className="user-stats">
          <div className="level-badge">
            <Star className="level-icon" />
            <span>Level {userLevel}</span>
          </div>
          <div className="points-display">
            <Trophy className="points-icon" />
            <span>{userPoints} points</span>
          </div>
          <div className="rank-display">
            <Award className="rank-icon" />
            <span>{userRank}{getRankSuffix(userRank)} place</span>
          </div>
        </div>
        
        <div className="progress-section">
          <div className="progress-info">
            <span>Progress to Level {userLevel + 1}</span>
            <span>{pointsToNextLevel} points to go</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="gamification-content">
        <div className="actions-section">
          <h3>Earn Points</h3>
          <div className="actions-grid">
            {availableActions.map(action => {
              const IconComponent = action.icon;
              return (
                <div key={action.id} className={`action-card ${action.completed ? 'completed' : ''}`}>
                  <div className="action-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="action-content">
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                    <div className="action-points">+{action.points} points</div>
                  </div>
                  <button
                    className="action-btn"
                    onClick={() => handleActionComplete(action.id, action.points)}
                    disabled={action.completed}
                  >
                    {action.completed ? 'Completed' : 'Complete'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="achievements-section">
          <h3>Achievements</h3>
          <div className="achievements-grid">
            {achievementsList.map(achievement => (
              <div key={achievement.id} className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon">
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>
                <div className="achievement-content">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <div className="achievement-points">
                    {achievement.points} points
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="leaderboard-section">
          <h3>Leaderboard</h3>
          <div className="leaderboard">
            {leaderboard.slice(0, 10).map((user, index) => (
              <div key={user.id} className={`leaderboard-item ${user.name === 'You' ? 'current-user' : ''}`}>
                <div className="rank">#{index + 1}</div>
                <div className="user-info">
                  <span className="avatar">{user.avatar}</span>
                  <span className="name">{user.name}</span>
                </div>
                <div className="user-stats">
                  <span className="level">L{user.level}</span>
                  <span className="points">{user.points}pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rewards-section">
        <div className="rewards-header">
          <Gift className="rewards-icon" />
          <div>
            <h3>Rewards & Prizes</h3>
            <p>Earn points to unlock exclusive rewards!</p>
          </div>
        </div>
        <div className="rewards-list">
          <div className="reward-item">
            <span className="reward-points">500 pts</span>
            <span className="reward-name">AWS Certification Voucher (50% off)</span>
          </div>
          <div className="reward-item">
            <span className="reward-points">750 pts</span>
            <span className="reward-name">Exclusive AWS Swag Package</span>
          </div>
          <div className="reward-item">
            <span className="reward-points">1000 pts</span>
            <span className="reward-name">1-on-1 Mentoring Session with Speaker</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gamification-container {
          background: var(--background-primary);
          border-radius: 20px;
          box-shadow: var(--shadow-large);
          overflow: hidden;
        }

        .gamification-header {
          background: linear-gradient(135deg, var(--aws-orange), var(--aws-orange-dark));
          color: white;
          padding: 32px;
        }

        .user-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .level-badge,
        .points-display,
        .rank-display {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
        }

        .progress-section {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 12px;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: white;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .gamification-content {
          padding: 32px;
          display: grid;
          gap: 40px;
        }

        .actions-section h3,
        .achievements-section h3,
        .leaderboard-section h3 {
          color: var(--text-primary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .action-card {
          background: var(--background-secondary);
          border: 2px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: var(--transition);
        }

        .action-card:hover {
          border-color: var(--aws-orange);
          transform: translateY(-2px);
        }

        .action-card.completed {
          background: rgba(76, 175, 80, 0.1);
          border-color: #4CAF50;
        }

        .action-icon {
          width: 48px;
          height: 48px;
          background: var(--aws-orange);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .action-content {
          flex: 1;
        }

        .action-content h4 {
          margin: 0 0 4px;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .action-content p {
          margin: 0 0 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .action-points {
          color: var(--aws-orange);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .action-btn {
          padding: 8px 16px;
          border: 2px solid var(--aws-orange);
          border-radius: 6px;
          background: transparent;
          color: var(--aws-orange);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 600;
        }

        .action-btn:hover:not(:disabled) {
          background: var(--aws-orange);
          color: white;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .achievement-card {
          background: var(--background-secondary);
          border: 2px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: var(--transition);
        }

        .achievement-card.unlocked {
          border-color: #4CAF50;
          background: rgba(76, 175, 80, 0.1);
        }

        .achievement-card.locked {
          opacity: 0.6;
        }

        .achievement-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .achievement-content h4 {
          margin: 0 0 8px;
          color: var(--text-primary);
        }

        .achievement-content p {
          margin: 0 0 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .achievement-points {
          color: var(--aws-orange);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .leaderboard {
          background: var(--background-secondary);
          border-radius: 12px;
          overflow: hidden;
        }

        .leaderboard-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          transition: var(--transition);
        }

        .leaderboard-item:last-child {
          border-bottom: none;
        }

        .leaderboard-item.current-user {
          background: rgba(255, 153, 0, 0.1);
          border-left: 4px solid var(--aws-orange);
        }

        .leaderboard-item:hover {
          background: var(--background-primary);
        }

        .rank {
          font-weight: 700;
          color: var(--aws-orange);
          width: 40px;
        }

        .user-info {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          font-size: 1.5rem;
        }

        .name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .user-stats {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .level {
          background: var(--aws-orange);
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .points {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .rewards-section {
          background: var(--background-secondary);
          padding: 32px;
          border-top: 1px solid var(--border-color);
        }

        .rewards-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .rewards-icon {
          color: var(--aws-orange);
          background: rgba(255, 153, 0, 0.1);
          padding: 12px;
          border-radius: 12px;
          width: 48px;
          height: 48px;
        }

        .rewards-header h3 {
          margin: 0;
          color: var(--text-primary);
        }

        .rewards-header p {
          margin: 0;
          color: var(--text-secondary);
        }

        .rewards-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .reward-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: var(--background-primary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .reward-points {
          background: var(--aws-orange);
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .reward-name {
          color: var(--text-primary);
          font-weight: 500;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .gamification-header {
            padding: 24px;
          }

          .user-stats {
            flex-direction: column;
            align-items: stretch;
          }

          .level-badge,
          .points-display,
          .rank-display {
            justify-content: center;
          }

          .gamification-content {
            padding: 24px;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }

          .action-card {
            flex-direction: column;
            text-align: center;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .leaderboard-item {
            padding: 12px 16px;
          }

          .user-stats {
            flex-direction: column;
            gap: 8px;
          }

          .rewards-section {
            padding: 24px;
          }

          .reward-item {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Gamification;