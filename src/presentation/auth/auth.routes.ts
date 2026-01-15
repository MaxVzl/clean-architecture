import { authController } from "@/presentation/auth/auth.factory";
import { OpenAPIHono } from "@hono/zod-openapi"

export const authRoutes = new OpenAPIHono()

authRoutes.on(["POST", "GET"], "/*", authController.handle);