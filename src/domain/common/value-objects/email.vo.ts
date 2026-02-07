import { ValueObject } from '@/domain/common/value-object';
import { z } from 'zod';

export const emailSchema = z.email("Format d'email invalide").min(5);

export class Email extends ValueObject<{ value: string }> {
  public static create(value: string): Email {
    const data = this.validate(emailSchema, value, 'Email');
    return new Email({ value: data });
  }
}
