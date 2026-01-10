import type { LoggerService } from "@/application/common/interfaces/logger.service";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";

export class GetUsersUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService
  ) {}

  async execute() {
    const users = await this.usersRepository.findAll()
    this.loggerService.log(`Found ${users.length} users`)
    return users
  }
}