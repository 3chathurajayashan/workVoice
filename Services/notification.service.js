import notificationRepository from "../Repositories/notification.repository.js";
import { getReceiverSocketId, getIO } from "../Configs/socket.js";

class NotificationService {
  async createNotification(data) {
    const notification = await notificationRepository.create(data);

    await notification.populate("sender", "username fullName profilePicture");

    const receiverSocketId = getReceiverSocketId(data.receiver.toString());

    if (receiverSocketId) {
      const io = getIO();
      io.to(receiverSocketId).emit("notification", notification);
    }

    return notification;
  }

  async getUserNotifications(userId) {
    return await notificationRepository.findByUser(userId);
  }

  async markAsRead(notificationId) {
    return await notificationRepository.markAsRead(notificationId);
  }

  async markAllAsRead(userId) {
    return await notificationRepository.markAllAsRead(userId);
  }
}

export default new NotificationService();