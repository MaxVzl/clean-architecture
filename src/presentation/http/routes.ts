import { baseRoutes } from "@/presentation/base/base.routes"
import { usersRoutes } from "@/presentation/users/users.routes"
import { postsRoutes } from "@/presentation/posts/posts.routes"
import { OpenAPIHono } from "@hono/zod-openapi"
import { meRoutes } from "@/presentation/me/me.routes"
import { diContainer } from "@/main.di"
import { authMiddleware } from "@/presentation/common/middlewares/auth.middleware"

export const router = new OpenAPIHono()

// Public routes
router.route('/', baseRoutes)
router.on(["POST", "GET"], '/api/auth/*', (c) => diContainer.get('AuthService').handler(c.req.raw))

const api = new OpenAPIHono();

// Protected routes
api.use('/*', authMiddleware(diContainer.get('AuthService')))

api.route('/users', usersRoutes)
api.route('/posts', postsRoutes)
api.route('/me', meRoutes)

router.route('/', api)