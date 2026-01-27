import { GetUsersUseCase } from '@/application/users/use-cases/get-users.use-case'
import { MockUsersRepository } from '@/infrastructure/persistence/users/repositories/mock-users.repository'
import { MyLoggerService } from '@/infrastructure/services/my-logger.service'
import { expect, test } from 'vitest'

test('GetUsersUseCase', async () => {
  const getUsersUseCase = new GetUsersUseCase(
    new MockUsersRepository(),
    new MyLoggerService()
  )
  const users = await getUsersUseCase.execute()
  expect(users).toBeDefined()
  expect(users.length).toBe(3)
})