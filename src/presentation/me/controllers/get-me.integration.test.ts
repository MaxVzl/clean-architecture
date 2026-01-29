import { User } from "@/domain/users/entities/user.entity"
import { createApp } from "@/presentation/app"
import { loginAs } from "@/tests/helpers/auth.helper"
import { diContainer } from "@/tests/setup"
import { expect, test } from "vitest"

test('get me integration with valid user id', async () => {
  const usersRepo = diContainer.get('UsersRepository');
  const userToCreate = User.create('John Doe', 'john@test.com', false, null);
  await usersRepo.create(userToCreate);
  loginAs(diContainer, userToCreate.id.value)
  const app = createApp(diContainer)
  const response = await app.request('/me')
  expect(response.status).toBe(200)
  const me = await response.json()
  expect(me).toBeDefined()
  expect(me.id).toBe(userToCreate.id.value)
})

test('get me integration with no user found', async () => {
  loginAs(diContainer, 'no-user-found')
  const app = createApp(diContainer)
  const response = await app.request('/me')
  expect(response.status).toBe(404)
})

test('get me integration with no authentication', async () => {
  const app = createApp(diContainer)
  const response = await app.request('/me')
  expect(response.status).toBe(401)
})