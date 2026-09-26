import { useState } from "react";
import "./Community.css";

function Community({ onBack, onAsk }) {
  const [activeTab, setActiveTab] = useState("community");
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentOpen, setCommentOpen] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [newPost, setNewPost] = useState("");

  const posts = [
    {
      id: 1,
      name: "Ravi Kumar",
      role: "Farmer",
      location: "Karnataka",
      avatar: "👨‍🌾",
      time: "2 hours ago",
      crop: "🌾 Rice",
      text: "My rice crop is growing well after careful water management. Sharing the journey with everyone. 🌱",
      image: "🌾",
      likes: 42,
      comments: 8,
      tag: "Crop Journey",
    },
    {
      id: 2,
      name: "Meena Devi",
      role: "Farmer",
      location: "Tamil Nadu",
      avatar: "👩‍🌾",
      time: "5 hours ago",
      crop: "🍅 Tomato",
      text: "Started harvesting my tomatoes this week. Every stage from planting to harvest teaches something new. ❤️",
      image: "🍅",
      likes: 67,
      comments: 14,
      tag: "Harvest",
    },
    {
      id: 3,
      name: "Arjun",
      role: "Student",
      location: "Bengaluru",
      avatar: "👨‍🎓",
      time: "Yesterday",
      crop: "🌱 Learning",
      text: "Learning about sustainable farming and how technology can help farmers make better decisions.",
      image: "📚",
      likes: 31,
      comments: 6,
      tag: "Learning",
    },
  ];

  const reels = [
    {
      id: 1,
      creator: "Kiran Farm",
      avatar: "👨‍🌾",
      title: "Rice field update 🌾",
      views: "2.4K views",
      visual: "🌾",
    },
    {
      id: 2,
      creator: "Green Village",
      avatar: "👩‍🌾",
      title: "From seed to harvest 🌱",
      views: "1.8K views",
      visual: "🌱",
    },
    {
      id: 3,
      creator: "Agri Student",
      avatar: "👨‍🎓",
      title: "Organic farming tips 🌿",
      views: "950 views",
      visual: "🌿",
    },
    {
      id: 4,
      creator: "Farm Life",
      avatar: "👨‍🌾",
      title: "A day on the farm 🚜",
      views: "3.1K views",
      visual: "🚜",
    },
  ];

  const topics = [
    { icon: "🌾", title: "Crop Journeys", count: "124 stories" },
    { icon: "🌿", title: "Organic Farming", count: "86 discussions" },
    { icon: "💧", title: "Water Management", count: "73 discussions" },
    { icon: "🐛", title: "Crop Problems", count: "102 discussions" },
    { icon: "🛒", title: "Selling & Markets", count: "91 discussions" },
    { icon: "🤖", title: "Agri Technology", count: "65 discussions" },
  ];

  const handleLike = (id) => {
    setLikedPosts((current) =>
      current.includes(id)
        ? current.filter((postId) => postId !== id)
        : [...current, id]
    );
  };

  const handleComment = (id) => {
    if (!commentText.trim()) return;

    setCommentText("");
    setCommentOpen(null);

    alert("Comments will be connected to the AGRION backend soon.");
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    setNewPost("");
    alert("Post publishing will be connected to the AGRION backend soon.");
  };

  const handleAskAGRION = () => {
    if (onAsk) {
      onAsk();
    }
  };

  return (
    <div className="community-page">
      {/* NAVBAR */}
      <header className="community-navbar">
        <button
          type="button"
          className="community-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="community-logo">
          <div className="community-logo-icon">🌱</div>

          <div className="community-logo-text">
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>
        </div>

        <div className="community-navbar-status">
          <span className="community-status-dot"></span>
          Community
        </div>
      </header>

      <main className="community-main">
        {/* HERO */}
        <section className="community-hero">
          <div className="community-hero-content">
            <span className="community-label">
              👥 AGRION FARMER COMMUNITY
            </span>

            <h1>
              Grow together.
              <br />
              <span>Learn together.</span>
            </h1>

            <p>
              Share your farming journey, learn from other farmers, discover
              ideas and celebrate the people growing our food.
            </p>

            <div className="community-hero-actions">
              <button
                type="button"
                className="community-primary-button"
                onClick={() =>
                  document
                    .getElementById("community-create-post")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                ✏️ Share Your Story
              </button>

              <button
                type="button"
                className="community-secondary-button"
                onClick={handleAskAGRION}
              >
                🤖 Ask AGRION
              </button>
            </div>
          </div>

          <div className="community-hero-visual">
            <div className="community-community-circle">
              <span>👨‍🌾</span>
              <span>👩‍🌾</span>
              <span>🌱</span>
              <span>🤝</span>
            </div>

            <div className="community-floating-card community-floating-one">
              🌾 Crop Stories
            </div>

            <div className="community-floating-card community-floating-two">
              🤝 Learn & Share
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="community-tabs">
          <button
            type="button"
            className={activeTab === "community" ? "active" : ""}
            onClick={() => setActiveTab("community")}
          >
            👥 Community
          </button>

          <button
            type="button"
            className={activeTab === "reels" ? "active" : ""}
            onClick={() => setActiveTab("reels")}
          >
            ▶️ Reels
          </button>

          <button
            type="button"
            className={activeTab === "topics" ? "active" : ""}
            onClick={() => setActiveTab("topics")}
          >
            🌱 Topics
          </button>
        </div>

        {/* COMMUNITY */}
        {activeTab === "community" && (
          <>
            {/* CREATE POST */}
            <section
              id="community-create-post"
              className="community-create-card"
            >
              <div className="community-create-avatar">👨‍🌾</div>

              <div className="community-create-content">
                <h2>Share with the farming community</h2>

                <textarea
                  value={newPost}
                  onChange={(event) => setNewPost(event.target.value)}
                  placeholder="Share your crop journey, farming experience, tip or question..."
                  rows="3"
                />

                <div className="community-create-actions">
                  <div className="community-create-tools">
                    <button type="button">📷 Photo</button>
                    <button type="button">🎥 Video</button>
                    <button type="button">🌾 Crop Journey</button>
                  </div>

                  <button
                    type="button"
                    className="community-post-button"
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                  >
                    Post →
                  </button>
                </div>
              </div>
            </section>

            {/* FEED */}
            <section className="community-feed-section">
              <div className="community-section-heading">
                <div>
                  <span>COMMUNITY FEED</span>
                  <h2>What farmers are sharing</h2>
                </div>

                <button type="button">Latest ▾</button>
              </div>

              <div className="community-feed">
                {posts.map((post) => {
                  const liked = likedPosts.includes(post.id);

                  return (
                    <article className="community-post" key={post.id}>
                      <div className="community-post-header">
                        <div className="community-post-user">
                          <div className="community-post-avatar">
                            {post.avatar}
                          </div>

                          <div>
                            <strong>{post.name}</strong>

                            <span>
                              {post.role} • {post.location} • {post.time}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="community-more-button"
                        >
                          •••
                        </button>
                      </div>

                      <div className="community-post-tag">
                        {post.tag} • {post.crop}
                      </div>

                      <p className="community-post-text">{post.text}</p>

                      <div className="community-post-image">
                        <span>{post.image}</span>
                      </div>

                      <div className="community-post-stats">
                        <span>
                          {post.likes + (liked ? 1 : 0)} likes
                        </span>

                        <span>{post.comments} comments</span>
                      </div>

                      <div className="community-post-actions">
                        <button
                          type="button"
                          className={liked ? "liked" : ""}
                          onClick={() => handleLike(post.id)}
                        >
                          {liked ? "❤️" : "🤍"} Like
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setCommentOpen(
                              commentOpen === post.id ? null : post.id
                            )
                          }
                        >
                          💬 Comment
                        </button>

                        <button type="button">↗️ Share</button>
                      </div>

                      {commentOpen === post.id && (
                        <div className="community-comment-box">
                          <input
                            type="text"
                            value={commentText}
                            onChange={(event) =>
                              setCommentText(event.target.value)
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleComment(post.id);
                              }
                            }}
                            placeholder="Write a comment..."
                          />

                          <button
                            type="button"
                            onClick={() => handleComment(post.id)}
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* REELS */}
        {activeTab === "reels" && (
          <section className="community-reels-section">
            <div className="community-section-heading">
              <div>
                <span>AGRION REELS</span>
                <h2>Short stories from the field</h2>
                <p>
                  Farmers and learners can share short farming videos,
                  experiences, tips and crop updates.
                </p>
              </div>
            </div>

            <div className="community-reels-grid">
              {reels.map((reel) => (
                <article className="community-reel-card" key={reel.id}>
                  <div className="community-reel-visual">
                    <span>{reel.visual}</span>

                    <button
                      type="button"
                      className="community-reel-play"
                    >
                      ▶
                    </button>

                    <div className="community-reel-overlay">
                      <strong>{reel.title}</strong>
                      <span>{reel.views}</span>
                    </div>
                  </div>

                  <div className="community-reel-creator">
                    <div>{reel.avatar}</div>

                    <div>
                      <strong>{reel.creator}</strong>
                      <span>AGRION creator</span>
                    </div>

                    <button type="button">•••</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="community-reels-note">
              <span>🎥</span>
              <div>
                <strong>Share your farming story</strong>
                <p>
                  Video uploads, reels, views, likes and creator features will
                  be connected to the AGRION backend later.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* TOPICS */}
        {activeTab === "topics" && (
          <section className="community-topics-section">
            <div className="community-section-heading">
              <div>
                <span>EXPLORE AGRICULTURE</span>
                <h2>Find a community topic</h2>
                <p>
                  Explore conversations around farming, crops, markets and
                  agricultural technology.
                </p>
              </div>
            </div>

            <div className="community-topics-grid">
              {topics.map((topic) => (
                <button
                  type="button"
                  className="community-topic-card"
                  key={topic.title}
                >
                  <div className="community-topic-icon">{topic.icon}</div>

                  <div>
                    <strong>{topic.title}</strong>
                    <span>{topic.count}</span>
                  </div>

                  <span className="community-topic-arrow">→</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* MY CROP JOURNEY */}
        <section className="my-crop-journey-community">
          <div className="my-crop-journey-icon">🌱</div>

          <div className="my-crop-journey-content">
            <span>FEATURED COMMUNITY IDEA</span>

            <h2>My Crop Journey</h2>

            <p>
              Document your crop from planting to harvest. Share the progress,
              challenges, lessons and final result with the AGRION community.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("community-create-post")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Journey →
          </button>
        </section>

        {/* COMMUNITY VALUES */}
        <section className="community-values">
          <div className="community-values-heading">
            <span>🌍</span>

            <div>
              <h2>A community built around farmers</h2>
              <p>
                AGRION is designed to make agricultural knowledge easier to
                share and easier to access.
              </p>
            </div>
          </div>

          <div className="community-values-grid">
            <div>
              <span>🤝</span>
              <strong>Learn from each other</strong>
              <p>Share practical experiences and useful farming knowledge.</p>
            </div>

            <div>
              <span>🌱</span>
              <strong>Celebrate progress</strong>
              <p>Every crop journey has lessons worth sharing.</p>
            </div>

            <div>
              <span>💡</span>
              <strong>Discover ideas</strong>
              <p>Find new approaches, tools and agricultural possibilities.</p>
            </div>

            <div>
              <span>❤️</span>
              <strong>Support farmers</strong>
              <p>Build a respectful and helpful farming community.</p>
            </div>
          </div>
        </section>

        {/* ASK AGRION */}
        <section className="community-ask-card">
          <div className="community-ask-icon">🤖</div>

          <div>
            <span>NEED FARMING HELP?</span>
            <h2>Ask AGRION</h2>
            <p>
              Have a farming question? Talk directly with AGRION's farming
              assistant.
            </p>
          </div>

          <button type="button" onClick={handleAskAGRION}>
            Ask AGRION →
          </button>
        </section>

        {/* SAFETY */}
        <section className="community-safety">
          <span>⚠️</span>

          <div>
            <strong>Community safety</strong>
            <p>
              Community posts are shared experiences, not professional
              agricultural advice. Verify important crop, pesticide,
              fertilizer, financial and market decisions with trusted
              agricultural sources or qualified professionals.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="community-footer">
        <strong>🌱 AGRION</strong>
        <p>From Seed to Market</p>
        <small>Growing knowledge. Growing possibilities.</small>
      </footer>
    </div>
  );
}

export default Community;