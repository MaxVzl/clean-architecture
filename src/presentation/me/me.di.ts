import { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";
import type { DIContainer } from "@/infrastructure/di/container";

export function registerMeModule(diContainer: DIContainer) {  
  diContainer.register('GetUserUseCase', (c) => {
    return new GetUserUseCase(
      c.get('UsersRepository'),
      c.get('LoggerService')
    );
  });
}