import { GetMeController } from "@/presentation/me/controllers/get-me.controller";
import { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";
import { loggerService, usersRepository } from "@/main.di";

const getUserUseCase = new GetUserUseCase(
  usersRepository,
  loggerService
);

export const getMeController = new GetMeController(getUserUseCase);