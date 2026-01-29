import { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case";
import type { DIContainer } from "@/infrastructure/di/container";
import { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";
import { CreateUserUseCase } from "@/application/users/use-cases/create-user.use-case";
import { DeleteUserUseCase } from "@/application/users/use-cases/delete-user.use-case";
import { UpdateUserUseCase } from "@/application/users/use-cases/update-user.use-case";
import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";
import { MockUsersRepository } from "@/infrastructure/persistence/users/repositories/mock-users.repository";

export function registerUsersModule(diContainer: DIContainer) {
  // Repositories
  diContainer.register('UsersRepository', (c) => {
    return process.env.NODE_ENV === 'test' ? new MockUsersRepository() : new DrizzleUsersRepository(
      c.get('DrizzleConnection')
    )
  });

  // Use cases
  diContainer.register('GetUsersUseCase', (c) => {
    return new GetUsersUseCase(
      c.get('UsersRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('GetUserUseCase', (c) => {
    return new GetUserUseCase(
      c.get('UsersRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('CreateUserUseCase', (c) => {
    return new CreateUserUseCase(
      c.get('UsersRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('DeleteUserUseCase', (c) => {
    return new DeleteUserUseCase(
      c.get('UsersRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('UpdateUserUseCase', (c) => {
    return new UpdateUserUseCase(
      c.get('UsersRepository'),
      c.get('LoggerService')
    );
  });
}