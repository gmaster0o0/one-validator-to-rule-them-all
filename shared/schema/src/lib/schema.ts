import { z } from 'zod';
import { BasicPasswordSchema } from './password.schemas';

/**
 * Hide the password field in the BaseUserDto, which is used for responses.
 * The UserDto includes the password and is used for requests.
 */
export const BaseUserSchema = z.object({
  id: z.string().min(5),
  email: z.email(),
});
export type BaseUserDto = z.infer<typeof BaseUserSchema>;

export const UserSchema = BaseUserSchema.extend({
  password: BasicPasswordSchema,
});
export type UserDto = z.infer<typeof UserSchema>;

export const LoginCredentialsSchema = z.object({
  email: z.email(),
  password: BasicPasswordSchema,
});
export type LoginCredentialsDto = z.infer<typeof LoginCredentialsSchema>;
