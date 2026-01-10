import type { LoggerService } from "@/application/common/interfaces/logger.service";
import type { UpdateUserDto } from "@/application/users/dto/update-user.dto";
import { UserAlreadyExistsException } from "@/domain/users/exceptions/user-already-exists.exception";
import { UserNotFoundException } from "@/domain/users/exceptions/user-not-found.exception";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";

export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findById(id)
    if (!existingUser) {
      throw new UserNotFoundException(id)
    }
    if (existingUser.email !== updateUserDto.email) {
      const existingUserByEmail = await this.usersRepository.findByEmail(updateUserDto.email)
      if (existingUserByEmail) {
        throw new UserAlreadyExistsException(updateUserDto.email)
      }
    }
    existingUser.update(updateUserDto.name, updateUserDto.email)
    const updatedUser = await this.usersRepository.update(existingUser)
    this.loggerService.log(`Updated user ${updatedUser.id}`)
    return updatedUser
  }
}