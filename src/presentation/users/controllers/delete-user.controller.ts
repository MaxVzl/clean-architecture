import type { DeleteUserUseCase } from '@/application/users/use-cases/delete-user.use-case';
import type { DeleteUserRoute } from '@/presentation/users/routes/delete-user.route';
import type { RouteHandler } from '@hono/zod-openapi';

export const deleteUserController =
  (deleteUserUseCase: DeleteUserUseCase): RouteHandler<DeleteUserRoute> =>
  async (c) => {
    const id = c.req.param('id');
    await deleteUserUseCase.execute(id);
    return c.body(null, 204);
  };
