import { DomainException } from "@/domain/common/exceptions/domain.exception"
import { DomainErrorType } from "@/domain/common/exceptions/error-types"

export class UserAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super(`User with email ${email} already exists.`, DomainErrorType.CONFLICT)
    this.name = 'UserAlreadyExistsException'
  }
}