import type { DeletePostUseCase } from '@/application/posts/use-cases/delete-post.use-case';
import type { DeletePostRoute } from '@/presentation/posts/routes/delete-post.route';
import type { RouteHandler } from '@hono/zod-openapi';

export const deletePostController =
  (deletePostUseCase: DeletePostUseCase): RouteHandler<DeletePostRoute> =>
  async (c) => {
    const id = c.req.param('id');
    await deletePostUseCase.execute(id);
    return c.body(null, 204);
  };
