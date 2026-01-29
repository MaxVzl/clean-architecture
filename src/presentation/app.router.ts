import { baseRouter } from "@/presentation/base/base.router"
import { usersRouter } from "@/presentation/users/users.router"
import { postsRouter } from "@/presentation/posts/posts.router"
import { OpenAPIHono } from "@hono/zod-openapi"
import { meRouter } from "@/presentation/me/me.router"
import { authMiddleware, requireAuthMiddleware } from "@/presentation/common/middlewares/auth.middleware"
import type { DIContainer } from "@/infrastructure/di/container"

export const appRouter = (diContainer: DIContainer) => {
  const app = new OpenAPIHono()

  app.use('/*', authMiddleware(diContainer.get('AuthService')))

  // Public routes
  app.route('/', baseRouter())
  app.on(["POST", "GET"], '/api/auth/*', (c) => diContainer.get('AuthService').handler(c.req.raw))

  const api = new OpenAPIHono();

  // Protected routes
  api.use('/*', requireAuthMiddleware)

  api.route('/users', usersRouter(diContainer))
  api.route('/posts', postsRouter(diContainer))
  api.route('/me', meRouter(diContainer))

  app.route('/', api)

  return app
}