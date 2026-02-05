import { ValueObject } from '@/domain/common/value-object';
import { z } from 'zod';

export const emailSchema = z.email("Format d'email invalide").min(5);

export class Email extends ValueObject<{ value: string }> {
  public static create(email: string): Email {
    const result = emailSchema.safeParse(email);

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(', ');
      throw new Error(`Validation Email échouée : ${errorMessage}`);
    }

    return new Email({ value: result.data });
  }
}
