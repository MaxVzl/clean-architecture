import type { CreatePostUseCase } from '@/application/posts/use-cases/create-post.use-case';
import { PostPresenter } from '@/presentation/posts/presenters/post.presenter';
import type { RouteHandler } from '@hono/zod-openapi';
import type { CreatePostRoute } from '@/presentation/posts/routes/create-post.route';

export const createPostController =
  (createPostUseCase: CreatePostUseCase): RouteHandler<CreatePostRoute> =>
  async (c) => {
    const createPostDto = c.req.valid('json');
    const post = await createPostUseCase.execute(createPostDto);
    return c.json(PostPresenter.toResponse(post), 201);
  };
