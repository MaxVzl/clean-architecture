import { z } from '@hono/zod-openapi';

export const uuidParamSchema = z
  .object({
    id: z.string(),
  })
  .openapi('Id');
export type UuidParamSchema = z.infer<typeof uuidParamSchema>;
