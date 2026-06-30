import searchRepository from "../Repositories/Search.Repository.js";
import ApiError from "../Utils/ApiError.js";

class SearchService {
  async globalSearch(query) {
    if (!query || query.trim() === "") {
      throw new ApiError(400, "Search query is required");
    }

    const [users, companies, posts] = await Promise.all([
      searchRepository.searchUsers(query),
      searchRepository.searchCompanies(query),
      searchRepository.searchPosts(query),
    ]);

    return {
      users,
      companies,
      posts,
    };
  }

  async searchUsers(query) {
    return await searchRepository.searchUsers(query);
  }

  async searchCompanies(query) {
    return await searchRepository.searchCompanies(query);
  }

  async searchPosts(query) {
    return await searchRepository.searchPosts(query);
  }
}

export default new SearchService();