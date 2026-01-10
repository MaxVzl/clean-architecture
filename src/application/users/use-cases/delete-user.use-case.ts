import type { LoggerService } from "@/application/common/interfaces/logger.service";
import { UserNotFoundException } from "@/domain/users/exceptions/user-not-found.exception";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";

export class DeleteUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new UserNotFoundException(id)
    }
    await this.usersRepository.delete(id)
    this.loggerService.log(`Deleted user ${id}`)
  }
}