import likeRepository from "../Repositories/like.repository.js";
import postRepository from "../Repositories/Post.Repository.js";
import ApiError from "../Utils/ApiError.js";
import notificationService from "../Services/notification.service.js";

class LikeService {
  async toggleLike(userId, postId) {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    const existingLike = await likeRepository.find(userId, postId);

    // 👉 If already liked → unlike
    if (existingLike) {
      await likeRepository.delete(userId, postId);

      await postRepository.decrementLike(postId);

      // (OPTIONAL) remove notification for unlike
      // Usually apps DO NOT delete notifications, so we skip it

      return {
        liked: false,
        message: "Post unliked",
      };
    }

    // 👉 If not liked → like
    await likeRepository.create(userId, postId);

    await postRepository.incrementLike(postId);

    // 🔔 CREATE NOTIFICATION
    // Only notify if user is not liking their own post
    if (post.author.toString() !== userId) {
      await notificationService.createNotification({
        receiver: post.author,
        sender: userId,
        post: postId,
        type: "LIKE",
        message: "liked your post",
      });
    }

    return {
      liked: true,
      message: "Post liked",
    };
  }
}

export default new LikeService();