import { AuthController } from "@/presentation/auth/controllers/auth.controller";
import { authService } from "@/presentation/common/infrastructure.factory";

export const authController = new AuthController(authService)