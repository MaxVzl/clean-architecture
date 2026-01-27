import { DIContainer } from "@/infrastructure/di/container";
import { createDatabase } from "@/infrastructure/database";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import { BetterAuthService } from "@/infrastructure/services/better-auth.service";
import { registerUsersModule } from "@/presentation/users/users.di";
import { registerPostsModule } from "@/presentation/posts/posts.di";
import { registerMeModule } from "@/presentation/me/me.di";
import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";
import { DrizzlePostsRepository } from "@/infrastructure/persistence/posts/repositories/drizzle-posts.repository";

const diContainer = new DIContainer();

diContainer.register('DrizzleConnection', () => {
  const databaseUrl = process.env.DB_FILE_NAME;
  if (!databaseUrl) {
    throw new Error('DB_FILE_NAME environment variable is required');
  }
  return createDatabase(databaseUrl)
});

// Services
diContainer.register('LoggerService', () => new MyLoggerService());
diContainer.register('AuthService', (c) => {
  return new BetterAuthService(
    c.get('DrizzleConnection'),
    c.get('LoggerService')
  )
});

// Repositories
diContainer.register('UsersRepository', (c) => {
  return new DrizzleUsersRepository(
    c.get('DrizzleConnection')
  )
});
diContainer.register('PostsRepository', (c) => {
  return new DrizzlePostsRepository(
    c.get('DrizzleConnection')
  )
});

registerUsersModule(diContainer);
registerPostsModule(diContainer);
registerMeModule(diContainer);

export { diContainer };