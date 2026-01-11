import type { CreatePostUseCase } from "@/application/posts/use-cases/create-post.use-case";
import { PostPresenter } from "@/presentation/posts/presenters/post.presenter";
import type { RouteHandler } from "@hono/zod-openapi";
import type { CreatePostRoute } from "@/presentation/posts/routes/create-post.route";

export class CreatePostController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  public handle: RouteHandler<CreatePostRoute> = async (c) => {
    const createPostDto = c.req.valid('json')
    const post = await this.createPostUseCase.execute(createPostDto)
    return c.json(PostPresenter.toResponse(post), 201)
  }
}

