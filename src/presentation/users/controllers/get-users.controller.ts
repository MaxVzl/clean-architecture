import type { Context } from "hono";
import { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case";

export class GetUsersController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  public handle = async (c: Context) => {
    return c.json(await this.getUsersUseCase.execute())
  }
}