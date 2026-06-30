import userService from "../Services/User.Service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { user, accessToken, refreshToken } =
        await userService.register(req.body);

      // refresh token → HttpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // set true in production (HTTPS)
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        success: true,
        accessToken,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { user, accessToken, refreshToken } =
        await userService.login(email, password);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        accessToken,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }

  async me(req, res, next) {
    try {
      const user = await userService.getProfile(req.user.userId);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();