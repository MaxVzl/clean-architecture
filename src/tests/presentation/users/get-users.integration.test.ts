import { createTestApp } from "@/tests/setup-app"
import { expect, test } from "vitest"

test('get users integration', async () => {
  const app = createTestApp()
  const response = await app.request('http://localhost:3000/users')
  expect(response.status).toBe(200)
  const users = await response.json()
  expect(users).toBeDefined()
  expect(users.length).toBe(3)
})