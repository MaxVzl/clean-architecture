import { updateUserSchema } from "@/presentation/users/schemas/update-user.schema"
import { userSchema } from "@/presentation/users/schemas/user.schema"
import { uuidParamSchema } from "@/presentation/common/schemas/params.schema"
import { createRoute } from "@hono/zod-openapi"

export const updateUserRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['users'],
  summary: 'Update the user',
  description: 'Update the user',
  request: {
    params: uuidParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateUserSchema
        }
      },
      description: 'The user to update'
    }
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: userSchema
        }
      },
      description: 'Update the user'
    }
  }
})
export type UpdateUserRoute = typeof updateUserRoute