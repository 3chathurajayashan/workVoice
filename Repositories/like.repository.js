import Like from "../Models/LikeModel.js";

class LikeRepository {
  async find(userId, postId) {
    return await Like.findOne({ user: userId, post: postId });
  }

  async create(userId, postId) {
    return await Like.create({ user: userId, post: postId });
  }

  async delete(userId, postId) {
    return await Like.findOneAndDelete({ user: userId, post: postId });
  }

  async count(postId) {
    return await Like.countDocuments({ post: postId });
  }
}

export default new LikeRepository();