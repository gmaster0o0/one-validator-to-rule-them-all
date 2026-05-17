import { z } from 'zod';

export const BaseUserSchema = z.object({
  id: z.string().min(5),
  email: z.email(),
});
export type BaseUserDto = z.infer<typeof BaseUserSchema>;

export const UserSchema = BaseUserSchema.extend({
  password: z.string().min(5),
});
export type UserDto = z.infer<typeof UserSchema>;

export const LoginCredentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(5),
});
export type LoginCredentialsDto = z.infer<typeof LoginCredentialsSchema>;
