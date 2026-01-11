import { createPostSchema } from "@/presentation/posts/schemas/create-post.schema"
import { postSchema } from "@/presentation/posts/schemas/post.schema"
import { createRoute } from "@hono/zod-openapi"

export const createPostRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['posts'],
  summary: 'Create a new post',
  description: 'Create a new post',
  request: {
    body: {
      content: {
        "application/json": {
          schema: createPostSchema
        }
      },
      description: 'The post to create'
    }
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: postSchema
        }
      },
      description: 'Create a new post'
    }
  }
})
export type CreatePostRoute = typeof createPostRoute

