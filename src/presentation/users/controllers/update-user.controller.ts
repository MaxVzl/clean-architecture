import { UserPresenter } from "@/presentation/users/presenters/user.presenter";
import type { RouteHandler } from "@hono/zod-openapi";
import type { UpdateUserRoute } from "@/presentation/users/routes/update-user.route";
import type { UpdateUserUseCase } from "@/application/users/use-cases/update-user.use-case";

export const updateUserController = (updateUserUseCase: UpdateUserUseCase): RouteHandler<UpdateUserRoute> => async (c) => {
  const id = c.req.param('id')
  const updateUserDto = c.req.valid('json')
  const user = await updateUserUseCase.execute(id, updateUserDto)
  return c.json(UserPresenter.toResponse(user), 201)
}