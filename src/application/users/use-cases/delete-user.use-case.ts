import type { LoggerService } from "@/application/common/interfaces/logger.service";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";

export class DeleteUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService
  ) {}

  async execute(id: string) {
    await this.usersRepository.delete(id)
    this.loggerService.log(`Deleted user ${id}`)
  }
}