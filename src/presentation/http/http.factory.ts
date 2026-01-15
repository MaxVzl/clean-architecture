import { AuthMiddleware } from "@/presentation/common/middlewares/auth.middleware";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";

const betterAuthService = new BetterAuthService();

export const authMiddleware = new AuthMiddleware(betterAuthService);