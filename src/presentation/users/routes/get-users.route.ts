import { userSchema } from '@/presentation/users/schemas/user.schema';
import { createRoute } from '@hono/zod-openapi';

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['users'],
  summary: 'Retrieve the users',
  description: 'Retrieve the users',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: userSchema.array(),
        },
      },
      description: 'Retrieve the users',
    },
  },
});
export type GetUsersRoute = typeof getUsersRoute;
