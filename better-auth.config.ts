import 'dotenv/config'
import { createDatabase } from "@/infrastructure/database";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

export const auth = new BetterAuthService(
  new MyLoggerService(),
  createDatabase(databaseUrl)
).auth;