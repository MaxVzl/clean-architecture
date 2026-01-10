import { GetUsersController } from "@/presentation/users/controllers/get-users.controller"
import { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case"
import { MockUsersRepository } from "@/infrastructure/persistence/users/repositories/mock-users.repository"
import { loggerService } from "@/presentation/common/infrastructure.factory";
import { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";
import { GetUserController } from "@/presentation/users/controllers/get-user.controller";
import { CreateUserUseCase } from "@/application/users/use-cases/create-user.use-case";
import { CreateUserController } from "@/presentation/users/controllers/create-user.controller";
import { DeleteUserController } from "@/presentation/users/controllers/delete-user.controller";
import { DeleteUserUseCase } from "@/application/users/use-cases/delete-user.use-case";

const usersRepository = new MockUsersRepository();

const getUsersUseCase = new GetUsersUseCase(
  usersRepository,
  loggerService
);

export const getUsersController = new GetUsersController(getUsersUseCase);

const getUserUseCase = new GetUserUseCase(
  usersRepository,
  loggerService
);

export const getUserController = new GetUserController(getUserUseCase);

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  loggerService
);

export const createUserController = new CreateUserController(createUserUseCase);

const deleteUserUseCase = new DeleteUserUseCase(
  usersRepository,
  loggerService
);

export const deleteUserController = new DeleteUserController(deleteUserUseCase);