const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.warn(
      "This browser does not support notifications."
    );

    return "unsupported";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  if (Notification.permission === "denied") {
    return "denied";
  }

  try {
    const permission =
      await Notification.requestPermission();

    return permission;
  } catch (error) {
    console.error(
      "Could not request notification permission:",
      error
    );

    return "error";
  }
};

export const showAgrionBrowserNotification =
  async ({
    title = "AGRION",
    message = "",
    priority = "normal",
  }) => {
    if (!message) {
      return false;
    }

    const permission =
      await requestNotificationPermission();

    if (permission !== "granted") {
      return false;
    }

    try {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico",
        tag: "agrion-notification",
        requireInteraction:
          priority === "high",
      });

      return true;
    } catch (error) {
      console.error(
        "Could not show AGRION browser notification:",
        error
      );

      return false;
    }
  };

export const isBrowserNotificationSupported =
  () => {
    return "Notification" in window;
  };

export const getBrowserNotificationPermission =
  () => {
    if (!("Notification" in window)) {
      return "unsupported";
    }

    return Notification.permission;
  };

export default {
  showAgrionBrowserNotification,
  isBrowserNotificationSupported,
  getBrowserNotificationPermission,
};