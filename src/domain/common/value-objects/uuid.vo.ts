import { UUIDInvalidFormatException } from "@/domain/common/exceptions/uuid-invalid-format.exception";
import { UUIDRequiredException } from "@/domain/common/exceptions/uuid-required.exception";
import { v4 as uuidv4, validate } from 'uuid';

export class UUID {
  constructor(public readonly value: string) {
    this.ensureIsValidUuid(value)
  }

  static generate(): UUID {
    return new UUID(uuidv4())
  }

  private ensureIsValidUuid(id: string): void {
    if (!id) {
      throw new UUIDRequiredException(id)
    }
    // if (!validate(id)) {
    //   throw new UUIDInvalidFormatException(id)
    // }
  }

  public equals(other: UUID): boolean {
    return this.value === other.value
  }

  public toString(): string {
    return this.value
  }
}