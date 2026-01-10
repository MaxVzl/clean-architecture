import { uuidParamSchema } from "@/presentation/common/schemas/params.schema"
import { createRoute } from "@hono/zod-openapi"

export const deleteUserRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['users'],
  summary: 'Delete the user',
  description: 'Delete the user',
  request: {
    params: uuidParamSchema
  },
  responses: {
    204: {
      description: 'Delete the user'
    }
  }
})
export type DeleteUserRoute = typeof deleteUserRoute