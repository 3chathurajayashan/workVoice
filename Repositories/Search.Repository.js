import User from "../Models/UserModel.js";
import Company from "../Models/CompanyModel.js";
import Post from "../Models/PostModel.js";

class SearchRepository {
  // 👤 Search Users
  async searchUsers(query) {
    return await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullName: { $regex: query, $options: "i" } },
      ],
    })
      .select("username fullName profilePicture bio followersCount")
      .limit(10);
  }

  // 🏢 Search Companies
  async searchCompanies(query) {
    return await Company.find({
      name: { $regex: query, $options: "i" },
    })
      .sort({ totalPosts: -1 })
      .limit(10);
  }

  // 📝 Search Posts
 async searchPosts(query) {
  return await Post.find({
    status: "ACTIVE",
    $or: [
      { description: { $regex: query, $options: "i" } },
      { mentionedPeople: { $regex: query, $options: "i" } },
    ],
  })
    .populate("author", "username fullName profilePicture")
    .populate("company", "name slug")
    .sort({ createdAt: -1 })
    .limit(10);
}
}

export default new SearchRepository();