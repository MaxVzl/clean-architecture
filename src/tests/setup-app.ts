import { DIContainer } from "@/infrastructure/di/container";
import { registerUsersModule } from "@/presentation/users/users.di";
import { MockUsersRepository } from "@/infrastructure/persistence/users/repositories/mock-users.repository";
import { MyLoggerService } from "@/infrastructure/services/my-logger.service";
import type { AuthSessionDto } from "@/application/common/dto/auth-session.dto";
import type { AuthUserDto } from "@/application/common/dto/auth-user.dto";
import { MockPostsRepository } from "@/infrastructure/persistence/posts/repositories/mock-posts.repository";
import { registerPostsModule } from "@/presentation/posts/posts.di";
import { Hono } from "hono";
import { router } from "@/presentation/http/routes";

const mockUser: AuthUserDto = {
  id: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'admin@example.com',
  emailVerified: true,
  name: 'Admin User',
  image: null,
};

const mockSession: AuthSessionDto = {
  id: 'session-id',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'admin',
  expiresAt: new Date(Date.now() + 86400000), // 24 hours from now
  token: 'mock-token',
  ipAddress: null,
  userAgent: null,
};

export const createTestApp = () => {
  const testDiContainer = new DIContainer();

  testDiContainer.register('AuthService', (c) => {
    return {
      getSession: async (headers: Headers) => ({ 
        user: mockUser, 
        session: mockSession 
      }),
      handler: async (raw: Request) => new Response('OK')
    };
  });

  testDiContainer.register('LoggerService', (c) => new MyLoggerService())
  testDiContainer.register('UsersRepository', (c) => new MockUsersRepository())
  testDiContainer.register('PostsRepository', (c) => new MockPostsRepository())

  registerUsersModule(testDiContainer);
  registerPostsModule(testDiContainer);

  const app = new Hono();

  app.route('/', router(testDiContainer));
  
  return app;
};