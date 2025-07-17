const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  typeOfLocation: { type: String },
  difficultyLevel: { type: String },
  images: [{ type: String, required: true }], // 5 image links
  content: { type: String },
  locationLink: { type: String },
  locationInfo: { type: String },
  videoLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema); 