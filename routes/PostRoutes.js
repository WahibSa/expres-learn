import express from "express";
import { createPost, getPosts } from "../controllers/PostController.js";
import createUploader from "../utils/multer.js";
import path from "path";

const router = express.Router();

const upload = createUploader({
  destination: "public/uploads/thumbnails",
  allowedTypes: [/\.jpg$/, /\.jpeg$/, /\.png$/, /\.webp$/],
  maxSizeMB: 5,
});

router.post("/", upload.single("thumbnail"), createPost);
router.get("/", getPosts);

export default router;
