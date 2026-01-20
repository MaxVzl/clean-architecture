import { NodemailerEmailService } from "@/infrastructure/services/nodemailer-email.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";
import { DrizzlePostsRepository } from "@/infrastructure/persistence/posts/repositories/drizzle-posts.repository";

export const emailService = new NodemailerEmailService();
export const loggerService = new MyLoggerService();
export const authService = new BetterAuthService(loggerService);

export const usersRepository = new DrizzleUsersRepository();
export const postsRepository = new DrizzlePostsRepository();