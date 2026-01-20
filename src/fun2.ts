import z from "zod"

const createRoute = <T extends z.ZodSchema>({
  method,
  path,
  request,
}: {
  method: string
  path: string
  request: {
    body: T
  }
}) => {
  return {
    handler: (callback: (req: Request, _request: z.infer<T>) => Promise<Response>) => {
      return async (req: Request) => {
        const _request = request.body.safeParse(await req.json())
        if (!_request.success) {
          return new Response(JSON.stringify({ error: _request.error.message }), { status: 400 })
        }
        return callback(req, _request.data)
      }
    }
  }
}

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

const handle = createRoute({
  method: 'get',
  path: '/',
  request: {
    body: schema
  }
}).handler(async (req: Request, _request) => {
  console.log(_request)
  return new Response(JSON.stringify({ message: 'OK' }), { status: 200 })
})

console.log(await (await handle(new Request('http://localhost:3000/api', {
  method: 'POST',
  body: JSON.stringify({
    name: 'John',
    age: 20,
  }),
}))).json())