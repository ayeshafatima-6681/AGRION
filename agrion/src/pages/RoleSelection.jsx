import "./RoleSelection.css";

function RoleSelection({ onBack, onSelectRole }) {
  const roles = [
    {
      id: "farmer",
      icon: "🌾",
      title: "Farmer",
      description:
        "Grow crops, manage your farm, solve crop problems and find better ways to sell your produce.",
    },
    {
      id: "student",
      icon: "🎓",
      title: "Student",
      description:
        "Learn agriculture, technology, data science and work on real-world agriculture projects.",
    },
    {
      id: "learner",
      icon: "📚",
      title: "Learner",
      description:
        "Explore farming, food, nature, sustainability and practical agriculture knowledge at your own pace.",
    },
    {
      id: "kids",
      icon: "🧒",
      title: "Kids Zone",
      description:
        "Discover where food comes from through fun, safe and interactive agriculture learning.",
    },
  ];

  return (
    <div className="role-page">
      <div className="role-container">

        <button
          className="role-back-button"
          onClick={onBack}
          type="button"
        >
          ← Back
        </button>

        <div className="role-header">
          <div className="role-logo">🌱</div>

          <span className="role-label">
            WELCOME TO AGRION
          </span>

          <h1>Choose your AGRION experience</h1>

          <p>
            Tell us who you are. AGRION will personalize
            your experience, tools and learning journey.
          </p>
        </div>

        <div className="role-grid">
          {roles.map((role) => (
            <button
              key={role.id}
              className="role-card"
              onClick={() => onSelectRole(role.id)}
              type="button"
            >
              <div className="role-icon">
                {role.icon}
              </div>

              <div className="role-card-content">
                <h2>{role.title}</h2>

                <p>{role.description}</p>

                <span>
                  Continue →
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="role-privacy">
          🔒 AGRION will only ask for information needed
          for your experience and will keep your account
          protected.
        </div>

      </div>
    </div>
  );
}

export default RoleSelection;