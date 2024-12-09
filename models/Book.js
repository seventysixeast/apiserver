const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  banner: String, // Add banner field
  rating: Number,
  readers: Number,
  genres: [String],
  chapters: Number,
});

module.exports = mongoose.model('Book', BookSchema);