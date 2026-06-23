import { z } from 'zod';

const hasNumber = (value: string): boolean => /\d/.test(value);
const hasLetter = (value: string): boolean => /[a-zA-Z]/.test(value);

export const BasicPasswordSchema = z
  .string()
  .min(5)
  .superRefine((value, ctx) => {
    if (!hasNumber(value)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password must contain at least one number',
      });
    }

    if (!hasLetter(value)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password must contain at least one letter',
      });
    }
  });
