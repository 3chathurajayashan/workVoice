import likeService from "../Services/like.service.js";

class LikeController {
  async toggle(req, res, next) {
    try {
      const result = await likeService.toggleLike(
        req.user.userId,
        req.params.postId
      );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LikeController();