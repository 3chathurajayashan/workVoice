import User from "../Models/UserModel.js";

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

 async findByEmail(email, includePassword = false) {
  if (includePassword) {
    return User.findOne({ email }).select("+password");
  }
  return User.findOne({ email });
}
async getProfile(userId) {
  return await User.findById(userId).select(
    "-password -refreshToken"
  );
}
  async findByUsername(username) {
    return await User.findOne({ username });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByIdWithPassword(id) {
    return await User.findById(id).select("+password");
  }

  async updateById(id, updateData) {
    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
  }

  async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }

  async incrementFollowers(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { followersCount: 1 } },
      { new: true }
    );
  }

  async decrementFollowers(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { followersCount: -1 } },
      { new: true }
    );
  }

  async incrementFollowing(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { followingCount: 1 } },
      { new: true }
    );
  }

  async decrementFollowing(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { followingCount: -1 } },
      { new: true }
    );
  }

  async incrementPosts(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { $inc: { postsCount: 1 } },
      { new: true }
    );
  }
}

export default new UserRepository();