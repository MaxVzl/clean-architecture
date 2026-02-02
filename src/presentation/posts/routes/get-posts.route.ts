import { postSchema } from '@/presentation/posts/schemas/post.schema';
import { createRoute } from '@hono/zod-openapi';

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['posts'],
  summary: 'Retrieve the posts',
  description: 'Retrieve the posts',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: postSchema.array(),
        },
      },
      description: 'Retrieve the posts',
    },
  },
});
export type GetPostsRoute = typeof getPostsRoute;
