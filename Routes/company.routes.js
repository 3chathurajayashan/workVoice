import express from "express";
import companyController from "../Controllers/company.controller.js";
import { protect } from "../Middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company management APIs
 */

/**
 * @swagger
 * /api/v1/company:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Google
 *               description:
 *                 type: string
 *                 example: Tech company
 *     responses:
 *       201:
 *         description: Company created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, companyController.create);

/**
 * @swagger
 * /api/v1/company:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Companies fetched successfully
 */
router.get("/", companyController.getAll);

/**
 * @swagger
 * /api/v1/company/search:
 *   get:
 *     summary: Search companies by name
 *     tags: [Company]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword
 *         example: google
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/search", companyController.search);

/**
 * @swagger
 * /api/v1/company/{slug}:
 *   get:
 *     summary: Get company by slug
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: google
 *     responses:
 *       200:
 *         description: Company fetched successfully
 *       404:
 *         description: Company not found
 */
router.get("/:slug", companyController.getBySlug);

export default router;