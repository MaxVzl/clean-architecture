import { InvalidArgumentException } from '@/domain/common/exceptions/invalid-argument.exception';

export class UUIDInvalidFormatException extends InvalidArgumentException {
  constructor(value: string) {
    super(`UUID ${value} is invalid.`);
    this.name = 'UUIDInvalidFormatException';
  }
}
