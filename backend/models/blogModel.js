const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
      minLength: [5, "Title can't be less than 3 characters"],
      maxLength: [100, "Title can't be more than 100 characters"],
      unique: true,
    },
    markdown: {
      type: String,
      required: [true, "Please add description"],
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
