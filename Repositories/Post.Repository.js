import Post from "../Models/PostModel.js";

class PostRepository {
  async create(data) {
    return await Post.create(data);
  }

  // 🔥 FIXED: populate company + author
  async findById(id) {
    return await Post.findById(id)
      .populate("author", "username fullName profilePicture")
      .populate("company", "name slug logo");
  }
  // 🔥 Feed with follow-based ranking
async getPersonalizedFeed(userId, followingIds, limit = 10, skip = 0) {
  return await Post.find({
    $or: [
      { author: { $in: followingIds } }, // posts from followed users
      { author: userId }, // user's own posts
    ],
  })
    .populate("author", "username fullName profilePicture")
    .populate("company", "name slug")
    .sort({ createdAt: -1 }) // base sorting first
    .skip(skip)
    .limit(limit);
}

  // 📰 Feed (global)
  async getFeed(limit = 10, skip = 0) {
    return await Post.find()
      .populate("author", "username fullName profilePicture")
      .populate("company", "name slug logo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // 🏢 Feed by company (VERY IMPORTANT for WorkVoice)
  async getByCompany(companyId, limit = 10, skip = 0) {
    return await Post.find({ company: companyId })
      .populate("author", "username fullName profilePicture")
      .populate("company", "name slug logo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async deleteById(id) {
    return await Post.findByIdAndDelete(id);
  }

  // 👍 LIKE SYSTEM
  async incrementLike(postId) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { likesCount: 1 } },
      { new: true }
    );
  }

  async decrementLike(postId) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { likesCount: -1 } },
      { new: true }
    );
  }

  // 💬 COMMENTS
  async incrementComments(postId) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { commentsCount: 1 } },
      { new: true }
    );
  }

  async decrementComments(postId) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { commentsCount: -1 } },
      { new: true }
    );
  }

  // 🔖 SAVES
  async incrementSaved(postId) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { savedCount: 1 } },
      { new: true }
    );
  }

  async decrementSaved(postId) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { savedCount: -1 } },
      { new: true }
    );
  }

  // 👀 VIEWS (future-ready)
  async incrementViews(postId) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { viewsCount: 1 } },
      { new: true }
    );
  }
  async getPostsByUser(userId) {
  return await Post.find({
    author: userId,
    status: "ACTIVE",
  })
    .populate("author", "username fullName profilePicture")
    .populate("company", "name slug logo")
    .sort({ createdAt: -1 });
}
}

export default new PostRepository();