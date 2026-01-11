import { DomainException } from "@/domain/common/exceptions/domain.exception"
import { DomainErrorType } from "@/domain/common/exceptions/error-types"

export class UUIDInvalidFormatException extends DomainException {
  constructor(value: string) {
    super(`UUID ${value} is invalid.`, DomainErrorType.INVALID_ARGUMENT)
    this.name = 'UUIDInvalidFormatException'
  }
}