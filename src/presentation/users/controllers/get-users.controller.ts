import type { RouteHandler } from "@hono/zod-openapi";
import type { GetUsersRoute } from "@/presentation/users/routes/get-users.route";
import { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case";
import { UserPresenter } from "@/presentation/users/presenters/user.presenter";

export class GetUsersController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  public handle: RouteHandler<GetUsersRoute> = async (c) => {
    const users = await this.getUsersUseCase.execute()
    return c.json(users.map(UserPresenter.toResponse), 200)
  }
}