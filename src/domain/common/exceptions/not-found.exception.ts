import { DomainException } from "@/domain/common/exceptions/domain.exception"

export abstract class NotFoundException extends DomainException {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundException'
  }
}