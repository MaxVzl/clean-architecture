import { z } from '@hono/zod-openapi'

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).openapi('PostSchema')
export type PostSchema = z.infer<typeof postSchema>