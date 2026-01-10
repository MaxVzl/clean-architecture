import type { LoggerService } from "@/application/common/interfaces/logger.service";
import type { CreateUserDto } from "@/application/users/dto/create-user.dto";
import { User } from "@/domain/users/entities/user.entity";
import { UserAlreadyExistsException } from "@/domain/users/exceptions/user-already-exists.exception";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(createUserDto.email)
    if (existingUser) {
      throw new UserAlreadyExistsException(createUserDto.email)
    }
    const user = User.create(createUserDto.name, createUserDto.email, createUserDto.password)
    const createdUser = await this.usersRepository.create(user)
    this.loggerService.log(`Created user ${createdUser.id}`)
    return createdUser
  }
}