import { Entity } from "@/domain/common/entity"
import { UUID } from "@/domain/common/value-objects/uuid.vo"

export class User extends Entity {
  private constructor(
    id: UUID,
    private _name: string,
    private _email: string,
    private _password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, createdAt, updatedAt)
  }

  get name() { return this._name }
  get email() { return this._email }
  get password() { return this._password }

  static create(name: string, email: string, password: string): User {
    return new User(
      UUID.generate(),
      name,
      email,
      password,
      new Date(),
      new Date()
    )
  }

  static restore(
    id: UUID,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ): User {
    return new User(
      id,
      name,
      email,
      password,
      createdAt,
      updatedAt
    )
  }

  public changePassword(newPasswordHash: string): void {
    this._password = newPasswordHash
    this.touch()
  }

  public update(name: string, email: string): void {
    this._name = name
    this._email = email
    this.touch()
  }
}

const user = User.create('John Doe', 'john.doe@example.com', 'password')
console.log(user.name)