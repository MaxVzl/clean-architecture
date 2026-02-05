import type { LoggerService } from '@/application/common/interfaces/logger.service';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { UserNotFoundException } from '@/domain/users/exceptions/user-not-found.exception';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';

export class GetUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(UUID.create(id));
    if (!user) {
      throw new UserNotFoundException(id);
    }
    this.loggerService.log(`Found user ${user.id.props.value}`);
    return user;
  }
}
