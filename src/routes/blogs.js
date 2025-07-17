const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middlewares/upload');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get a single blog
router.get('/:id', blogController.getBlogById);

// Create a new blog (with image upload)
router.post('/', upload.array('images', 5), blogController.createBlog);

// Update a blog
router.put('/:id', upload.array('images', 5), blogController.updateBlog);

// Delete a blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router; 