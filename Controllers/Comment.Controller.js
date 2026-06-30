import commentService from "../Services/Comment.Service.js";

class CommentController {
  async create(req, res, next) {
    try {
      const comment = await commentService.createComment(
        req.user.userId,
        req.body
      );

      res.status(201).json({
        success: true,
        comment,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByPost(req, res, next) {
    try {
      const comments = await commentService.getComments(req.params.postId);

      res.status(200).json({
        success: true,
        comments,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await commentService.deleteComment(
        req.params.commentId,
        req.user.userId
      );

      res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentController();