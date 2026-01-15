import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { AuthController } from "@/presentation/auth/controllers/auth.controller";

const authService = new BetterAuthService()

export const authController = new AuthController(authService)