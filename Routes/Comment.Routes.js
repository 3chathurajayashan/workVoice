import express from "express";
import commentController from "../Controllers/Comment.Controller.js";
import { protect } from "../Middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment system APIs
 */

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Create a comment (or reply)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post
 *               - content
 *             properties:
 *               post:
 *                 type: string
 *                 example: 64f8a12b9c1d2e3f4a5b6c7d
 *               content:
 *                 type: string
 *                 example: Nice post!
 *               parentComment:
 *                 type: string
 *                 example: 64f8a12b9c1d2e3f4a5b6c7e
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       404:
 *         description: Post not found
 */
router.post("/", protect, commentController.create);

/**
 * @swagger
 * /api/v1/comments/post/{postId}:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 */
router.get("/post/:postId", commentController.getByPost);

/**
 * @swagger
 * /api/v1/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.delete("/:commentId", protect, commentController.delete);

export default router;