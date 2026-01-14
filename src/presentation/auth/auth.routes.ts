import { authController, signInController } from "@/presentation/auth/auth.factory";
import { OpenAPIHono } from "@hono/zod-openapi"

export const authRoutes = new OpenAPIHono()

authRoutes.get("/sign-in", signInController.handle);
// authRoutes.on(["POST", "GET"], "/*", authController.handle);