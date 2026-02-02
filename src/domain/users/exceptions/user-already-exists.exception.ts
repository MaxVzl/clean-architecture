import { ConflictException } from '@/domain/common/exceptions/conflict.exception';

export class UserAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super(`User with email ${email} already exists.`);
    this.name = 'UserAlreadyExistsException';
  }
}
