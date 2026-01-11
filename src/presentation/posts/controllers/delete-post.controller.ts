import type { DeletePostUseCase } from "@/application/posts/use-cases/delete-post.use-case";
import type { DeletePostRoute } from "@/presentation/posts/routes/delete-post.route";
import type { RouteHandler } from "@hono/zod-openapi";

export class DeletePostController {
  constructor(private readonly deletePostUseCase: DeletePostUseCase) {}

  public handle: RouteHandler<DeletePostRoute> = async (c) => {
    const id = c.req.param('id')
    await this.deletePostUseCase.execute(id)
    return c.body(null, 204)
  }
}

