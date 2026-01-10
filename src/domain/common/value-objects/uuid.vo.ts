import { UUIDRequiredException } from "@/domain/common/exceptions/uuid-required.exception";

export class UUID {
  constructor(private readonly value: string) {
    if (!value) {
      throw new UUIDRequiredException(value)
    }
  }
}