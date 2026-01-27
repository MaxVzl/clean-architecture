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
import { diContainer } from "@/main.di"
import { getPostsByUserController } from "@/presentation/posts/controllers/get-posts-by-user.controller"

export const usersRoutes = new OpenAPIHono()

usersRoutes.openapi(getUsersRoute, getUsersController(diContainer.get('GetUsersUseCase')))
usersRoutes.openapi(getUserRoute, getUserController(diContainer.get('GetUserUseCase')))
usersRoutes.openapi(createUserRoute, createUserController(diContainer.get('CreateUserUseCase')))
usersRoutes.openapi(deleteUserRoute, deleteUserController(diContainer.get('DeleteUserUseCase')))
usersRoutes.openapi(updateUserRoute, updateUserController(diContainer.get('UpdateUserUseCase')))
usersRoutes.openapi(getPostsByUserRoute, getPostsByUserController(diContainer.get('GetPostsByUserUseCase')))