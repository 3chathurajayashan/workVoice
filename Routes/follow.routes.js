import express from "express";
import followController from "../Controllers/Follow.Controller.js";
import { protect } from "../Middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Follow system APIs (social graph)
 */

/**
 * @swagger
 * /api/v1/follow/{id}:
 *   post:
 *     summary: Follow or unfollow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to follow/unfollow
 *     responses:
 *       200:
 *         description: Follow status toggled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.post("/:id", protect, followController.toggleFollow);

/**
 * @swagger
 * /api/v1/follow/{id}/followers:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Followers fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/:id/followers", protect, followController.getFollowers);

/**
 * @swagger
 * /api/v1/follow/{id}/following:
 *   get:
 *     summary: Get users that a user is following
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Following list fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/:id/following", protect, followController.getFollowing);

export default router;