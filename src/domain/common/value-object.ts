import { z } from 'zod';
import { ValidationException } from './exceptions/validation.exception';

interface ValueObjectProps {
  [index: string]: unknown;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
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

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;

    const thisProps = this.props;
    const otherProps = vo.props;

    const thisKeys = Object.keys(thisProps);
    const otherKeys = Object.keys(otherProps);

    if (thisKeys.length !== otherKeys.length) {
      return false;
    }

    for (const key of thisKeys) {
      if (thisProps[key] !== otherProps[key]) {
        return false;
      }
    }

    return true;
  }
}
