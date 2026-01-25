import type { LoggerService } from "@/application/common/interfaces/logger.service";
import { DIContainer } from "@/test-di/di-container";
import { createDatabase, type DrizzleConnection } from "@/infrastructure/database";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import { registerUsersModule } from "@/test-di/users.di";
import type { AuthService } from "@/application/common/interfaces/auth.service";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";

const diContainer = new DIContainer();

diContainer.register<DrizzleConnection>('DrizzleConnection', () => {
  const databaseUrl = process.env.DB_FILE_NAME;
  if (!databaseUrl) {
    throw new Error('DB_FILE_NAME environment variable is required');
  }
  return createDatabase(databaseUrl)
});
diContainer.register<LoggerService>('LoggerService', () => new MyLoggerService());
diContainer.register<AuthService>('AuthService', (c) => {
  return new BetterAuthService(
    c.get<DrizzleConnection>('DrizzleConnection'),
    c.get<LoggerService>('LoggerService')
  )
});

registerUsersModule(diContainer);

export { diContainer };