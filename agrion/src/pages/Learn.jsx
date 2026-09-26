import { useState } from "react";
import "./Learn.css";

function Learn({ onBack, onAsk }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLesson, setSelectedLesson] = useState(null);

  const categories = [
    "All",
    "Farming Basics",
    "Crops",
    "Sustainable Farming",
    "Technology",
    "Business",
  ];

  const lessons = [
    {
      id: 1,
      icon: "🌱",
      category: "Farming Basics",
      level: "Beginner",
      title: "How Farming Works",
      description:
        "Understand the basic journey of farming from preparing the land to harvesting and selling.",
      duration: "8 min",
      color: "green",
    },
    {
      id: 2,
      icon: "🌾",
      category: "Crops",
      level: "Beginner",
      title: "Understanding Crops",
      description:
        "Learn how different crops grow and what they need for healthy development.",
      duration: "10 min",
      color: "gold",
    },
    {
      id: 3,
      icon: "💧",
      category: "Farming Basics",
      level: "Beginner",
      title: "Water Management",
      description:
        "Learn why water matters and how farmers can manage irrigation carefully.",
      duration: "7 min",
      color: "blue",
    },
    {
      id: 4,
      icon: "🌿",
      category: "Sustainable Farming",
      level: "Intermediate",
      title: "Organic Farming",
      description:
        "Discover the principles of organic farming and sustainable agricultural practices.",
      duration: "12 min",
      color: "green",
    },
    {
      id: 5,
      icon: "🤖",
      category: "Technology",
      level: "Intermediate",
      title: "Technology in Farming",
      description:
        "Explore how technology, data, sensors and AI can support modern agriculture.",
      duration: "11 min",
      color: "purple",
    },
    {
      id: 6,
      icon: "🐛",
      category: "Crops",
      level: "Intermediate",
      title: "Crop Problems",
      description:
        "Learn how farmers monitor crops for weeds, pests and diseases.",
      duration: "10 min",
      color: "orange",
    },
    {
      id: 7,
      icon: "🌍",
      category: "Sustainable Farming",
      level: "Intermediate",
      title: "Protecting Soil",
      description:
        "Understand soil health and simple practices that help protect farmland.",
      duration: "9 min",
      color: "brown",
    },
    {
      id: 8,
      icon: "🛒",
      category: "Business",
      level: "Intermediate",
      title: "From Farm to Market",
      description:
        "Understand harvesting, storage, buyers, markets and the path from farm to customer.",
      duration: "13 min",
      color: "blue",
    },
    {
      id: 9,
      icon: "📊",
      category: "Business",
      level: "Advanced",
      title: "Farm Cost & Income",
      description:
        "Learn the basics of tracking farming expenses, income and profitability.",
      duration: "14 min",
      color: "purple",
    },
  ];

  const filteredLessons =
    activeCategory === "All"
      ? lessons
      : lessons.filter((lesson) => lesson.category === activeCategory);

  const handleLessonOpen = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleAskAGRION = (lesson = null) => {
    if (lesson) {
      localStorage.setItem(
        "agrionAskPrefill",
        `Explain "${lesson.title}" to me and help me understand how it relates to farming.`
      );
    }

    if (onAsk) {
      onAsk();
    }
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);

    setTimeout(() => {
      document
        .getElementById("learn-library")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleLearningPath = (step) => {
    const pathMap = {
      Understand: "Farming Basics",
      Explore: "Crops",
      Apply: "Sustainable Farming",
      Grow: "Business",
    };

    const category = pathMap[step];

    if (category) {
      setActiveCategory(category);

      setTimeout(() => {
        document
          .getElementById("learn-library")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  const handleStudentExplore = () => {
    setActiveCategory("Technology");

    setTimeout(() => {
      document
        .getElementById("learn-library")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  if (selectedLesson) {
    return (
      <div className="learn-page">
        <header className="learn-navbar">
          <button
            type="button"
            className="learn-back-button"
            onClick={() => setSelectedLesson(null)}
          >
            ← Back to Learn
          </button>

          <div className="learn-logo">
            <div className="learn-logo-icon">🌱</div>

            <div className="learn-logo-text">
              <strong>AGRION</strong>
              <span>From Seed to Market</span>
            </div>
          </div>
        </header>

        <main className="learn-lesson-page">
          <div className={`learn-lesson-hero ${selectedLesson.color}`}>
            <div className="learn-lesson-icon">
              {selectedLesson.icon}
            </div>

            <span>{selectedLesson.category}</span>

            <h1>{selectedLesson.title}</h1>

            <p>{selectedLesson.description}</p>

            <div className="learn-lesson-meta">
              <span>📖 {selectedLesson.level}</span>
              <span>⏱ {selectedLesson.duration}</span>
              <span>🌱 AGRION Learning</span>
            </div>
          </div>

          <section className="learn-content-card">
            <span className="learn-content-label">LESSON OVERVIEW</span>

            <h2>What you will learn</h2>

            <div className="learn-points">
              <div>
                <span>01</span>
                <div>
                  <strong>Understand the basics</strong>
                  <p>
                    Build a clear foundation before moving into more advanced
                    agricultural topics.
                  </p>
                </div>
              </div>

              <div>
                <span>02</span>
                <div>
                  <strong>Connect knowledge to the field</strong>
                  <p>
                    Understand how the topic can relate to real farming
                    decisions and crop management.
                  </p>
                </div>
              </div>

              <div>
                <span>03</span>
                <div>
                  <strong>Learn step by step</strong>
                  <p>
                    AGRION keeps learning simple so farmers and students can
                    understand important concepts without unnecessary
                    complexity.
                  </p>
                </div>
              </div>
            </div>

            <div className="learn-placeholder">
              <span>📚</span>
              <div>
                <strong>Detailed lesson content is coming</strong>
                <p>
                  During the next development stage, these lessons will contain
                  verified educational material, illustrations, videos,
                  practical examples and learning activities.
                </p>
              </div>
            </div>

            <div className="learn-lesson-actions">
              <button
                type="button"
                onClick={() => handleAskAGRION(selectedLesson)}
              >
                🤖 Ask AGRION About This
              </button>

              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
              >
                Explore More Lessons →
              </button>
            </div>
          </section>
        </main>

        <footer className="learn-footer">
          <strong>🌱 AGRION</strong>
          <p>From Seed to Market</p>
          <small>Growing knowledge. Growing possibilities.</small>
        </footer>
      </div>
    );
  }

  return (
    <div className="learn-page">
      {/* NAVBAR */}
      <header className="learn-navbar">
        <button
          type="button"
          className="learn-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="learn-logo">
          <div className="learn-logo-icon">🌱</div>

          <div className="learn-logo-text">
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>
        </div>

        <div className="learn-navbar-badge">
          📚 Learn
        </div>
      </header>

      <main className="learn-main">
        {/* HERO */}
        <section className="learn-hero">
          <div className="learn-hero-content">
            <span className="learn-label">
              📚 AGRION LEARNING
            </span>

            <h1>
              Learn farming.
              <br />
              <span>Grow knowledge.</span>
            </h1>

            <p>
              Simple, practical agricultural learning for farmers, students
              and anyone who wants to understand how food is grown.
            </p>

            <div className="learn-hero-actions">
              <button
                type="button"
                className="learn-primary-button"
                onClick={() =>
                  document
                    .getElementById("learn-library")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Start Learning →
              </button>

              <button
                type="button"
                className="learn-secondary-button"
                onClick={() => handleAskAGRION()}
              >
                🤖 Ask AGRION
              </button>
            </div>
          </div>

          <div className="learn-hero-visual">
            <div className="learn-book">
              <div className="learn-book-cover">
                <span>🌾</span>
                <strong>AGRION</strong>
                <small>AGRICULTURE</small>
              </div>

              <div className="learn-book-page">
                <span>🌱</span>
                <span>💧</span>
                <span>🌾</span>
              </div>
            </div>

            <div className="learn-floating-card learn-floating-one">
              🌱 Learn
            </div>

            <div className="learn-floating-card learn-floating-two">
              💡 Understand
            </div>
          </div>
        </section>

        {/* LEARNING STATS */}
        <section className="learn-stats">
          <div>
            <strong>9</strong>
            <span>Learning topics</span>
          </div>

          <div>
            <strong>5</strong>
            <span>Skill areas</span>
          </div>

          <div>
            <strong>3</strong>
            <span>Learning levels</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>Questions to explore</span>
          </div>
        </section>

        {/* LIBRARY */}
        <section id="learn-library" className="learn-library">
          <div className="learn-section-heading">
            <div>
              <span>LEARNING LIBRARY</span>
              <h2>Explore agriculture</h2>
              <p>
                Start with the basics and gradually explore crops,
                sustainability, technology and farm business.
              </p>
            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div className="learn-categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* LESSON CARDS */}
          <div className="learn-grid">
            {filteredLessons.map((lesson) => (
              <article
                className="learn-card"
                key={lesson.id}
                role="button"
                tabIndex={0}
                onClick={() => handleLessonOpen(lesson)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleLessonOpen(lesson);
                  }
                }}
              >
                <div className={`learn-card-visual ${lesson.color}`}>
                  <span>{lesson.icon}</span>

                  <small>{lesson.level}</small>
                </div>

                <div className="learn-card-body">
                  <span className="learn-card-category">
                    {lesson.category}
                  </span>

                  <h3>{lesson.title}</h3>

                  <p>{lesson.description}</p>

                  <div className="learn-card-footer">
                    <span>⏱ {lesson.duration}</span>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleLessonOpen(lesson);
                      }}
                    >
                      Learn →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="learn-empty">
              <span>🌱</span>
              <h3>No lessons found</h3>
              <p>Choose another learning category.</p>
            </div>
          )}
        </section>

        {/* LEARNING PATH */}
        <section className="learn-path">
          <div className="learn-path-heading">
            <span>🧭</span>

            <div>
              <span>YOUR LEARNING PATH</span>
              <h2>Grow from basics to better decisions</h2>
            </div>
          </div>

          <div className="learn-path-steps">
            <button
              type="button"
              onClick={() => handleLearningPath("Understand")}
            >
              <span>01</span>
              <strong>Understand</strong>
              <p>Learn the fundamentals of agriculture.</p>
            </button>

            <button
              type="button"
              onClick={() => handleLearningPath("Explore")}
            >
              <span>02</span>
              <strong>Explore</strong>
              <p>Discover crops, soil, water and farming methods.</p>
            </button>

            <button
              type="button"
              onClick={() => handleLearningPath("Apply")}
            >
              <span>03</span>
              <strong>Apply</strong>
              <p>Connect knowledge with real farming situations.</p>
            </button>

            <button
              type="button"
              onClick={() => handleLearningPath("Grow")}
            >
              <span>04</span>
              <strong>Grow</strong>
              <p>Build knowledge for better farming decisions.</p>
            </button>
          </div>
        </section>

        {/* STUDENTS */}
        <section className="learn-student-card">
          <div className="learn-student-icon">🎓</div>

          <div>
            <span>FOR STUDENTS</span>
            <h2>Understand the world behind your food</h2>
            <p>
              Learn about agriculture, food production, water, technology,
              sustainability and the future of farming.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStudentExplore}
          >
            Explore →
          </button>
        </section>

        {/* ASK AGRION */}
        <section className="learn-ask-card">
          <div className="learn-ask-icon">🤖</div>

          <div>
            <span>HAVE A QUESTION?</span>
            <h2>Ask AGRION</h2>
            <p>
              You don't have to know where to start. Ask AGRION and explore
              the topic together.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleAskAGRION()}
          >
            Ask AGRION →
          </button>
        </section>

        {/* SAFETY */}
        <section className="learn-safety">
          <span>⚠️</span>

          <div>
            <strong>Learning information</strong>
            <p>
              Educational content should not replace advice from qualified
              agricultural professionals. Important crop, pesticide,
              fertilizer, financial and market decisions should be verified
              with trusted sources.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="learn-footer">
        <strong>🌱 AGRION</strong>
        <p>From Seed to Market</p>
        <small>Growing knowledge. Growing possibilities.</small>
      </footer>
    </div>
  );
}

export default Learn;