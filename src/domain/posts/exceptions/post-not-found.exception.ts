import { DomainException } from "@/domain/common/exceptions/domain.exception"
import { DomainErrorType } from "@/domain/common/exceptions/error-types"

export class PostNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Post with identifier ${id} was not found.`, DomainErrorType.NOT_FOUND)
    this.name = 'PostNotFoundException'
  }
}