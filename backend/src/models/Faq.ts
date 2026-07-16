import { Schema, model } from 'mongoose';

const faqSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, 'Please add a question'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'Please add an answer'],
    },
    category: {
      type: String,
      default: 'General',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Faq = model('Faq', faqSchema);
export default Faq;
