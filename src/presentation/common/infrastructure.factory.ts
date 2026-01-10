import { NodemailerEmailService } from "@/infrastructure/services/nodemailer-email.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";

export const emailService = new NodemailerEmailService();
export const loggerService = new MyLoggerService();