import type { LoggerService } from "@/application/common/interfaces/logger.service";
import { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case";
import type { DIContainer } from "@/test-di/di-container";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";
import type { DrizzleConnection } from "@/infrastructure/database";
import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";

export function registerUsersModule(diContainer: DIContainer) {
  diContainer.register<UsersRepository>('UsersRepository', (c) => {
    return new DrizzleUsersRepository(
      c.get<DrizzleConnection>('DrizzleConnection')
    )
  });
  
  diContainer.register<GetUsersUseCase>('GetUsersUseCase', (c) => {
    return new GetUsersUseCase(
      c.get<UsersRepository>('UsersRepository'),
      c.get<LoggerService>('LoggerService')
    );
  });
}