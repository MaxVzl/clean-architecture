import { DomainException } from '@/domain/common/exceptions/domain.exception';

export abstract class ConflictException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictException';
  }
}
