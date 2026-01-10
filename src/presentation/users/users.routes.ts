import { createUserController, deleteUserController, getUserController, getUsersController } from "@/presentation/users/users.factory"
import { Hono, type Context } from "hono"

// interface CustomContext extends Context {
//   Variables: {
//     user: {
//       id: string
//       name: string
//       email: string
//     }
//   }
// }

// export const usersRoutes = new Hono<CustomContext>()
export const usersRoutes = new Hono()

usersRoutes.get('/', getUsersController.handle)
usersRoutes.get('/:id', getUserController.handle)
usersRoutes.post('/', createUserController.handle)
usersRoutes.delete('/:id', deleteUserController.handle)
// usersRoutes.use(async (c, next) => {
//   console.log('middleware 1 start')
//   c.set('user', {
//     id: '1',
//     name: 'John Doe',
//     email: 'john.doe@example.com'
//   })
//   await next()
//   console.log('middleware 1 end')
// }).get('/:id/test', (c) => c.json({ message: 'test', test: c.req.param('id'), user: c.get('user') }, 200))