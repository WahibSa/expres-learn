import slugify from "slugify";
import Post from "../models/Post.js";


export const createPost = async (req, res) => {
  const { title, content, category, author } = req.body;
  const newSlug = slugify(title, { lower: true, strict: true });
  const newPost = new Post({ title, content, category, slug: newSlug, author });
  await newPost.save();
  res.status(201).json(newPost);
};
