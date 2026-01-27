import { getPostsRoute } from "@/presentation/posts/routes/get-posts.route"
import { getPostRoute } from "@/presentation/posts/routes/get-post.route"
import { createPostRoute } from "@/presentation/posts/routes/create-post.route"
import { updatePostRoute } from "@/presentation/posts/routes/update-post.route"
import { deletePostRoute } from "@/presentation/posts/routes/delete-post.route"
import { OpenAPIHono } from "@hono/zod-openapi"
import { diContainer } from "@/main.di"
import { getPostsController } from "@/presentation/posts/controllers/get-posts.controller"
import { getPostController } from "@/presentation/posts/controllers/get-post.controller"
import { createPostController } from "@/presentation/posts/controllers/create-post.controller"
import { updatePostController } from "@/presentation/posts/controllers/update-post.controller"
import { deletePostController } from "@/presentation/posts/controllers/delete-post.controller"

export const postsRoutes = new OpenAPIHono()

postsRoutes.openapi(getPostsRoute, getPostsController(diContainer.get('GetPostsUseCase')))
postsRoutes.openapi(getPostRoute, getPostController(diContainer.get('GetPostUseCase')))
postsRoutes.openapi(createPostRoute, createPostController(diContainer.get('CreatePostUseCase')))
postsRoutes.openapi(updatePostRoute, updatePostController(diContainer.get('UpdatePostUseCase')))
postsRoutes.openapi(deletePostRoute, deletePostController(diContainer.get('DeletePostUseCase')))