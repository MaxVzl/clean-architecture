import { z } from '@hono/zod-openapi'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).openapi('UserSchema')
export type UserSchema = z.infer<typeof userSchema>