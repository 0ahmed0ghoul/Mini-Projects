const { createPostSchema } = require("../middlewares/validator");
const Post = require("../models/postsModel");

// Get paginated list of posts
exports.getPosts = async (req, res) => {
    const { page } = req.query;
    const postsPerPage = 10; // Define the number of posts per page
  
    try {
      // Convert page number to integer and ensure it's at least 0
      let pageNum = Number(page) > 1 ? Number(page) - 1 : 0;
  
      // Fetch posts from database, sort by creation date, and apply pagination
      const result = await Post.find()
        .sort({ createdAt: -1 }) // Sort posts by newest first
        .skip(pageNum * postsPerPage) // Skip posts for previous pages
        .limit(postsPerPage) // Limit results to postsPerPage
        .populate({
          path: "userId",
          select: "email", // Populate user details (email)
        });
  
      return res.status(200).json({ success: true, message: "Posts retrieved", result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  exports.getSinglePost = async (req, res) => {
    const { _id } = req.query;
  
    try {
      // Find post by ID and populate user email
      const existingPost = await Post.findOne({ _id }).populate({
        path: "userId",
        select: "email",
      });
  
      if (!existingPost) {
        return res.status(404).json({ success: false, message: "Post unavailable" });
      }
  
      return res.status(200).json({ success: true, message: "Single post retrieved", existingPost });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  exports.createPost = async (req, res) => {
    const { title, description } = req.body;
    const { userId } = req.user; // Extract user ID from authenticated request
  
    try {
      // Validate request data
      const { error } = createPostSchema.validate({ title, description, userId });
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      // Create and save new post
      const result = await Post.create({ title, description, userId });
  
      return res.status(201).json({ success: true, message: "Post created", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  exports.UpdatePost = async (req, res) => {
    const { _id } = req.query;
    const { title, description } = req.body;
    const { userId } = req.user; // Get user ID from authenticated request
  
    try {
      // Validate request data
      const { error } = createPostSchema.validate({ title, description, userId });
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      // Find the post by ID
      const existingPost = await Post.findOne({ _id });
      if (!existingPost) {
        return res.status(404).json({ success: false, message: "Post unavailable" });
      }
  
      // Check if the logged-in user is the owner of the post
      if (existingPost.userId.toString() !== userId) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
      }
  
      // Update post details
      existingPost.title = title;
      existingPost.description = description;
      const result = await existingPost.save();
  
      return res.status(200).json({ success: true, message: "Post updated", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  exports.deletePost = async (req, res) => {
    const { _id } = req.query;
    const { userId } = req.user; // Get user ID from authenticated request
  
    try {
      // Find the post by ID
      const existingPost = await Post.findOne({ _id });
      if (!existingPost) {
        return res.status(404).json({ success: false, message: "Post unavailable" });
      }
  
      // Check if the logged-in user is the owner of the post
      if (existingPost.userId.toString() !== userId) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
      }
  
      // Delete the post
      await Post.deleteOne({ _id });
  
      return res.status(200).json({ success: true, message: "Post deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };