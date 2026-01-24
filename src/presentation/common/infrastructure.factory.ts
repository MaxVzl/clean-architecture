import { NodemailerEmailService } from "@/infrastructure/services/nodemailer-email.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";
import { DrizzlePostsRepository } from "@/infrastructure/persistence/posts/repositories/drizzle-posts.repository";
import { createDatabase } from "@/infrastructure/database";

export const emailService = new NodemailerEmailService();
export const loggerService = new MyLoggerService();
const databaseUrl = process.env.DB_FILE_NAME;
if (!databaseUrl) {
  throw new Error('DB_FILE_NAME environment variable is required');
}
export const db = createDatabase(databaseUrl);
export const authService = new BetterAuthService(loggerService, db);

export const usersRepository = new DrizzleUsersRepository(db);
export const postsRepository = new DrizzlePostsRepository(db);