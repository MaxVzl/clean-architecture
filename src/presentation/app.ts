import type { DIContainer } from "@/infrastructure/di/container";
import { globalErrorHandler } from "@/presentation/common/errors/global-error-handler";
import { appRouter } from "@/presentation/app.router";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";

export const createApp = (diContainer: DIContainer) => {
  const app = new OpenAPIHono()

  app.use(logger())

  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'My API'
    }
  })

  app.get('/scalar', Scalar({ url: '/doc' }))
  app.get('/ui', swaggerUI({ url: '/doc' }))

  app.route('/', appRouter(diContainer))

  app.onError(globalErrorHandler)

  app.notFound((c) => c.json({ error: 'Route Not Found' }, 404))

  return app;
}