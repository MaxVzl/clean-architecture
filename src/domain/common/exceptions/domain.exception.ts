import type { DomainErrorType } from "@/domain/common/exceptions/error-types";

export class DomainException extends Error {
  public readonly type: DomainErrorType;

  constructor(message: string, type: DomainErrorType) {
    super(message)
    this.name = 'DomainException'
    this.type = type
  }
}