import type { AuthService } from "@/application/common/interfaces/auth.service";
import { auth } from "@/infrastructure/config/better-auth.config";

export class BetterAuthService implements AuthService {
  async handler(raw: Request): Promise<Response> {
    return auth.handler(raw);
  }
}