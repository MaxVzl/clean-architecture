import { InvalidArgumentException } from "@/domain/common/exceptions/invalid-argument.exception"

export class UUIDRequiredException extends InvalidArgumentException {
  constructor(value: string) {
    super(`UUID ${value} is required.`)
    this.name = 'UUIDRequiredException'
  }
}