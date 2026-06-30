import express from "express";
import likeController from "../Controllers/like.controller.js";
import { protect } from "../Middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like system APIs (posts engagement)
 */

/**
 * @swagger
 * /api/v1/likes/{postId}:
 *   post:
 *     summary: Toggle like (like / unlike a post)
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to like/unlike
 *     responses:
 *       200:
 *         description: Like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Post liked
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.post("/:postId", protect, likeController.toggle);

export default router;