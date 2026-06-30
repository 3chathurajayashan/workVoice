import express from "express";
import { protect } from "../Middlewares/auth.js";
import { getProfile } from "../Controllers/Profile.Controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile APIs (view users, stats, posts)
 */

/**
 * @swagger
 * /api/v1/profile/{userId}:
 *   get:
 *     summary: Get user profile with posts and stats
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get("/:userId", protect, getProfile);

export default router;