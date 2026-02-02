import { z } from '@hono/zod-openapi';

export const updateUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
  })
  .openapi('UpdateUserSchema');
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
