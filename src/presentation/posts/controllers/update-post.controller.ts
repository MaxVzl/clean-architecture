import { PostPresenter } from '@/presentation/posts/presenters/post.presenter';
import type { RouteHandler } from '@hono/zod-openapi';
import type { UpdatePostRoute } from '@/presentation/posts/routes/update-post.route';
import type { UpdatePostUseCase } from '@/application/posts/use-cases/update-post.use-case';

export const updatePostController =
  (updatePostUseCase: UpdatePostUseCase): RouteHandler<UpdatePostRoute> =>
  async (c) => {
    const id = c.req.param('id');
    const updatePostDto = c.req.valid('json');
    const post = await updatePostUseCase.execute(id, updatePostDto);
    return c.json(PostPresenter.toResponse(post), 201);
  };
