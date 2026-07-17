import { Schema, model, models } from 'mongoose';

const settingSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Setting = (models.Setting as any) || model('Setting', settingSchema);
export default Setting;
