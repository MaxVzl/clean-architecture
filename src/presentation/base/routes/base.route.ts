import { baseSchema } from "@/presentation/base/schemas/base.schema"
import { createRoute } from "@hono/zod-openapi"

export const baseRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['base'],
  summary: 'Retrieve the base',
  description: 'Retrieve the base',
  responses: {
    200: {
      content: {
        "application/json": {
          schema: baseSchema
        }
      },
      description: 'Retrieve the base'
    }
  }
})
export type BaseRoute = typeof baseRoute