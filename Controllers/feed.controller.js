import feedService from "../Services/feed.service.js";

export const getFeed = async (req, res) => {

  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 10;


  const posts = await feedService.getFeed(
    page,
    limit
  );


  res.json({
    success: true,
    data: posts,
  });

};