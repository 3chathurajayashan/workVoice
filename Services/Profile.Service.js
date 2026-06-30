import userRepository from "../Repositories/User.Repository.js";
import followRepository from "../Repositories/follow.repository.js";
import postRepository from "../Repositories/Post.Repository.js";
import ApiError from "../Utils/ApiError.js";

class ProfileService {
  async getProfile(currentUserId, profileUserId) {
    const user = await userRepository.getProfile(profileUserId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const [posts, isFollowing] = await Promise.all([
      postRepository.getPostsByUser(profileUserId),
      followRepository.isFollowing(currentUserId, profileUserId),
    ]);

    return {
      user,
      stats: {
        posts: user.postsCount,
        followers: user.followersCount,
        following: user.followingCount,
      },
      isFollowing: !!isFollowing,
      posts,
    };
  }
}

export default new ProfileService();