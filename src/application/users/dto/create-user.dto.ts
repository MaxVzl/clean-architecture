import { z } from "zod";

export const createUserDtoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});
export type CreateUserDto = z.infer<typeof createUserDtoSchema>;