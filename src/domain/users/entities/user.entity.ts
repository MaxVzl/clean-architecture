import { randomUUID } from "crypto"

export class User {
  private constructor(
    public readonly id: string,
    private _name: string,
    private _email: string,
    private _password: string,
    public readonly createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get name() { return this._name }
  get email() { return this._email }
  get password() { return this._password }
  get updatedAt() { return this._updatedAt }

  static create(name: string, email: string, password: string): User {
    return new User(
      randomUUID(),
      name,
      email,
      password,
      new Date(),
      new Date()
    )
  }

  static restore(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ): User {
    return new User(id, name, email, password, createdAt, updatedAt)
  }

  public changePassword(newPasswordHash: string): void {
    this._password = newPasswordHash
    this._updatedAt = new Date()
  }

  public update(name: string, email: string): void {
    this._name = name
    this._email = email
    this._updatedAt = new Date()
  }
}