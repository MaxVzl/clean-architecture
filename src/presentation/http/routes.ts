import { baseRoutes } from "@/presentation/base/base.routes"
import { usersRoutes } from "@/presentation/users/users.routes"
import { postsRoutes } from "@/presentation/posts/posts.routes"
import { OpenAPIHono } from "@hono/zod-openapi"
import { meRoutes } from "@/presentation/me/me.routes"
import { authMiddleware } from "@/presentation/common/middlewares/auth.middleware"
import type { DIContainer } from "@/infrastructure/di/container"

export const router = (diContainer: DIContainer) => {
  const app = new OpenAPIHono()

  // Public routes
  app.route('/', baseRoutes())
  app.on(["POST", "GET"], '/api/auth/*', (c) => diContainer.get('AuthService').handler(c.req.raw))

  const api = new OpenAPIHono();

  // Protected routes
  api.use('/*', authMiddleware(diContainer.get('AuthService')))

  api.route('/users', usersRoutes(diContainer))
  api.route('/posts', postsRoutes(diContainer))
  api.route('/me', meRoutes(diContainer))

  app.route('/', api)

  return app
}