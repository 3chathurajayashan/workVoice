import commentRepository from "../Repositories/Comment.Repository.js";
import postRepository from "../Repositories/Post.Repository.js";
import ApiError from "../Utils/ApiError.js";
import notificationService from "../Services/notification.service.js";

class CommentService {
  async createComment(userId, data) {
    const { post, content, parentComment } = data;

    const existingPost = await postRepository.findById(post);

    if (!existingPost) {
      throw new ApiError(404, "Post not found");
    }

    const comment = await commentRepository.create({
      author: userId,
      post,
      content,
      parentComment: parentComment || null,
    });

    await postRepository.incrementComments(post);

    if (parentComment) {
      await commentRepository.incrementReplies(parentComment);
    }

    // 🔔 NOTIFICATION LOGIC
    // Don't notify if user comments on their own post
    if (existingPost.author.toString() !== userId) {
      await notificationService.createNotification({
        receiver: existingPost.author,
        sender: userId,
        post: post,
        comment: comment._id,
        type: "COMMENT",
        message: "commented on your post",
      });
    }

    return comment;
  }

  async getComments(postId) {
    return await commentRepository.findByPost(postId);
  }

  async deleteComment(commentId, userId) {
    const comment = await commentRepository.findById(commentId);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (comment.author._id.toString() !== userId) {
      throw new ApiError(403, "Unauthorized");
    }

    await commentRepository.delete(commentId);

    await postRepository.decrementComments(comment.post);

    if (comment.parentComment) {
      await commentRepository.decrementReplies(comment.parentComment);
    }

    return;
  }
}

export default new CommentService();