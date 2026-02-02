import { userSchema } from '@/presentation/users/schemas/user.schema';
import { createRoute } from '@hono/zod-openapi';

export const getMeRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['me'],
  summary: 'Retrieve the me',
  description: 'Retrieve the me',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: userSchema,
        },
      },
      description: 'Retrieve the me',
    },
  },
});
export type GetMeRoute = typeof getMeRoute;
