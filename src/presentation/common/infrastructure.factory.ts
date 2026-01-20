import { NodemailerEmailService } from "@/infrastructure/services/nodemailer-email.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { DrizzleService } from "@/infrastructure/services/drizzle.service";
import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";
import { DrizzlePostsRepository } from "@/infrastructure/persistence/posts/repositories/drizzle-posts.repository";
import 'dotenv/config'

export const emailService = new NodemailerEmailService();
export const loggerService = new MyLoggerService();
export const drizzleService = new DrizzleService(process.env.DB_FILE_NAME!);
export const authService = new BetterAuthService(loggerService, drizzleService);

export const usersRepository = new DrizzleUsersRepository(drizzleService);
export const postsRepository = new DrizzlePostsRepository(drizzleService);
