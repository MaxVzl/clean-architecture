import { baseController } from "@/presentation/base/controllers/base.controller"
import { baseRoute } from "@/presentation/base/routes/base.route"
import { OpenAPIHono } from "@hono/zod-openapi"

export const baseRoutes = new OpenAPIHono()

baseRoutes.openapi(baseRoute, baseController)