import type { AuthService } from "@/application/common/interfaces/auth.service";
import { auth } from "@/infrastructure/config/better-auth.config";
import type { Session, User } from "better-auth";

export class BetterAuthService implements AuthService {
  async handler(raw: Request): Promise<Response> {
    return auth.handler(raw);
  }

  async getSession(headers: Headers): Promise<{ session: Session, user: User } | null> {
    return auth.api.getSession({ headers });
  }
}