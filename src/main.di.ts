import { createDatabase } from "@/infrastructure/database";
import { DrizzlePostsRepository } from "@/infrastructure/persistence/posts/repositories/drizzle-posts.repository";
import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import { NodemailerEmailService } from "@/infrastructure/services/nodemailer-email.service";
import { AuthMiddleware } from "@/presentation/common/middlewares/auth.middleware";

const databaseUrl = process.env.DB_FILE_NAME;
if (!databaseUrl) {
  throw new Error('DB_FILE_NAME environment variable is required');
}
export const db = createDatabase(databaseUrl);

// Services
export const loggerService = new MyLoggerService();
export const emailService = new NodemailerEmailService();
export const authService = new BetterAuthService(loggerService, db);

// Repositories
export const usersRepository = new DrizzleUsersRepository(db);
export const postsRepository = new DrizzlePostsRepository(db);

// Middlewares
export const authMiddleware = new AuthMiddleware(authService);