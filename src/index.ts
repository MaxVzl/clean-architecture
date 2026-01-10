import { routes } from '@/presentation/http/routes'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { globalErrorHandler } from '@/presentation/http/errors/global-error-handler'

const app = new Hono()

app.route('/', routes)

app.onError(globalErrorHandler)

app.notFound((c) => c.json({ error: 'Route Not Found' }, 404))

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
