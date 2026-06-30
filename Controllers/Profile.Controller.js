import profileService from "../Services/Profile.Service.js";

export const getProfile = async (req, res, next) => {
  try {
    const data = await profileService.getProfile(
      req.user.id,
      req.params.userId
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};