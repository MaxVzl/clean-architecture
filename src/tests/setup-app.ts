import { MockUsersRepository } from "@/infrastructure/persistence/users/repositories/mock-users.repository";
import type { AuthSessionDto } from "@/application/common/dto/auth-session.dto";
import type { AuthUserDto } from "@/application/common/dto/auth-user.dto";
import { MockPostsRepository } from "@/infrastructure/persistence/posts/repositories/mock-posts.repository";
import { Hono } from "hono";
import { router } from "@/presentation/http/router";
import { DIContainer } from "@/infrastructure/di/container";
import { registerAppModule } from "@/app.module";

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
  const diContainer = new DIContainer()

  registerAppModule(diContainer)

  diContainer.override('AuthService', {
    getSession: async (headers: Headers) => ({ 
      user: mockUser, 
      session: mockSession 
    }),
    handler: async (raw: Request) => new Response('OK')
  });

  diContainer.override('UsersRepository', new MockUsersRepository())
  diContainer.override('PostsRepository', new MockPostsRepository())

  const app = new Hono();

  app.route('/', router(diContainer));
  
  return app;
};