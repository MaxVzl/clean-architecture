import type { Context } from "hono";

export class BaseController {
  public handle = async (c: Context) => {
    return c.text('Hello Hono!')
  }
}