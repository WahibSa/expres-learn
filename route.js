import express from "express";
import { searchController, usernameController } from "./controller.js";

const router = express.Router();

router.get("/:username/:id", usernameController);
router.get("/search", searchController);

export default router;
