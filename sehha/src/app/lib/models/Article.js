// src/app/lib/models/Article.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  // You already have a MongoDB _id by default, but this is an additional "id" field
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // In your data, "date" is stored like "April 2, 2025" (a string),
  // so let's keep it as a string rather than an actual Date type.
  // If you want real Date objects, you can change it to type: Date.
  date: {
    type: String,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  authorRole: {
    type: String,
    trim: true,
  },
  authorImage: {
    type: String,
  },
  category: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  // "relatedPosts" is an array. You can define sub-fields if you know the shape,
  // but for now, we'll let it be a plain array.
  relatedPosts: {
    type: Array,
    default: [],
  },
  slug: {
    type: String,
    trim: true,
  },
});

// Avoid OverwriteModelError: reuse existing model if it exists
const Article =
  mongoose.models.Article ||
  mongoose.model("Article", articleSchema, "Article");

export default Article;
