import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { AuthController } from "@/presentation/auth/controllers/auth.controller";
import { SignInController } from "@/presentation/auth/controllers/sign-in.controller";

const authService = new BetterAuthService()

export const authController = new AuthController(authService)
export const signInController = new SignInController(authService)