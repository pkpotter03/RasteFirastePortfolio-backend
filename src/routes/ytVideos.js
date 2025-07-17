const express = require('express');
const router = express.Router();
const ytVideoController = require('../controllers/ytVideoController');

// Get all video links
router.get('/', ytVideoController.getAllVideos);

// Add a new video link
router.post('/', ytVideoController.addVideo);

// Delete a video link
router.delete('/:id', ytVideoController.deleteVideo);

module.exports = router; 