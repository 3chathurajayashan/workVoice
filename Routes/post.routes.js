import express from "express";
import postController from "../Controllers/Post.Controller.js";
import { protect } from "../Middlewares/auth.js";
import upload from "../Middlewares/Upload.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - description
 *         - company
 *       properties:
 *         _id:
 *           type: string
 *         description:
 *           type: string
 *         company:
 *           type: string
 *         likesCount:
 *           type: number
 *         commentsCount:
 *           type: number
 *         createdAt:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               company:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post(
  "/",
  protect,
  upload.array("images", 5),
  postController.create
);

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get feed posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", postController.getFeed);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Get single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", postController.getById);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", protect, postController.delete);

export default router;