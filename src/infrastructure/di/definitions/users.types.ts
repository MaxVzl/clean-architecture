import type { CreateUserUseCase } from '@/application/users/use-cases/create-user.use-case';
import type { DeleteUserUseCase } from '@/application/users/use-cases/delete-user.use-case';
import type { GetUserUseCase } from '@/application/users/use-cases/get-user.use-case';
import type { GetUsersUseCase } from '@/application/users/use-cases/get-users.use-case';
import type { UpdateUserUseCase } from '@/application/users/use-cases/update-user.use-case';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';

export interface UsersTypes {
  // Repositories
  UsersRepository: UsersRepository;

  // Use cases
  GetUsersUseCase: GetUsersUseCase;
  GetUserUseCase: GetUserUseCase;
  CreateUserUseCase: CreateUserUseCase;
  DeleteUserUseCase: DeleteUserUseCase;
  UpdateUserUseCase: UpdateUserUseCase;
}
