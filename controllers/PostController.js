import slugify from "slugify";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, content, category, author } = req.body;

  const newSlug = slugify(title, { lower: true, strict: true });
  const thumbPath = req.file ? req.file.path : "";

  const newPost = new Post({
    title,
    content,
    category,
    slug: newSlug,
    author,
    thumbnail: thumbPath,
  });
  await newPost.save();
  res.status(201).json(newPost);
};

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default to 1
    const limit = parseInt(req.query.limit) || 10; // Posts per page, default to 10
    const skip = (page - 1) * limit; // Calculate how many documents to skip
    const like_gte = parseInt(req.query.like_gte) || 0;
    const like_lte = parseInt(req.query.like_lte) || null;

    const totalPosts = await Post.countDocuments();
    const query = {
      likes: {
        $gte: like_gte,
      },
    };
    
    if (like_lte !== null) {
      query.likes.$lte = like_lte;
    }

    const posts = await Post.find(query)
      .populate("author", "username email")
      .populate("category", "name")
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalPosts / limit);

    // Add pagination metadata to response
    const pagination = {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
