import postRepository from "../Repositories/Post.Repository.js";
import ApiError from "../Utils/ApiError.js";
import uploadImage from "../Utils/imageUpload.js";

class PostService {

  async createPost(userId, data, files) {

    const {
      description,
      companyName,
      mentionedPeople,
      isAnonymous,
    } = data;

    if (!description || description.trim() === "") {
      throw new ApiError(400, "Description is required");
    }

    const uploadedImages = [];

    // Upload all images to Cloudinary
    if (files && files.length > 0) {

      for (const file of files) {

        const result = await uploadImage(file.buffer);

        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    // Convert mentionedPeople if frontend sends string
    let people = [];

    if (mentionedPeople) {

      if (Array.isArray(mentionedPeople)) {
        people = mentionedPeople;
      } else {
        people = mentionedPeople
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);
      }
    }

    const post = await postRepository.create({
      author: userId,
      description,
      companyName,
      mentionedPeople: people,
      isAnonymous: isAnonymous === "true",
      images: uploadedImages,
    });

    return post;
  }

  async getFeed(page = 1, limit = 10) {

    const skip = (page - 1) * limit;

    return await postRepository.getFeed(limit, skip);
  }

  async getPostById(id) {

    const post = await postRepository.findById(id);

    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    return post;
  }

  async deletePost(postId, userId) {

    const post = await postRepository.findById(postId);

    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    if (post.author._id.toString() !== userId) {
      throw new ApiError(403, "Not authorized");
    }

    // We'll delete Cloudinary images here later

    return await postRepository.deleteById(postId);
  }
}

export default new PostService();