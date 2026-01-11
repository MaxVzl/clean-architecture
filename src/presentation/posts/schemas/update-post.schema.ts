import { z } from '@hono/zod-openapi'

export const updatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
}).openapi('UpdatePostSchema')
export type UpdatePostSchema = z.infer<typeof updatePostSchema>

