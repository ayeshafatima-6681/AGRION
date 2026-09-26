import {
  getAgrionContext,
} from "./agrionContext";

import {
  getNotifications,
  addNotification,
} from "./notifications";

import {
  showAgrionBrowserNotification,
} from "./browserNotifications";

const hasExistingNotification = (
  title,
  message
) => {
  const notifications =
    getNotifications();

  return notifications.some(
    (notification) =>
      notification.title === title &&
      notification.message === message
  );
};

const createReminder = ({
  type,
  title,
  message,
  priority = "normal",
}) => {
  if (
    hasExistingNotification(
      title,
      message
    )
  ) {
    return null;
  }

  const notification =
    addNotification({
      type,
      title,
      message,
      priority,
    });

  /*
   * Also show the reminder as a
   * real browser notification.
   *
   * This runs separately so that a
   * browser-permission issue does not
   * break AGRION's internal notification.
   */
  if (notification) {
    showAgrionBrowserNotification({
      title,
      message,
      priority,
    }).catch((error) => {
      console.error(
        "Could not show AGRION browser notification:",
        error
      );
    });
  }

  return notification;
};

export const generateAgrionReminders =
  () => {
    const context =
      getAgrionContext();

    const createdNotifications = [];

    const farm = context.farm || {};

    const farmInformationMissing =
      !farm.location ||
      !farm.farmSize ||
      !farm.waterSource;

    if (farmInformationMissing) {
      const notification =
        createReminder({
          type: "agrion",
          title:
            "Complete your farm profile",
          message:
            "Add your farm information so AGRION can build a more personalized farming experience for you.",
          priority: "normal",
        });

      if (notification) {
        createdNotifications.push(
          notification
        );
      }
    }

    const crop = context.crop || {};

    if (crop.name) {
      const notification =
        createReminder({
          type: "crop",
          title: `Continue your ${crop.name} journey`,
          message:
            "Open My Crop Journey to review your crop information and continue your farming journey.",
          priority: "normal",
        });

      if (notification) {
        createdNotifications.push(
          notification
        );
      }
    }

    if (
      crop.name &&
      crop.stage
    ) {
      const notification =
        createReminder({
          type: "crop",
          title:
            "Review your current crop stage",
          message:
            `Your ${crop.name} is currently recorded at the ${crop.stage} stage. Review your Crop Journey for the next steps.`,
          priority: "normal",
        });

      if (notification) {
        createdNotifications.push(
          notification
        );
      }
    }

    if (farm.farmingGoal) {
      const notification =
        createReminder({
          type: "agrion",
          title:
            "Keep working toward your farming goal",
          message:
            `Your AGRION farming goal is recorded as "${farm.farmingGoal}". Review your AGRION journey and keep your information updated.`,
          priority: "normal",
        });

      if (notification) {
        createdNotifications.push(
          notification
        );
      }
    }

    if (crop.name) {
      const notification =
        createReminder({
          type: "market",
          title:
            "Explore the AGRION market journey",
          message:
            "When you are ready, explore market and selling information for your crop.",
          priority: "normal",
        });

      if (notification) {
        createdNotifications.push(
          notification
        );
      }
    }

    return createdNotifications;
  };

export const generateAgrionRemindersOnce =
  () => {
    const lastGenerated =
      localStorage.getItem(
        "agrionLastReminderGeneration"
      );

    const today =
      new Date()
        .toISOString()
        .slice(0, 10);

    if (lastGenerated === today) {
      return [];
    }

    const notifications =
      generateAgrionReminders();

    localStorage.setItem(
      "agrionLastReminderGeneration",
      today
    );

    return notifications;
  };

export default {
  generateAgrionReminders,
  generateAgrionRemindersOnce,
};