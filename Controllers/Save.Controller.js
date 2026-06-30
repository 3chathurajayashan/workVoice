import saveService from "../Services/Save.Service.js";

class SaveController {
  async toggleSave(req, res, next) {
    try {
      const result = await saveService.toggleSave(
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

  async getSavedPosts(req, res, next) {
    try {
      const posts = await saveService.getSavedPosts(req.user.userId);

      res.status(200).json({
        success: true,
        total: posts.length,
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SaveController();