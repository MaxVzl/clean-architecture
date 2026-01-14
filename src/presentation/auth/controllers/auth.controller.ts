import type { Context } from "hono";
import type { AuthService } from "@/application/common/interfaces/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public handle = async (c: Context) => {
    return this.authService.handler(c.req.raw);
  }
}