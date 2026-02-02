import { z } from '@hono/zod-openapi';

export const baseSchema = z
  .object({
    status: z.string(),
  })
  .openapi('BaseSchema');
export type BaseSchema = z.infer<typeof baseSchema>;
