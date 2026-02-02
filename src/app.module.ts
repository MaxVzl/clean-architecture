import { DIContainer } from '@/infrastructure/di/container';
import { createDatabase } from '@/infrastructure/database';
import { MyLoggerService } from '@/infrastructure/services/my-logger.service';
import { BetterAuthService } from '@/infrastructure/services/better-auth.service';
import { registerUsersModule } from '@/presentation/users/users.module';
import { registerPostsModule } from '@/presentation/posts/posts.module';

export function registerAppModule(diContainer: DIContainer) {
  diContainer.register('DrizzleConnection', () => {
    const databaseUrl = process.env.DB_FILE_NAME;
    if (!databaseUrl) {
      throw new Error('DB_FILE_NAME environment variable is required');
    }
    return createDatabase(databaseUrl);
  });
  diContainer.register('LoggerService', () =>
    process.env.NODE_ENV === 'test'
      ? new MyLoggerService()
      : new MyLoggerService(),
  );
  diContainer.register('AuthService', (c) => {
    return new BetterAuthService(
      c.get('DrizzleConnection'),
      c.get('LoggerService'),
    );
  });

  registerUsersModule(diContainer);
  registerPostsModule(diContainer);
}
