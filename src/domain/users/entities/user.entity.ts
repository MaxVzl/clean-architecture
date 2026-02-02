import { Entity } from '@/domain/common/entity';
import { UUID } from '@/domain/common/value-objects/uuid.vo';

export class User extends Entity {
  private constructor(
    id: UUID,
    private _name: string,
    private _email: string,
    private _emailVerified: boolean,
    private _image: string | null,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get emailVerified() {
    return this._emailVerified;
  }
  get image() {
    return this._image;
  }

  static create(
    name: string,
    email: string,
    emailVerified: boolean,
    image: string | null,
  ): User {
    return new User(
      UUID.generate(),
      name,
      email,
      emailVerified,
      image,
      new Date(),
      new Date(),
    );
  }

  static restore(
    id: UUID,
    name: string,
    email: string,
    emailVerified: boolean,
    image: string | null,
    createdAt: Date,
    updatedAt: Date,
  ): User {
    return new User(
      id,
      name,
      email,
      emailVerified,
      image,
      createdAt,
      updatedAt,
    );
  }

  public update(
    name: string,
    email: string,
    emailVerified: boolean,
    image: string | null,
  ): void {
    this._name = name;
    this._email = email;
    this._emailVerified = emailVerified;
    this._image = image;
    this.touch();
  }
}
