import Comment from "../Models/CommentModel.js";

class CommentRepository {
  async create(data) {
    return await Comment.create(data);
  }

  async findById(id) {
    return await Comment.findById(id)
      .populate("author", "fullName username profilePicture");
  }

  async findByPost(postId) {
    return await Comment.find({
      post: postId,
      parentComment: null,
    })
      .populate("author", "fullName username profilePicture")
      .sort({ createdAt: -1 });
  }

  async delete(id) {
    return await Comment.findByIdAndDelete(id);
  }

  async incrementReplies(commentId) {
    return await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { repliesCount: 1 } },
      { new: true }
    );
  }

  async decrementReplies(commentId) {
    return await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { repliesCount: -1 } },
      { new: true }
    );
  }
}

export default new CommentRepository();