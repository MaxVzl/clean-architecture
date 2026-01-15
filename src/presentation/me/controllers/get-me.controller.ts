import type { RouteHandler } from "@hono/zod-openapi";
import { UserPresenter } from "@/presentation/users/presenters/user.presenter";
import type { GetMeRoute } from "@/presentation/me/routes/get-me.route";
import type { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";
import type { AuthMiddlewareVariables } from "@/presentation/common/middlewares/auth.middleware";

export class GetMeController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  public handle: RouteHandler<GetMeRoute, { Variables: AuthMiddlewareVariables }> = async (c) => {
    const me = await this.getUserUseCase.execute(c.var.user!.id)
    return c.json(UserPresenter.toResponse(me), 200)
  }
}