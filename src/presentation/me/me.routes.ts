import { OpenAPIHono } from "@hono/zod-openapi"
import { getMeRoute } from "./routes/get-me.route"
import { getMeController } from "./me.factory"

export const meRoutes = new OpenAPIHono()

meRoutes.openapi(getMeRoute, getMeController.handle)