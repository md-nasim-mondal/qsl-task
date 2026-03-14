import { z } from 'zod';

const createJobValidationSchema = z.object({
  body: z.object({
    title: z.string({ error: 'Title is required' }),
    company: z.string({ error: 'Company is required' }),
    location: z.string({ error: 'Location is required' }),
    category: z.string({ error: 'Category is required' }),
    description: z.string({ error: 'Description is required' }),
  }),
});

export const JobValidation = {
  createJobValidationSchema,
};
