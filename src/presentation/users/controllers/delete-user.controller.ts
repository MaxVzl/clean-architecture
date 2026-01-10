import type { Context } from "hono";
import type { DeleteUserUseCase } from "@/application/users/use-cases/delete-user.use-case";

export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  public handle = async (c: Context) => {
    try {
      const id = c.req.param('id')
      await this.deleteUserUseCase.execute(id)
      return c.json({ message: 'User deleted successfully' }, 200)
    } catch (error: any) {
      return c.json({ error: error.message }, 500)
    }
  }
}