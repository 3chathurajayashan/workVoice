import searchService from "../Services/Search.Service.js";

export const globalSearch = async (req, res, next) => {
  try {
    const { q } = req.query;

    const result = await searchService.globalSearch(q);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const searchUsers = async (req, res, next) => {
  try {
    const result = await searchService.searchUsers(req.query.q);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const searchCompanies = async (req, res, next) => {
  try {
    const result = await searchService.searchCompanies(req.query.q);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const searchPosts = async (req, res, next) => {
  try {
    const result = await searchService.searchPosts(req.query.q);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};