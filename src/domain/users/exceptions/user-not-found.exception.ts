import { NotFoundException } from '@/domain/common/exceptions/not-found.exception';

export class UserNotFoundException extends NotFoundException {
  constructor(idOrEmail: string) {
    super(`User with identifier ${idOrEmail} was not found.`);
    this.name = 'UserNotFoundException';
  }
}
