import { DomainException } from '@/domain/common/exceptions/domain.exception';

export abstract class InternalException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InternalException';
  }
}
