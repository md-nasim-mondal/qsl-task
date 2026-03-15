import { Types } from 'mongoose';

export interface IApplication {
  user: Types.ObjectId;
  job: Types.ObjectId;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
}
