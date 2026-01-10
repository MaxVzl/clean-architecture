import { z } from '@hono/zod-openapi'

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
}).openapi('CreateUserSchema')
export type CreateUserSchema = z.infer<typeof createUserSchema>