import { DomainException } from "@/domain/common/exceptions/domain.exception"

export abstract class InvalidArgumentException extends DomainException {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidArgumentException'
  }
}