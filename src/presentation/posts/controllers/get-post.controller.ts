import type { RouteHandler } from "@hono/zod-openapi";
import type { GetPostRoute } from "@/presentation/posts/routes/get-post.route";
import { GetPostUseCase } from "@/application/posts/use-cases/get-post.use-case";
import { PostPresenter } from "@/presentation/posts/presenters/post.presenter";

export class GetPostController {
  constructor(private readonly getPostUseCase: GetPostUseCase) {}

  public handle: RouteHandler<GetPostRoute> = async (c) => {
    const id = c.req.param('id')
    const post = await this.getPostUseCase.execute(id)
    return c.json(PostPresenter.toResponse(post), 200)
  }
}