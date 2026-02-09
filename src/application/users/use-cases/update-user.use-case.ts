import type { LoggerService } from '@/application/common/interfaces/logger.service';
import type { UpdateUserDto } from '@/application/users/dto/update-user.dto';
import { Email } from '@/domain/common/value-objects/email.vo';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { UserAlreadyExistsException } from '@/domain/users/exceptions/user-already-exists.exception';
import { UserNotFoundException } from '@/domain/users/exceptions/user-not-found.exception';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';

export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findById(UUID.create(id));
    if (!existingUser) {
      throw new UserNotFoundException(id);
    }
    if (existingUser.props.email.props.value !== updateUserDto.email) {
      const existingUserByEmail = await this.usersRepository.findByEmail(
        Email.create(updateUserDto.email),
      );
      if (existingUserByEmail) {
        throw new UserAlreadyExistsException(updateUserDto.email);
      }
    }
    existingUser.update({
      name: updateUserDto.name,
      email: Email.create(updateUserDto.email),
      emailVerified: updateUserDto.emailVerified,
      image: updateUserDto.image,
    });
    const updatedUser = await this.usersRepository.update(existingUser);
    this.loggerService.log(`Updated user ${updatedUser.id.props.value}`);
    return updatedUser;
  }
}
