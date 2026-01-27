import type { AuthSessionDto } from "@/application/common/dto/auth-session.dto";
import type { AuthUserDto } from "@/application/common/dto/auth-user.dto";
import type { AuthService } from "@/application/common/interfaces/auth.service"
import type { MiddlewareHandler } from "hono"

export type AuthMiddlewareVariables = {
  Variables: {
    user: AuthUserDto | null;
    session: AuthSessionDto | null;
  }
}

export const authMiddleware = (authService: AuthService): MiddlewareHandler<AuthMiddlewareVariables> => async (c, next) => {
  const session = await authService.getSession(c.req.raw.headers);
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