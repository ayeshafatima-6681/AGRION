import { useEffect, useState } from "react";
import "./Notifications.css";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../data/notifications";

function Notifications({ onBack }) {
  const [notifications, setNotifications] = useState(() =>
    getNotifications()
  );

  const refreshNotifications = () => {
    setNotifications(getNotifications());
  };

  useEffect(() => {
    const handleNotificationChange = () => {
      refreshNotifications();
    };

    window.addEventListener(
      "agrionNotificationsChanged",
      handleNotificationChange
    );

    return () => {
      window.removeEventListener(
        "agrionNotificationsChanged",
        handleNotificationChange
      );
    };
  }, []);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      const updated = markNotificationAsRead(
        notification.id
      );

      setNotifications(updated);
    }
  };

  const handleMarkAllAsRead = () => {
    const updated =
      markAllNotificationsAsRead();

    setNotifications(updated);
  };

  const handleDelete = (
    event,
    notificationId
  ) => {
    event.stopPropagation();

    const updated =
      deleteNotification(notificationId);

    setNotifications(updated);
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const formatDate = (date) => {
    if (!date) return "";

    try {
      const notificationDate =
        new Date(date);

      return notificationDate.toLocaleString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
        }
      );
    } catch {
      return "";
    }
  };

  const getIcon = (type) => {
    const icons = {
      agrion: "🌱",
      weather: "🌦️",
      crop: "🌾",
      water: "💧",
      nutrient: "🌿",
      pest: "🐛",
      disease: "🩺",
      harvest: "🧺",
      market: "🛒",
      community: "👥",
    };

    return icons[type] || "🔔";
  };

  return (
    <div className="notifications-page">
      <header className="notifications-navbar">
        <button
          type="button"
          className="notifications-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="notifications-brand">
          <div className="notifications-brand-icon">
            🌱
          </div>

          <div>
            <strong>AGRION</strong>
            <span>From Seed to Market</span>
          </div>
        </div>

        <div className="notifications-nav-label">
          🔔 Notifications
        </div>
      </header>

      <main className="notifications-main">
        <section className="notifications-hero">
          <div>
            <span className="notifications-eyebrow">
              AGRION UPDATES
            </span>

            <h1>Your notifications.</h1>

            <p>
              Stay updated with reminders, farming
              activities and important AGRION updates.
            </p>
          </div>

          <div className="notifications-hero-icon">
            🔔
          </div>
        </section>

        <section className="notifications-toolbar">
          <div>
            <strong>
              {unreadCount > 0
                ? `${unreadCount} unread`
                : "All caught up"}
            </strong>

            <span>
              {notifications.length}{" "}
              {notifications.length === 1
                ? "notification"
                : "notifications"}
            </span>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              className="notifications-mark-all"
              onClick={handleMarkAllAsRead}
            >
              ✓ Mark all as read
            </button>
          )}
        </section>

        <section className="notifications-list">
          {notifications.length === 0 ? (
            <div className="notifications-empty">
              <div className="notifications-empty-icon">
                🔔
              </div>

              <h2>No notifications yet</h2>

              <p>
                AGRION will show useful updates and
                reminders here.
              </p>
            </div>
          ) : (
            notifications.map(
              (notification) => (
                <article
                  key={notification.id}
                  className={`notification-card ${
                    notification.read
                      ? "read"
                      : "unread"
                  }`}
                  onClick={() =>
                    handleNotificationClick(
                      notification
                    )
                  }
                >
                  {!notification.read && (
                    <span className="notification-unread-dot" />
                  )}

                  <div className="notification-icon">
                    {getIcon(
                      notification.type
                    )}
                  </div>

                  <div className="notification-content">
                    <div className="notification-title-row">
                      <h3>
                        {notification.title}
                      </h3>

                      <span className="notification-time">
                        {formatDate(
                          notification.date
                        )}
                      </span>
                    </div>

                    <p>
                      {notification.message}
                    </p>

                    {!notification.read && (
                      <span className="notification-status">
                        New
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="notification-delete"
                    onClick={(event) =>
                      handleDelete(
                        event,
                        notification.id
                      )
                    }
                    aria-label="Delete notification"
                  >
                    ×
                  </button>
                </article>
              )
            )
          )}
        </section>

        <section className="notifications-note">
          <span>🔒</span>

          <div>
            <strong>AGRION notifications</strong>

            <p>
              Notification preferences and real-time
              alerts will be connected to your AGRION
              account and farming data later.
            </p>
          </div>
        </section>
      </main>

      <footer className="notifications-footer">
        <strong>🌱 AGRION</strong>

        <p>From Seed to Market</p>

        <small>
          Better farming begins with better understanding. 🌿
        </small>
      </footer>
    </div>
  );
}

export default Notifications;