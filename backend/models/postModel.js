const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "A post must have an imageUrl"],
  },
  postedBy: {
    type: String,
    required: [true, "A post must contain creator's ID"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tags: {
    type: [String],
    required: [true, "A post must have atleast one tag"],
    enum: ["programming", "cats", "dogs", "books", "wallpaper"],
  },
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
