import express from "express";
import saveController from "../Controllers/Save.Controller.js";
import { protect } from "../Middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Saved Posts
 *   description: Bookmark / saved posts system APIs
 */

/**
 * @swagger
 * /api/v1/saves/{postId}:
 *   post:
 *     summary: Toggle save (bookmark / unbookmark a post)
 *     tags: [Saved Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to save/unsave
 *     responses:
 *       200:
 *         description: Save status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 saved:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Post saved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.post("/:postId", protect, saveController.toggleSave);

/**
 * @swagger
 * /api/v1/saves:
 *   get:
 *     summary: Get all saved posts of logged-in user
 *     tags: [Saved Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saved posts fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, saveController.getSavedPosts);

export default router;