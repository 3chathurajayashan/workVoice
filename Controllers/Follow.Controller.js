import followService from "../Services/follow.service.js";

class FollowController {
  async toggleFollow(req, res, next) {
    try {
      const result = await followService.toggleFollow(
        req.user.userId,
        req.params.id
      );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFollowers(req, res, next) {
    try {
      const followers = await followService.getFollowers(req.params.id);

      res.status(200).json({
        success: true,
        followers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFollowing(req, res, next) {
    try {
      const following = await followService.getFollowing(req.params.id);

      res.status(200).json({
        success: true,
        following,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new FollowController();