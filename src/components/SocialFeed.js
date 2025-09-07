import React, { useState } from 'react';
import { Twitter, Instagram, Linkedin, Heart, MessageCircle, Share, ExternalLink, RefreshCw } from 'lucide-react';

const SocialFeed = ({ hashtag = "#AWSMadurai2024" }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      platform: 'twitter',
      author: 'TechEnthusiast',
      handle: '@techenthusiast',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Excited to attend AWS User Route - Madurai Cloud Community Day! Looking forward to learning about serverless architecture and networking with fellow developers. #AWSMadurai2024 #CloudComputing',
      timestamp: new Date(Date.now() - 1800000),
      likes: 24,
      comments: 5,
      shares: 8,
      image: null
    },
    {
      id: 2,
      platform: 'linkedin',
      author: 'Priya Sharma',
      handle: 'Solutions Architect at AWS',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Thrilled to be speaking at the AWS Community Day in Madurai! Will be sharing insights on cloud architecture patterns and best practices. See you there! #AWSMadurai2024 #CloudArchitecture',
      timestamp: new Date(Date.now() - 3600000),
      likes: 45,
      comments: 12,
      shares: 15,
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      platform: 'twitter',
      author: 'CloudDeveloper',
      handle: '@clouddev',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Just registered for #AWSMadurai2024! Free event with amazing speakers and hands-on sessions. Perfect opportunity to level up cloud skills! 🚀',
      timestamp: new Date(Date.now() - 7200000),
      likes: 18,
      comments: 3,
      shares: 6,
      image: null
    },
    {
      id: 4,
      platform: 'instagram',
      author: 'madurai_tech_hub',
      handle: '@madurai_tech_hub',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Getting ready for the biggest cloud computing event in Madurai! 📅 April 15, 2024 🏢 The Gateway Hotel Pasumalai #AWSMadurai2024 #TechEvent #Madurai',
      timestamp: new Date(Date.now() - 10800000),
      likes: 67,
      comments: 8,
      shares: 12,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  const getPlatformIcon = (platform) => {
    const icons = {
      twitter: Twitter,
      linkedin: Linkedin,
      instagram: Instagram
    };
    return icons[platform] || Twitter;
  };

  const getPlatformColor = (platform) => {
    const colors = {
      twitter: '#1DA1F2',
      linkedin: '#0077B5',
      instagram: '#E4405F'
    };
    return colors[platform] || '#1DA1F2';
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call to fetch new posts
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: `${post.author} on ${post.platform}`,
        text: post.content,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${post.content} - ${window.location.href}`);
      alert('Post content copied to clipboard!');
    }
  };

  const filteredPosts = posts.filter(post => 
    filter === 'all' || post.platform === filter
  );

  return (
    <section id="social-feed" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Social Media Buzz</h2>
          <p className="section-subtitle">
            See what people are saying about AWS User Route - Madurai Cloud Community Day
          </p>
        </div>

        <div className="feed-container">
          <div className="feed-header">
            <div className="hashtag-display">
              <span className="hashtag">{hashtag}</span>
              <span className="post-count">{posts.length} posts</span>
            </div>
            
            <div className="feed-controls">
              <div className="platform-filters">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  className={`filter-btn twitter ${filter === 'twitter' ? 'active' : ''}`}
                  onClick={() => setFilter('twitter')}
                >
                  <Twitter size={16} />
                </button>
                <button
                  className={`filter-btn linkedin ${filter === 'linkedin' ? 'active' : ''}`}
                  onClick={() => setFilter('linkedin')}
                >
                  <Linkedin size={16} />
                </button>
                <button
                  className={`filter-btn instagram ${filter === 'instagram' ? 'active' : ''}`}
                  onClick={() => setFilter('instagram')}
                >
                  <Instagram size={16} />
                </button>
              </div>
              
              <button
                className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw size={16} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>

          <div className="posts-grid">
            {filteredPosts.map((post, index) => {
              const PlatformIcon = getPlatformIcon(post.platform);
              return (
                <div
                  key={post.id}
                  className="post-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="post-header">
                    <div className="author-info">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="author-avatar"
                      />
                      <div className="author-details">
                        <h4 className="author-name">{post.author}</h4>
                        <p className="author-handle">{post.handle}</p>
                      </div>
                    </div>
                    
                    <div className="platform-badge">
                      <PlatformIcon
                        size={16}
                        style={{ color: getPlatformColor(post.platform) }}
                      />
                      <span className="timestamp">{getTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>

                  <div className="post-content">
                    <p>{post.content}</p>
                    {post.image && (
                      <div className="post-image">
                        <img src={post.image} alt="Post content" />
                      </div>
                    )}
                  </div>

                  <div className="post-actions">
                    <button className="action-btn like">
                      <Heart size={16} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="action-btn comment">
                      <MessageCircle size={16} />
                      <span>{post.comments}</span>
                    </button>
                    <button
                      className="action-btn share"
                      onClick={() => handleShare(post)}
                    >
                      <Share size={16} />
                      <span>{post.shares}</span>
                    </button>
                    <button className="action-btn external">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="no-posts">
              <div className="no-posts-icon">
                {getPlatformIcon(filter) && React.createElement(getPlatformIcon(filter), { size: 48 })}
              </div>
              <h3>No posts found</h3>
              <p>No posts found for the selected platform. Try selecting a different filter.</p>
            </div>
          )}
        </div>

        <div className="social-cta">
          <div className="cta-content">
            <h3>Join the Conversation!</h3>
            <p>Share your excitement and connect with fellow attendees using {hashtag}</p>
            <div className="social-buttons">
              <a
                href={`https://twitter.com/intent/tweet?text=Excited%20to%20attend%20AWS%20User%20Route%20-%20Madurai%20Cloud%20Community%20Day!%20${hashtag}&url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn twitter"
              >
                <Twitter size={20} />
                Tweet about it
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin"
              >
                <Linkedin size={20} />
                Share on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .feed-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding: 24px;
          background: var(--background-primary);
          border-radius: 16px;
          box-shadow: var(--shadow);
        }

        .hashtag-display {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hashtag {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--aws-orange);
          background: rgba(255, 153, 0, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
        }

        .post-count {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .feed-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .platform-filters {
          display: flex;
          gap: 8px;
        }

        .filter-btn {
          padding: 8px 12px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--background-primary);
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .filter-btn:hover {
          border-color: var(--aws-orange);
          color: var(--aws-orange);
        }

        .filter-btn.active {
          background: var(--aws-orange);
          border-color: var(--aws-orange);
          color: white;
        }

        .filter-btn.twitter.active {
          background: #1DA1F2;
          border-color: #1DA1F2;
        }

        .filter-btn.linkedin.active {
          background: #0077B5;
          border-color: #0077B5;
        }

        .filter-btn.instagram.active {
          background: #E4405F;
          border-color: #E4405F;
        }

        .refresh-btn {
          padding: 8px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--background-primary);
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .refresh-btn:hover:not(:disabled) {
          border-color: var(--aws-orange);
          color: var(--aws-orange);
        }

        .refresh-btn.refreshing {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .refresh-btn.refreshing svg {
          animation: spin 1s linear infinite;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
        }

        .post-card {
          background: var(--background-primary);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-color);
          transition: var(--transition);
          opacity: 0;
          transform: translateY(20px);
          animation: slideInUp 0.6s ease-out forwards;
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .author-handle {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .platform-badge {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .timestamp {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .post-content {
          margin-bottom: 16px;
        }

        .post-content p {
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .post-image {
          border-radius: 12px;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .post-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition);
          font-size: 0.85rem;
        }

        .action-btn:hover {
          background: var(--background-secondary);
          color: var(--text-primary);
        }

        .action-btn.like:hover {
          color: #E91E63;
        }

        .action-btn.comment:hover {
          color: #2196F3;
        }

        .action-btn.share:hover {
          color: #4CAF50;
        }

        .no-posts {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .no-posts-icon {
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .no-posts h3 {
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .social-cta {
          background: var(--background-secondary);
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          border: 2px dashed var(--aws-orange);
        }

        .cta-content h3 {
          font-size: 1.8rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .cta-content p {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 1.1rem;
        }

        .social-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition);
        }

        .social-btn.twitter {
          background: #1DA1F2;
          color: white;
        }

        .social-btn.linkedin {
          background: #0077B5;
          color: white;
        }

        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .feed-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .feed-controls {
            justify-content: space-between;
          }

          .platform-filters {
            flex-wrap: wrap;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }

          .social-buttons {
            flex-direction: column;
            align-items: center;
          }

          .social-btn {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }

          .social-cta {
            padding: 40px 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default SocialFeed;