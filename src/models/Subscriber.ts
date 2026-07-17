import { Schema, model, models } from 'mongoose';

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export const Subscriber = (models.Subscriber as any) || model('Subscriber', subscriberSchema);
export default Subscriber;
