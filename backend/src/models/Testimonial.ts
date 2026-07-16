import { Schema, model } from 'mongoose';

const testimonialSchema = new Schema(
  {
    author: {
      type: String,
      required: [true, 'Please add client author name'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please add client company name'],
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating (1-5)'],
      min: 1,
      max: 5,
      default: 5,
    },
    review: {
      type: String,
      required: [true, 'Please add review text'],
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = model('Testimonial', testimonialSchema);
export default Testimonial;
