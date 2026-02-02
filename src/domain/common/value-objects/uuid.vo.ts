import { ValueObject } from '@/domain/common/value-object';
import { v4 as uuidv4 } from 'uuid';

export class UUID extends ValueObject<{ value: string }> {
  public static create(value: string): UUID {
    return new UUID({ value });
  }

  public static generate(): UUID {
    return new UUID({ value: uuidv4() });
  }
}
