import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";
import { GetMeController } from "@/presentation/me/controllers/get-me.controller";
import { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";
import { loggerService } from "@/presentation/common/infrastructure.factory";

// const usersRepository = new MockUsersRepository();
const usersRepository = new DrizzleUsersRepository();

const getUserUseCase = new GetUserUseCase(
  usersRepository,
  loggerService
);

export const getMeController = new GetMeController(getUserUseCase);