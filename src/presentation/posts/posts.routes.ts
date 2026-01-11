import { getPostController, getPostsController, createPostController, updatePostController, deletePostController } from "@/presentation/posts/posts.factory"
import { getPostsRoute } from "@/presentation/posts/routes/get-posts.route"
import { getPostRoute } from "@/presentation/posts/routes/get-post.route"
import { createPostRoute } from "@/presentation/posts/routes/create-post.route"
import { updatePostRoute } from "@/presentation/posts/routes/update-post.route"
import { deletePostRoute } from "@/presentation/posts/routes/delete-post.route"
import { OpenAPIHono } from "@hono/zod-openapi"

export const postsRoutes = new OpenAPIHono()

postsRoutes.openapi(getPostsRoute, getPostsController.handle)
postsRoutes.openapi(getPostRoute, getPostController.handle)
postsRoutes.openapi(createPostRoute, createPostController.handle)
postsRoutes.openapi(updatePostRoute, updatePostController.handle)
postsRoutes.openapi(deletePostRoute, deletePostController.handle)