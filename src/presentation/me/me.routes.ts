import { OpenAPIHono } from "@hono/zod-openapi"
import { getMeRoute } from "./routes/get-me.route"
import type { AuthMiddlewareVariables } from "@/presentation/common/middlewares/auth.middleware"
import { getMeController } from "@/presentation/me/controllers/get-me.controller"
import type { DIContainer } from "@/infrastructure/di/container"

export const meRoutes = (diContainer: DIContainer) => {
  const app = new OpenAPIHono<AuthMiddlewareVariables>()

  app.openapi(getMeRoute, getMeController(diContainer.get('GetUserUseCase')))

  return app
}