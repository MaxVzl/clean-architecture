import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import { DrizzleService } from "@/infrastructure/services/drizzle.service";
import 'dotenv/config'

export const auth = new BetterAuthService(
  new MyLoggerService(),
  new DrizzleService(process.env.DB_FILE_NAME!)
).auth;