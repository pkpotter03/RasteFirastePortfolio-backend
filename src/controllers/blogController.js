const Blog = require("../models/Blog");
const { uploadOnCloudinary } = require("../config/cloudinary");

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length !== 5) {
      return res.status(400).json({ error: "Exactly 5 images are required." });
    }
    // Upload images to Cloudinary
    const imageLinks = [];
    for (const file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      if (result && result.secure_url) {
        imageLinks.push(result.secure_url);
      }
    }

    const blog = new Blog({
      ...req.body,
      images: imageLinks,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    let imageLinks;
    if (req.files && req.files.length === 5) {
      imageLinks = [];
      for (const file of req.files) {
        const result = await uploadOnCloudinary(file.path);
        if (result && result.secure_url) {
          imageLinks.push(result.secure_url);
        } else {
          console.log('Failed to upload:', file.originalname);
        }
      }
    }
    const updateData = { ...req.body };
    if (imageLinks) updateData.images = imageLinks;
    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
