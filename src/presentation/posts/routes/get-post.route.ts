import { uuidParamSchema } from "@/presentation/common/schemas/params.schema"
import { postSchema } from "@/presentation/posts/schemas/post.schema"
import { createRoute } from "@hono/zod-openapi"

export const getPostRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['posts'],
  summary: 'Retrieve the post',
  description: 'Retrieve the post',
  request: {
    params: uuidParamSchema
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: postSchema
        }
      },
      description: 'Retrieve the post'
    }
  }
})
export type GetPostRoute = typeof getPostRoute