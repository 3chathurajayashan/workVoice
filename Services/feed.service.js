import postRepository from "../Repositories/Post.Repository.js";
import followRepository from "../Repositories/follow.repository.js";

class FeedService {
  async getFeed(userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    // 1. Get following users
    const followingIds = await followRepository.getFollowingIds(userId);

    // 2. Get personalized posts
    const posts = await postRepository.getPersonalizedFeed(
      userId,
      followingIds,
      limit,
      skip
    );

    return posts;
  }
}

export default new FeedService();