import { OpenAPIHono } from "@hono/zod-openapi"
import { getMeRoute } from "./routes/get-me.route"
import { getMeController } from "./me.di"
import type { AuthMiddlewareVariables } from "@/presentation/common/middlewares/auth.middleware"

export const meRoutes = new OpenAPIHono<AuthMiddlewareVariables>()

meRoutes.openapi(getMeRoute, getMeController.handle)