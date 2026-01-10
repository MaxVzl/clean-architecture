import { DomainException } from "@/domain/common/exceptions/domain.exception"
import { DomainErrorType } from "@/domain/common/exceptions/error-types"

export class UUIDRequiredException extends DomainException {
  constructor(value: string) {
    super(`UUID ${value} is required.`, DomainErrorType.INVALID_ARGUMENT)
    this.name = 'UUIDRequiredException'
  }
}