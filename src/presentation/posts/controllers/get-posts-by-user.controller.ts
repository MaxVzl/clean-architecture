import type { RouteHandler } from "@hono/zod-openapi";
import type { GetPostsByUserRoute } from "@/presentation/posts/routes/get-posts-by-user.route";
import type { GetPostsByUserUseCase } from "@/application/posts/use-cases/get-posts-by-user.use-case";
import { PostPresenter } from "@/presentation/posts/presenters/post.presenter";

export const getPostsByUserController = (getPostsByUserUseCase: GetPostsByUserUseCase): RouteHandler<GetPostsByUserRoute> => async (c) => {
  const id = c.req.param('id')
  const posts = await getPostsByUserUseCase.execute(id)
  return c.json(posts.map(PostPresenter.toResponse), 200)
}