import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";

export const auth = new BetterAuthService(new MyLoggerService()).auth;