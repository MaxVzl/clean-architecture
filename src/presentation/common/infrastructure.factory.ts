import { NodemailerEmailService } from "@/infrastructure/services/nodemailer-email.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";

export const emailService = new NodemailerEmailService();
export const loggerService = new MyLoggerService();
export const authService = new BetterAuthService(loggerService);