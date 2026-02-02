import { DomainException } from '@/domain/common/exceptions/domain.exception';

export abstract class UnauthorizedException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedException';
  }
}
