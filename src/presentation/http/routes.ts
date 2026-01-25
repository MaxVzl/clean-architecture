import { baseRoutes } from "@/presentation/base/base.routes"
import { usersRoutes } from "@/presentation/users/users.routes"
import { postsRoutes } from "@/presentation/posts/posts.routes"
import { OpenAPIHono } from "@hono/zod-openapi"
import { authRoutes } from "../auth/auth.routes"
import { meRoutes } from "@/presentation/me/me.routes"
import { authMiddleware } from "@/main.di"

export const router = new OpenAPIHono()

// Public routes
router.route('/', baseRoutes)
router.route('/api/auth', authRoutes)

const api = new OpenAPIHono();

// Protected routes
api.use('/*', authMiddleware.handle)

api.route('/users', usersRoutes)
api.route('/posts', postsRoutes)
api.route('/me', meRoutes)

router.route('/', api)