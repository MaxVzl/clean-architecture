import { baseRoutes } from "@/presentation/base/base.routes"
import { usersRoutes } from "@/presentation/users/users.routes"
import { postsRoutes } from "@/presentation/posts/posts.routes"
import { OpenAPIHono } from "@hono/zod-openapi"
import { authRoutes } from "../auth/auth.routes"

export const routes = new OpenAPIHono()

routes.route('/', baseRoutes)
routes.route('/api/auth', authRoutes)
routes.route('/users', usersRoutes)
routes.route('/posts', postsRoutes)