import postRepository from "../Repositories/Post.Repository.js";


class FeedService {

  async getFeed(page = 1, limit = 10) {

    const skip = (page - 1) * limit;


    const posts = await postRepository.getFeed(
      limit,
      skip
    );


    return posts;

  }

}


export default new FeedService();