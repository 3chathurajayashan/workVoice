import Save from "../Models/SaveModel.js";

class SaveRepository {
  async create(user, post) {
    return await Save.create({
      user,
      post,
    });
  }

  async find(user, post) {
    return await Save.findOne({
      user,
      post,
    });
  }

  async delete(user, post) {
    return await Save.findOneAndDelete({
      user,
      post,
    });
  }

  async getSavedPosts(userId) {
    return await Save.find({
      user: userId,
    })
      .populate({
        path: "post",
        populate: {
          path: "author",
          select: "fullName username profilePicture",
        },
      })
      .sort({
        createdAt: -1,
      });
  }

  async count(userId) {
    return await Save.countDocuments({
      user: userId,
    });
  }
}

export default new SaveRepository();