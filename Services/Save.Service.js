import saveRepository from "../Repositories/Save.Repository.js";
import postRepository from "../Repositories/Post.Repository.js";
import ApiError from "../Utils/ApiError.js";

class SaveService {
  async toggleSave(userId, postId) {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    const existingSave = await saveRepository.find(userId, postId);

    // ⭐ Already saved → Unsave
    if (existingSave) {
      await saveRepository.delete(userId, postId);

      await postRepository.decrementSaved(postId);

      return {
        saved: false,
        message: "Post removed from saved",
      };
    }

    // ⭐ Save
    await saveRepository.create(userId, postId);

    await postRepository.incrementSaved(postId);

    return {
      saved: true,
      message: "Post saved successfully",
    };
  }

  async getSavedPosts(userId) {
    return await saveRepository.getSavedPosts(userId);
  }
}

export default new SaveService();