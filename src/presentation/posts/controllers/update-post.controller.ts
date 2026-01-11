import { PostPresenter } from "@/presentation/posts/presenters/post.presenter";
import type { RouteHandler } from "@hono/zod-openapi";
import type { UpdatePostRoute } from "@/presentation/posts/routes/update-post.route";
import type { UpdatePostUseCase } from "@/application/posts/use-cases/update-post.use-case";

export class UpdatePostController {
  constructor(private readonly updatePostUseCase: UpdatePostUseCase) {}

  public handle: RouteHandler<UpdatePostRoute> = async (c) => {
    const id = c.req.param('id')
    const updatePostDto = c.req.valid('json')
    const post = await this.updatePostUseCase.execute(id, updatePostDto)
    return c.json(PostPresenter.toResponse(post), 201)
  }
}

