import { baseRoutes } from "@/presentation/base/base.routes"
import { usersRoutes } from "@/presentation/users/users.routes"
import { postsRoutes } from "@/presentation/posts/posts.routes"
import { OpenAPIHono } from "@hono/zod-openapi"
import { authRoutes } from "../auth/auth.routes"
import { meRoutes } from "@/presentation/me/me.routes"
import { authMiddleware } from "@/presentation/http/http.factory"

export const routes = new OpenAPIHono()

routes.use(authMiddleware.handle)

routes.route('/', baseRoutes)
routes.route('/api/auth', authRoutes)
routes.route('/users', usersRoutes)
routes.route('/posts', postsRoutes)
routes.route('/me', meRoutes)