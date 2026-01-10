import type { LoggerService } from "@/application/common/interfaces/logger.service";
import type { CreateUserDto } from "@/application/users/dto/create-user.dto";
import { User } from "@/domain/users/entities/user.entity";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";
import { randomUUID } from "crypto";

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const user = new User(randomUUID(), createUserDto.name, createUserDto.email, createUserDto.password, new Date(), new Date())
    const createdUser = await this.usersRepository.create(user)
    this.loggerService.log(`Created user ${createdUser.id}`)
    return createdUser
  }
}