import type { CreateUserUseCase } from '@/application/users/use-cases/create-user.use-case';
import { UserPresenter } from '@/presentation/users/presenters/user.presenter';
import type { RouteHandler } from '@hono/zod-openapi';
import type { CreateUserRoute } from '@/presentation/users/routes/create-user.route';

export const createUserController =
  (createUserUseCase: CreateUserUseCase): RouteHandler<CreateUserRoute> =>
  async (c) => {
    const createUserDto = c.req.valid('json');
    const user = await createUserUseCase.execute(createUserDto);
    return c.json(UserPresenter.toResponse(user), 201);
  };
