import type { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case"
import { UserPresenter } from "@/presentation/users/presenters/user.presenter"
import type { GetUsersRoute } from "@/presentation/users/routes/get-users.route"
import { diContainer } from "@/test-di/main.di"
import type { RouteHandler } from "@hono/zod-openapi"

export const getUsersController: RouteHandler<GetUsersRoute> = async (c) => {
  const users = await diContainer.get<GetUsersUseCase>('GetUsersUseCase').execute()
  return c.json(users.map(UserPresenter.toResponse), 200)
}