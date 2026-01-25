import { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case";
import { diContainer } from "@/test-di/main.di";

diContainer.get<GetUsersUseCase>('GetUsersUseCase').execute().then(console.log)