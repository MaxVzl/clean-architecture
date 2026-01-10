import { Hono } from "hono"
import { baseRoutes } from "@/presentation/base/base.routes"
import { usersRoutes } from "@/presentation/users/users.routes"
import { postsRoutes } from "@/presentation/posts/posts.routes"

export const routes = new Hono()

routes.route('/', baseRoutes)
routes.route('/users', usersRoutes)
routes.route('/posts', postsRoutes)