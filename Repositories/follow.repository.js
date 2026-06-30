import Follow from "../Models/FollowModel.js";

class FollowRepository {
  async follow(follower, following) {
    return await Follow.create({ follower, following });
  }

  async unfollow(follower, following) {
    return await Follow.deleteOne({ follower, following });
  }

  
  async getFollowingIds(userId) {
  const follows = await Follow.find({ follower: userId });
  return follows.map((f) => f.following);
}
async isFollowing(followerId, followingId) {
  return await Follow.exists({
    follower: followerId,
    following: followingId,
  });
}
  async getFollowers(userId) {
    return await Follow.find({ following: userId }).populate(
      "follower",
      "fullName username profilePicture"
    );
  }

  async getFollowing(userId) {
    return await Follow.find({ follower: userId }).populate(
      "following",
      "fullName username profilePicture"
    );
  }

  async countFollowers(userId) {
    return await Follow.countDocuments({ following: userId });
  }

  async countFollowing(userId) {
    return await Follow.countDocuments({ follower: userId });
  }
}

export default new FollowRepository();