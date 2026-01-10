import { createUserSchema } from "@/presentation/users/schemas/create-user.schema"
import { userSchema } from "@/presentation/users/schemas/user.schema"
import { createRoute } from "@hono/zod-openapi"

export const createUserRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['users'],
  summary: 'Create a new user',
  description: 'Create a new user',
  request: {
    body: {
      content: {
        "application/json": {
          schema: createUserSchema
        }
      },
      description: 'The user to create'
    }
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: userSchema
        }
      },
      description: 'Create a new user'
    }
  }
})
export type CreateUserRoute = typeof createUserRoute