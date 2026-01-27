import { getPostsByUserRoute } from "@/presentation/posts/routes/get-posts-by-user.route"
import { createUserRoute } from "@/presentation/users/routes/create-user.route"
import { deleteUserRoute } from "@/presentation/users/routes/delete-user.route"
import { getUserRoute } from "@/presentation/users/routes/get-user.route"
import { getUsersRoute } from "@/presentation/users/routes/get-users.route"
import { updateUserRoute } from "@/presentation/users/routes/update-user.route"
import { OpenAPIHono } from "@hono/zod-openapi"
import { getUsersController } from "@/presentation/users/controllers/get-users.controller"
import { getUserController } from "@/presentation/users/controllers/get-user.controller"
import { createUserController } from "@/presentation/users/controllers/create-user.controller"
import { deleteUserController } from "@/presentation/users/controllers/delete-user.controller"
import { updateUserController } from "@/presentation/users/controllers/update-user.controller"
import { getPostsByUserController } from "@/presentation/posts/controllers/get-posts-by-user.controller"
import type { DIContainer } from "@/infrastructure/di/container"

export const usersRoutes = (diContainer: DIContainer) => {
  const app = new OpenAPIHono()

  app.openapi(getUsersRoute, getUsersController(diContainer.get('GetUsersUseCase')))
  app.openapi(getUserRoute, getUserController(diContainer.get('GetUserUseCase')))
  app.openapi(createUserRoute, createUserController(diContainer.get('CreateUserUseCase')))
  app.openapi(deleteUserRoute, deleteUserController(diContainer.get('DeleteUserUseCase')))
  app.openapi(updateUserRoute, updateUserController(diContainer.get('UpdateUserUseCase')))
  app.openapi(getPostsByUserRoute, getPostsByUserController(diContainer.get('GetPostsByUserUseCase')))

  return app
}