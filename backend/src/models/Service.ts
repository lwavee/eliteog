import { Schema, model } from 'mongoose';

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a service title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a short description'],
    },
    category: {
      type: String,
      required: [true, 'Please specify service category'],
      enum: [
        'Virtual Assistance',
        'Administrative Support',
        'Insurance Back Office',
        'Data Entry',
        'Web Development',
        'School & College Solutions',
        'E-Commerce Solutions',
        'Project Management',
        'Business Automation',
        'Digital Marketing',
        'Graphic Design',
        'Business Process Outsourcing',
      ],
    },
    icon: {
      type: String,
      required: [true, 'Please specify an icon name'],
      default: 'FaConciergeBell',
    },
    features: [
      {
        type: String,
      },
    ],
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = model('Service', serviceSchema);
export default Service;
