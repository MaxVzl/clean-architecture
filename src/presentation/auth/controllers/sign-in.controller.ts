import type { Context } from "hono";
import type { AuthService } from "@/application/common/interfaces/auth.service";

export class SignInController {
  constructor(private readonly authService: AuthService) {}

  public handle = async (c: Context) => {
    return c.json({ message: await this.authService.signIn() });
  }
}