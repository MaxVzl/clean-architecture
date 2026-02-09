import { ValueObject } from '@/domain/common/value-object';
import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
});

export type AddressProps = z.infer<typeof addressSchema>;

export class Address extends ValueObject<AddressProps> {
  public static create(props: AddressProps): Address {
    const data = this.validate(addressSchema, props, 'Address');
    return new Address(data);
  }
}
