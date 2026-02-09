import { ValidationException } from '@/domain/common/exceptions/validation.exception';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { z } from 'zod';

export abstract class Entity<T> {
  protected readonly _id: UUID;
  private _props!: T;

  constructor(props: T, id?: UUID) {
    this._id = id ?? UUID.generate();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  public get props(): T {
    return this._props;
  }

  protected set props(value: T) {
    this._props = Object.freeze(value);
  }

  protected static validate<T>(
    schema: z.ZodSchema<T>,
    input: unknown,
    valueObjectName: string,
  ): T {
    const result = schema.safeParse(input);

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(', ');
      throw new ValidationException(
        `Validation ${valueObjectName} échouée : ${errorMessage}`,
      );
    }

    return result.data;
  }

  public equals(entity: Entity<T>): boolean {
    if (entity === null || entity === undefined) return false;
    if (this === entity) return true;
    return this._id.equals(entity._id);
  }
}
