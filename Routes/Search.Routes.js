import express from "express";
import {
  globalSearch,
  searchUsers,
  searchCompanies,
  searchPosts,
} from "../Controllers/Search.Controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Global search APIs (users, companies, posts)
 */

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Global search across users, companies, and posts
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword
 *         example: react
 *     responses:
 *       200:
 *         description: Global search results
 */
router.get("/", globalSearch);

/**
 * @swagger
 * /api/v1/search/users:
 *   get:
 *     summary: Search users
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         example: john
 *     responses:
 *       200:
 *         description: Users search results
 */
router.get("/users", searchUsers);

/**
 * @swagger
 * /api/v1/search/companies:
 *   get:
 *     summary: Search companies
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         example: google
 *     responses:
 *       200:
 *         description: Companies search results
 */
router.get("/companies", searchCompanies);

/**
 * @swagger
 * /api/v1/search/posts:
 *   get:
 *     summary: Search posts
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         example: javascript
 *     responses:
 *       200:
 *         description: Posts search results
 */
router.get("/posts", searchPosts);

export default router;