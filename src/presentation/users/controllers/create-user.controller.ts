import type { Context } from "hono";
import type { CreateUserUseCase } from "@/application/users/use-cases/create-user.use-case";
import type { CreateUserDto } from "@/application/users/dto/create-user.dto";
import { createUserDtoSchema } from "@/application/users/dto/create-user.dto";

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  public handle = async (c: Context) => {
    try {
      const createUserDto: CreateUserDto = await createUserDtoSchema.parseAsync(await c.req.json())
      return c.json(await this.createUserUseCase.execute(createUserDto))
    } catch (error: any) {
      return c.json({ error: error.message }, 400)
    }
  }
}