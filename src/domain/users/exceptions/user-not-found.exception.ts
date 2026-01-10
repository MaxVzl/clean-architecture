import { DomainException } from "@/domain/common/exceptions/domain.exception"
import { DomainErrorType } from "@/domain/common/exceptions/error-types"

export class UserNotFoundException extends DomainException {
  constructor(idOrEmail: string) {
    super(`User with identifier ${idOrEmail} was not found.`, DomainErrorType.NOT_FOUND)
    this.name = 'UserNotFoundException'
  }
}