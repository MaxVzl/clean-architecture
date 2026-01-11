import { NotFoundException } from "@/domain/common/exceptions/not-found.exception"

export class PostNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Post with identifier ${id} was not found.`)
    this.name = 'PostNotFoundException'
  }
}