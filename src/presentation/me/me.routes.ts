import { OpenAPIHono } from "@hono/zod-openapi"
import { getMeRoute } from "./routes/get-me.route"
import type { AuthMiddlewareVariables } from "@/presentation/common/middlewares/auth.middleware"
import { getMeController } from "@/presentation/me/controllers/get-me.controller"
import { diContainer } from "@/main.di"

export const meRoutes = new OpenAPIHono<AuthMiddlewareVariables>()

meRoutes.openapi(getMeRoute, getMeController(diContainer.get('GetUserUseCase')))