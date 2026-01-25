import { AuthController } from "@/presentation/auth/controllers/auth.controller";
import { authService } from "@/main.di";

export const authController = new AuthController(authService)