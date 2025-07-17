const YTVideo = require('../models/YTVideo');

// Get all video links
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await YTVideo.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new video link
exports.addVideo = async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) return res.status(400).json({ error: 'Video link is required' });
    const video = new YTVideo({ link });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a video link
exports.deleteVideo = async (req, res) => {
  try {
    const video = await YTVideo.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 