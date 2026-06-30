import postService from "../Services/Post.Service.js";

class PostController {
  async create(req, res, next) {
    try {
      const post = await postService.createPost(req.user.userId, req.body, req.files);

      res.status(201).json({
        success: true,
        post,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFeed(req, res, next) {
    try {
      const { page, limit } = req.query;

      const posts = await postService.getFeed(
        Number(page) || 1,
        Number(limit) || 10
      );

      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const post = await postService.getPostById(req.params.id);

      res.status(200).json({
        success: true,
        post,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await postService.deletePost(req.params.id, req.user.userId);

      res.status(200).json({
        success: true,
        message: "Post deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();