import { ValueObject } from '@/domain/common/value-object';
import { z } from 'zod';

export const geoSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export type GeoProps = z.infer<typeof geoSchema>;

export class Geo extends ValueObject<GeoProps> {
  public static create(props: GeoProps): Geo {
    const data = this.validate(geoSchema, props, 'Geo');
    return new Geo(data);
  }
}
