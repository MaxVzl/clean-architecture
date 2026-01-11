import { uuidParamSchema } from "@/presentation/common/schemas/params.schema"
import { createRoute } from "@hono/zod-openapi"

export const deletePostRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['posts'],
  summary: 'Delete the post',
  description: 'Delete the post',
  request: {
    params: uuidParamSchema
  },
  responses: {
    204: {
      description: 'Delete the post'
    }
  }
})
export type DeletePostRoute = typeof deletePostRoute

