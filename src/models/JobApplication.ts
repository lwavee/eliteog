import { Schema, model, models } from 'mongoose';

const jobApplicationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add candidate name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please add phone number'],
    },
    position: {
      type: String,
      required: [true, 'Please add target job position'],
    },
    resumeUrl: {
      type: String,
      required: [true, 'Please provide resume file link'],
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'interviewed', 'rejected', 'accepted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const JobApplication = (models.JobApplication as any) || model('JobApplication', jobApplicationSchema);
export default JobApplication;
