import type { AuthService } from "@/application/common/interfaces/auth.service";
import { auth } from "@/infrastructure/config/better-auth.config";

export class BetterAuthService implements AuthService {
  async handler(raw: Request): Promise<Response> {
    return auth.handler(raw);
  }

  async signIn(): Promise<string> {
    try {
      const response = await auth.api.signInEmail({
        body: {
          email: 'motivational_shakeia@outlook.com',
          password: 'test',
        },
      });
      return response.token;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }
}