import express from "express";
import { getFeed } from "../Controllers/feed.controller.js";
import {protect} from "../Middlewares/auth.js";
import PostController from "../Controllers/Post.Controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feed
 *   description: Personalized feed APIs
 */

/**
 * @swagger
 * /api/v1/feed:
 *   get:
 *     summary: Get user feed (posts from followed users / system ranking)
 *     tags: [Feed]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: Feed fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  protect,
  PostController.getFeed
);

export default router;