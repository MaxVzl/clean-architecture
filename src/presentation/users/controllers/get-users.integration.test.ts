import { User } from '@/domain/users/entities/user.entity';
import { createApp } from '@/presentation/app';
import { loginAs } from 'tests/helpers/auth.helper';
import { diContainer } from 'tests/setup';
import { expect, test } from 'vitest';

test('get users integration with no users', async () => {
  loginAs(diContainer);
  const app = createApp(diContainer);
  const response = await app.request('/users');
  expect(response.status).toBe(200);
  const users = await response.json();
  expect(users).toBeDefined();
  expect(users.length).toBe(0);
});

test('get users integration with users', async () => {
  const usersRepo = diContainer.get('UsersRepository');
  const userToCreate = User.create('John Doe', 'john@test.com', false, null);
  await usersRepo.create(userToCreate);
  loginAs(diContainer);
  const app = createApp(diContainer);
  const response = await app.request('/users');
  expect(response.status).toBe(200);
  const users = await response.json();
  expect(users).toBeDefined();
  expect(users.length).toBe(1);
});
