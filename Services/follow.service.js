import followRepository from "../Repositories/follow.repository.js";
import ApiError from "../Utils/ApiError.js";
import notificationService from "../Services/notification.service.js";

class FollowService {
  async toggleFollow(userId, targetUserId) {
    if (userId === targetUserId) {
      throw new ApiError(400, "You cannot follow yourself");
    }

    const existing = await followRepository.isFollowing(userId, targetUserId);

    
    if (existing) {
      await followRepository.unfollow(userId, targetUserId);

      return {
        following: false,
        message: "Unfollowed user",
      };
    }

   
    await followRepository.follow(userId, targetUserId);
 
    await notificationService.createNotification({
      receiver: targetUserId,
      sender: userId,
      type: "FOLLOW",
      message: "started following you",
    });

    return {
      following: true,
      message: "Followed user",
    };
  }

  async getFollowers(userId) {
    return await followRepository.getFollowers(userId);
  }

  async getFollowing(userId) {
    return await followRepository.getFollowing(userId);
  }
}

export default new FollowService();