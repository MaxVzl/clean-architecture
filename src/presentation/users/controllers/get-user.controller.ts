import type { Context } from "hono";
import { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";

export class GetUserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  public handle = async (c: Context) => {
    const id = c.req.param('id')
    return c.json(await this.getUserUseCase.execute(id), 200)
  }
}