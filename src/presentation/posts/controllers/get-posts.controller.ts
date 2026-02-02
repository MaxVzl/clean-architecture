import type { RouteHandler } from '@hono/zod-openapi';
import { GetPostsUseCase } from '@/application/posts/use-cases/get-posts.use-case';
import { PostPresenter } from '@/presentation/posts/presenters/post.presenter';
import type { GetPostsRoute } from '@/presentation/posts/routes/get-posts.route';

export const getPostsController =
  (getPostsUseCase: GetPostsUseCase): RouteHandler<GetPostsRoute> =>
  async (c) => {
    const posts = await getPostsUseCase.execute();
    return c.json(posts.map(PostPresenter.toResponse), 200);
  };
