import { getPostController, getPostsController } from "@/presentation/posts/posts.factory"
import { getPostsRoute } from "@/presentation/posts/routes/get-posts.route"
import { getPostRoute } from "@/presentation/posts/routes/get-post.route"
import { OpenAPIHono } from "@hono/zod-openapi"

export const postsRoutes = new OpenAPIHono()

postsRoutes.openapi(getPostsRoute, getPostsController.handle)
postsRoutes.openapi(getPostRoute, getPostController.handle)