import { z } from 'zod'

const api = <T extends z.ZodSchema>(schema: T) => {
  return {
    handler: (callback: (req: Request, _schema: z.infer<T>) => Promise<Response>) => {
      return async (req: Request) => {
        const _schema = schema.parse(await req.json())
        return callback(req, _schema)
      }
    }
  }
}

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

const handle = api(schema).handler(async (req: Request, _schema: z.infer<typeof schema>) => {
  console.log(_schema)
  return new Response('OK', { status: 200 })
})

console.log(await handle(new Request('http://localhost:3000/api', {
  method: 'POST',
  body: JSON.stringify({
    name: 'John',
    age: 20,
  }),
})))