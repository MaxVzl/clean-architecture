import { getPostsByUserController } from "@/presentation/posts/posts.factory"
import { getPostsByUserRoute } from "@/presentation/posts/routes/get-posts-by-user.route"
import { createUserRoute } from "@/presentation/users/routes/create-user.route"
import { deleteUserRoute } from "@/presentation/users/routes/delete-user.route"
import { getUserRoute } from "@/presentation/users/routes/get-user.route"
import { getUsersRoute } from "@/presentation/users/routes/get-users.route"
import { updateUserRoute } from "@/presentation/users/routes/update-user.route"
import { createUserController, deleteUserController, getUserController, getUsersController, updateUserController } from "@/presentation/users/users.factory"
import { OpenAPIHono } from "@hono/zod-openapi"

export const usersRoutes = new OpenAPIHono()

usersRoutes.openapi(getUsersRoute, getUsersController.handle)
usersRoutes.openapi(getUserRoute, getUserController.handle)
usersRoutes.openapi(createUserRoute, createUserController.handle)
usersRoutes.openapi(deleteUserRoute, deleteUserController.handle)
usersRoutes.openapi(updateUserRoute, updateUserController.handle)
usersRoutes.openapi(getPostsByUserRoute, getPostsByUserController.handle)