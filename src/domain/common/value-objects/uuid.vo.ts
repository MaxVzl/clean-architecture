import { ValueObject } from '@/domain/common/value-object';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export const uuidSchema = z.uuid();

export class UUID extends ValueObject<{ value: string }> {
  public static create(value: string): UUID {
    const data = this.validate(uuidSchema, value, 'UUID');
    return new UUID({ value: data });
  }

  public static generate(): UUID {
    return new UUID({ value: uuidv4() });
  }
}
