import { Schema, model } from 'mongoose';
import { IApplication } from './application.interface';

const applicationSchema = new Schema<IApplication>(
  {
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resume_link: { type: String, required: true },
    cover_note: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Application = model<IApplication>('Application', applicationSchema);
