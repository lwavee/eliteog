import { Schema, model, models } from 'mongoose';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a blog title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    excerpt: {
      type: String,
      required: [true, 'Please add a short excerpt'],
    },
    author: {
      type: String,
      default: 'EliteOps Global Team',
    },
    coverImage: {
      type: String,
      required: [true, 'Please specify a cover image url'],
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: [true, 'Please specify a blog category'],
      default: 'Digital Solutions',
    },
    seoTitle: {
      type: String,
    },
    seoDescription: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = (models.Blog as any) || model('Blog', blogSchema);
export default Blog;
