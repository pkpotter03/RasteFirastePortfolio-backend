const mongoose = require('mongoose');

const ytVideoSchema = new mongoose.Schema({
  link: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('YTVideo', ytVideoSchema); 