import { z } from 'zod';
import { basicOutputSchema } from '.';
import { InputWrapper } from '@/utils/types/generic';

const addressInputSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const registerInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  address: addressInputSchema.optional(),
});

const loginOutputSchema = basicOutputSchema.extend({
  token: z.string(),
});

type LoginOutput = z.infer<typeof loginOutputSchema>;
type RegisterInput = InputWrapper<z.infer<typeof registerInputSchema>>;
type LoginInput = InputWrapper<z.infer<typeof loginInputSchema>>;

export type { RegisterInput, LoginInput, LoginOutput };
export { loginInputSchema, registerInputSchema, loginOutputSchema };
