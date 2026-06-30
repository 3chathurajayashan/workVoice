import userRepository from "../Repositories/User.Repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../Utils/generateToken.js";

import ApiError from "../utils/ApiError.js";

class UserService {
  async register(userData) {
    const { email, username } = userData;

    // check existing user
    const existingUserByEmail = await userRepository.findByEmail(email);
    if (existingUserByEmail) {
      throw new ApiError(400, "Email already exists");
    }

    const existingUserByUsername = await userRepository.findByUsername(username);
    if (existingUserByUsername) {
      throw new ApiError(400, "Username already taken");
    }

    const user = await userRepository.create(userData);

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
async login(email, password) {
  const user = await userRepository.findByEmail(email, true);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return {
    user,
    accessToken,
    refreshToken,
  };
}

  async getProfile(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }
}

export default new UserService();