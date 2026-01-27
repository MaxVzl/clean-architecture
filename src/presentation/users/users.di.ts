import { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case";
import type { DIContainer } from "@/infrastructure/di/container";
import { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";
import { CreateUserUseCase } from "@/application/users/use-cases/create-user.use-case";
import { DeleteUserUseCase } from "@/application/users/use-cases/delete-user.use-case";
import { UpdateUserUseCase } from "@/application/users/use-cases/update-user.use-case";

export function registerUsersModule(diContainer: DIContainer) {  
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