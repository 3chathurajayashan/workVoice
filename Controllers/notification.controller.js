import notificationService from "../services/notification.service.js";

class NotificationController {

  async getMyNotifications(req, res, next) {
    try {
      const notifications = await notificationService.getUserNotifications(
        req.user.userId
      );

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req, res, next) {
    try {
      await notificationService.markAsRead(req.params.id);

      res.status(200).json({
        success: true,
        message: "Notification marked as read",
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req, res, next) {
    try {
      await notificationService.markAllAsRead(req.user.userId);

      res.status(200).json({
        success: true,
        message: "All notifications marked as read",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();