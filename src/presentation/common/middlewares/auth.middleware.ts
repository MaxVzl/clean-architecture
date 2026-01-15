import type { AuthService } from "@/application/common/interfaces/auth.service";
import type { auth } from "@/infrastructure/config/better-auth.config";
import type { MiddlewareHandler } from "hono";

export type AuthMiddlewareVariables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
}

export class AuthMiddleware {
  constructor(private readonly authService: AuthService) {}
  
  public handle: MiddlewareHandler<{ Variables: AuthMiddlewareVariables }> = async (c, next) => {
    const session = await this.authService.getSession(c.req.raw.headers);
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }
    c.set("user", session.user);
    c.set("session", session.session);
    await next();
  }
}