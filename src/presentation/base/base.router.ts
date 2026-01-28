import { baseController } from "@/presentation/base/controllers/base.controller"
import { baseRoute } from "@/presentation/base/routes/base.route"
import { OpenAPIHono } from "@hono/zod-openapi"

export const baseRouter = () => {
  const app = new OpenAPIHono()
  
  app.openapi(baseRoute, baseController)
  
  return app
}