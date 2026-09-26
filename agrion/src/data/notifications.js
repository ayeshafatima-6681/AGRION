const NOTIFICATIONS_STORAGE_KEY =
  "agrionNotifications";

const NOTIFICATIONS_INITIALIZED_KEY =
  "agrionNotificationsInitialized";

const SETTINGS_STORAGE_KEY =
  "agrionSettings";

const DEFAULT_NOTIFICATIONS = [
  {
    id: "welcome",
    type: "agrion",
    title: "Welcome to AGRION",
    message:
      "Your farming journey from seed to market starts here.",
    date: new Date().toISOString(),
    read: false,
    priority: "normal",
  },
];

const DEFAULT_NOTIFICATION_SETTINGS = {
  notifications: true,
  weatherAlerts: true,
  cropReminders: true,
  communityUpdates: false,
};

export const getDefaultNotifications = () => {
  return JSON.parse(
    JSON.stringify(DEFAULT_NOTIFICATIONS)
  );
};

export const getNotificationSettings = () => {
  try {
    const storedSettings =
      localStorage.getItem(
        SETTINGS_STORAGE_KEY
      );

    if (!storedSettings) {
      return DEFAULT_NOTIFICATION_SETTINGS;
    }

    const parsedSettings =
      JSON.parse(storedSettings);

    return {
      ...DEFAULT_NOTIFICATION_SETTINGS,
      ...parsedSettings,
    };
  } catch (error) {
    console.error(
      "Could not load AGRION notification settings:",
      error
    );

    return DEFAULT_NOTIFICATION_SETTINGS;
  }
};

export const areNotificationsEnabled = () => {
  const settings =
    getNotificationSettings();

  return settings.notifications === true;
};

export const isNotificationTypeEnabled = (
  type
) => {
  const settings =
    getNotificationSettings();

  if (!settings.notifications) {
    return false;
  }

  switch (type) {
    case "weather":
      return settings.weatherAlerts === true;

    case "crop":
    case "water":
    case "nutrient":
    case "pest":
    case "disease":
    case "harvest":
      return settings.cropReminders === true;

    case "community":
      return settings.communityUpdates === true;

    default:
      return true;
  }
};

export const getNotifications = () => {
  try {
    const stored =
      localStorage.getItem(
        NOTIFICATIONS_STORAGE_KEY
      );

    const initialized =
      localStorage.getItem(
        NOTIFICATIONS_INITIALIZED_KEY
      );

    /*
      First-time initialization.
      This also fixes the earlier situation where
      an empty [] was already saved in the browser.
    */
    if (
      (!stored || stored === "[]") &&
      !initialized
    ) {
      const defaults =
        getDefaultNotifications();

      localStorage.setItem(
        NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(defaults)
      );

      localStorage.setItem(
        NOTIFICATIONS_INITIALIZED_KEY,
        "true"
      );

      return defaults;
    }

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error(
      "Could not load AGRION notifications:",
      error
    );

    return [];
  }
};

export const saveNotifications = (
  notifications
) => {
  try {
    localStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(notifications)
    );

    localStorage.setItem(
      NOTIFICATIONS_INITIALIZED_KEY,
      "true"
    );

    window.dispatchEvent(
      new CustomEvent(
        "agrionNotificationsChanged"
      )
    );

    return true;
  } catch (error) {
    console.error(
      "Could not save AGRION notifications:",
      error
    );

    return false;
  }
};

export const addNotification = ({
  type = "agrion",
  title,
  message,
  priority = "normal",
}) => {
  if (!title || !message) {
    return null;
  }

  if (
    !isNotificationTypeEnabled(type)
  ) {
    return null;
  }

  const notifications =
    getNotifications();

  const newNotification = {
    id: `notification-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    type,
    title,
    message,
    date: new Date().toISOString(),
    read: false,
    priority,
  };

  const updatedNotifications = [
    newNotification,
    ...notifications,
  ].slice(0, 100);

  saveNotifications(
    updatedNotifications
  );

  return newNotification;
};

export const markNotificationAsRead = (
  notificationId
) => {
  const notifications =
    getNotifications();

  const updatedNotifications =
    notifications.map(
      (notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
    );

  saveNotifications(
    updatedNotifications
  );

  return updatedNotifications;
};

export const markAllNotificationsAsRead =
  () => {
    const notifications =
      getNotifications();

    const updatedNotifications =
      notifications.map(
        (notification) => ({
          ...notification,
          read: true,
        })
      );

    saveNotifications(
      updatedNotifications
    );

    return updatedNotifications;
  };

export const deleteNotification = (
  notificationId
) => {
  const notifications =
    getNotifications();

  const updatedNotifications =
    notifications.filter(
      (notification) =>
        notification.id !== notificationId
    );

  saveNotifications(
    updatedNotifications
  );

  return updatedNotifications;
};

export const clearAllNotifications =
  () => {
    saveNotifications([]);

    return [];
  };

export const getUnreadNotificationCount =
  () => {
    return getNotifications().filter(
      (notification) =>
        !notification.read
    ).length;
  };

export { NOTIFICATIONS_STORAGE_KEY };

export default {
  getNotifications,
  saveNotifications,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
  getUnreadNotificationCount,
  getNotificationSettings,
  areNotificationsEnabled,
  isNotificationTypeEnabled,
};