import Notification from "../Models/NotificationModel.js";

class NotificationRepository {
  async create(data) {
    return await Notification.create(data);
  }

  async findByUser(userId) {
    return await Notification.find({ receiver: userId })
      .populate("sender", "fullName username profilePicture")
      .sort({ createdAt: -1 });
  }

  async markAsRead(notificationId) {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
  }

  async markAllAsRead(userId) {
    return await Notification.updateMany(
      { receiver: userId },
      { isRead: true }
    );
  }

  async delete(notificationId) {
    return await Notification.findByIdAndDelete(notificationId);
  }
}

export default new NotificationRepository();