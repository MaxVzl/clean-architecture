import type { RouteHandler } from '@hono/zod-openapi';
import type { GetUserRoute } from '@/presentation/users/routes/get-user.route';
import { GetUserUseCase } from '@/application/users/use-cases/get-user.use-case';
import { UserPresenter } from '@/presentation/users/presenters/user.presenter';

export const getUserController =
  (getUserUseCase: GetUserUseCase): RouteHandler<GetUserRoute> =>
  async (c) => {
    const id = c.req.param('id');
    const user = await getUserUseCase.execute(id);
    return c.json(UserPresenter.toResponse(user), 200);
  };
