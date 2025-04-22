import { z } from 'zod';

const basicOutputSchema = z.object({
  message: z.string(),
});

const errorOutputSchema = z.object({
  code: z.number(),
  message: z.string(),
});

const emptyInputSchema = z.void();

type basicOutput = z.infer<typeof basicOutputSchema>;

export type { basicOutput };

export { basicOutputSchema, errorOutputSchema, emptyInputSchema };
