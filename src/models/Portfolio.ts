import { Schema, model, models } from 'mongoose';

const portfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
    },
    category: {
      type: String,
      required: [true, 'Please specify project category'],
      enum: ['Insurance', 'Healthcare', 'Schools', 'Colleges', 'Websites', 'Ecommerce', 'Business Automation'],
    },
    images: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    client: {
      type: String,
    },
    year: {
      type: String,
    },
    projectUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Portfolio = (models.Portfolio as any) || model('Portfolio', portfolioSchema);
export default Portfolio;
