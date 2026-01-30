import { DIContainer } from "@/infrastructure/di/container";

export const loginAs = (diContainer: DIContainer, userId: string = 'user-1') => {
  diContainer.override('AuthService', {
    getSession: async (headers: Headers) => ({ 
      user: {
        id: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'admin@example.com',
        emailVerified: true,
        name: 'Admin User',
        image: null,
      }, 
      session: {
        id: 'session-id',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userId,
        expiresAt: new Date(Date.now() + 86400000), // 24 hours from now
        token: 'mock-token',
        ipAddress: null,
        userAgent: null,
      } 
    }),
    handler: async (raw: Request) => new Response('OK')
  });
};