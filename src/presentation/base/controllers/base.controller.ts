import type { BaseRoute } from "@/presentation/base/routes/base.route";
import type { RouteHandler } from "@hono/zod-openapi";

export const baseController: RouteHandler<BaseRoute> = (c) => {
  return c.json({ status: 'ok' }, 200)
}