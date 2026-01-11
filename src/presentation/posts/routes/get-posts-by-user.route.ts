import { uuidParamSchema } from "@/presentation/common/schemas/params.schema"
import { postSchema } from "@/presentation/posts/schemas/post.schema"
import { createRoute } from "@hono/zod-openapi"

export const getPostsByUserRoute = createRoute({
  method: 'get',
  path: '/{id}/posts',
  tags: ['posts'],
  summary: 'Retrieve the user posts',
  description: 'Retrieve the user posts',
  request: {
    params: uuidParamSchema
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: postSchema.array()
        }
      },
      description: 'Retrieve the user posts'
    }
  }
})
export type GetPostsByUserRoute = typeof getPostsByUserRoute