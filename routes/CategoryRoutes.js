import express from "express";
import { createCategory, getCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/", getCategory);
router.post("/", createCategory);

export default router;
