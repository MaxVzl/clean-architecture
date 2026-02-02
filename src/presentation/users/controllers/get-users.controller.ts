import type { RouteHandler } from '@hono/zod-openapi';
import type { GetUsersRoute } from '@/presentation/users/routes/get-users.route';
import { GetUsersUseCase } from '@/application/users/use-cases/get-users.use-case';
import { UserPresenter } from '@/presentation/users/presenters/user.presenter';

export const getUsersController =
  (getUsersUseCase: GetUsersUseCase): RouteHandler<GetUsersRoute> =>
  async (c) => {
    const users = await getUsersUseCase.execute();
    return c.json(users.map(UserPresenter.toResponse), 200);
  };
