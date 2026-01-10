import { routes } from '@/presentation/http/routes'
import { serve } from '@hono/node-server'
import { globalErrorHandler } from '@/presentation/http/errors/global-error-handler'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

const app = new OpenAPIHono()

app.route('/', routes)

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API'
  }
})

app.get('/ui', swaggerUI({ url: '/doc' }))

app.onError(globalErrorHandler)

app.notFound((c) => c.json({ error: 'Route Not Found' }, 404))

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})