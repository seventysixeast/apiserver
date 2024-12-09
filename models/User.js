const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
    default: 'https://dummyimage.com/100x100/000/fff&text=User', // Default profile picture
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  recently: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Skip password hashing for now
module.exports = mongoose.model('User', UserSchema);
