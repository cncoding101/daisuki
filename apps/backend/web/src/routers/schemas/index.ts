import { z } from 'zod';

const basicOutputSchema = z.object({
  message: z.string(),
});

const errorOutputSchema = z.object({
  code: z.number(),
  message: z.string(),
});

const emptyInputSchema = z.void();

export { basicOutputSchema, errorOutputSchema, emptyInputSchema };
