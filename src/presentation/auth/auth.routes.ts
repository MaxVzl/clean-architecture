import { auth } from "@/auth";
import { OpenAPIHono } from "@hono/zod-openapi"

export const authRoutes = new OpenAPIHono()

authRoutes.on(["POST", "GET"], "/*", (c) => {
	return auth.handler(c.req.raw);
});