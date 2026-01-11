import { updatePostSchema } from "@/presentation/posts/schemas/update-post.schema"
import { postSchema } from "@/presentation/posts/schemas/post.schema"
import { uuidParamSchema } from "@/presentation/common/schemas/params.schema"
import { createRoute } from "@hono/zod-openapi"

export const updatePostRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['posts'],
  summary: 'Update the post',
  description: 'Update the post',
  request: {
    params: uuidParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updatePostSchema
        }
      },
      description: 'The post to update'
    }
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: postSchema
        }
      },
      description: 'Update the post'
    }
  }
})
export type UpdatePostRoute = typeof updatePostRoute

