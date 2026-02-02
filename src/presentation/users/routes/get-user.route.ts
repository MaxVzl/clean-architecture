import { uuidParamSchema } from '@/presentation/common/schemas/params.schema';
import { userSchema } from '@/presentation/users/schemas/user.schema';
import { createRoute } from '@hono/zod-openapi';

export const getUserRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['users'],
  summary: 'Retrieve the user',
  description: 'Retrieve the user',
  request: {
    params: uuidParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: userSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
});
export type GetUserRoute = typeof getUserRoute;
