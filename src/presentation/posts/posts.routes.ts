import { getPostsController } from "@/presentation/posts/posts.factory"
import { Hono } from "hono"

export const postsRoutes = new Hono()

postsRoutes.get('/', getPostsController.handle)