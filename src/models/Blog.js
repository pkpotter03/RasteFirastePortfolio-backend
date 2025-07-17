const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  placeNearBy: { type: String },
  typeOfLocation: { type: String },
  images: [{ type: String, required: true }], // 5 image links
  content: { type: String },
  locationLink: { type: String },
  igVideoLink: { type: String },
  ytVideoLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema); 