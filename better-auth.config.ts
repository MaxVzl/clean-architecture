import 'dotenv/config'
import { createDatabase } from "@/infrastructure/database";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";

const databaseUrl = process.env.DB_FILE_NAME;
if (!databaseUrl) {
  throw new Error('DB_FILE_NAME environment variable is required');
}

export const auth = new BetterAuthService(
  createDatabase(databaseUrl),
  new MyLoggerService()
).auth;