import { z } from 'zod';

const createApplicationValidationSchema = z.object({
  body: z.object({
    job: z.string().min(1, 'Job ID is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    resume_link: z.string().url('Invalid URL'),
    cover_note: z.string().min(1, 'Cover note is required'),
  }),
});

export const ApplicationValidation = {
  createApplicationValidationSchema,
};
