import { GetUsersUseCase } from '@/application/users/use-cases/get-users.use-case';
import type { LoggerService } from '@/application/common/interfaces/logger.service';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';
import { User } from '@/domain/users/entities/user.entity';
import { expect, test, vi } from 'vitest';

test('GetUsersUseCase', async () => {
  const mockUsers = [
    User.create('User 1', 'user1@example.com', true, null),
    User.create('User 2', 'user2@example.com', true, null),
    User.create('User 3', 'user3@example.com', false, null),
  ];

  const mockUsersRepository: UsersRepository = {
    findAll: vi.fn().mockResolvedValue(mockUsers),
    findById: vi.fn(),
    findByEmail: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  const mockLoggerService: LoggerService = {
    log: vi.fn().mockResolvedValue(undefined),
  };

  const getUsersUseCase = new GetUsersUseCase(
    mockUsersRepository,
    mockLoggerService,
  );
  const users = await getUsersUseCase.execute();
  expect(users).toBeDefined();
  expect(users.length).toBe(3);
});
