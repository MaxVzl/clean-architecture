import { AuthMiddleware } from "@/presentation/common/middlewares/auth.middleware";
import { authService } from "@/presentation/common/infrastructure.factory";

export const authMiddleware = new AuthMiddleware(authService);